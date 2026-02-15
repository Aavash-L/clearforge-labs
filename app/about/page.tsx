// app/about/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import { Code2, Database, Zap, Briefcase, GraduationCap, MapPin, ShieldCheck } from 'lucide-react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Clearforge Labs is founder-led by Aavash Lamichhane. Websites + booking + Stripe deposits + automations for service businesses. NJ-based, serving nationwide.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Clearforge Labs',
    description:
      'Founder-led systems: websites + booking + Stripe deposits + automations. Built fast with clean communication.',
    url: 'https://clearforgelabs.com/about',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Clearforge Labs',
    description:
      'Founder-led systems: websites + booking + Stripe deposits + automations. Built fast with clean communication.',
    images: ['/og.png'],
  },
}



export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="heading-xl mb-6">About Clearforge Labs</h1>

                  <p className="text-xl text-neutral-700 mb-6">
                    We build websites, bots, and automation systems for growing businesses and paid communities.
                  </p>

                  <p className="text-neutral-600 mb-6">
                    What started as small projects evolved into full revenue systems — websites that convert, booking systems that
                    reduce manual work, and Stripe integrations that simplify payments.
                  </p>

                  {/* ADD: About me (Aavash) */}
                  <div className="border-l-4 border-charcoal-900 pl-5 py-1">
                    <p className="text-neutral-700 font-semibold mb-2">About me — Aavash</p>

                    <div className="space-y-3 text-neutral-700">
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                        <p>
                          <span className="font-semibold">Software Engineering Intern @ Verizon</span> — worked on payment workflows,
                          validation, and reliability improvements.
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                        <p>
                          <span className="font-semibold">Technology, Data & Innovation Intern @ Deutsche Bank</span> — learned how
                          clean systems and automation scale in real environments.
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <GraduationCap className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                        <p>
                          <span className="font-semibold">Computer Science major</span> (Economics minor) — focused on shipping
                          real-world systems, not just theory.
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                        <p>
                          <span className="font-semibold">Based in Edison, NJ</span> — work with clients nationwide.
                        </p>
                      </div>
                    </div>

                    <p className="text-neutral-600 mt-4">
                      My thing is simple: build fast, communicate clean, and ship systems that actually help you get booked + paid.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="bg-neutral-100 aspect-square flex items-center justify-center border-2 border-charcoal-900">
                    {/* keep your original placeholder, or swap to headshot if you want */}
                    <div className="w-64 h-64 bg-charcoal-900 rounded-full"></div>
                  </div>

                  {/* ADD: Quick credibility box */}
                  <div className="mt-6 border-2 border-charcoal-900 bg-white p-6">
                    <p className="font-bold text-charcoal-900 mb-3">What you can expect</p>
                    <div className="space-y-3 text-neutral-700">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                        <p>
                          Founder-led work — you’re talking to the person building it. No layers, no outsourcing.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                        <p>
                          Practical systems: website + booking + deposits + automation when it makes sense.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-charcoal-900 flex-shrink-0" />
                        <p>
                          Clean handoff + support after launch so you’re not stuck later.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{/* grid */}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-lg text-center mb-12">I believe most small businesses don't need complex tech.</h2>
              <p className="text-xl text-center text-neutral-700 mb-16">They need simple systems done properly.</p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-charcoal-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Speed Matters</h3>
                  <p className="text-neutral-600">
                    5–10 day delivery. No endless revisions or scope creep. I ship fast and iterate based on feedback.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-charcoal-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Clean Code</h3>
                  <p className="text-neutral-600">
                    I write maintainable code using modern tools. Your site won't break in 6 months because of messy shortcuts.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-charcoal-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Database className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Real Solutions</h3>
                  <p className="text-neutral-600">
                    I don't sell you things you don't need. If automation won't help your business, I'll tell you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Background */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-md mb-8">Background</h2>

              <div className="space-y-8">
                <div className="border-l-4 border-charcoal-900 pl-6">
                  <h3 className="font-bold text-xl mb-2">Education</h3>
                  <p className="text-neutral-700 mb-2">Computer Science major, Economics minor</p>
                  <p className="text-neutral-600 text-sm">
                    Learning the theory is valuable, but I’m focused on building systems that solve real problems and drive
                    revenue.
                  </p>
                </div>

                <div className="border-l-4 border-charcoal-900 pl-6">
                  <h3 className="font-bold text-xl mb-2">Professional Experience</h3>
                  <p className="text-neutral-700 mb-2">Software Engineering Intern — Verizon</p>
                  <p className="text-neutral-600 text-sm">
                    Worked on real payment-related engineering problems: validation, workflows, and reliability improvements.
                  </p>

                  <p className="text-neutral-700 mt-5 mb-2">Technology, Data & Innovation Intern — Deutsche Bank</p>
                  <p className="text-neutral-600 text-sm">
                    Learned how enterprise teams structure systems and automation so they don’t fall apart at scale.
                  </p>
                </div>

                <div className="border-l-4 border-charcoal-900 pl-6">
                  <h3 className="font-bold text-xl mb-2">Projects & Builds</h3>
                  <p className="text-neutral-700 mb-2">Building since 2020</p>
                  <p className="text-neutral-600 text-sm">
                    Started with bots and community tooling, then moved into business sites + automations. Today I build complete
                    “client systems” — websites, booking, deposits, and workflows that keep leads moving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Availability */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Based in Edison, NJ</h2>
                  <p className="text-neutral-700 mb-4">
                    I work with clients nationwide, entirely remotely. Local New Jersey businesses are welcome for in-person
                    meetings if needed.
                  </p>
                  <p className="text-neutral-600">Time zone: Eastern (ET)</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Availability</h2>
                  <p className="text-neutral-700 mb-4">
                    I keep a tight build schedule so delivery stays fast. Most projects launch in 5–10 days.
                  </p>
                  <p className="text-neutral-600">Taking on 2–3 projects per month to maintain quality.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools & Tech */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-md text-center mb-12">Tools & Technologies</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-xl mb-4">Frontend & Websites</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'HTML/CSS'].map((t) => (
                      <span key={t} className="px-4 py-2 bg-charcoal-900 text-white text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-4">Backend & APIs</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Python', 'Stripe API', 'Discord.js', 'REST APIs'].map((t) => (
                      <span key={t} className="px-4 py-2 bg-charcoal-900 text-white text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-4">Hosting & Deployment</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Vercel', 'Netlify', 'GitHub', 'Railway'].map((t) => (
                      <span key={t} className="px-4 py-2 bg-charcoal-900 text-white text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-4">Integrations & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Stripe', 'Google Calendar', 'Calendly', 'Formspree', 'Resend'].map((t) => (
                      <span key={t} className="px-4 py-2 bg-charcoal-900 text-white text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="heading-md mb-6">Why I Do This</h2>
              <p className="text-lg text-neutral-700 mb-6">I like shipping fast and making things simple.</p>
              <p className="text-neutral-600 mb-6">
                Too many businesses get stuck with websites that don't work, developers who disappear, or agencies that charge
                enterprise prices for basic work.
              </p>
              <p className="text-neutral-600">
                I wanted to build a better option: fast delivery, fair pricing, direct communication. No BS.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          title="Let's Work Together"
          subtitle="If you value speed, clarity, and simple systems, we'll get along."
          primaryCTA={{
            text: 'Book a Call',
            href: '/#book-call',
          }}
          secondaryCTA={{
            text: 'See my work first',
            href: '/work',
          }}
        />
      </main>
      <Footer />
    </>
  )
}
