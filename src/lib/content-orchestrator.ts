// src/lib/content-orchestrator.ts

import { orchestrateIntent } from "./intent-engine";
import { formatOutput } from "./output-formatter";

export async function orchestrateContent(prompt: string) {
  if (!prompt || !prompt.trim()) {
    return {
      reply: "",
      error: "Empty prompt",
    };
  }

  // Step 1: intent detection
  const intent = orchestrateIntent(prompt);

  // Step 2: generate content (TEMP static brain)
  let rawResponse = "";

  switch (intent.type) {
    case "chat":
      rawResponse = `${prompt}\n\nSummary:\nThis content was generated successfully by the chat pipeline. The system is stable and ready for AI integration.`;
      break;

    case "report":
      rawResponse = `Report Generated:\n\n${prompt}`;
      break;

    case "poem":
      rawResponse = `🌸 Poem 🌸\n${prompt}`;
      break;

    default:
      rawResponse = prompt;
  }

  // Step 3: format output
  const finalOutput = formatOutput(rawResponse, intent.type);

  return {
    reply: finalOutput,
    intent,
  };
}
