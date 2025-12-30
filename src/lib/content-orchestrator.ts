import { generateDashboardData } from "./dashboardEngine";

/**
 * ONE brain.
 * This orchestrates all content generation flows.
 */
export async function runContentOrchestrator(params: {
  type: "dashboard";
  prompt: string;
}) {
  const { type, prompt } = params;

  switch (type) {
    case "dashboard":
      return generateDashboardData([
        {
          role: "user",
          content: prompt,
        },
      ]);

    default:
      throw new Error("Unsupported content type");
  }
}
