import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "credits.json");

type CreditData = {
  [userId: string]: {
    credits: number;
  };
};

function readData(): CreditData {
  if (!fs.existsSync(DATA_FILE)) {
    return {};
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw || "{}");
}

function writeData(data: CreditData) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function getCredits(userId: string): number {
  const data = readData();
  return data[userId]?.credits ?? 0;
}

export function hasCredits(userId: string, amount = 1): boolean {
  return getCredits(userId) >= amount;
}

export function deductCredits(userId: string, amount = 1): number {
  const data = readData();

  if (!data[userId]) {
    data[userId] = { credits: 0 };
  }

  data[userId].credits = Math.max(
    0,
    (data[userId].credits || 0) - amount
  );

  writeData(data);
  return data[userId].credits;
}

export function resetCredits(userId: string, amount = 10): number {
  const data = readData();
  data[userId] = { credits: amount };
  writeData(data);
  return amount;
}
