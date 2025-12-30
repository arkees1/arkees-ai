import { getCredits, setCredits, resetCreditsFromDefault } from "@/lib/credit-store";

export const DEFAULT_DEMO_CREDITS = 10;

// 🔹 deduct credits (single source = runtime)
export function consumeCredits(userId: string, amount: number) {
  const current = getCredits(userId);
  if (current < amount) {
    throw new Error("Insufficient credits");
  }
  setCredits(userId, current - amount);
}

// 🔹 reset = ALWAYS from credits.json
export function resetCredits(userId: string) {
  return resetCreditsFromDefault(userId);
}
