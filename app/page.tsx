// app/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingCard from '@/components/PricingCard'
import CaseStudyCard from '@/components/CaseStudyCard'
import CTASection from '@/components/CTASection'
import { CheckCircle2, Zap, CreditCard, Calendar, ArrowRight, Shield, Clock, Wrench, LayoutGrid } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-neutral-50 to-white">
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

                {/* Trust Bullets */}
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
                    <span className="font-medium">Booking + payments + automation included</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#book-call" className="btn-primary">
                    Book Free Strategy Call
                  </a>
                  <a href="/work" className="btn-secondary">
                    See Real Work
                  </a>
                </div>

                {/* Risk Reversal */}
                <p className="text-sm text-neutral-500 mt-4">No pressure — if it’s not a fit, I’ll tell you on the call.</p>

                {/* Built for row */}
                <p className="text-xs uppercase tracking-wide text-neutral-500 mt-6">
                  Built for: <span className="text-charcoal-900 font-semibold">Urmi Threading</span> •{' '}
                  <span className="text-charcoal-900 font-semibold">WSD Referral System</span> •{' '}
                  <span className="text-charcoal-900 font-semibold">Stripe integrations</span>
                </p>
              </div>

              {/* Right - Founder Proof Card */}
              <div className="animate-slide-in-right">
                <div className="bg-neutral-100 aspect-square rounded-none p-8 flex flex-col items-center justify-center text-center border-2 border-charcoal-900">
                  {/* Headshot */}
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
                      <span className="text-sm text-neutral-700">Automations to capture leads 24/7</span>
                    </div>
                  </div>

                  {/* Proof statement */}
                  <div className="mt-6 w-full max-w-xs border-t border-neutral-300 pt-5">
                    <p className="text-sm text-neutral-700">You work directly with me — no outsourcing, no layers.</p>
                    <p className="text-xs text-neutral-500 mt-2">3 builds at a time to keep delivery fast.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="py-12 bg-charcoal-900 text-white">
          <div className="container-custom">
            <p className="text-center text-sm uppercase tracking-wide text-neutral-400 mb-8">
              Built for real businesses & paid communities
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 border border-neutral-700">
                <h3 className="font-bold mb-2">Urmi Threading Salon</h3>
                <p className="text-neutral-400 text-sm">Modern website refresh</p>
              </div>
              <div className="text-center p-6 border border-neutral-700">
                <h3 className="font-bold mb-2">WSD Referral Bot</h3>
                <p className="text-neutral-400 text-sm">Automated referrals & tracking</p>
              </div>
              <div className="text-center p-6 border border-neutral-700">
                <h3 className="font-bold mb-2">Stripe Integrations</h3>
                <p className="text-neutral-400 text-sm">Deposits + payment flows</p>
              </div>
            </div>
          </div>
        </section>


                {/* 3-STEP PROCESS STRIP */}
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
                  <p className="text-neutral-600 text-sm">
                    15 minutes. We choose the right package + clarify scope. If it’s not a fit, I’ll tell you.
                  </p>
                </div>

                <div className="border-2 border-neutral-300 p-7 hover:border-charcoal-900 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Wrench className="w-6 h-6 text-charcoal-900" />
                    <h3 className="font-bold text-lg">2) Build (5–10 days)</h3>
                  </div>
                  <p className="text-neutral-600 text-sm">
                    You send content + any access needed. I build the site + booking + Stripe deposits (and automations if
                    needed).
                  </p>
                </div>

                <div className="border-2 border-neutral-300 p-7 hover:border-charcoal-900 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-charcoal-900" />
                    <h3 className="font-bold text-lg">3) Launch + Support</h3>
                  </div>
                  <p className="text-neutral-600 text-sm">
                    We go live fast. You get support after launch + clean handoff. You own the site.
                  </p>
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

        {/* Pricing Section (MOVED UP) */}
        <section id="pricing" className="section-padding bg-neutral-50 scroll-mt-28">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">Founders Pricing</h2>

              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Intro pricing for the next 10 client systems. Same build quality — reduced rate while I build my 2026
                portfolio.
              </p>

              <p className="text-sm text-neutral-500 mt-4">
                All packages include 5–10 day delivery. 50% upfront, 50% after delivery.
              </p>

              <p className="text-sm font-semibold text-charcoal-900 mt-3">
                Most clients choose <span className="underline">Site + Payments</span> to start collecting deposits
                immediately.
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

        {/* Problem Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-lg text-center mb-12">Most small businesses lose money because…</h2>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 border-l-4 border-charcoal-900 bg-neutral-50">
                  <div className="text-3xl">❌</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Missed calls & slow replies = lost clients</h3>
                    <p className="text-neutral-600">
                      Every hour you wait to respond, you lose potential revenue to competitors.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 border-l-4 border-charcoal-900 bg-neutral-50">
                  <div className="text-3xl">❌</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Old websites don't convert on mobile</h3>
                    <p className="text-neutral-600">
                      80% of your visitors are on their phone. If your site isn't optimized, they're gone.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 border-l-4 border-charcoal-900 bg-neutral-50">
                  <div className="text-3xl">❌</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">No deposit/payment flow = no-shows</h3>
                    <p className="text-neutral-600">
                      Without skin in the game, appointments get cancelled or forgotten.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 border-l-4 border-charcoal-900 bg-neutral-50">
                  <div className="text-3xl">❌</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Manual scheduling steals time</h3>
                    <p className="text-neutral-600">Every minute spent on the phone is a minute not serving clients.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Teaser */}
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
            <div className="text-center mt-12">
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

        {/* PROOF BLOCKS (REPLACES TESTIMONIALS) */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="heading-md mb-3">What I Build</h2>
                <p className="text-neutral-600">Real systems shipped — websites, payments, automation, and tracking.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border-2 border-neutral-300 p-7 hover:border-charcoal-900 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <LayoutGrid className="w-6 h-6 text-charcoal-900" />
                    <h3 className="font-bold text-lg">Website + Mobile Refresh</h3>
                  </div>
                  <p className="text-neutral-700 mb-4">
                    Built a clean, fast site that makes it easy for customers to book and contact.
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li>• Modern layout + speed</li>
                    <li>• Mobile-first UX</li>
                    <li>• Lead capture + contact flow</li>
                  </ul>
                  <p className="mt-4 text-xs text-neutral-500">Example: Urmi Threading Salon</p>
                </div>

                <div className="bg-white border-2 border-neutral-300 p-7 hover:border-charcoal-900 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-6 h-6 text-charcoal-900" />
                    <h3 className="font-bold text-lg">Stripe Deposits + Flows</h3>
                  </div>
                  <p className="text-neutral-700 mb-4">
                    Set up deposits/payment links so businesses reduce no-shows and get paid faster.
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li>• Deposit / pay links</li>
                    <li>• Confirmation + tracking</li>
                    <li>• Simple “pay → booked” flow</li>
                  </ul>
                  <p className="mt-4 text-xs text-neutral-500">Example: Stripe integrations</p>
                </div>

                <div className="bg-white border-2 border-neutral-300 p-7 hover:border-charcoal-900 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-charcoal-900" />
                    <h3 className="font-bold text-lg">Automation + Tracking</h3>
                  </div>
                  <p className="text-neutral-700 mb-4">
                    Automated referrals + tracking so admins don’t do manual work and members stay engaged.
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li>• Auto referral tracking</li>
                    <li>• Payment-aware workflows</li>
                    <li>• Real-time dashboard logic</li>
                  </ul>
                  <p className="mt-4 text-xs text-neutral-500">Example: WSD Referral Bot</p>
                </div>
              </div>

              <div className="text-center mt-10">
                <p className="text-sm text-neutral-600">
                  Want me to show screenshots on a call?{' '}
                  <a href="#book-call" className="font-semibold text-charcoal-900 hover:underline">
                    Book a free strategy call
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Risk Reversal */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-lg mb-12">No Tech Stress</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-6 bg-white border-2 border-neutral-300">
                  <h3 className="font-bold text-xl mb-2">Free 15-minute strategy call</h3>
                  <p className="text-neutral-600">Let's talk about your business and see if we're a fit.</p>
                </div>
                <div className="p-6 bg-white border-2 border-neutral-300">
                  <h3 className="font-bold text-xl mb-2">Clear scope before any payment</h3>
                  <p className="text-neutral-600">You'll know exactly what you're getting and when.</p>
                </div>
                <div className="p-6 bg-white border-2 border-neutral-300">
                  <h3 className="font-bold text-xl mb-2">Clean delivery timeline</h3>
                  <p className="text-neutral-600">5–10 days from deposit to launch. No surprises.</p>
                </div>
                <div className="p-6 bg-white border-2 border-neutral-300">
                  <h3 className="font-bold text-xl mb-2">30 days post-launch support</h3>
                  <p className="text-neutral-600">I'm here to help after your site goes live.</p>
                </div>
              </div>
              <p className="text-lg font-medium mt-8">If it's not a fit, I'll tell you upfront.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection
          title="Ready to Modernize Your Business?"
          subtitle="Your website should work as hard as you do."
          primaryCTA={{ text: 'Book Your Free Strategy Call', href: '#book-call' }}
          secondaryCTA={{ text: "Or send your details and I'll reach out within 24 hours", href: '/contact' }}
        />

        {/* Booking Section */}
        <section id="book-call" className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="heading-md mb-6">Book Your Free Strategy Call</h2>
              <p className="text-neutral-600 mb-8">
                Choose a time that works for you. I'll review your business before our call so we can make it productive.
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
