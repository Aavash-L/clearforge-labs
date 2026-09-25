// How visitors reach us from the marketing site.
//
// There is no lead backend. Both forms turn what the visitor typed into a
// prefilled text message and open their messaging app; they tap send.
// We never claim a message was sent, because only the visitor can send it.

export const TEXT_NUMBER_DISPLAY = '(732) 734-9618'
export const TEXT_NUMBER_E164 = '+17327349618'

/** sms: link with a prefilled body. The `?&body=` form works on both iOS and Android. */
export function smsHref(body?: string) {
  return body
    ? `sms:${TEXT_NUMBER_E164}?&body=${encodeURIComponent(body)}`
    : `sms:${TEXT_NUMBER_E164}`
}

// The Google Calendar booking page the site already used for calls.
export const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1fXnsNiypWIUeTE3Mgtm6PPUYxWCtW_E3NiN8wQv0kAiCSaU7zGJUTfhePcfJMdFuqbZKwGNKE?gv=true'

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
