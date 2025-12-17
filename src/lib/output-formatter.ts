export function formatOutput(
  type: "text" | "json",
  content: string
): string {
  if (!content) return "";

  if (type === "json") {
    return JSON.stringify({ result: content }, null, 2);
  }

  return content;
}
