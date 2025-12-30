// /lib/credit-guard.ts
// Centralized credit & usage validation layer for ARKEES AI
// Phase-1: SAFE guardrail (no side effects)

import { getUserContext } from "@/lib/user-context";

type CreditCheckResult =
  | { ok: true }
  | { ok: false; reason: string };

export function canConsumeCredits(
  userId: string,
  creditsRequired: number,
  creditsAvailable: number
): CreditCheckResult {
  const user = getUserContext(userId);

  // 🔒 hard stop
  if (creditsAvailable < creditsRequired) {
    return {
      ok: false,
      reason: "Insufficient credits",
    };
  }

  // 🔐 future-proof: daily cap (not enforced yet)
  if (creditsRequired > user.dailyCreditLimit) {
    return {
      ok: false,
      reason: "Daily credit limit exceeded",
    };
  }

  return { ok: true };
}
