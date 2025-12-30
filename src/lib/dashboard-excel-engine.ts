import { Workbook } from "exceljs";

export async function generateDashboardExcel(dashboard: any) {
  const workbook = new Workbook();

  // =========================
  // Sheet 1: Summary
  // =========================
  const summary = workbook.addWorksheet("Summary");

  summary.columns = [
    { header: "Field", key: "field", width: 25 },
    { header: "Value", key: "value", width: 40 },
  ];

  summary.addRow({ field: "Title", value: dashboard.title });
  summary.addRow({ field: "Subtitle", value: dashboard.subtitle });

  summary.getRow(1).font = { bold: true };

  // =========================
  // Sheet 2: KPIs
  // =========================
  const kpiSheet = workbook.addWorksheet("KPIs");

  kpiSheet.columns = [
    { header: "KPI", key: "label", width: 30 },
    { header: "Value", key: "value", width: 20 },
  ];

  dashboard.kpis.forEach((kpi: any) => {
    kpiSheet.addRow({
      label: kpi.label,
      value: `${kpi.value}${kpi.unit ? " " + kpi.unit : ""}`,
    });
  });

  kpiSheet.getRow(1).font = { bold: true };

  // =========================
  // Sheet 3: Insights
  // =========================
  const insightsSheet = workbook.addWorksheet("Insights");

  insightsSheet.columns = [
    { header: "Insight", key: "insight", width: 80 },
  ];

  dashboard.insights.forEach((ins: string) => {
    insightsSheet.addRow({ insight: ins });
  });

  insightsSheet.getRow(1).font = { bold: true };

  return await workbook.xlsx.writeBuffer();
}
