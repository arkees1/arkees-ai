import { NextResponse } from "next/server";
import { addSchedule } from "@/automations/automation-scheduler";

export async function POST(req: Request) {
  try {
    const {
      userId,
      presetKey,
      prompt,
      frequency,
      email,
    } = await req.json();

    if (
      !userId ||
      !presetKey ||
      !prompt ||
      !frequency ||
      !email
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    addSchedule({
      id: crypto.randomUUID(),
      userId,
      presetKey,
      prompt,
      frequency,
      email,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("EMAIL SCHEDULE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create email schedule" },
      { status: 500 }
    );
  }
}
