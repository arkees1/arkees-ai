import { formatOutput } from "./output-formatter";

export async function orchestrateContent(
  prompt: string
): Promise<string> {
  try {
    // mock / placeholder – later AI call here
    const rawResponse = `Generated response for: ${prompt}`;

    return formatOutput("text", rawResponse);
  } catch (err) {
    console.error("orchestrateContent error:", err);
    return formatOutput("text", "");
  }
}
