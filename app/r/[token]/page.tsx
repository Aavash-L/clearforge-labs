import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import FeedbackFlow from './components/feedback-flow'

interface Props {
  params: Promise<{ token: string }>
}

export default async function FeedbackPage({ params }: Props) {
  const { token } = await params
  const supabase = await createServiceClient()

  const { data: request } = await supabase
    .from('review_requests')
    .select('*, customers(name), businesses(name, google_review_url, logo_url, brand_color)')
    .eq('token', token)
    .single()

  if (!request) notFound()

  // Mark as opened if still in sent/queued state
  if (request.status === 'sent' || request.status === 'queued') {
    await supabase
      .from('review_requests')
      .update({ status: 'opened' })
      .eq('token', token)
  }

  const business = request.businesses as { name: string; google_review_url: string; logo_url: string | null; brand_color: string }
  const customer = request.customers as { name: string }
  const alreadyResponded = request.status === 'completed' || request.status === 'rated'

  return (
    <FeedbackFlow
      token={token}
      customerName={customer?.name ?? 'there'}
      businessName={business.name}
      businessColor={business.brand_color}
      businessLogoUrl={business.logo_url}
      googleReviewUrl={business.google_review_url}
      alreadyResponded={alreadyResponded}
    />
  )
}
