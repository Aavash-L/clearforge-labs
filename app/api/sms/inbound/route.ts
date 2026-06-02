import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import twilio from 'twilio'

// Twilio posts form-encoded data for inbound SMS
export async function POST(request: Request) {
  const body = await request.text()
  const params = new URLSearchParams(body)

  const signature = request.headers.get('x-twilio-signature') ?? ''
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/sms/inbound`

  // Validate Twilio signature
  const valid = twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN!,
    signature,
    url,
    Object.fromEntries(params.entries())
  )

  if (!valid) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const from = params.get('From') ?? ''
  const messageBody = (params.get('Body') ?? '').trim().toUpperCase()

  if (messageBody === 'STOP' || messageBody === 'UNSUBSCRIBE' || messageBody === 'CANCEL' || messageBody === 'QUIT') {
    const supabase = await createServiceClient()

    // Add to opt_outs for every business that has this number as a customer
    const { data: customers } = await supabase
      .from('customers')
      .select('business_id')
      .eq('phone', from)

    if (customers?.length) {
      const optOuts = customers.map(c => ({ business_id: c.business_id, phone: from }))
      await supabase.from('opt_outs').upsert(optOuts, { onConflict: 'business_id,phone', ignoreDuplicates: true })
    }
  }

  // Respond with empty TwiML (Twilio expects XML)
  return new NextResponse('<Response></Response>', {
    headers: { 'Content-Type': 'text/xml' },
  })
}
