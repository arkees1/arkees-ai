// src/app/api/automation/schedule/route.ts

import { NextResponse } from "next/server";
import { addSchedule } from "@/automations/automation-scheduler";

export async function POST(req: Request) {
  try {
    const { userId, presetKey, prompt, frequency } =
      await req.json();

    if (!userId || !presetKey || !prompt || !frequency) {
      return NextResponse.json(
        { error: "userId, presetKey, prompt, frequency required" },
        { status: 400 }
      );
    }

    addSchedule({
      id: crypto.randomUUID(),
      userId,
      presetKey,
      prompt,
      frequency,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SCHEDULE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create schedule" },
      { status: 500 }
    );
  }
}
