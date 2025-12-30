import { NextResponse } from "next/server";
import {
  getSchedules,
  shouldRunNow,
  markRan,
} from "@/lib/scheduler-store";

export async function GET() {
  const now = Date.now();
  const schedules = getSchedules();
  const ran: string[] = [];

  for (const s of schedules) {
    if (!shouldRunNow(s, now)) continue;

    // 🔁 Reuse workflow runner via internal fetch
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/workflow/run`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: s.userId,
          workflowType: s.workflowType,
          prompt: s.prompt,
        }),
      }
    );

    markRan(s.id);
    ran.push(s.id);
  }

  return NextResponse.json({ success: true, ran });
}
