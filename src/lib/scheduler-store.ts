type Frequency = "daily" | "weekly";
type WorkflowType = "text" | "pdf" | "ppt" | "csv";

export type ScheduledAutomation = {
  id: string;
  userId: string;
  workflowType: WorkflowType;
  prompt: string;
  frequency: Frequency;
  lastRunAt?: number;
};

const schedules: ScheduledAutomation[] = [];

export function addSchedule(item: Omit<ScheduledAutomation, "id">) {
  const scheduled = { ...item, id: crypto.randomUUID() };
  schedules.push(scheduled);
  return scheduled;
}

export function getSchedules() {
  return schedules;
}

export function shouldRunNow(s: ScheduledAutomation, now = Date.now()) {
  if (!s.lastRunAt) return true;
  const day = 24 * 60 * 60 * 1000;
  const week = 7 * day;
  const gap = s.frequency === "daily" ? day : week;
  return now - s.lastRunAt >= gap;
}

export function markRan(id: string) {
  const s = schedules.find((x) => x.id === id);
  if (s) s.lastRunAt = Date.now();
}
