export const STRIPE_PLANS = {
  BASIC: {
    name: "Basic",
    credits: 50,
    priceId: null, // FREE plan – no Stripe checkout
  },

  STANDARD: {
    name: "Standard",
    credits: 2500,
    priceId: "price_1Sed8jJzBzvZXgaTdmo4EN1O",
  },

  PRO: {
    name: "Pro",
    credits: 5000,
    priceId: "price_1SedEmJzBzvZXgaT9CBAfMvI",
  },

  PREMIUM: {
    name: "Premium",
    credits: 20000,
    priceId: "price_1SedKHJzBzvZXgaTQLMPi62K",
  },
} as const;
