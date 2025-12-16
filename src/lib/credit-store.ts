const store = new Map<string, number>();

export function grantCredits(userId: string, credits: number) {
  const current = store.get(userId) ?? 0;
  const totalCredits = current + credits;
  store.set(userId, totalCredits);
  return { totalCredits };
}

export function getCredits(userId: string) {
  return store.get(userId) ?? 0;
}
