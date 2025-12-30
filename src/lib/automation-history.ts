import fs from "fs";
import path from "path";

type AutomationRun = {
  id: string;
  userId: string;
  presetKey: string;
  creditsUsed: number;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const HISTORY_FILE = path.join(DATA_DIR, "automation-history.json");

/**
 * Ensure storage exists
 */
function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(HISTORY_FILE)) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify([], null, 2));
  }
}

/**
 * Read history
 */
function readHistory(): AutomationRun[] {
  ensureStore();
  return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
}

/**
 * Write history
 */
function writeHistory(runs: AutomationRun[]) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(runs, null, 2));
}

/**
 * Append a new automation run
 */
export function addAutomationRun(run: Omit<AutomationRun, "id" | "createdAt">) {
  const runs = readHistory();

  const record: AutomationRun = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...run,
  };

  runs.unshift(record); // latest first
  writeHistory(runs);
}

/**
 * Get recent runs (optionally per user)
 */
export function getAutomationRuns(userId?: string, limit = 10) {
  const runs = readHistory();
  const filtered = userId ? runs.filter(r => r.userId === userId) : runs;
  return filtered.slice(0, limit);
}
