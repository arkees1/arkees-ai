import { generateDashboardData } from "./dashboardEngine";

export async function generateAIDashboardData(prompt: string) {
  return generateDashboardData([{ role: "user", content: prompt }]);
}

export { generateDashboardData } from "./dashboardEngine";
export type { DashboardData } from "./dashboardEngine";
