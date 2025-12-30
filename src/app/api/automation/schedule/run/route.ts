import { NextResponse } from "next/server"
import { runScheduledAutomation } from "@/automations/automation-scheduler-runner"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, preset } = body

    if (!userId || !preset) {
      return NextResponse.json(
        { success: false, error: "userId and preset required" },
        { status: 400 }
      )
    }

    const result = await runScheduledAutomation({ userId, preset })

    return NextResponse.json({
      success: true,
      result,
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
