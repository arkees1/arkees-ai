import { NextResponse } from "next/server";
import { getSchedules } from "@/automations/automation-scheduler";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId required" },
      { status: 400 }
    );
  }

  const schedules = getSchedules(userId);

  return NextResponse.json({ schedules });
}
