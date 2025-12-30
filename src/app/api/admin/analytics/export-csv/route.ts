import { NextResponse } from "next/server";
import { generateAdminInsights } from "@/lib/analytics/insights-engine";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const startDate = searchParams.get("startDate") || "N/A";
    const endDate = searchParams.get("endDate") || "N/A";

    /* ------------------------------
       SAME ANALYTICS SOURCE
    ------------------------------ */

    const kpis = [
      { label: "Total Users", value: 120 },
      { label: "Active Users", value: 28 },
      { label: "Credits Used", value: 340 },
      { label: "Credits Remaining", value: 860 },
    ];

    const dailyCreditsUsage = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      data: [12, 18, 6, 14, 9],
    };

    /* ------------------------------
       🔌 INSIGHTS ENGINE
    ------------------------------ */

    const insights = generateAdminInsights({
      kpis,
      charts: { dailyCreditsUsage },
    });

    /* ------------------------------
       CSV BUILD
    ------------------------------ */

    let csv = "";
    csv += "ARKEES AI - Admin Analytics CSV\n";
    csv += `Start Date,${startDate}\n`;
    csv += `End Date,${endDate}\n\n`;

    csv += "Metric,Value\n";
    kpis.forEach((kpi) => {
      csv += `${kpi.label},${kpi.value}\n`;
    });

    csv += "\nDaily Credits Usage\n";
    csv += "Day,Credits Used\n";
    dailyCreditsUsage.labels.forEach((day, i) => {
      csv += `${day},${dailyCreditsUsage.data[i]}\n`;
    });

    csv += "\nAdmin Insights\n";
    insights.forEach((insight) => {
      csv += `"${insight.message.replace(/"/g, '""')}"\n`;
    });

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="arkees-admin-analytics.csv"',
      },
    });
  } catch (err) {
    console.error("❌ CSV EXPORT ERROR:", err);
    return NextResponse.json(
      { error: "CSV export failed" },
      { status: 500 }
    );
  }
}
