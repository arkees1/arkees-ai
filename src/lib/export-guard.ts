import { IntentType } from "./intent-engine";

export function canExport(
  intent: IntentType,
  exportType: "pdf" | "csv"
): boolean {
  // Chat cannot be exported directly
  if (intent === "chat") return false;

  // Report → PDF allowed
  if (intent === "report" && exportType === "pdf") return true;

  // CSV only from csv intent
  if (intent === "csv" && exportType === "csv") return true;

  return false;
}
