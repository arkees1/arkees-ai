import { NextResponse } from "next/server"
import { deductCredits } from "@/lib/credits-engine"

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json(
        { error: "User ID missing" },
        { status: 400 }
      )
    }

    await deductCredits(userId, 1);

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
