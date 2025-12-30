type DashboardData = {
  title: string
  subtitle: string
  insights: string[]
}

export function buildDashboardData(prompt: string): DashboardData {
  return {
    title: "AI Generated Dashboard",
    subtitle: "Insights based on conversation",
    insights: prompt
      .split("\n")
      .filter(Boolean)
      .slice(0, 5),
  }
}
