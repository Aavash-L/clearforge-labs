// app/contact/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Calendar, Mail, MessageSquare, MapPin, Clock } from 'lucide-react'
import type { Metadata } from 'next'

const SITE_URL = 'https://clearforgelabs.com'

export const metadata: Metadata = {
  title: 'Contact | Clearforge Labs',
  description:
    'Contact Clearforge Labs to discuss your project. Book a free 15-minute strategy call or send your details — response within 24 hours on business days.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | Clearforge Labs',
    description: 'Book a free strategy call or send your details. Founder-led, NJ-based, serving NYC + nationwide.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Clearforge Labs',
    description: 'Book a free strategy call or send your details. Founder-led, NJ-based, serving NYC + nationwide.',
    images: ['/og.png'],
  },
}

// ✅ Formspree endpoint (LIVE)
const FORM_ACTION = 'https://formspree.io/f/mojndezo'

// ✅ Google Calendar booking iframe URL
const BOOKING_IFRAME_SRC =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1fXnsNiypWIUeTE3Mgtm6PPUYxWCtW_E3NiN8wQv0kAiCSaU7zGJUTfhePcfJMdFuqbZKwGNKE?gv=true'

// ✅ Contact page schema (SEO)
const CONTACT_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#contactpage`,
      url: `${SITE_URL}/contact`,
      name: 'Contact Clearforge Labs',
      description:
        'Book a free strategy call or send your project details. Founder-led websites, booking systems, and Stripe deposit/payment flows.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Clearforge Labs',
      },
      about: {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#business`,
        name: 'Clearforge Labs',
        url: SITE_URL,
        telephone: '+1-732-734-9618',
        email: 'hello@clearforgelabs.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Edison',
          addressRegion: 'NJ',
          addressCountry: 'US',
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'New Jersey' },
          { '@type': 'City', name: 'New York City' },
          { '@type': 'AdministrativeArea', name: 'New York' },
          { '@type': 'Country', name: 'United States' },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
      ],
    },
  ],
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* SEO: ContactPage schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_PAGE_SCHEMA) }} />

        {/* Header */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-xl mb-6">Let&apos;s Talk About Your Project</h1>
              <p className="text-xl text-neutral-600">
                Tell me about your business and what you&apos;re trying to improve.
                <br />
                I&apos;ll review everything before our call so we can make it productive.
              </p>

              {/* Quick actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="sms:7327349618"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                  rel="nofollow"
                >
                  <MessageSquare className="w-5 h-5" />
                  Text me (preferred)
                </a>
                <a
                  href="mailto:hello@clearforgelabs.com"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                  rel="nofollow"
                >
                  <Mail className="w-5 h-5" />
                  Email
                </a>
              </div>

              <p className="text-sm text-neutral-500 mt-4">
                Prefer texting? Number: <span className="font-semibold">(732) 734-9618</span>
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Booking Section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-8 h-8 text-charcoal-900" />
                  <h2 className="text-2xl font-bold">Book a Strategy Call</h2>
                </div>
                <p className="text-neutral-600 mb-6">
                  Prefer to talk directly? Book a free 15-minute call. We&apos;ll discuss your needs and see if we&apos;re a
                  good fit.
                </p>

                {/* Google Calendar Inline Embed */}
                <div className="bg-white border-2 border-neutral-300">
                  <iframe
                    src={BOOKING_IFRAME_SRC}
                    style={{ border: 0 }}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href="sms:7327349618"
                    className="btn-secondary inline-flex items-center justify-center gap-2"
                    rel="nofollow"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Text instead
                  </a>
                  <a
                    href="mailto:hello@clearforgelabs.com"
                    className="btn-secondary inline-flex items-center justify-center gap-2"
                    rel="nofollow"
                  >
                    <Mail className="w-5 h-5" />
                    Email instead
                  </a>
                </div>

                <p className="text-xs text-neutral-500 mt-3">
                  If the calendar doesn&apos;t load (rare), just text me and I&apos;ll send times.
                </p>
              </div>

              {/* Contact Form */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-8 h-8 text-charcoal-900" />
                  <h2 className="text-2xl font-bold">Send Your Details</h2>
                </div>
                <p className="text-neutral-600 mb-8">Not ready for a call? Fill this out and I&apos;ll reach out within 24 hours.</p>

                {/* ✅ Working form via Formspree */}
                <form className="space-y-6" action={FORM_ACTION} method="POST">
                  {/* Helps Formspree email subject */}
                  <input type="hidden" name="_subject" value="New Lead — Clearforge Labs" />

                  {/* ✅ Recommended: redirect to a thank-you page after submit */}
                  {/* Create /thanks page later, or remove this if you don’t want it */}
                  <input type="hidden" name="_redirect" value={`${SITE_URL}/thanks`} />

                  {/* Basic anti-spam honeypot (bots fill this, humans won't) */}
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors"
                        placeholder="(optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="business" className="block text-sm font-semibold mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="business"
                      name="business"
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors"
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold mb-2">
                      Current Website (if any)
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-semibold mb-2">
                      Industry *
                    </label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors"
                      placeholder="e.g., Salon, Gym, Clinic, etc."
                    />
                  </div>

                  <div>
                    <label htmlFor="need" className="block text-sm font-semibold mb-2">
                      What do you need help with? *
                    </label>
                    <select
                      id="need"
                      name="need"
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors bg-white"
                    >
                      <option value="">Select an option</option>
                      <option value="new-website">New website</option>
                      <option value="website-redesign">Website redesign</option>
                      <option value="booking-system">Booking system</option>
                      <option value="payment-integration">Payment integration</option>
                      <option value="automation">Automation</option>
                      <option value="full-system">Full system (website + booking + payments)</option>
                      <option value="other">Other / Not sure</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold mb-2">
                      Budget Range *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors bg-white"
                    >
                      <option value="">Select a range</option>
                      <option value="under-1k">Under $1,000</option>
                      <option value="1k-2k">$1,000 - $2,000</option>
                      <option value="2k-3k">$2,000 - $3,000</option>
                      <option value="3k-plus">$3,000+</option>
                      <option value="flexible">Flexible / Need guidance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-semibold mb-2">
                      Timeline *
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors bg-white"
                    >
                      <option value="">When do you need this?</option>
                      <option value="urgent">ASAP (within 1 week)</option>
                      <option value="soon">Soon (2-3 weeks)</option>
                      <option value="flexible">Flexible (1-2 months)</option>
                      <option value="exploring">Just exploring options</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Tell me more about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors resize-none"
                      placeholder="What problem are you trying to solve? What does success look like?"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>

                  <p className="text-sm text-neutral-500 text-center">I&apos;ll respond within 24 hours during business days.</p>
                </form>

                {/* Optional fallback */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-neutral-500">
                    If the form ever bugs out, just{' '}
                    <a href="sms:7327349618" className="text-charcoal-900 font-semibold hover:underline" rel="nofollow">
                      text me
                    </a>{' '}
                    and I’ll reply fast.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Me</h2>

              <div className="space-y-4">
                <p className="text-neutral-700">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:hello@clearforgelabs.com" className="text-charcoal-900 hover:underline font-medium" rel="nofollow">
                    hello@clearforgelabs.com
                  </a>
                </p>

                <p className="text-neutral-700">
                  <strong>Text:</strong>{' '}
                  <a href="sms:7327349618" className="text-charcoal-900 hover:underline font-medium" rel="nofollow">
                    (732) 734-9618
                  </a>
                </p>

                <p className="text-neutral-700 flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>
                    <strong>Location:</strong> Edison, NJ (serving NYC + nationwide)
                  </span>
                </p>

                <p className="text-neutral-700 flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>
                    <strong>Response Time:</strong> Within 24 hours on business days
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
