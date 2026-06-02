# ClearForge Reviews

AI-powered review generation SaaS for local service businesses. Texts or emails customers after a job, routes happy ones to Google Reviews, and privately captures unhappy feedback before it becomes a 1-star.

Lives at `/app/*` within the clearforgelabs.com codebase. Marketing site at `/` is untouched.

---

## Environment variables

Create a `.env.local` file with the following. All are required for the SaaS to function.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_STARTER_MONTHLY=
STRIPE_PRICE_STARTER_ANNUAL=
STRIPE_PRICE_PRO_MONTHLY=
STRIPE_PRICE_PRO_ANNUAL=
STRIPE_PRICE_UNLIMITED_MONTHLY=
STRIPE_PRICE_UNLIMITED_ANNUAL=
STRIPE_PRICE_SETUP_FEE=      # optional one-time fee price ID

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_MESSAGING_SERVICE_SID=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://clearforgelabs.com
```

---

## Supabase setup

1. Create a new Supabase project at supabase.com.
2. Run the migration: paste `supabase/migrations/001_initial.sql` into the Supabase SQL editor.
3. Copy `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Project Settings → API.
4. Copy `SUPABASE_SERVICE_ROLE_KEY` from the same page (server-only — never expose to the browser).

---

## Stripe setup

1. Create three products in Stripe Dashboard:
   - **ClearForge Reviews — Starter** ($49/mo, $490/yr)
   - **ClearForge Reviews — Pro** ($99/mo, $990/yr)
   - **ClearForge Reviews — Unlimited** ($149/mo, $1,490/yr)
2. Copy each price ID into the env vars above.
3. Enable the **Customer Portal** in Stripe Dashboard → Billing → Customer portal.
4. Set up the Stripe webhook endpoint: `https://clearforgelabs.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`
5. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

---

## Twilio setup

1. Create a Messaging Service in Twilio Console → Messaging → Services.
2. Add a phone number to the service.
3. Set the **inbound webhook URL** to: `https://clearforgelabs.com/api/sms/inbound`
4. Copy the Messaging Service SID into `TWILIO_MESSAGING_SERVICE_SID`.

### ⚠️ A2P 10DLC registration required before going live

US carriers require brand and campaign registration before sending SMS at any real volume. Without it, messages will be filtered or blocked.

**You must complete A2P 10DLC registration** in Twilio Console → Messaging → Regulatory Compliance before launching SMS to real customers. Register under the ClearForge brand and create a campaign for the shared Messaging Service. Approval typically takes 1–5 business days.

---

## Resend setup

1. Create an account at resend.com and verify your sending domain (`clearforgelabs.com`).
2. Create an API key and add it to `RESEND_API_KEY`.
3. Emails send from `reviews@clearforgelabs.com` (configurable in `lib/resend-client.ts`).

---

## Creating a super-admin account

After signup, set a user's role in Supabase:

```sql
UPDATE profiles SET role = 'admin' WHERE id = '<user-uuid>';
```

Admin users see the `/app/admin` panel with all business accounts.

---

## Routes

| Path | Description |
|------|-------------|
| `/` | Marketing site (unchanged) |
| `/app/login` | Sign in |
| `/app/signup` | Sign up — creates business + 14-day trial |
| `/app/dashboard` | Stats, rating trend chart, feedback inbox |
| `/app/customers` | Manage customers, send review requests |
| `/app/settings` | Business settings, templates, billing |
| `/app/admin` | Super-admin view (role=admin only) |
| `/r/[token]` | Public feedback page (no auth, mobile-first) |
| `/api/stripe/webhook` | Stripe event handler |
| `/api/sms/inbound` | Twilio STOP handling |
| `/api/requests/send` | Send SMS/email review request |
| `/api/feedback` | Submit customer feedback |

---

## Compliance

- **TCPA:** Only customers with explicit consent can be contacted. Every SMS includes an opt-out line. STOP replies are processed and block future sends to that number.
- **Review gating:** `/r/[token]` always shows a public Google review link even to 1–3 star customers. This keeps the product compliant with Google's review policies and FTC guidelines. Private capture is supplemental, not a gate.
- **Data:** Only name, contact info, and feedback are stored. No PII is logged.
