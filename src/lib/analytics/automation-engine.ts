/**
 * ARKEES AI — Analytics Automation Engine
 * Phase 3.3.1
 *
 * Responsibility:
 * - Consume analytics insights
 * - Classify severity
 * - Decide automation actions
 * - Return machine-readable automation plan
 *
 * NO UI
 * NO API
 * PURE BUSINESS LOGIC
 */

export type Insight = {
  type: "info" | "warning" | "critical";
  message: string;
};

export type AutomationAction = {
  level: "low" | "medium" | "high";
  action: string;
  reason: string;
};

export type AutomationResult = {
  summary: {
    totalInsights: number;
    highRiskCount: number;
    mediumRiskCount: number;
  };
  actions: AutomationAction[];
};

export function runAutomationEngine(
  insights: Insight[]
): AutomationResult {
  const actions: AutomationAction[] = [];

  let highRiskCount = 0;
  let mediumRiskCount = 0;

  for (const insight of insights) {
    switch (insight.type) {
      case "critical":
        highRiskCount++;
        actions.push({
          level: "high",
          action: "IMMEDIATE_ALERT",
          reason: insight.message,
        });
        break;

      case "warning":
        mediumRiskCount++;
        actions.push({
          level: "medium",
          action: "MONITOR_AND_NOTIFY",
          reason: insight.message,
        });
        break;

      case "info":
        actions.push({
          level: "low",
          action: "LOG_ONLY",
          reason: insight.message,
        });
        break;
    }
  }

  return {
    summary: {
      totalInsights: insights.length,
      highRiskCount,
      mediumRiskCount,
    },
    actions,
  };
}
