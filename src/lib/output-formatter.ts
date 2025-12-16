import { IntentType } from "./intent-engine";

export function formatOutput(
  intent: IntentType,
  content: string
): string {
  if (intent === "report") {
    return `REPORT\n\n${content}`;
  }

  if (intent === "pdf") {
    return `PDF EXPORT\n\n${content}`;
  }

  if (intent === "csv") {
    return `DATA\n${content}`;
  }

  return content; // chat
}
