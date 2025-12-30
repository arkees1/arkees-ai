import { NextResponse } from "next/server";
import { deductCredits } from "@/lib/credits-engine"; // ✅ correct
import { generateDashboardPDF } from "@/lib/dashboard-pdf-engine"; // ✅ correct

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, dashboard } = body;

    if (!userId || !dashboard) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 💳 PDF generation costs 2 credits
    const ok = deductCredits(userId, 2);

    if (!ok) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 402 }
      );
    }

    const pdfBytes = await generateDashboardPDF(dashboard);

    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="arkees-dashboard.pdf"`,
      },
    });
  } catch (err) {
    console.error("[DASHBOARD PDF ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
