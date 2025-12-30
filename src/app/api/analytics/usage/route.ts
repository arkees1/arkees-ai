// /app/api/analytics/usage/route.ts
// Phase-2: Usage analytics (read-only, safe)
// Returns last 7 & 30 days aggregated usage for charts

import { NextResponse } from "next/server";
import { getUserContext } from "@/lib/user-context";

// TEMP in-memory source: reuses automation history endpoint pattern
// In future, replace with DB aggregation
type AutomationRun = {
  id: string;
  userId: string;
  presetKey: string;
  creditsUsed: number;
  createdAt: string;
};

// 🔧 NOTE:
// This endpoint expects that your existing history source
// is accessible via an internal fetch. We keep it simple & safe.

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    // context loaded (future auth-ready)
    getUserContext(userId);

    // Fetch recent history (reuse existing API)
    const historyRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/automation/history?userId=${userId}&limit=100`,
      { cache: "no-store" }
    );

    if (!historyRes.ok) {
      return NextResponse.json(
        { error: "HISTORY_UNAVAILABLE" },
        { status: 500 }
      );
    }

    const historyData = await historyRes.json();
    const runs: AutomationRun[] = Array.isArray(historyData.runs)
      ? historyData.runs
      : [];

    const now = new Date();
    const days = (n: number) => {
      const d = new Date(now);
      d.setDate(d.getDate() - n);
      return d;
    };

    const aggregate = (from: Date) => {
      const daily: Record<string, number> = {};

      for (const r of runs) {
        const t = new Date(r.createdAt);
        if (t >= from) {
          const key = t.toISOString().slice(0, 10); // YYYY-MM-DD
          daily[key] = (daily[key] || 0) + r.creditsUsed;
        }
      }

      return Object.entries(daily)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, credits]) => ({ date, credits }));
    };

    return NextResponse.json({
      last7Days: aggregate(days(7)),
      last30Days: aggregate(days(30)),
    });
  } catch {
    return NextResponse.json(
      { error: "ANALYTICS_FAILED" },
      { status: 500 }
    );
  }
}
