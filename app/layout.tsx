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

  alternates: {
    canonical: '/',
  },

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

  icons: {
    icon: '/favicon.ico',
    // Optional later:
    // apple: '/apple-touch-icon.png',
  },

  // Optional (nice-to-have):
  // Add your Google Search Console HTML verification token here IF you ever use that method.
  // verification: {
  //   google: 'PASTE_TOKEN_HERE',
  // },

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
        url: '/og.png',
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
    images: ['/og.png'],
  },

  // Optional nice-to-haves (safe, don’t change features)
  appleWebApp: {
    title: 'Clearforge Labs',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
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
                  // If you don’t want logo tied to og.png, change this to /logo.png later.
                  logo: `${SITE_URL}/og.png`,
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
