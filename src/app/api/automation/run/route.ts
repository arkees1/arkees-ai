// /app/api/automation/run/route.ts
// Automation execution endpoint
// Phase-1: Credit guard wired (SAFE, no behavior change)

import { NextResponse } from "next/server";
import { canConsumeCredits } from "@/lib/credit-guard";
import { getCredits, deductCredits } from "@/lib/userCredits";

type RunBody = {
  userId: string;
  prompt: string;
  presetKey: "dashboard_pack" | "report_pack" | "enterprise_pack";
};

const COST: Record<RunBody["presetKey"], number> = {
  dashboard_pack: 1,
  report_pack: 2,
  enterprise_pack: 3,
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RunBody;
    const { userId, prompt, presetKey } = body;

    if (!userId || !prompt || !presetKey) {
      return NextResponse.json(
        { error: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    const creditsRequired = COST[presetKey];
    const creditsAvailable = await getCredits(userId);

    // 🔒 PHASE-1 GUARD (non-breaking)
    const guard = canConsumeCredits(
      userId,
      creditsRequired,
      creditsAvailable
    );

    if (!guard.ok) {
      return NextResponse.json(
        { error: guard.reason },
        { status: 403 }
      );
    }

    // ✅ Deduct credits (existing behavior)
    await deductCredits(userId, creditsRequired);

    // ⚙️ Execute automation (placeholder / existing logic)
    // (Your current automation logic runs here)
    // ---------------------------------------------------

    return NextResponse.json({
      ok: true,
      used: creditsRequired,
      presetKey,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "RUN_FAILED" },
      { status: 500 }
    );
  }
}
