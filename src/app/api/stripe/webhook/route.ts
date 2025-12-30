import { NextResponse } from "next/server"
import { grantCredits } from "@/lib/credits-engine"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const userId = body?.userId
    const credits = body?.credits || 0

    if (!userId || credits <= 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    await grantCredits(userId, credits, "stripe")

    return NextResponse.json({ received: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
