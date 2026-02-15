import type { Metadata } from 'next'
import Script from 'next/script'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const SITE_URL = 'https://clearforgelabs.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Clearforge Labs | Websites + Booking + Stripe Deposits (NJ)',
    template: '%s | Clearforge Labs',
  },

  description:
    'Clearforge Labs builds fast, modern websites with booking systems and Stripe deposit/payment flows for service businesses. NJ-based. Founder-led. 5–10 day delivery.',

  keywords: [
    'web developer New Jersey',
    'website developer Edison NJ',
    'web design NJ',
    'small business website NJ',
    'service business websites',
    'booking system website',
    'Google Calendar booking embed',
    'Stripe integration',
    'Stripe deposit setup',
    'automation for small businesses',
    'Clearforge Labs',
    'Aavash Lamichhane',
  ],

  // ✅ High impact: canonical + clean URLs
  alternates: {
    canonical: '/',
  },

  // ✅ High impact: robots directives (won’t conflict with your public/robots.txt)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  // ✅ High impact: icons (safe even if you only have favicon.ico right now)
  icons: {
    icon: '/favicon.ico',
    // If you add these later, it will auto-use them:
    // apple: '/apple-touch-icon.png',
  },

  // ✅ Nice-to-have: category hint
  category: 'technology',

  openGraph: {
    title: 'Clearforge Labs | Websites + Booking + Stripe Deposits',
    description:
      'Fast, modern websites that convert — booking + Stripe deposits included. NJ-based, founder-led builds.',
    url: SITE_URL,
    siteName: 'Clearforge Labs',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og.png', // ok if you add later
        width: 1200,
        height: 630,
        alt: 'Clearforge Labs',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Clearforge Labs | Websites + Booking + Stripe Deposits',
    description:
      'Fast, modern websites that convert — booking + Stripe deposits included. NJ-based, founder-led builds.',
    images: ['/og.png'], // ok if you add later
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {/* ✅ High impact: Schema markup (helps Google understand your business) */}
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  name: 'Clearforge Labs',
                  url: SITE_URL,
                  logo: `${SITE_URL}/og.png`,
                  sameAs: [],
                },
                {
                  '@type': 'LocalBusiness',
                  name: 'Clearforge Labs',
                  url: SITE_URL,
                  telephone: '+1-732-734-9618',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Edison',
                    addressRegion: 'NJ',
                    addressCountry: 'US',
                  },
                  areaServed: ['US', 'New Jersey'],
                  founder: {
                    '@type': 'Person',
                    name: 'Aavash Lamichhane',
                  },
                  makesOffer: [
                    { '@type': 'Offer', name: 'Websites That Convert' },
                    { '@type': 'Offer', name: 'Booking & Scheduling Setup' },
                    { '@type': 'Offer', name: 'Stripe Payments & Deposits' },
                    { '@type': 'Offer', name: 'Automations' },
                  ],
                },
                {
                  '@type': 'WebSite',
                  name: 'Clearforge Labs',
                  url: SITE_URL,
                },
              ],
            }),
          }}
        />

        {children}
      </body>
    </html>
  )
}
