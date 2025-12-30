// src/app/api/video/generate/route.ts

import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * VIDEO GENERATION – EARLY ACCESS (SAFE STUB)
 * ------------------------------------------
 * This API intentionally does NOT generate a real video yet.
 * It confirms wiring, validates prompt, and returns a
 * structured response that the UI can trust.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required for video generation" },
        { status: 400 }
      );
    }

    // 🔒 Early-access stub response
    return NextResponse.json({
      status: "queued",
      message:
        "Video generation is in early access. Your request has been queued.",
      data: {
        prompt,
        estimatedTime: "Coming Soon",
        format: "mp4",
        resolution: "1080p",
      },
    });
  } catch (err) {
    console.error("Video API error:", err);
    return NextResponse.json(
      { error: "Video generation failed" },
      { status: 500 }
    );
  }
}
