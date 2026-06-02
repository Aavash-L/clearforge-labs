import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/resend-client'

export async function POST(request: Request) {
  const { token, rating, comment } = await request.json()

  if (!token || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: reviewRequest } = await supabase
    .from('review_requests')
    .select('*, businesses(name, google_review_url), customers(name, email)')
    .eq('token', token)
    .single()

  if (!reviewRequest) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 404 })
  }

  // Update request with rating and mark responded
  await supabase
    .from('review_requests')
    .update({
      rating,
      status: 'completed',
      responded_at: new Date().toISOString(),
    })
    .eq('token', token)

  // For low ratings, save private feedback and notify owner
  if (rating <= 3 && comment) {
    await supabase.from('feedback').insert({
      business_id: reviewRequest.business_id,
      request_id: reviewRequest.id,
      rating,
      comment,
    })

    // Email the business owner
    try {
      const business = reviewRequest.businesses as { name: string }
      const customer = reviewRequest.customers as { name: string; email: string | null }

      // Get owner email
      const { data: ownerProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('business_id', reviewRequest.business_id)
        .eq('role', 'owner')
        .single()

      if (ownerProfile) {
        const { data: ownerUser } = await supabase.auth.admin.getUserById(ownerProfile.id)
        const ownerEmail = ownerUser?.user?.email

        if (ownerEmail) {
          await sendEmail({
            to: ownerEmail,
            subject: `New private feedback — ${rating}★ from ${customer.name}`,
            html: `
              <p><strong>${customer.name}</strong> left a <strong>${rating}-star</strong> private review for ${business.name}.</p>
              <blockquote style="border-left:3px solid #E5E7EB;padding-left:12px;color:#374151;">${comment}</blockquote>
              <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/app/dashboard">View in dashboard →</a></p>
            `,
          })
        }
      }
    } catch (err) {
      console.error('Owner notification failed:', err)
    }
  }

  return NextResponse.json({ success: true })
}
