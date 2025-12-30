import { NextResponse } from "next/server"
import { getUsageHistory } from "@/lib/usageHistory"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID missing" },
        { status: 400 }
      )
    }

    const usage = await getUsageHistory(userId)

    return NextResponse.json({
      success: true,
      userId,
      totalActions: usage.length,
      usage,
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
