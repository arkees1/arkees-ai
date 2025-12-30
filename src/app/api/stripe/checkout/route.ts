import { NextResponse } from "next/server"
import { STRIPE_PLANS, StripePlanKey } from "@/lib/stripe-plans"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { plan } = body

    if (!plan || typeof plan !== "string") {
      return NextResponse.json(
        { success: false, error: "Plan is required" },
        { status: 400 }
      )
    }

    if (!(plan in STRIPE_PLANS)) {
      return NextResponse.json(
        { success: false, error: "Invalid plan" },
        { status: 400 }
      )
    }

    const planKey = plan as StripePlanKey
    const selectedPlan = STRIPE_PLANS[planKey]

    return NextResponse.json({
      success: true,
      plan: selectedPlan.name,
      credits: selectedPlan.credits,
      priceId: selectedPlan.priceId,
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
