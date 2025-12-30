import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "credits.json");

type DBShape = Record<string, { credits: number }>;

// ensure folder + file
function ensureDB() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2));
  }
}

export function readDB(): DBShape {
  ensureDB();
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8") || "{}");
}

export function writeDB(data: DBShape) {
  ensureDB();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}
