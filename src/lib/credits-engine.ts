// src/lib/credits-engine.ts

let DEMO_CREDITS = 10;

export function getCredits(userId?: string) {
  return DEMO_CREDITS;
}

export function checkCredits(userId?: string, cost = 1) {
  return DEMO_CREDITS >= cost;
}

export function deductCredits(userId?: string, cost = 1) {
  DEMO_CREDITS = Math.max(0, DEMO_CREDITS - cost);
  return DEMO_CREDITS;
}

export function grantCredits(userId?: string, amount = 10) {
  DEMO_CREDITS += amount;
  return DEMO_CREDITS;
}

export function getDemoCredits() {
  return DEMO_CREDITS;
}
