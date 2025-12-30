import { NextResponse } from "next/server";
import { deductCredits } from "@/lib/credits-engine"; // ✅ FIXED
import { runIntentEngine } from "@/lib/intent-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, message } = body;

    if (!userId || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 💳 Chat costs 1 credit
    const ok = deductCredits(userId, 1);

    if (!ok) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 402 }
      );
    }

    const result = await runIntentEngine(message);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error("[CHAT API ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
