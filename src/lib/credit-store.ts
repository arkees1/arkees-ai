type CreditStore = Record<string, number>;

const store: CreditStore = {};

export function getCredits(userId: string): number {
  return store[userId] ?? 0;
}

export function setCredits(userId: string, credits: number): void {
  store[userId] = credits;
}

export function addCredits(userId: string, creditsToAdd: number): number {
  const current = getCredits(userId);
  const updated = current + creditsToAdd;
  store[userId] = updated;
  return updated;
}
