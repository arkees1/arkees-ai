// src/app/api/stripe/webhook/route.ts

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { grantCredits } from "@/lib/credit-engine";
import { STRIPE_PLANS } from "@/lib/stripe-plans";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Stripe webhook signature failed:", err.message);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.userId;
        const planKey = session.metadata?.plan as keyof typeof STRIPE_PLANS;

        if (!userId || !planKey) {
          console.error("❌ Missing metadata in session");
          break;
        }

        const plan = STRIPE_PLANS[planKey];
        if (!plan) {
          console.error("❌ Invalid plan:", planKey);
          break;
        }

        // 🔥 IMPORTANT FIX — await
        const result = await grantCredits(userId, plan.credits);

        console.log(
          `✅ Credits granted: user=${userId}, plan=${planKey}, credits=${plan.credits}`
        );

        return NextResponse.json({
          success: true,
          granted: plan.credits,
          totalCredits: result.totalCredits,
        });
      }

      default:
        console.log(`ℹ️ Unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error("❌ Webhook handling failed:", err);
    return NextResponse.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
