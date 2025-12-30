import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY missing");
}

/**
 * IMPORTANT:
 * Stripe SDK now enforces apiVersion as a strict literal type.
 * To avoid TS breakage during upgrades, we CAST it safely.
 */

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY,
  {
    apiVersion: "2024-04-10" as Stripe.LatestApiVersion,
    typescript: true,
  }
);
