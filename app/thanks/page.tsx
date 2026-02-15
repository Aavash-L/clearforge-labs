// app/thanks/page.tsx
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react'

const SITE_URL = 'https://clearforgelabs.com'

export const metadata: Metadata = {
  title: 'Thanks | Clearforge Labs',
  description: 'Message received. Clearforge Labs will respond within 24 hours on business days.',
  alternates: { canonical: '/thanks' },
  openGraph: {
    title: 'Thanks | Clearforge Labs',
    description: 'Message received. Clearforge Labs will respond within 24 hours on business days.',
    url: `${SITE_URL}/thanks`,
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thanks | Clearforge Labs',
    description: 'Message received. Clearforge Labs will respond within 24 hours on business days.',
    images: ['/og.png'],
  },
}

export default function ThanksPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-white border-2 border-charcoal-900 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-charcoal-900" />
              </div>

              <h1 className="heading-xl mb-4">You&apos;re all set.</h1>
              <p className="text-xl text-neutral-600 mb-8">
                I got your message — I&apos;ll respond within <span className="font-semibold text-charcoal-900">24 hours</span> on business days.
              </p>

              <div className="bg-white border-2 border-neutral-300 p-6 text-left max-w-xl mx-auto">
                <h2 className="text-lg font-bold mb-2">Want a faster reply?</h2>
                <p className="text-neutral-600 mb-4">
                  If it&apos;s time-sensitive, text me and I&apos;ll reply quicker.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="sms:7327349618" className="btn-primary inline-flex items-center justify-center gap-2" rel="nofollow">
                    <MessageSquare className="w-5 h-5" />
                    Text (732) 734-9618
                  </a>

                  <Link href="/#book-call" className="btn-secondary inline-flex items-center justify-center gap-2">
                    Book a call
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 font-semibold text-charcoal-900 hover:gap-4 transition-all duration-300"
                >
                  Back to home
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
