export type IntentType =
  | "TEXT"
  | "PDF"
  | "CSV"
  | "EXCEL"
  | "IMAGE"
  | "AUDIO";

export function detectIntent(prompt: string): IntentType {
  const p = prompt.toLowerCase();

  if (p.includes("pdf")) return "PDF";
  if (p.includes("csv")) return "CSV";
  if (p.includes("excel")) return "EXCEL";
  if (p.includes("image")) return "IMAGE";
  if (p.includes("audio")) return "AUDIO";

  return "TEXT";
}
