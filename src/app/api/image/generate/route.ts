import { NextResponse } from "next/server";
import { hasCredits, deductCredits } from "@/lib/credit-store";

export const runtime = "nodejs";

const DEMO_USER_ID = "demo-user";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt missing" },
        { status: 400 }
      );
    }

    if (!hasCredits(DEMO_USER_ID, 1)) {
      return NextResponse.json(
        { error: "Not enough credits" },
        { status: 402 }
      );
    }

    // ✅ LOCAL MOCK IMAGE
    const imageUrl = "/sample.png";

    // ✅ deduct AFTER successful generation
    deductCredits(DEMO_USER_ID, 1);

    return NextResponse.json({
      imageUrl,
      creditsLeft: true,
    });
  } catch (err) {
    console.error("IMAGE ERROR:", err);
    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}
