import { NextResponse } from "next/server";
import { checkCredits } from "@/lib/credits-engine";
import { generateAIDashboardData } from "@/lib/dashboard-ai-engine";

/**
 * ARKEES AI — Dashboard API (AI-powered)
 *
 * Flow:
 * UI → API
 * 1. Credit check
 * 2. AI dashboard generation
 * 3. Return structured DashboardData
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, credits } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing input text" },
        { status: 400 }
      );
    }

    const REQUIRED_CREDITS = 4;

    // 🔒 Credit enforcement
    checkCredits(credits, REQUIRED_CREDITS);

    // 🧠 AI Intelligence Layer
    const dashboardData = await generateAIDashboardData(text);

    return NextResponse.json({
      dashboard: dashboardData,
      usedCredits: REQUIRED_CREDITS,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || "Failed to generate AI dashboard",
      },
      { status: 500 }
    );
  }
}
