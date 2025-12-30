"use client";

import { useEffect, useState } from "react";

type Summary = {
  totalRuns: number;
  totalCost: number;
  byType: Record<string, number>;
};

type UsageEvent = {
  id: string;
  userId: string;
  workflowType: string;
  success: boolean;
  cost: number;
  timestamp: number;
};

export default function AnalyticsPanel() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [events, setEvents] = useState<UsageEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/admin/usage");
        const data = await res.json();
        setSummary(data.summary);
        setEvents(data.events || []);
      } catch {
        setSummary(null);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading analytics…
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="p-6 text-sm text-red-500">
        Failed to load analytics
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-lg font-semibold">Usage Analytics</div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-4">
          <div className="text-xs text-gray-500">Total Runs</div>
          <div className="text-2xl font-bold">{summary.totalRuns}</div>
        </div>

        <div className="border rounded p-4">
          <div className="text-xs text-gray-500">Total Credits Used</div>
          <div className="text-2xl font-bold">{summary.totalCost}</div>
        </div>

        <div className="border rounded p-4">
          <div className="text-xs text-gray-500">Workflow Types</div>
          <div className="text-sm space-y-1 mt-2">
            {Object.entries(summary.byType).map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span>{k.toUpperCase()}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="border rounded">
        <div className="px-4 py-2 border-b font-medium text-sm">
          Recent Activity
        </div>
        <div className="divide-y text-sm">
          {events.slice(-10).reverse().map((e) => (
            <div
              key={e.id}
              className="px-4 py-2 flex justify-between"
            >
              <div>
                <div className="font-medium">
                  {e.workflowType.toUpperCase()}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(e.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={
                    e.success ? "text-green-600" : "text-red-600"
                  }
                >
                  {e.success ? "Success" : "Failed"}
                </div>
                <div className="text-xs text-gray-500">
                  Cost: {e.cost}
                </div>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div className="px-4 py-6 text-center text-gray-500">
              No activity yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
