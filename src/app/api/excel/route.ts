import { NextResponse } from "next/server";
import { deductCredits } from "@/lib/credits-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    // 🔐 Deduct credits for excel export
    deductCredits(userId, 1);

    return NextResponse.json({
      success: true,
      message: "Excel generated",
    });
  } catch (err) {
    console.error("[EXCEL ERROR]", err);
    return NextResponse.json(
      { error: "Excel generation failed" },
      { status: 500 }
    );
  }
}
