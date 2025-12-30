export type AutomationSchedule = {
  id: string;
  userId: string;
  presetKey: string;
  prompt: string;
  frequency: "daily" | "weekly";
  email?: {
    to: string;
    subject: string;
    body: string;
  };
  createdAt: string;
};

const schedules: AutomationSchedule[] = [];

export function addSchedule(schedule: AutomationSchedule) {
  schedules.push(schedule);
}

export function getSchedules(userId: string) {
  return schedules.filter((s) => s.userId === userId);
}

export function getAllSchedules() {
  return schedules;
}
