// src/app/api/analytics/pdf/download/route.ts

import { NextResponse } from "next/server";
import { generateAnalyticsPDF } from "@/lib/pdf/analytics-pdf-composer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.prompt || "Analytics Report";

    const pdfBytes = await generateAnalyticsPDF(prompt);

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=analytics.pdf",
      },
    });
  } catch (error: any) {
    console.error("❌ Analytics PDF Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate analytics PDF",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
