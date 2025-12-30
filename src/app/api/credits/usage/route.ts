import { NextResponse } from "next/server"
import { getDemoCredits } from "@/lib/credits-engine"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: "User ID missing" },
        { status: 400 }
      )
    }

    const currentCredits = await getDemoCredits(userId)

    return NextResponse.json({
      success: true,
      credits: currentCredits,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
