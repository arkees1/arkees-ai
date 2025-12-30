import { NextResponse } from "next/server";
import { generateAIDashboardData } from "@/lib/dashboard-ai-engine";
import { deductCredits, getCredits } from "@/lib/credits-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = body.prompt;
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt required" },
        { status: 400 }
      );
    }

    // 🔒 DEMO MODE (LOCKED)
    const userId = "demo-user";
    const preset = "dashboard";

    const creditsLeft = await getCredits(userId);
    if (creditsLeft < 1) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 402 }
      );
    }

    const dashboard = await generateAIDashboardData(prompt);

    await deductCredits(userId, 1);

    return NextResponse.json({
      success: true,
      preset,
      creditsLeft: creditsLeft - 1,
      dashboard,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Dashboard generation failed" },
      { status: 500 }
    );
  }
}
