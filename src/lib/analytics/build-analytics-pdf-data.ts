// lib/analytics/build-analytics-pdf-data.ts

import { AnalyticsPdfContract } from "@/lib/contracts/analytics-pdf.contract";

export async function buildAnalyticsPdfData(
  userId: string
): Promise<AnalyticsPdfContract> {
  return {
    meta: {
      reportTitle: "ARKEES AI – Analytics Report",
      subtitle: "Safe Test Mode",
      generatedAtISO: new Date().toISOString(),
      dateRange: {
        start: "2020-01-01",
        end: "2025-01-01",
      },
      userId,
    },

    kpis: [
      { label: "Total Exports", value: 5 },
      { label: "Credits Used", value: 10 },
    ],

    charts: [
      {
        id: "test-chart",
        title: "Test Chart",
        type: "line",
        labels: ["A", "B", "C"],
        series: [
          {
            name: "Sample",
            data: [1, 2, 3],
          },
        ],
      },
    ],

    insights: [
      {
        heading: "System Status",
        points: ["PDF engine is operational"],
      },
    ],
  };
}
