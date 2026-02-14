// app/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingCard from '@/components/PricingCard'
import CaseStudyCard from '@/components/CaseStudyCard'
import CTASection from '@/components/CTASection'
import { CheckCircle2, Calendar, ArrowRight, Shield, Clock, Wrench } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div className="animate-fade-in">
                <h1 className="heading-xl mb-6 text-balance">Modern Websites That Actually Bring You Clients.</h1>

                <p className="text-xl text-neutral-600 mb-8 max-w-2xl">
                  Websites + booking + Stripe deposits for{' '}
                  <span className="font-semibold text-charcoal-900">service businesses</span> — so you get more leads, more
                  bookings, and fewer no-shows.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-charcoal-900" />
                    <span className="font-medium">Delivered in 5–10 days</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-charcoal-900" />
                    <span className="font-medium">Mobile-first + lightning fast</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-charcoal-900" />
                    <span className="font-medium">Deposits + payments included</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#book-call" className="btn-primary">
                    Book Free Strategy Call
                  </a>
                  <a href="#pricing" className="btn-secondary">
                    View Pricing
                  </a>
                </div>

                <p className="text-sm text-neutral-500 mt-4">No pressure — if it’s not a fit, I’ll tell you on the call.</p>

                <p className="text-xs uppercase tracking-wide text-neutral-500 mt-6">
                  Built for: <span className="text-charcoal-900 font-semibold">Urmi Threading</span> •{' '}
                  <span className="text-charcoal-900 font-semibold">WSD Referral System</span> •{' '}
                  <span className="text-charcoal-900 font-semibold">Stripe integrations</span>
                </p>
              </div>

              {/* Right - Founder Proof Card */}
              <div className="animate-slide-in-right">
                <div className="bg-neutral-100 aspect-square rounded-none p-8 flex flex-col items-center justify-center text-center border-2 border-charcoal-900">
                  <div className="w-32 h-32 rounded-full mb-6 overflow-hidden border-2 border-charcoal-900 bg-white">
                    <img
                      src="/headshot.jpg"
                      alt="Aavash Lamichhane"
                      className="w-full h-full object-cover scale-110 object-[50%_35%]"
                    />
                  </div>

                  <p className="text-lg font-medium mb-1">Aavash Lamichhane</p>
                  <p className="text-sm text-neutral-600 mb-5">NJ-based • Founder-led builds • Nationwide</p>

                  <div className="w-full max-w-xs space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                      <span className="text-sm text-neutral-700">Fast builds with clean communication</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                      <span className="text-sm text-neutral-700">Booking + deposits setup (Stripe)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                      <span className="text-sm text-neutral-700">You work with me (no layers)</span>
                    </div>
                  </div>

                  <div className="mt-6 w-full max-w-xs border-t border-neutral-300 pt-5">
                    <p className="text-sm text-neutral-700">Limited slots so delivery stays fast.</p>
                    <p className="text-xs text-neutral-500 mt-2">3 builds at a time.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* (REMOVED) extra mini-cards under hero */}
          </div>
        </section>

        {/* SOCIAL PROOF STRIP */}
        <section className="py-10 bg-charcoal-900 text-white">
          <div className="container-custom">
            <p className="text-center text-sm uppercase tracking-wide text-neutral-400 mb-6">
              Built for real businesses & paid communities
            </p>

            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              <div className="text-center p-5 border border-neutral-700">
                <h3 className="font-bold mb-1">Urmi Threading Salon</h3>
                <p className="text-neutral-400 text-sm">Modern website refresh</p>
              </div>
              <div className="text-center p-5 border border-neutral-700">
                <h3 className="font-bold mb-1">WSD Referral Bot</h3>
                <p className="text-neutral-400 text-sm">Automated referrals & tracking</p>
              </div>
              <div className="text-center p-5 border border-neutral-700">
                <h3 className="font-bold mb-1">Stripe Integrations</h3>
                <p className="text-neutral-400 text-sm">Deposits + payment flows</p>
              </div>
            </div>
          </div>
        </section>

        {/* SHORT ABOUT TEASER (since you have a full About page) */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">
                  Founder-led • NJ-based • Working nationwide
                </p>

                <h2 className="heading-md mb-4">
                  You’re not hiring an agency.
                  <br />
                  You’re working with the builder.
                </h2>

                <p className="text-neutral-700 text-lg mb-6">
                  I build fast, modern websites that convert visits into booked appointments and paid deposits — without the
                  agency fluff.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/about" className="btn-secondary inline-flex items-center justify-center">
                    About Me
                  </a>
                  <a href="/work" className="btn-primary inline-flex items-center justify-center">
                    Clearforge Labs
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>

              <div className="border-2 border-charcoal-900 bg-neutral-50 p-8">
                <h3 className="text-xl font-display font-bold mb-5">What this means for you</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                    <p className="text-neutral-700">
                      <span className="font-semibold">Fast turnaround:</span> most builds ship in 5–10 days.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                    <p className="text-neutral-700">
                      <span className="font-semibold">Deposit flow built-in:</span> Stripe links/checkout to reduce no-shows.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                    <p className="text-neutral-700">
                      <span className="font-semibold">Clean handoff:</span> you own the site + get post-launch support.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-neutral-300 pt-6">
                  <a
                    href="#book-call"
                    className="inline-flex items-center gap-2 font-semibold text-charcoal-900 hover:gap-4 transition-all duration-300"
                  >
                    Book the free call
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (moved here, like before) */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="heading-md mb-3">How It Works</h2>
                <p className="text-neutral-600">Simple, fast, founder-led — no confusion.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-2 border-neutral-300 p-7 hover:border-charcoal-900 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-6 h-6 text-charcoal-900" />
                    <h3 className="font-bold text-lg">1) Quick Strategy Call</h3>
                  </div>
                  <p className="text-neutral-600 text-sm">15 minutes. We pick the right package + lock scope.</p>
                </div>

                <div className="border-2 border-neutral-300 p-7 hover:border-charcoal-900 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Wrench className="w-6 h-6 text-charcoal-900" />
                    <h3 className="font-bold text-lg">2) Build (5–10 days)</h3>
                  </div>
                  <p className="text-neutral-600 text-sm">You send content + access. I build and share drafts fast.</p>
                </div>

                <div className="border-2 border-neutral-300 p-7 hover:border-charcoal-900 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-charcoal-900" />
                    <h3 className="font-bold text-lg">3) Launch + Support</h3>
                  </div>
                  <p className="text-neutral-600 text-sm">We go live. Clean handoff + post-launch support.</p>
                </div>
              </div>

              <div className="mt-10 bg-neutral-50 border-2 border-charcoal-900 p-7 text-center">
                <p className="font-semibold text-charcoal-900">
                  Guarantee: If you don’t like the first draft, I’ll revise it until it feels right.
                </p>
                <p className="text-sm text-neutral-600 mt-2">I only take 3 builds at a time so delivery stays fast.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section-padding bg-neutral-50 scroll-mt-28">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Founders Pricing</h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Intro pricing for the next 10 client systems. Same build quality — reduced rate while I build my 2026
                portfolio.
              </p>
              <p className="text-sm text-neutral-500 mt-4">5–10 day delivery. 50% upfront, 50% after delivery.</p>
              <p className="text-sm font-semibold text-charcoal-900 mt-3">
                Most clients choose <span className="underline">Site + Payments</span>.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <PricingCard
                name="Starter Site"
                originalPrice="$1,200"
                price="$900"
                description="Perfect for getting online fast"
                features={[
                  'High-converting website',
                  'Homepage + services + contact',
                  'Contact form setup',
                  'Mobile-first design',
                  'Basic SEO',
                  '30 days support after launch',
                ]}
              />

              <PricingCard
                name="Site + Payments"
                originalPrice="$2,000"
                price="$1,500"
                description="Start collecting deposits immediately"
                features={[
                  'Everything in Starter',
                  'Stripe payment setup',
                  'Deposit/pay links',
                  'Payment confirmation flow',
                  'Transaction tracking',
                  '30 days support after launch',
                ]}
                featured
              />

              <PricingCard
                name="Full Automation"
                originalPrice="$3,000"
                price="$2,200"
                description="Complete client system"
                features={[
                  'Everything in Site + Payments',
                  'Booking system integration',
                  '1–2 custom automations',
                  'Form → email → spreadsheet',
                  'Google Business setup help',
                  '60 days support after launch',
                ]}
              />
            </div>
          </div>
        </section>

        {/* RECENT PROJECTS */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="heading-lg text-center mb-12">Recent Projects</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <CaseStudyCard
                title="Urmi Threading Salon"
                problem="Outdated website with poor mobile experience and no online booking."
                solution="Built modern, mobile-first site with embedded booking system and contact forms."
                slug="urmi-threading"
              />
              <CaseStudyCard
                title="WSD Referral System"
                problem="Manual referral tracking for paid Discord community losing engagement."
                solution="Automated Discord bot with Stripe integration and real-time tracking dashboard."
                slug="wsd-bot"
              />
            </div>

            <div className="text-center mt-10">
              <a
                href="/work"
                className="inline-flex items-center gap-2 text-lg font-semibold hover:gap-4 transition-all duration-300"
              >
                View All Work
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <CTASection
          title="Ready to Modernize Your Business?"
          subtitle="Your website should work as hard as you do."
          primaryCTA={{ text: 'Book Your Free Strategy Call', href: '#book-call' }}
          secondaryCTA={{ text: "Or send your details and I'll reach out within 24 hours", href: '/contact' }}
        />

        {/* BOOKING */}
        <section id="book-call" className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="heading-md mb-6">Book Your Free Strategy Call</h2>
              <p className="text-neutral-600 mb-8">
                Choose a time that works for you. I’ll review your business before our call so we can make it productive.
              </p>

              <div className="bg-neutral-100 border-2 border-neutral-300 p-12 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
                  <p className="text-neutral-600 font-medium">Google Calendar Appointment Scheduler</p>
                  <p className="text-sm text-neutral-500 mt-2">Replace with your Google Calendar embed code</p>
                </div>
              </div>

              <p className="text-sm text-neutral-500 mt-6">
                Prefer to email?{' '}
                <a href="/contact" className="text-charcoal-900 font-semibold hover:underline">
                  Send me your details
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
