import fs from "fs";
import path from "path";

type CreditRecord = {
  userId: string;
  credits: number;
};

const DATA_DIR = path.join(process.cwd(), "data");
const CREDIT_FILE = path.join(DATA_DIR, "credits.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }
  if (!fs.existsSync(CREDIT_FILE)) {
    fs.writeFileSync(CREDIT_FILE, JSON.stringify({}), "utf-8");
  }
}

export function getUserCredits(userId: string): number {
  ensureStore();
  const raw = fs.readFileSync(CREDIT_FILE, "utf-8");
  const data = JSON.parse(raw || "{}");
  return data[userId] ?? 0;
}

export function setUserCredits(userId: string, credits: number) {
  ensureStore();
  const raw = fs.readFileSync(CREDIT_FILE, "utf-8");
  const data = JSON.parse(raw || "{}");
  data[userId] = credits;
  fs.writeFileSync(CREDIT_FILE, JSON.stringify(data, null, 2), "utf-8");
}
