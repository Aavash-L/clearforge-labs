import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe, PLANS } from '@/lib/stripe'
import type { PlanKey } from '@/lib/stripe'
import type Stripe from 'stripe'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const plan = (searchParams.get('plan') ?? 'starter') as PlanKey
  const interval = searchParams.get('interval') === 'annual' ? 'annual' : 'monthly'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/app/login', request.url))

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, businesses(*)')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.redirect(new URL('/app/login', request.url))

  const business = profile.businesses!
  const planConfig = PLANS[plan]
  const priceId = interval === 'annual' ? planConfig.price_id_annual : planConfig.price_id_monthly

  const stripe = getStripe()

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/settings?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/settings`,
    metadata: { business_id: business.id, plan, interval },
    subscription_data: { trial_period_days: 14 },
    customer_email: user.email,
  }

  if ((business as { stripe_customer_id: string | null }).stripe_customer_id) {
    sessionParams.customer = (business as { stripe_customer_id: string }).stripe_customer_id
    delete sessionParams.customer_email
  }

  const session = await stripe.checkout.sessions.create(sessionParams)
  return NextResponse.redirect(session.url!)
}
