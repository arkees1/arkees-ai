"use client";

type KPI = {
  label: string;
  value: number;
};

export default function KPIGrid({ kpis }: { kpis: Record<string, number> }) {
  const items: KPI[] = [
    { label: "Total Users", value: kpis.totalUsers },
    { label: "Active Users", value: kpis.activeUsers },
    { label: "Credits Used", value: kpis.creditsUsed },
    { label: "Credits Remaining", value: kpis.creditsRemaining },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {items.map((kpi) => (
        <div
          key={kpi.label}
          className="rounded-xl border p-4 bg-white dark:bg-gray-900"
        >
          <div className="text-sm text-gray-500">{kpi.label}</div>
          <div className="text-2xl font-bold mt-1">{kpi.value}</div>
        </div>
      ))}
    </div>
  );
}
