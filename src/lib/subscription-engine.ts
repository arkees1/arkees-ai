import { PLANS, PlanKey } from "./plans";
import { getCredits, setCredits } from "./credit-store";

export type Subscription = {
  plan: PlanKey;
  renewAt: number;
};

const userSubscription = new Map<string, Subscription>();

export function getUserPlan(userId: string): PlanKey {
  return userSubscription.get(userId)?.plan || "FREE";
}

export function activatePlan(userId: string, plan: PlanKey) {
  const credits = PLANS[plan].monthlyCredits;

  userSubscription.set(userId, {
    plan,
    renewAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });

  setCredits(userId, credits);
}
