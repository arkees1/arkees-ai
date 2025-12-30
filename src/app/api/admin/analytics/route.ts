// src/app/api/admin/analytics/route.ts

import { NextResponse } from "next/server";
import { generateAdminInsights } from "@/lib/analytics/insights-engine";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const startDate = searchParams.get("startDate") || "N/A";
    const endDate = searchParams.get("endDate") || "N/A";

    /* -------------------------------------------------
       ANALYTICS DATA SOURCE
       (Same as before – no behaviour change)
    -------------------------------------------------- */

    const analyticsData = {
      kpis: [
        { label: "Total Users", value: 120 },
        { label: "Active Users", value: 28 },
        { label: "Credits Used", value: 340 },
        { label: "Credits Remaining", value: 860 },
      ],
      charts: {
        dailyCreditsUsage: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          data: [12, 18, 6, 14, 9],
        },
        featureUsageSplit: {
          labels: ["Chat", "PDF", "Images", "Video"],
          data: [40, 25, 20, 15],
        },
      },
    };

    /* -------------------------------------------------
       🔌 INSIGHTS ENGINE (SINGLE SOURCE OF TRUTH)
    -------------------------------------------------- */

    const insights = generateAdminInsights({
      kpis: analyticsData.kpis,
      charts: {
        dailyCreditsUsage: analyticsData.charts.dailyCreditsUsage,
      },
    });

    /* -------------------------------------------------
       FINAL RESPONSE
    -------------------------------------------------- */

    return NextResponse.json({
      startDate,
      endDate,
      ...analyticsData,
      insights, // ✅ wired from lib/analytics/insights-engine
    });
  } catch (err: any) {
    console.error("❌ ADMIN ANALYTICS ERROR:", err);

    return NextResponse.json(
      { error: "Failed to load admin analytics" },
      { status: 500 }
    );
  }
}
