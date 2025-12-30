"use client";

import { useEffect, useState } from "react";

type Automation = {
  id: string;
  name: string;
  workflowType: "text" | "pdf" | "ppt" | "csv";
  prompt: string;
  createdAt: number;
};

export default function AutomationPanel({
  onRun,
}: {
  onRun: (workflowType: string, prompt: string) => void;
}) {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        const res = await fetch("/api/automation");
        const data = await res.json();
        setAutomations(data.automations || []);
      } catch {
        setAutomations([]);
      }
    };

    fetchAutomations();
  }, []);

  const runAutomation = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/automation/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ automationId: id }),
      });
      const data = await res.json();
      onRun(data.workflowType, data.prompt);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-md p-4 space-y-3 bg-white dark:bg-gray-900">
      <div className="text-sm font-semibold">Saved Automations</div>

      {automations.length === 0 && (
        <div className="text-xs text-gray-500">
          No automations saved yet
        </div>
      )}

      {automations.map((a) => (
        <div
          key={a.id}
          className="flex items-center justify-between border rounded px-3 py-2 text-sm"
        >
          <div className="flex flex-col">
            <span className="font-medium">{a.name}</span>
            <span className="text-xs text-gray-500">
              {a.workflowType.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => runAutomation(a.id)}
            disabled={loading}
            className="px-3 py-1 rounded bg-black text-white text-xs disabled:opacity-50"
          >
            Run
          </button>
        </div>
      ))}
    </div>
  );
}
