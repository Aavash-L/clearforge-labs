import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import { CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Work & Case Studies | Clearforge Labs',
  description: 'Real projects delivering results for small businesses and online communities.',
}

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Header */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-xl mb-6">Real Work, Real Results</h1>
              <p className="text-xl text-neutral-600">
                Every project is built with speed, clarity, and conversion in mind.
              </p>
            </div>
          </div>
        </section>

        {/* Case Study 1: Urmi Threading Salon */}
        <section id="urmi-threading" className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">Case Study</span>
                <h2 className="heading-lg mt-2 mb-4">Urmi Threading Salon</h2>
                <p className="text-xl text-neutral-600">Modern website refresh for a local beauty salon</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-xl font-bold mb-4">The Problem</h3>
                  <p className="text-neutral-700 mb-6">
                    Urmi Threading Salon had an outdated website that wasn't mobile-friendly. Potential clients couldn't 
                    easily find services, pricing, or contact information. They were losing business to competitors with 
                    better online presence.
                  </p>
                  
                  <h3 className="text-xl font-bold mb-4">What I Built</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Mobile-first responsive website</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Clear service menu with pricing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Contact form with email notifications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Google Maps integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Fast loading times (95+ Lighthouse score)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Tools Used</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">Next.js</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">TailwindCSS</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">Vercel</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">Formspree</span>
                  </div>

                  <h3 className="text-xl font-bold mb-4">Outcome</h3>
                  <p className="text-neutral-700 mb-4">
                    The salon now has a professional online presence that converts visitors into customers. Mobile traffic 
                    increased significantly, and the owner reports fewer "where are you located?" calls.
                  </p>
                  <div className="bg-neutral-50 p-6 border-l-4 border-charcoal-900">
                    <p className="font-semibold mb-2">Delivered in 5 days</p>
                    <p className="text-neutral-600">From first call to launch, including revisions and training.</p>
                  </div>
                </div>
              </div>

              {/* Screenshot Placeholder */}
              <div className="bg-neutral-100 border-2 border-neutral-300 aspect-video flex items-center justify-center">
                <p className="text-neutral-500">Website Screenshot Placeholder</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study 2: WSD Referral Bot */}
        <section id="wsd-bot" className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">Case Study</span>
                <h2 className="heading-lg mt-2 mb-4">WSD Discord Referral System</h2>
                <p className="text-xl text-neutral-600">Automated referral tracking for a paid trading community</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-xl font-bold mb-4">The Problem</h3>
                  <p className="text-neutral-700 mb-6">
                    Wall Street Degens (WSD), a paid Discord community, was manually tracking member referrals. This took 
                    hours of admin time weekly and led to disputes about referral credits. They needed an automated solution 
                    that integrated with their existing Stripe payments.
                  </p>
                  
                  <h3 className="text-xl font-bold mb-4">What I Built</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Custom Discord bot with referral tracking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Stripe webhook integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Automated role assignment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Real-time leaderboard</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Admin dashboard for tracking</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Tools Used</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">Discord.js</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">Node.js</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">Stripe API</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">MongoDB</span>
                  </div>

                  <h3 className="text-xl font-bold mb-4">Outcome</h3>
                  <p className="text-neutral-700 mb-4">
                    The community saved 10+ hours per week on manual tracking. Referrals became completely automated, 
                    from payment to role assignment. Member disputes dropped to zero, and referral participation increased.
                  </p>
                  <div className="bg-white p-6 border-l-4 border-charcoal-900">
                    <p className="font-semibold mb-2">Delivered in 9 days</p>
                    <p className="text-neutral-600">Including testing, webhook setup, and admin training.</p>
                  </div>
                </div>
              </div>

              {/* Screenshot Placeholder */}
              <div className="bg-neutral-100 border-2 border-neutral-300 aspect-video flex items-center justify-center">
                <p className="text-neutral-500">Bot Dashboard Screenshot Placeholder</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study 3: Stripe Payment Flows */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">Case Study</span>
                <h2 className="heading-lg mt-2 mb-4">Stripe Payment Integrations</h2>
                <p className="text-xl text-neutral-600">Simplified payment flows for multiple clients</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4">The Challenge</h3>
                  <p className="text-neutral-700 mb-6">
                    Multiple clients needed custom Stripe implementations: one-time deposits, subscription billing, 
                    and invoice systems. Each required different flows but all needed to be simple for customers and 
                    easy for owners to manage.
                  </p>
                  
                  <h3 className="text-xl font-bold mb-4">Solutions Delivered</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Deposit checkout flows with confirmation emails</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Subscription billing with automated invoicing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Payment link generation tools</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Transaction tracking dashboards</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Tools Used</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">Stripe API</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">Next.js</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">Webhooks</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm font-medium">Resend</span>
                  </div>

                  <h3 className="text-xl font-bold mb-4">Outcome</h3>
                  <p className="text-neutral-700">
                    Clients now collect payments automatically with zero manual intervention. Failed payments are handled 
                    gracefully, customers receive instant confirmations, and owners have full visibility into transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title="Want Results Like These?"
          subtitle="Let's talk about your project and what you're trying to achieve."
          primaryCTA={{
            text: "Book a Call",
            href: "/#book-call"
          }}
        />
      </main>
      <Footer />
    </>
  )
}
