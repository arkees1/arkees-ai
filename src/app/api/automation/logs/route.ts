import { NextResponse } from "next/server";
import { getAutomationLogs } from "@/lib/automation-store";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const logs = getAutomationLogs(userId);

    return NextResponse.json({
      logs,
    });
  } catch (err) {
    console.error("[AUTOMATION_LOGS_ERROR]", err);
    return NextResponse.json(
      { logs: [] },
      { status: 200 }
    );
  }
}
