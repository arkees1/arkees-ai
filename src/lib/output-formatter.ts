import type { IntentType } from "./intent-engine";

export function formatOutput(
  intent: IntentType,
  content: string
): string {
  // NOTE:
  // IntentType does NOT include "report"
  // So we map report-style formatting to dashboard / automation

  if (intent === "dashboard" || intent === "automation") {
    return `REPORT\n\n${content}`;
  }

  return content;
}
