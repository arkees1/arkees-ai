type KPI = {
  label: string;
  value: number;
};

type DailyUsage = {
  labels: string[]; // e.g. ["Mon", "Tue", "Wed"]
  data: number[];   // e.g. [12, 18, 6]
};

type AnalyticsPayload = {
  kpis: KPI[];
  charts: {
    dailyCreditsUsage: DailyUsage;
  };
};

export type AdminInsight = {
  type: "info" | "warning" | "positive";
  message: string;
};

export function generateAdminInsights(
  analytics: AnalyticsPayload
): AdminInsight[] {
  const insights: AdminInsight[] = [];

  /* ---------------- KPI INSIGHTS ---------------- */

  const totalCredits = analytics.kpis.find(
    (k) => k.label.toLowerCase().includes("used")
  )?.value;

  if (typeof totalCredits === "number") {
    if (totalCredits > 300) {
      insights.push({
        type: "warning",
        message: "High credit consumption detected. Monitor usage closely.",
      });
    } else {
      insights.push({
        type: "positive",
        message: "Credit usage is within a healthy range.",
      });
    }
  }

  /* ---------------- TREND INSIGHTS ---------------- */

  const { labels, data } = analytics.charts.dailyCreditsUsage;

  if (labels.length && data.length && labels.length === data.length) {
    const max = Math.max(...data);
    const min = Math.min(...data);

    const peakDay = labels[data.indexOf(max)];
    const lowDay = labels[data.indexOf(min)];

    insights.push({
      type: "info",
      message: `Peak credit usage observed on ${peakDay}.`,
    });

    insights.push({
      type: "info",
      message: `Lowest platform activity recorded on ${lowDay}.`,
    });

    if (max - min > 10) {
      insights.push({
        type: "warning",
        message:
          "Large fluctuation in daily usage detected. User behavior is uneven.",
      });
    }
  }

  /* ---------------- FALLBACK ---------------- */

  if (insights.length === 0) {
    insights.push({
      type: "info",
      message: "No significant insights available for the selected period.",
    });
  }

  return insights;
}
