import { NextResponse } from "next/server";
import { generateDashboardExcel } from "@/lib/dashboard-excel-engine";
import { deductCredits } from "@/lib/credits-engine";

export async function POST(req: Request) {
  try {
    const { dashboard, userId } = await req.json();

    if (!dashboard || !userId) {
      return NextResponse.json(
        { error: "Dashboard & userId required" },
        { status: 400 }
      );
    }

    // 🔥 Deduct 1 credit
    const creditsLeft = await deductCredits(userId, 1);

    const excelBuffer = await generateDashboardExcel(dashboard);

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=dashboard.xlsx`,
        "X-Credits-Left": creditsLeft.toString(),
      },
    });
  } catch (err) {
    console.error("EXCEL ERROR:", err);
    return NextResponse.json(
      { error: "Excel generation failed" },
      { status: 500 }
    );
  }
}
