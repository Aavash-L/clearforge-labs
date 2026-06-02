import { NextResponse } from 'next/server'
import { getStripe, getPlanFromPriceId } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import type Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature') ?? ''

  const stripe = getStripe()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Stripe webhook signature failed:', err)
    return new NextResponse('Bad signature', { status: 400 })
  }

  const supabase = await createServiceClient()

  async function syncSubscription(sub: Stripe.Subscription) {
    const priceId = sub.items.data[0]?.price?.id ?? ''
    const { plan, limit } = getPlanFromPriceId(priceId)

    const updates: Record<string, unknown> = {
      stripe_subscription_id: sub.id,
      subscription_status: sub.status,
      plan,
      monthly_request_limit: limit,
    }

    if (sub.status === 'active') {
      updates.requests_used_this_period = 0
    }

    await supabase.from('businesses').update(updates).eq('stripe_subscription_id', sub.id)
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const businessId = session.metadata?.business_id
      if (!businessId) break

      const updates: Record<string, unknown> = {
        stripe_customer_id: session.customer as string,
        subscription_status: 'trialing',
      }

      if (session.subscription) {
        const sub = await stripe.subscriptions.retrieve(session.subscription as string)
        const priceId = sub.items.data[0]?.price?.id ?? ''
        const { plan, limit } = getPlanFromPriceId(priceId)
        updates.stripe_subscription_id = sub.id
        updates.subscription_status = sub.status
        updates.plan = plan
        updates.monthly_request_limit = limit
      }

      await supabase.from('businesses').update(updates).eq('id', businessId)
      break
    }

    case 'customer.subscription.updated': {
      await syncSubscription(event.data.object as Stripe.Subscription)
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await supabase
        .from('businesses')
        .update({ subscription_status: 'canceled' })
        .eq('stripe_subscription_id', sub.id)
      break
    }

    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice & { subscription?: string | null }
      if (invoice.subscription) {
        await supabase
          .from('businesses')
          .update({ requests_used_this_period: 0 })
          .eq('stripe_subscription_id', invoice.subscription)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
