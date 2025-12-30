export type UsageRecord = {
  action: string
  timestamp: number
}

export async function getUsageHistory(
  userId: string
): Promise<UsageRecord[]> {
  if (!userId) return []

  // 🔮 Placeholder data (DB later)
  return [
    { action: "chat", timestamp: Date.now() - 100000 },
    { action: "csv.export", timestamp: Date.now() - 50000 },
    { action: "dashboard.pdf", timestamp: Date.now() - 20000 },
  ]
}

export async function logUsage(
  userId: string,
  action: string
): Promise<void> {
  if (!userId || !action) return

  // 🧾 Placeholder (DB / analytics later)
  console.log("[USAGE]", { userId, action, time: Date.now() })
}
