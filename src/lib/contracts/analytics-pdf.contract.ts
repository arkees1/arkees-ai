// lib/contracts/analytics-pdf.contract.ts

export type PdfMeta = {
  reportTitle: string;          // "ARKEES AI – Analytics Report"
  subtitle?: string;            // optional tagline
  generatedAtISO: string;       // new Date().toISOString()
  dateRange: {
    start: string;              // ISO date
    end: string;                // ISO date
  };
  userId: string;               // for audit/debug
};

export type PdfKpi = {
  label: string;                // "Total Revenue"
  value: number | string;       // 120000 or "12%"
  unit?: string;                // "INR", "%", "users"
  delta?: number;               // +12.5 / -3.2
};

export type ChartSeries = {
  name: string;                 // "Revenue"
  data: number[];               // [10, 20, 30]
  colorHex?: string;            // optional future use
};

export type PdfChart = {
  id: string;                   // unique id
  title: string;                // "Revenue Trend"
  type: "line" | "bar" | "area" | "pie";
  labels: string[];             // x-axis labels
  series: ChartSeries[];
  notes?: string;               // optional footer text
};

export type PdfInsight = {
  heading: string;              // "Key Observations"
  points: string[];             // bullet points
};

export type AnalyticsPdfContract = {
  meta: PdfMeta;
  kpis: PdfKpi[];
  charts: PdfChart[];
  insights?: PdfInsight[];
};
