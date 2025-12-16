"use client";

import { useEffect, useState } from "react";

type Plan = {
  name: string;
  monthlyCredits: number;
  price: number;
};

export default function PricingPage() {
  const [plans, setPlans] = useState<Record<string, Plan>>({});
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/plans")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPlans(data.plans);
      });
  }, []);

  const upgrade = async (planKey: string) => {
    setLoading(planKey);

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: planKey,
        userId: "demo-user", // 🔒 auth later
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Unable to start checkout");
      setLoading(null);
    }
  };

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>ARKEES AI Pricing</h1>
      <p style={{ textAlign: "center", marginBottom: 32 }}>
        Simple credits-based pricing. Upgrade anytime.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {Object.entries(plans).map(([key, plan]) => (
          <div
            key={key}
            style={{
              border: "1px solid #ccc",
              padding: 20,
              borderRadius: 8,
            }}
          >
            <h2>{plan.name}</h2>
            <p>
              <b>{plan.monthlyCredits}</b> credits / month
            </p>
            <p style={{ fontSize: 20, fontWeight: "bold" }}>
              {plan.price === 0 ? "Free" : `₹${plan.price} / month`}
            </p>

            {plan.price > 0 ? (
              <button
                onClick={() => upgrade(key)}
                disabled={loading === key}
                style={{
                  marginTop: 12,
                  padding: "8px 16px",
                  width: "100%",
                }}
              >
                {loading === key ? "Redirecting…" : "Upgrade"}
              </button>
            ) : (
              <button disabled style={{ marginTop: 12, width: "100%" }}>
                Current Plan
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
