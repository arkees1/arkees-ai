// /lib/userCredits.ts
// In-memory credit store for ARKEES AI
// Phase-1: completed with explicit setter (SAFE)

type CreditStore = Record<string, number>;

// 🔐 In-memory store (dev / local only)
// Can be swapped with DB / Redis later
const userCredits: CreditStore = {};

/**
 * Get current credits for a user.
 * Initializes default credits if user is new.
 */
export async function getCredits(userId: string): Promise<number> {
  if (!userId) {
    throw new Error("INVALID_USER");
  }

  if (!(userId in userCredits)) {
    userCredits[userId] = 5; // default fallback
  }

  return userCredits[userId];
}

/**
 * Deduct credits safely.
 */
export async function deductCredits(
  userId: string,
  amount: number
): Promise<number> {
  if (!userId) {
    throw new Error("INVALID_USER");
  }

  if (amount <= 0) {
    throw new Error("INVALID_AMOUNT");
  }

  const current = await getCredits(userId);

  if (current < amount) {
    throw new Error("INSUFFICIENT_CREDITS");
  }

  const updated = current - amount;
  userCredits[userId] = updated;

  return updated;
}

/**
 * 🔒 Explicit credit setter (ADMIN / SYSTEM ONLY)
 * Used by reset, plans, migrations
 */
export async function setCredits(
  userId: string,
  amount: number
): Promise<number> {
  if (!userId) {
    throw new Error("INVALID_USER");
  }

  if (amount < 0) {
    throw new Error("INVALID_AMOUNT");
  }

  userCredits[userId] = amount;
  return amount;
}
