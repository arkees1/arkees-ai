import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Admin Video Queue API
 * STEP 5.3 — SAFE SOFT MODE
 *
 * NOTE:
 * - No real video files yet
 * - No DB dependency yet
 * - This endpoint exists to support Admin visibility
 */
export async function GET() {
  try {
    // 🔒 Soft-mode in-memory mock data
    const jobs = [
      {
        id: "vid_170000000001",
        userId: "demo-user",
        prompt: "A cinematic sunrise over mountains",
        status: "queued",
        createdAt: new Date().toISOString(),
      },
      {
        id: "vid_170000000002",
        userId: "demo-user",
        prompt: "Futuristic city at night with flying cars",
        status: "processing",
        createdAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      status: "ok",
      jobs,
      note:
        "Soft video mode: jobs are queued for early access. No videos generated yet.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: "Failed to load video queue" },
      { status: 500 }
    );
  }
}
