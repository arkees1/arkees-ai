export function generateDashboardCSV(dashboard: any) {
  const rows: string[] = [];

  rows.push(`Title,${dashboard.title ?? "Dashboard"}`);
  rows.push(`Subtitle,${dashboard.subtitle ?? ""}`);
  rows.push("");

  rows.push("KPI,Value");
  for (const kpi of dashboard.kpis || []) {
    rows.push(`${kpi.label},${kpi.value}`);
  }

  rows.push("");
  rows.push("Key Insights");
  for (const point of dashboard.insights || []) {
    rows.push(`"${point}"`);
  }

  return rows.join("\n");
}
