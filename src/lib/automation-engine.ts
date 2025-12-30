import { deductCredits } from "@/lib/credits-engine";

const COST: Record<string, number> = {
  dashboard_pack: 1,
  automation_pack: 2,
  workflow_run: 1,
};

type AutomationInput = {
  userId: string;
  type: keyof typeof COST;
};

export function runAutomation({ userId, type }: AutomationInput) {
  const cost = COST[type] ?? 1;

  // 💳 ATOMIC CREDIT CHECK + DEDUCT
  const ok = deductCredits(userId, cost);
  if (!ok) {
    throw new Error("Not enough credits");
  }

  // 🚀 Automation execution (mock / placeholder)
  return {
    success: true,
    type,
    cost,
    message: "Automation executed successfully",
  };
}
