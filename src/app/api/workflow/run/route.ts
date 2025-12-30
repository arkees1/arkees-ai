import { NextResponse } from "next/server";
import { deductCredits } from "@/lib/credits-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, steps } = body;

    if (!userId || !steps) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔐 Deduct credits for workflow run
    deductCredits(userId, 1, "workflow.run");

    return NextResponse.json({
      success: true,
      message: "Workflow executed",
    });
  } catch (err) {
    console.error("[WORKFLOW RUN ERROR]", err);
    return NextResponse.json(
      { error: "Workflow failed" },
      { status: 500 }
    );
  }
}
