"use client";

import { useState } from "react";

type Plan = "free" | "standard" | "medium" | "premium";

const PLANS: {
  id: Plan;
  title: string;
  features: string[];
}[] = [
  {
    id: "free",
    title: "Free",
    features: ["Text only", "20 daily runs"],
  },
  {
    id: "standard",
    title: "Standard",
    features: ["Text + PDF", "50 daily runs"],
  },
  {
    id: "medium",
    title: "Medium",
    features: ["Text + PDF + CSV", "100 daily runs"],
  },
  {
    id: "premium",
    title: "Premium",
    features: ["All workflows", "Unlimited runs"],
  },
];

export default function UpgradeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState<Plan | null>(null);

  if (!open) return null;

  const selectPlan = async (plan: Plan) => {
    setLoading(plan);
    await fetch("/api/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    setLoading(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl p-6 space-y-4">
        <div className="text-lg font-semibold">Upgrade your plan</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className="border rounded p-4 flex flex-col gap-2"
            >
              <div className="font-medium">{p.title}</div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc ml-4">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <button
                onClick={() => selectPlan(p.id)}
                disabled={loading !== null}
                className="mt-2 px-3 py-2 rounded bg-black text-white text-sm disabled:opacity-50"
              >
                {loading === p.id ? "Applying…" : "Choose"}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="text-sm text-gray-500 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
