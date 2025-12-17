import { IntentType } from "./intent-engine";

type Plan = "FREE" | "BASIC" | "STANDARD" | "PRO" | "PREMIUM";

export function canExport(
  intent: IntentType,
  userPlan: Plan
): boolean {
  if (userPlan === "FREE") return false;

  if (userPlan === "BASIC") {
    return !["PDF", "CSV", "EXCEL"].includes(intent);
  }

  // STANDARD / PRO / PREMIUM
  return true;
}
