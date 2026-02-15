import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import { Zap, CreditCard, Calendar, Workflow, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services | Clearforge Labs',
  description:
    'Websites that convert, booking systems, Stripe payments/deposits, and simple automations for service businesses. NJ-based, founder-led builds.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services | Clearforge Labs',
    description:
      'Websites that convert, booking systems, Stripe payments/deposits, and simple automations for service businesses.',
    url: 'https://clearforgelabs.com/services',
    type: 'website',
  },
}

const SERVICES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Websites, Booking, Payments, Automation',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Clearforge Labs',
    url: 'https://clearforgelabs.com',
    telephone: '+17327349618',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Edison',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
  },
  areaServed: ['New Jersey', 'United States'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Clearforge Labs Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Websites That Convert' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Payments & Deposits (Stripe)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Booking & Scheduling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Automations' } },
    ],
  },
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* SEO: Services Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_SCHEMA) }}
        />

        {/* Header */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-xl mb-6">What I Build</h1>
              <p className="text-xl text-neutral-600">
                Simple systems that help your business capture more leads and save time.
              </p>
            </div>
          </div>
        </section>

        {/* Service 1: Websites */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <Zap className="w-16 h-16 mb-6 text-charcoal-900" />
                  <h2 className="heading-lg mb-4">Websites That Convert</h2>
                  <p className="text-lg text-neutral-700 mb-6">
                    Fast, modern websites designed to turn visitors into customers. Mobile-first, SEO-optimized, 
                    and built to load in under 2 seconds.
                  </p>
                  <p className="text-neutral-600">
                    I don't build websites that just look good. I build websites that work—clear messaging, 
                    strong calls-to-action, and zero distractions from what matters: getting clients to contact you.
                  </p>
                </div>
                <div className="bg-neutral-50 p-8 border-2 border-neutral-300">
                  <h3 className="font-bold text-xl mb-6">What's Included</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Homepage optimized for conversions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Services/pricing page</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Contact page with form</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Mobile-responsive design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Basic SEO setup (meta tags, sitemap)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Lightning-fast loading (90+ Lighthouse score)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Domain connection & hosting setup</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service 2: Payments */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="order-2 md:order-1 bg-white p-8 border-2 border-neutral-300">
                  <h3 className="font-bold text-xl mb-6">What's Included</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Stripe account setup & integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Deposit payment flows</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>One-time or subscription billing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Automated payment confirmations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Payment link generation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Transaction tracking</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <CreditCard className="w-16 h-16 mb-6 text-charcoal-900" />
                  <h2 className="heading-lg mb-4">Payments & Deposits</h2>
                  <p className="text-lg text-neutral-700 mb-6">
                    Collect deposits, process payments, and manage subscriptions. Powered by Stripe—the same payment 
                    system used by Amazon, Shopify, and millions of businesses.
                  </p>
                  <p className="text-neutral-600">
                    No monthly fees. Just a simple per-transaction cost (2.9% + 30¢). I'll handle all the technical 
                    setup so you can start collecting payments immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service 3: Booking */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <Calendar className="w-16 h-16 mb-6 text-charcoal-900" />
                  <h2 className="heading-lg mb-4">Booking & Scheduling</h2>
                  <p className="text-lg text-neutral-700 mb-6">
                    Let clients book appointments 24/7 without picking up the phone. Automated reminders reduce 
                    no-shows and free up your time for actual work.
                  </p>
                  <p className="text-neutral-600">
                    I use free tools like Google Calendar or Calendly (free plan) embedded directly into your site. 
                    No monthly subscription needed unless you want premium features.
                  </p>
                </div>
                <div className="bg-neutral-50 p-8 border-2 border-neutral-300">
                  <h3 className="font-bold text-xl mb-6">What's Included</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Calendar system setup</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Embedded booking widget</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Automated confirmation emails</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Reminder notifications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Buffer time between appointments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Business hours configuration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service 4: Automations */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="order-2 md:order-1 bg-white p-8 border-2 border-neutral-300">
                  <h3 className="font-bold text-xl mb-6">Common Automations</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Form submission → Email notification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>New lead → Google Sheet entry</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Payment received → Welcome email</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Booking confirmed → SMS reminder</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Custom Discord bot commands</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Data syncing between platforms</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <Workflow className="w-16 h-16 mb-6 text-charcoal-900" />
                  <h2 className="heading-lg mb-4">Automations</h2>
                  <p className="text-lg text-neutral-700 mb-6">
                    Stop doing repetitive tasks manually. I build simple automations that save hours each week—from 
                    form submissions to spreadsheets to email sequences.
                  </p>
                  <p className="text-neutral-600">
                    Whether it's syncing data, sending notifications, or tracking leads, automation keeps your business 
                    running smoothly without requiring your constant attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Need */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-md text-center mb-12">What I'll Need From You</h2>
              <div className="bg-neutral-50 p-8 border-2 border-neutral-300">
                <p className="text-neutral-600 mb-6">
                  To get started quickly, here's what helps speed up the process:
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-3">Optional (but helpful)</h3>
                    <ul className="space-y-2 text-neutral-700">
                      <li className="flex items-start gap-2">
                        <span className="text-charcoal-900">•</span>
                        <span>Logo or brand colors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-charcoal-900">•</span>
                        <span>Services list with pricing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-charcoal-900">•</span>
                        <span>Photos of your business/team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-charcoal-900">•</span>
                        <span>Any existing content/copy</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">Required</h3>
                    <ul className="space-y-2 text-neutral-700">
                      <li className="flex items-start gap-2">
                        <span className="text-charcoal-900">•</span>
                        <span>Domain name (or I can help you choose)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-charcoal-900">•</span>
                        <span>Domain access for DNS setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-charcoal-900">•</span>
                        <span>Stripe account (free to create)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-charcoal-900">•</span>
                        <span>Business details & contact info</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-neutral-600 mt-6">
                  Don't have some of these? No problem. I'll help you figure it out during our strategy call.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-md text-center mb-12">How It Works</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-charcoal-900 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Strategy Call (15 min, free)</h3>
                    <p className="text-neutral-600">
                      We discuss your business, what you need, and whether we're a good fit. No pressure.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-charcoal-900 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Proposal & Deposit</h3>
                    <p className="text-neutral-600">
                      I send you a clear proposal with scope, timeline, and pricing. 50% deposit to start.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-charcoal-900 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Build & Review (5–10 days)</h3>
                    <p className="text-neutral-600">
                      I build your system. You review and request changes. I refine until you're happy.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-charcoal-900 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Launch & Support</h3>
                    <p className="text-neutral-600">
                      Final 50% payment. Site goes live. I provide 30-60 days of post-launch support for any issues.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title="Ready to Get Started?"
          subtitle="Book a free call to discuss your project."
          primaryCTA={{
            text: "Book Strategy Call",
            href: "/#book-call"
          }}
          secondaryCTA={{
            text: "Or send me your details",
            href: "/contact"
          }}
        />
      </main>
      <Footer />
    </>
  )
}
