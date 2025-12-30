import { generateDashboard } from "./dashboardEngine";

/**
 * ONE brain.
 * Unlimited workflows.
 */
export async function runAutomation(
  userId: string,
  workflowType: string,
  prompt: string
) {
  switch (workflowType) {
    case "dashboard":
      return generateDashboard(prompt);

    default:
      throw new Error(`UNSUPPORTED_WORKFLOW: ${workflowType}`);
  }
}

/**
 * Legacy support (some APIs still call this)
 */
export async function orchestrateContent(
  type: "dashboard",
  prompt: string
) {
  return generateDashboard(prompt);
}
