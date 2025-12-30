export type KPI = {
  label: string;
  value: string | number;
};

export type InsightBlock = {
  section: string;
  points: string[];
};

export type TableColumn = {
  key: string;
  label: string;
};

export type TableRow = Record<string, string | number>;

export type DashboardData = {
  title: string;
  subtitle?: string;
  kpis: KPI[];
  insights: InsightBlock[];
  table?: {
    columns: TableColumn[];
    rows: TableRow[];
  };
};

/**
 * Core dashboard builder
 */
export function buildDashboardData(messages: any[]): DashboardData {
  return {
    title: "AI Generated Dashboard",
    subtitle: "ARKEES AI",
    kpis: [
      { label: "Messages", value: messages.length },
      { label: "Status", value: "OK" },
    ],
    insights: [
      {
        section: "Summary",
        points: [
          `Total messages analyzed: ${messages.length}`,
          "Dashboard generated successfully",
        ],
      },
    ],
    table: {
      columns: [
        { key: "index", label: "#" },
        { key: "content", label: "Content" },
      ],
      rows: messages.map((m, i) => ({
        index: i + 1,
        content: typeof m === "string" ? m : JSON.stringify(m),
      })),
    },
  };
}

/**
 * 🔒 Public API alias
 */
export const generateDashboardData = buildDashboardData;
