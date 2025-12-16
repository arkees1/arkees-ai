import { addCredits, getCredits } from "./credit-store";

export function grantCredits(userId: string, credits: number) {
  const totalCredits = addCredits(userId, credits);
  return { totalCredits };
}
