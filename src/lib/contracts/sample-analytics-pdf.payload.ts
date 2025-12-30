import { AnalyticsPdfContract } from "./analytics-pdf.contract";

export const SAMPLE_ANALYTICS_PDF_DATA: AnalyticsPdfContract = {
  meta: {
    reportTitle: "ARKEES AI – Analytics Report",
    subtitle: "Performance Overview",
    generatedAtISO: new Date().toISOString(),
    dateRange: {
      start: "2025-01-01",
      end: "2025-01-31",
    },
    userId: "demo-user",
  },

  kpis: [
    { label: "Total Revenue", value: 120000, unit: "INR", delta: 12.5 },
    { label: "Active Users", value: 845 },
    { label: "PDF Exports", value: 132 },
  ],

  charts: [
    {
      id: "revenue-trend",
      title: "Revenue Trend",
      type: "line",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        { name: "Revenue", data: [20000, 30000, 28000, 42000] },
      ],
    },
  ],

  insights: [
    {
      heading: "Key Observations",
      points: [
        "Revenue peaked in Week 4 due to increased exports",
        "User engagement remained stable throughout the month",
      ],
    },
  ],
};
