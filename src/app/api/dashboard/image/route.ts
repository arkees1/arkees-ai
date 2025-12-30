import { NextResponse } from "next/server"
import { buildDashboardData } from "@/lib/dashboard-export"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages } = body

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { success: false, error: "Messages must be an array" },
        { status: 400 }
      )
    }

    // 🔁 Convert messages array → string (same as dashboard/data)
    const combinedPrompt = messages
      .map((m: any) => `${m.role || "user"}: ${m.content}`)
      .join("\n")

    const data = buildDashboardData(combinedPrompt)

    // 🖼️ Image generation placeholder
    return NextResponse.json({
      success: true,
      data,
      width: 1400,
      height: 900,
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
