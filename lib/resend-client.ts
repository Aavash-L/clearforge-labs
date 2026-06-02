import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

export async function sendEmail({
  to,
  subject,
  html,
  from = 'ClearForge Reviews <reviews@clearforgelabs.com>',
}: {
  to: string
  subject: string
  html: string
  from?: string
}): Promise<void> {
  await getResend().emails.send({ from, to, subject, html })
}
