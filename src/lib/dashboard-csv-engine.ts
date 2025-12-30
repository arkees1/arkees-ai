import type { DashboardData } from "./dashboardEngine";

type CSVRow = (string | number)[];

export async function generateDashboardCSV(dashboard: DashboardData) {
  const headers: string[] = [];
  const rows: CSVRow[] = [];

  // KPIs
  if (dashboard.kpis?.length) {
    headers.push("KPI", "Value");

    dashboard.kpis.forEach((kpi) => {
      rows.push([kpi.label, kpi.value]);
    });
  }

  // Insights
  if (dashboard.insights?.length) {
    rows.push([]);
    rows.push(["INSIGHTS"]);

    dashboard.insights.forEach((block) => {
      rows.push([block.section]);
      block.points.forEach((point) => {
        rows.push(["", point]);
      });
    });
  }

  // Table
  if (dashboard.table) {
    rows.push([]);
    headers.length = 0;

    dashboard.table.columns.forEach((col) => {
      headers.push(col.label);
    });

    dashboard.table.rows.forEach((row) => {
      rows.push(
        dashboard.table!.columns.map((col) => row[col.key])
      );
    });
  }

  return {
    headers,
    rows,
  };
}
