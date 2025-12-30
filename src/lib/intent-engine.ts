/**
 * Supported intent types across the system
 */
export type IntentType =
  | "chat"
  | "pdf"
  | "csv"
  | "image"
  | "dashboard"
  | "automation";

/**
 * Intent resolver
 */
export function resolveIntent(prompt: string): IntentType {
  const p = prompt.toLowerCase();

  if (p.includes("dashboard")) return "dashboard";
  if (p.includes("csv")) return "csv";
  if (p.includes("pdf")) return "pdf";
  if (p.includes("image")) return "image";

  return "chat";
}

/**
 * 🔥 PUBLIC ENGINE (this was missing)
 * Used by /api/chat
 */
export async function runIntentEngine(prompt: string) {
  const intent = resolveIntent(prompt);

  return {
    intent,
    prompt,
  };
}
