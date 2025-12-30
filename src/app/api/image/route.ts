import { NextResponse } from "next/server";
import { deductCredits } from "@/lib/credits-engine";

export async function POST(req: Request) {
  try {
    const { userId = "demo-user" } = await req.json();

    deductCredits(userId, 1);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 402 }
    );
  }
}
