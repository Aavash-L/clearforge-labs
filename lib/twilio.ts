import twilio from 'twilio'

export const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function sendSMS(to: string, body: string): Promise<void> {
  await twilioClient.messages.create({
    body,
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID!,
    to,
  })
}
