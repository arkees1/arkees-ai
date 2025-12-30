type Automation = {
  id: string;
  userId: string;
  name: string;
  workflowType: string;
  prompt: string;
  createdAt: number;
};

const automations: Automation[] = [];

export function saveAutomation(
  data: Omit<Automation, "id" | "createdAt">
) {
  const automation: Automation = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    ...data,
  };

  automations.push(automation);
  return automation;
}

export function getAutomations(userId: string) {
  return automations.filter(a => a.userId === userId);
}
export function logAutomation(data: any) {
  // no-op for now
  return;
}

/**
 * 🔁 Logs = automations history (simple MVP)
 */
export function getAutomationLogs(userId: string) {
  return getAutomations(userId);
}

