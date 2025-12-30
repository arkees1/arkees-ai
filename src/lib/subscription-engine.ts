export type Plan = "free" | "standard" | "medium" | "premium";
export type WorkflowType = "text" | "pdf" | "ppt" | "csv";

const PLAN_RULES: Record<
  Plan,
  {
    allowed: WorkflowType[];
    dailyLimit: number;
  }
> = {
  free: {
    allowed: ["text"],
    dailyLimit: 20,
  },
  standard: {
    allowed: ["text", "pdf"],
    dailyLimit: 50,
  },
  medium: {
    allowed: ["text", "pdf", "csv"],
    dailyLimit: 100,
  },
  premium: {
    allowed: ["text", "pdf", "csv", "ppt"],
    dailyLimit: 9999,
  },
};

// 🔒 MVP user-plan store (replace with DB later)
const userPlans = new Map<string, Plan>();

export function getUserPlan(userId: string): Plan {
  return userPlans.get(userId) ?? "free";
}

export function setUserPlan(userId: string, plan: Plan) {
  userPlans.set(userId, plan);
}

export function isWorkflowAllowed(
  userId: string,
  workflowType: WorkflowType
) {
  const plan = getUserPlan(userId);
  return PLAN_RULES[plan].allowed.includes(workflowType);
}
