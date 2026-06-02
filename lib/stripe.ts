import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })
  }
  return _stripe
}

// Re-export so callers can use named `stripe` if they want
export { getStripe as stripe }

export const PLANS = {
  starter: {
    name: 'Starter',
    monthly_cents: 4900,
    annual_cents: 49000,
    limit: 100,
    price_id_monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY ?? '',
    price_id_annual: process.env.STRIPE_PRICE_STARTER_ANNUAL ?? '',
  },
  pro: {
    name: 'Pro',
    monthly_cents: 9900,
    annual_cents: 99000,
    limit: 500,
    price_id_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY ?? '',
    price_id_annual: process.env.STRIPE_PRICE_PRO_ANNUAL ?? '',
  },
  unlimited: {
    name: 'Unlimited',
    monthly_cents: 14900,
    annual_cents: 149000,
    limit: -1,
    price_id_monthly: process.env.STRIPE_PRICE_UNLIMITED_MONTHLY ?? '',
    price_id_annual: process.env.STRIPE_PRICE_UNLIMITED_ANNUAL ?? '',
  },
} as const

export type PlanKey = keyof typeof PLANS

export function getPlanFromPriceId(priceId: string): { plan: PlanKey; limit: number } {
  for (const [key, val] of Object.entries(PLANS)) {
    if (val.price_id_monthly === priceId || val.price_id_annual === priceId) {
      return { plan: key as PlanKey, limit: val.limit }
    }
  }
  return { plan: 'starter', limit: 100 }
}
