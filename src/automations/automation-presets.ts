import { AutomationStep } from "./automation-engine"

export type AutomationPresetKey =
  | "dashboard_pack"
  | "content_creator"
  | "report_generator"

export const AUTOMATION_PRESETS: Record<
  AutomationPresetKey,
  AutomationStep[]
> = {
  dashboard_pack: [
    { id: "dash", type: "dashboard", cost: 2 },
    { id: "pdf", type: "pdf", cost: 1 },
    { id: "image", type: "image", cost: 1 },
  ],

  content_creator: [
    { id: "chat", type: "chat", cost: 1 },
    { id: "csv", type: "csv", cost: 1 },
  ],

  report_generator: [
    { id: "pdf", type: "pdf", cost: 2 },
    { id: "ppt", type: "ppt", cost: 2 },
  ],
}
