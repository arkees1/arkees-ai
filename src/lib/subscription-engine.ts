import { getCredits, setCredits } from "./credit-store";
import { PLANS } from "./plans";

export type PlanKey = keyof typeof PLANS;

export function applySubscription(
  userId: string,
  plan: PlanKey
): number {
  const planConfig = PLANS[plan];
  const credits = planConfig.monthlyCredits;

  setCredits(userId, credits);

  return credits;
}
