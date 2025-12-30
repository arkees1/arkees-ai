import { KV, MemoryKV } from "@/lib/kv";
type WorkflowType = "text" | "pdf" | "ppt" | "csv";

export type UsageEvent = {
  id: string; userId: string; workflowType: WorkflowType;
  success: boolean; cost: number; timestamp: number;
};

const usageKV: KV<UsageEvent> = new MemoryKV<UsageEvent>();

export async function logUsage(event: Omit<UsageEvent,"id"|"timestamp">) {
  const rec: UsageEvent = { ...event, id: crypto.randomUUID(), timestamp: Date.now() };
  await usageKV.set(rec.id, rec);
  return rec;
}

export async function getAllUsage() {
  return usageKV.values();
}

export async function getUsageSummary() {
  const events = await usageKV.values();
  return events.reduce((acc, e) => {
    acc.totalRuns += 1;
    acc.totalCost += e.cost;
    acc.byType[e.workflowType] = (acc.byType[e.workflowType] || 0) + 1;
    return acc;
  }, { totalRuns: 0, totalCost: 0, byType: {} as Record<WorkflowType, number> });
}
