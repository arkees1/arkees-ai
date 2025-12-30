export type InsightLevel = "info" | "warning" | "critical";

export type AdminInsight = {
  type: InsightLevel;
  message: string;
};

type DailyUsage = {
  labels: string[];
  data: number[];
};

type AnalyticsInput = {
  kpis: {
    label: string;
    value: number;
  }[];
  charts: {
    dailyCreditsUsage?: DailyUsage;
  };
};

/**
 * 🧠 Single Source of Truth
 * Generates admin insights based on analytics data
 * Used by:
 * - Admin Dashboard
 * - CSV Export
 * - PDF Export
 * - Future Automation / Alerts
 */
export function generateAdminInsights(
  analytics: AnalyticsInput
): AdminInsight[] {
  const insights: AdminInsight[] = [];

  const creditsUsed =
    analytics.kpis.find((k) => k.label === "Credits Used")?.value ?? 0;

  const daily = analytics.charts?.dailyCreditsUsage;

  // 🔴 High credit usage check
  if (creditsUsed > 300) {
    insights.push({
      type: "warning",
      message: "High credit consumption detected. Monitor usage closely.",
    });
  } else {
    insights.push({
      type: "info",
      message: "Credit usage is within acceptable limits.",
    });
  }

  // 📊 Daily usage analysis
  if (daily && daily.data.length > 0) {
    const max = Math.max(...daily.data);
    const min = Math.min(...daily.data);

    const maxDay = daily.labels[daily.data.indexOf(max)];
    const minDay = daily.labels[daily.data.indexOf(min)];

    insights.push({
      type: "info",
      message: `Peak credit usage observed on ${maxDay}.`,
    });

    insights.push({
      type: "info",
      message: `Lowest platform activity recorded on ${minDay}.`,
    });

    if (max - min >= 8) {
      insights.push({
        type: "warning",
        message:
          "Large fluctuation in daily usage detected. User behavior is uneven.",
      });
    }
  } else {
    insights.push({
      type: "info",
      message: "Daily usage data not available for analysis.",
    });
  }

  return insights;
}
