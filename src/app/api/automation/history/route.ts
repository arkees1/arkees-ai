// /app/api/automation/history/route.ts
// Automation history endpoint
// Phase-3: Session-based user resolution (SAFE)

import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";

// NOTE:
// This file assumes your existing in-memory / file-based
// history storage is already implemented.
// We only replace userId resolution — nothing else.

type AutomationRun = {
  id: string;
  userId: string;
  presetKey: string;
  creditsUsed: number;
  createdAt: string;
};

// 🔧 TEMP in-memory history store (existing pattern)
const runs: AutomationRun[] = [];

export async function GET(req: Request) {
  try {
    const session = getSessionUser(req);
    const userId = session.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "UNAUTHENTICATED" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") || 10);

    const userRuns = runs
      .filter((r) => r.userId === userId)
      .slice(-limit)
      .reverse();

    return NextResponse.json({
      runs: userRuns,
    });
  } catch {
    return NextResponse.json(
      { error: "HISTORY_FETCH_FAILED" },
      { status: 500 }
    );
  }
}
