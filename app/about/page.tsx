import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import { Code2, Database, Zap } from 'lucide-react'

export const metadata = {
  title: 'About | Clearforge Labs',
  description: 'Founded by Aavash Lamichhane. Building automated systems for small businesses.',
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
                    What started as small projects evolved into full revenue systems — websites that convert, 
                    booking systems that reduce manual work, and Stripe integrations that simplify payments.
                  </p>
                  <p className="text-neutral-600">
                    Founded by Aavash Lamichhane, a Computer Science and Data Science student focused on real-world 
                    execution — shipping fast and building clean systems that work.
                  </p>
                </div>
                <div>
                  <div className="bg-neutral-100 aspect-square flex items-center justify-center border-2 border-charcoal-900">
                    <div className="w-64 h-64 bg-charcoal-900 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-lg text-center mb-12">I believe most small businesses don't need complex tech.</h2>
              <p className="text-xl text-center text-neutral-700 mb-16">
                They need simple systems done properly.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-charcoal-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Speed Matters</h3>
                  <p className="text-neutral-600">
                    7–14 day delivery. No endless revisions or scope creep. I ship fast and iterate based on feedback.
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
                  <p className="text-neutral-700 mb-2">Computer Science major, Data Science minor</p>
                  <p className="text-neutral-600 text-sm">
                    Learning the theory is valuable, but I've always been more interested in building things that 
                    solve real problems.
                  </p>
                </div>

                <div className="border-l-4 border-charcoal-900 pl-6">
                  <h3 className="font-bold text-xl mb-2">Professional Experience</h3>
                  <p className="text-neutral-700 mb-2">Technology/Data/Innovation Intern — Deutsche Bank</p>
                  <p className="text-neutral-600 text-sm">
                    Worked with data systems and automation at enterprise scale. Learned what works (and what doesn't) 
                    in real business environments.
                  </p>
                </div>

                <div className="border-l-4 border-charcoal-900 pl-6">
                  <h3 className="font-bold text-xl mb-2">Side Projects</h3>
                  <p className="text-neutral-700 mb-2">Building since 2020</p>
                  <p className="text-neutral-600 text-sm">
                    Started with Discord bots for gaming communities. Moved to business websites. Now I build complete 
                    revenue systems with payments, booking, and automation.
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
                    I work with clients nationwide, entirely remotely. Local New Jersey businesses are welcome for 
                    in-person meetings if needed.
                  </p>
                  <p className="text-neutral-600">
                    Time zone: Eastern (ET)
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Availability</h2>
                  <p className="text-neutral-700 mb-4">
                    I'm a student, so I work on projects during evenings and weekends. This doesn't slow down delivery—
                    most projects launch in 7–14 days.
                  </p>
                  <p className="text-neutral-600">
                    Taking on 2–3 projects per month to maintain quality.
                  </p>
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
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Next.js</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">React</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">TypeScript</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">TailwindCSS</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">HTML/CSS</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-4">Backend & APIs</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Node.js</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Python</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Stripe API</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Discord.js</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">REST APIs</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-4">Hosting & Deployment</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Vercel</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Netlify</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">GitHub</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Railway</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-4">Integrations & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Stripe</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Google Calendar</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Calendly</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Formspree</span>
                    <span className="px-4 py-2 bg-charcoal-900 text-white text-sm">Resend</span>
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
              <p className="text-lg text-neutral-700 mb-6">
                I like shipping fast and making things simple.
              </p>
              <p className="text-neutral-600 mb-6">
                Too many businesses get stuck with websites that don't work, developers who disappear, or agencies 
                that charge enterprise prices for basic work.
              </p>
              <p className="text-neutral-600">
                I wanted to build a better option: fast delivery, fair pricing, direct communication. No BS.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          title="Let's Work Together"
          subtitle="If you value speed, clarity, and simple solutions, we'll get along."
          primaryCTA={{
            text: "Book a Call",
            href: "/#book-call"
          }}
          secondaryCTA={{
            text: "See my work first",
            href: "/work"
          }}
        />
      </main>
      <Footer />
    </>
  )
}
