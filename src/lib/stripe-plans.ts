export const STRIPE_PLANS = {
  BASIC: {
    name: "Basic",
    credits: 50,
    priceId: null,
  },
  STANDARD: {
    name: "Standard",
    credits: 2500,
    priceId: "price_1Sed8jzBZvZXgaTdmo4EN1O",
  },
  PRO: {
    name: "Pro",
    credits: 10000,
    priceId: "price_PRO_ID",
  },
  PREMIUM: {
    name: "Premium",
    credits: 50000,
    priceId: "price_PREMIUM_ID",
  },
} as const;

export type StripePlanKey = keyof typeof STRIPE_PLANS;
export type StripePlan = (typeof STRIPE_PLANS)[StripePlanKey];
