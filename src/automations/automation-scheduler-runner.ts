import { runAutomation } from "./automation-engine"
import { AUTOMATION_PRESETS, AutomationPresetKey } from "./automation-presets"

type AutomationSchedule = {
  userId: string
  preset: AutomationPresetKey
  email?: string
}

export async function runScheduledAutomation(
  schedule: AutomationSchedule
) {
  const { userId, preset } = schedule

  if (!userId || !preset) {
    return { success: false, error: "Invalid schedule" }
  }

  const steps = AUTOMATION_PRESETS[preset]
  const result = await runAutomation(userId, steps)

  return {
    success: true,
    result,
  }
}
