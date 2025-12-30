/**
 * Export Guard
 * Controls which exports are allowed per intent
 */

export type IntentType =
  | "dashboard"
  | "csv"
  | "excel"
  | "pdf"
  | "image"
  | "video"
  | "automation";

export function canExport(intent: IntentType) {
  switch (intent) {
    case "dashboard":
    case "csv":
    case "excel":
    case "pdf":
      return true;

    default:
      return false;
  }
}
