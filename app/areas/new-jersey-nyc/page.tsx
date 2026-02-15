import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'

const SITE_URL = 'https://clearforgelabs.com'

export const metadata: Metadata = {
  title: 'New Jersey & NYC Website Development | Clearforge Labs',
  description:
    'Founder-led websites, booking systems, and Stripe deposit/payment flows for service businesses. Based in NJ, serving NYC + clients nationwide.',
  alternates: { canonical: '/areas/new-jersey-nyc' },
  openGraph: {
    title: 'New Jersey & NYC Website Development | Clearforge Labs',
    description:
      'Founder-led websites, booking systems, and Stripe deposit/payment flows. NJ-based, serving NYC + nationwide.',
    url: `${SITE_URL}/areas/new-jersey-nyc`,
    type: 'website',
  },
}

const AREA_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/areas/new-jersey-nyc#service`,
  name: 'Clearforge Labs',
  url: SITE_URL,
  telephone: '+17327349618',
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'New Jersey' },
    { '@type': 'City', name: 'New York City' },
    { '@type': 'AdministrativeArea', name: 'New York' },
    { '@type': 'Country', name: 'United States' },
  ],
  serviceType: ['Website Development', 'Booking Systems', 'Stripe Payments', 'Deposits', 'Automations'],
}

export default function NJNYCPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(AREA_SCHEMA) }} />

        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-xl mb-6">New Jersey & NYC Website Builds That Convert</h1>
              <p className="text-xl text-neutral-600">
                Founder-led websites + booking + Stripe deposits for service businesses.
              </p>
              <p className="text-neutral-600 mt-4">
                Based in Edison, NJ — serving NYC and clients nationwide.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-bold mb-4">What I build</h2>
                <ul className="space-y-3 text-neutral-700">
                  <li>• High-converting websites (fast + mobile-first)</li>
                  <li>• Booking systems (Google Calendar / Calendly embeds)</li>
                  <li>• Stripe deposits & payment flows</li>
                  <li>• Simple automations (forms → email → spreadsheet)</li>
                </ul>

                <div className="mt-6 text-neutral-600">
                  <p className="font-semibold text-charcoal-900">Good fit if:</p>
                  <p>You sell a service and want more calls, more bookings, and fewer no-shows.</p>
                </div>
              </div>

              <div className="border-2 border-charcoal-900 bg-neutral-50 p-8">
                <h3 className="text-xl font-bold mb-3">Service areas</h3>
                <p className="text-neutral-700">
                  New Jersey (Edison, Newark, Jersey City, Hoboken, etc.) and New York City — plus remote builds nationwide.
                </p>

                <div className="mt-6 space-y-2 text-sm text-neutral-700">
                  <p>
                    <span className="font-semibold">Text/Call:</span>{' '}
                    <a href="tel:+17327349618" className="hover:underline">
                      (732) 734-9618
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{' '}
                    <a href="mailto:hello@clearforgelabs.com" className="hover:underline">
                      hello@clearforgelabs.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title="Want a site that actually gets you booked?"
          subtitle="Book a free 15-minute strategy call and I’ll map the simplest setup for your business."
          primaryCTA={{ text: 'Book Free Call', href: '/#book-call' }}
          secondaryCTA={{ text: 'See pricing', href: '/#pricing' }}
        />
      </main>
      <Footer />
    </>
  )
}
