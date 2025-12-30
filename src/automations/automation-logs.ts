export type AutomationLog = {
  id: string;
  userId: string;
  presetKey?: string;
  steps: string[];
  creditsUsed: number;
  createdAt: string;
};

const logs: AutomationLog[] = [];

// 🟢 ADD LOG
export function addAutomationLog(log: AutomationLog) {
  logs.unshift(log); // latest first
}

// 🟢 GET USER LOGS
export function getAutomationLogs(userId: string) {
  return logs.filter((l) => l.userId === userId);
}
