export const DEFAULT_SMS_TEMPLATE =
  "Hi {{customer_name}}, thanks for choosing {{business_name}}! How'd we do? Tap to let us know: {{link}}\nReply STOP to opt out."

export const DEFAULT_EMAIL_SUBJECT = 'How did we do, {{customer_name}}?'

export const DEFAULT_EMAIL_BODY = `<p>Hi {{customer_name}},</p>
<p>Thanks for choosing <strong>{{business_name}}</strong>! We'd love 10 seconds of your feedback.</p>
<p><a href="{{link}}" style="display:inline-block;padding:12px 24px;background:#3B82F6;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;">Leave Feedback →</a></p>
<p style="color:#6B7280;font-size:12px;margin-top:24px;">You're receiving this because you're a customer of {{business_name}}.</p>`

export function applyTemplate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (str, [key, val]) => str.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), val),
    template
  )
}
