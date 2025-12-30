import { checkCredits, consumeCredits } from "@/lib/credits-engine";

const COST: Record<string, number> = {
  dashboard_pack: 1,
  report_pack: 2,
  enterprise_pack: 3,
};

export async function runAutomation(
  userId: string,
  presetKey: string,
  prompt: string
) {
  if (!userId) throw new Error("User ID missing");
  if (!presetKey) throw new Error("Preset missing");

  const cost = COST[presetKey];
  if (!cost) throw new Error("Unknown preset");

  const allowed = await checkCredits(userId, cost);
  if (!allowed) {
    throw new Error("Insufficient credits");
  }

  await consumeCredits(userId, cost);

  // 🚀 mock execution (real engines already exist)
  return {
    title: "Automation Result",
    preset: presetKey,
    prompt,
    status: "success",
  };
}
