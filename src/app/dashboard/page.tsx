"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [credits, setCredits] = useState<number>(0);
  const [plan, setPlan] = useState<"starter" | "premium">("starter");

  useEffect(() => {
    const savedCredits = localStorage.getItem("arkees_credits");
    const savedPlan = localStorage.getItem("arkees_plan") as
      | "starter"
      | "premium"
      | null;

    if (savedPlan) setPlan(savedPlan);

    if (savedCredits) {
      setCredits(Number(savedCredits));
    } else {
      localStorage.setItem("arkees_credits", "5");
      setCredits(5);
    }
  }, []);

  const switchPlan = (nextPlan: "starter" | "premium") => {
    setPlan(nextPlan);
    localStorage.setItem("arkees_plan", nextPlan);

    if (nextPlan === "premium") {
      setCredits(999);
      localStorage.setItem("arkees_credits", "999");
    } else {
      setCredits(5);
      localStorage.setItem("arkees_credits", "5");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 26 }}>ARKEES AI Dashboard</h1>

      <p style={{ marginTop: 10 }}>
        🧠 Current Plan: <b>{plan.toUpperCase()}</b>
      </p>

      <p>
        🔋 Credits Left: <b>{credits}</b>
      </p>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => switchPlan("starter")}
          style={{
            padding: "10px 16px",
            marginRight: 10,
            background: plan === "starter" ? "#000" : "#ddd",
            color: plan === "starter" ? "#fff" : "#000",
            borderRadius: 6,
          }}
        >
          Starter (Free)
        </button>

        <button
          onClick={() => switchPlan("premium")}
          style={{
            padding: "10px 16px",
            background: plan === "premium" ? "#000" : "#ddd",
            color: plan === "premium" ? "#fff" : "#000",
            borderRadius: 6,
          }}
        >
          Premium
        </button>
      </div>

      <p style={{ marginTop: 30, color: "#666" }}>
        💡 Demo Tip: Switch to Premium to unlock unlimited exports.
      </p>
    </div>
  );
}
