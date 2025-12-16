import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { STRIPE_PLANS } from "@/lib/stripe-plans";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plan, userId } = body;

    // 🔒 Basic validation
    if (!plan || !userId) {
      return NextResponse.json(
        { error: "Missing plan or userId" },
        { status: 400 }
      );
    }

    const selectedPlan = STRIPE_PLANS[plan];

    if (!selectedPlan) {
      return NextResponse.json(
        { error: "Unknown plan selected" },
        { status: 400 }
      );
    }

    // 🆓 FREE PLAN — no Stripe checkout
    if (!selectedPlan.priceId) {
      return NextResponse.json(
        { error: "This plan is free. No checkout required." },
        { status: 400 }
      );
    }

    // 💳 Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId, // webhook reads this
        plan,   // webhook maps to credits
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);

    return NextResponse.json(
      { error: "Unable to start checkout session" },
      { status: 500 }
    );
  }
}
