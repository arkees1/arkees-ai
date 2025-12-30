import { NextResponse } from "next/server";
import { addSchedule } from "@/lib/scheduler-store";

export async function POST(req: Request) {
  const {
    userId = "demo-user",
    workflowType,
    prompt,
    frequency,
  } = await req.json();

  if (!workflowType || !prompt || !frequency) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const scheduled = addSchedule({
    userId,
    workflowType,
    prompt,
    frequency,
  });

  return NextResponse.json({ success: true, scheduled });
}
