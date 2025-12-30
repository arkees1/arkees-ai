// /lib/user-context.ts
// Central user context for ARKEES AI
// Phase 1: User Intelligence & Control (SAFE FOUNDATION)

export type UserPlan = "free" | "pro" | "enterprise";

export type UserContext = {
  userId: string;
  plan: UserPlan;
  dailyCreditLimit: number;
  dailyRunLimit: number;
  isAdmin: boolean;
};

// 🔒 TEMP STATIC USER (future auth-ready)
export function getUserContext(userId: string): UserContext {
  // Default demo user
  if (userId === "demo-user") {
    return {
      userId,
      plan: "free",
      dailyCreditLimit: 10,
      dailyRunLimit: 20,
      isAdmin: true,
    };
  }

  // Fallback (future users)
  return {
    userId,
    plan: "free",
    dailyCreditLimit: 10,
    dailyRunLimit: 10,
    isAdmin: false,
  };
}
