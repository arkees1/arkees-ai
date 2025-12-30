import { NextResponse } from "next/server"
import { getDemoCredits, deductCredits } from "@/lib/credits-engine"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, content } = body

    if (!userId || !content || typeof content !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid request" },
        { status: 400 }
      )
    }

    const currentCredits = await getDemoCredits(userId)

    if (currentCredits < 1) {
      return NextResponse.json(
        {
          success: false,
          error: "Not enough credits",
          credits: currentCredits,
        },
        { status: 402 }
      )
    }

    // 🔻 Deduct 1 credit (demo)
    await deductCredits(userId, 1, "csv.export")

    // 🧾 Build CSV from text (row-wise)
    const rows = content
      .split("\n")
      .map((line: string) => `"${line.replace(/"/g, '""')}"`)
      .join("\n")

    const csv = `response\n${rows}`

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=arkees-ai.csv",
        "X-Credits-Left": String(currentCredits - 1),
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "CSV generation failed" },
      { status: 500 }
    )
  }
}
