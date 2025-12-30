"use client";

import { useEffect, useRef, useState } from "react";
import KPIGrid from "@/components/analytics/KPIGrid";
import BarChart from "@/components/analytics/BarChart";
import LineChart from "@/components/analytics/LineChart";
import PieChart from "@/components/analytics/PieChart";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  // 🔥 Phase 4.1.2 — Automation REAL DATA
  const [automationData, setAutomationData] = useState<any>(null);
  const [automationLoading, setAutomationLoading] = useState(true);
  const [automationError, setAutomationError] = useState<string | null>(null);

  const barRef = useRef<any>(null);
  const lineRef = useRef<any>(null);
  const pieRef = useRef<any>(null);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await fetch(`/api/admin/analytics?${params.toString()}`);
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  };

  const loadAutomation = async () => {
    setAutomationLoading(true);
    setAutomationError(null);

    try {
      const res = await fetch("/api/admin/analytics/automation");

      if (!res.ok) {
        throw new Error("Automation API failed");
      }

      const json = await res.json();
      setAutomationData(json.automations);
    } catch (err: any) {
      setAutomationError("Failed to load automation insights");
    } finally {
      setAutomationLoading(false);
    }
  };

  const exportPDF = () => {
    setExporting(true);

    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    window.open(
      `/api/admin/analytics/export-pdf?${params.toString()}`,
      "_blank"
    );

    setTimeout(() => {
      setExporting(false);
    }, 1500);
  };

  useEffect(() => {
    loadAnalytics();
    loadAutomation();
  }, []);

  if (!data) {
    return <div className="p-6">Loading analytics…</div>;
  }

  return (
    <div className="p-6 space-y-10">
      {/* FILTER BAR */}
      <div className="flex gap-3 items-end">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button onClick={loadAnalytics} disabled={loading || exporting}>
          {loading ? "Applying…" : "Apply"}
        </button>

        <button onClick={exportPDF} disabled={loading || exporting}>
          {exporting ? "Exporting PDF…" : "Export PDF"}
        </button>
      </div>

      {/* KPI GRID */}
      <KPIGrid kpis={data.kpis} />

      {/* CHARTS */}
<BarChart
  title="Daily Credits Usage"
  labels={data.charts.dailyCreditsUsage.labels}
  data={data.charts.dailyCreditsUsage.data}
/>

      <LineChart
        ref={lineRef}
        title="Credits Usage Trend"
        labels={data.charts.dailyCreditsUsage.labels}
        data={data.charts.dailyCreditsUsage.data}
      />

      <PieChart
        ref={pieRef}
        title="Feature Usage Split"
        labels={data.charts.featureUsageSplit.labels}
        data={data.charts.featureUsageSplit.data}
      />

      {/* ================================================= */}
      {/* ⚙️ AUTOMATION INSIGHTS — REAL DATA (4.1.2) */}
      {/* ================================================= */}
      <div className="border-t pt-6 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          ⚙️ Automation Insights
        </h2>

        {automationLoading && (
          <div className="text-gray-500">Loading automation insights…</div>
        )}

        {automationError && (
          <div className="text-red-600">{automationError}</div>
        )}

        {automationData && (
          <>
            {/* KPI ROW */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <KpiBox label="Total Rules" value={automationData.totalRules} />
              <KpiBox label="Active Rules" value={automationData.activeRules} />
              <KpiBox label="Paused Rules" value={automationData.pausedRules} />
              <KpiBox
                label="Executions Today"
                value={automationData.executionsToday}
              />
              <KpiBox
                label="Success Rate"
                value={automationData.successRate}
              />
            </div>

            {/* INSIGHTS */}
            <div className="mt-4">
              <h3 className="font-medium mb-2">Insights</h3>
              <ul className="list-disc pl-5 space-y-1">
                {automationData.insights.map((msg: string, i: number) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function KpiBox({ label, value }: { label: string; value: any }) {
  return (
    <div className="border p-3 rounded">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}
