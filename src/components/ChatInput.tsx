"use client";

import { useState } from "react";

type WorkflowType = "text" | "pdf" | "ppt" | "csv";

export default function ChatInput({
  onResult,
}: {
  onResult: (data: any) => void;
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [workflowType, setWorkflowType] = useState<WorkflowType>("text");

  const runWorkflow = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    try {
      const res = await fetch("/api/workflow/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workflowType,
          prompt: input,
        }),
      });

      const data = await res.json();
      onResult(data);
    } catch {
      onResult({ success: false, error: "Workflow failed" });
    } finally {
      setLoading(false);
    }
  };

  const saveWorkflow = async () => {
    if (!input.trim()) return;

    await fetch("/api/automation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input.slice(0, 40),
        workflowType,
        prompt: input,
      }),
    });
  };

  return (
    <div className="border-t p-4 flex flex-col gap-3">
      {/* Workflow Selector */}
      <div className="flex gap-2 text-sm">
        {(["text", "pdf", "ppt", "csv"] as WorkflowType[]).map((t) => (
          <button
            key={t}
            onClick={() => setWorkflowType(t)}
            className={`px-3 py-1 rounded ${
              workflowType === t
                ? "bg-black text-white"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Input + Actions */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runWorkflow()}
          placeholder="Type your prompt…"
          className="flex-1 px-4 py-2 rounded border bg-white dark:bg-gray-900 dark:border-gray-700 focus:outline-none"
        />

        <button
          onClick={runWorkflow}
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white text-sm disabled:opacity-50"
        >
          {loading ? "Running…" : "Run"}
        </button>

        <button
          onClick={saveWorkflow}
          className="px-4 py-2 rounded border text-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
}
