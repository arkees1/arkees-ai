import { NextResponse } from "next/server";
import { generateDashboardCSV } from "@/lib/csv-engine";
import { deductCredits } from "@/lib/credits-engine";

export async function POST(req: Request) {
  try {
    const { dashboard, userId } = await req.json();

    if (!dashboard || !userId) {
      return NextResponse.json(
        { error: "dashboard & userId required" },
        { status: 400 }
      );
    }

    // 🔥 1 CREDIT ONLY
    await deductCredits(userId, 1);

    const csv = generateDashboardCSV(dashboard);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=dashboard.csv",
      },
    });
  } catch (err) {
    console.error("CSV ERROR:", err);
    return NextResponse.json(
      { error: "CSV generation failed" },
      { status: 500 }
    );
  }
}
