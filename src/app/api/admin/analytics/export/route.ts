import { NextResponse } from "next/server";

/**
 * Phase 4.3 Step 2
 * CSV Export for Analytics
 */

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  // 🔒 MOCK DATA (same as analytics for now)
  const rows = [
    ["Metric", "Value"],
    ["Total Users", "120"],
    ["Active Users", "28"],
    ["Credits Used", "340"],
    ["Credits Remaining", "860"],
    ["Range Start", startDate || "N/A"],
    ["Range End", endDate || "N/A"],
  ];

  const csvContent = rows.map((r) => r.join(",")).join("\n");

  return new Response(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="analytics.csv"`,
    },
  });
}
