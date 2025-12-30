import { NextResponse } from "next/server";
import { deductCredits } from "@/lib/credits-engine";

export async function POST(req: Request) {
  try {
    const { userId = "demo-user" } = await req.json();

    deductCredits(userId, 1, "ppt.generate");

    return NextResponse.json({
      success: true,
      message: "PPT generation started",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Insufficient credits" },
      { status: 402 }
    );
  }
}
