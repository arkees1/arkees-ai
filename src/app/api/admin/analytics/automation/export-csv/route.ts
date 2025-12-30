import { NextResponse } from "next/server";

export async function GET() {
  try {
    const automation = {
      totalRules: 6,
      activeRules: 4,
      pausedRules: 2,
      executionsToday: 42,
      successRate: "92%",
      insights: [
        "Most automations run during peak usage hours.",
        "2 rules are currently paused and can be optimized.",
        "Automation success rate is healthy."
      ]
    };

    let csv = "";
    csv += "ARKEES AI - Automation Analytics\n\n";

    csv += "Metric,Value\n";
    csv += `Total Rules,${automation.totalRules}\n`;
    csv += `Active Rules,${automation.activeRules}\n`;
    csv += `Paused Rules,${automation.pausedRules}\n`;
    csv += `Executions Today,${automation.executionsToday}\n`;
    csv += `Success Rate,${automation.successRate}\n\n`;

    csv += "Automation Insights\n";
    automation.insights.forEach((i) => {
      csv += `"${i}"\n`;
    });

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          "attachment; filename=arkees-automation-analytics.csv",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "CSV export failed" },
      { status: 500 }
    );
  }
}
