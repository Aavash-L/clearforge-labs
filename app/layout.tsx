import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

// Preload only the weights we actually use
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700', '900'],
  display: 'swap',      // avoid invisible text during font load
  preload: true,
})

// ── Viewport / mobile settings ────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,        // allow user pinch-zoom (accessibility)
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)',  color: '#0c0c0c' },
  ],
}

// ── SEO + Social metadata ─────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://clearforgelabs.com'),   // ← update to your real domain

  title: {
    default: 'ClearForgeLabs — Modern Websites for Local Businesses',
    template: '%s | ClearForgeLabs',
  },
  description:
    'Fast, mobile-first websites with Stripe deposits and booking built in. Delivered in 5–10 days. NJ-based, serving businesses nationwide. Free mock website included.',
  keywords: [
    'web design NJ',
    'website designer New Jersey',
    'local business website',
    'affordable website design',
    'small business website',
    'NJ web developer',
    'restaurant website design',
    'salon website design',
    'contractor website',
    'ClearForgeLabs',
    'Aavash Lamichhane',
  ],
  authors: [{ name: 'Aavash Lamichhane', url: 'https://clearforgelabs.com' }],
  creator: 'Aavash Lamichhane',
  publisher: 'ClearForgeLabs',

  // Open Graph (Facebook, LinkedIn, iMessage previews)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://clearforgelabs.com',
    siteName: 'ClearForgeLabs',
    title: 'ClearForgeLabs — Modern Websites That Actually Bring You Clients',
    description:
      'Fast, mobile-first websites with Stripe deposits and booking built in. Free mock website. Delivered in 5–10 days.',
    images: [
      {
        url: '/og-image.png',   // ← add a 1200x630 image to /public/og-image.png
        width: 1200,
        height: 630,
        alt: 'ClearForgeLabs — Modern Websites for Local Businesses',
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: 'summary_large_image',
    title: 'ClearForgeLabs — Modern Websites That Actually Bring You Clients',
    description: 'Fast, mobile-first websites. Free mock. Delivered in 5–10 days.',
    images: ['/og-image.png'],
  },

  // Favicon / icons
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical
  alternates: {
    canonical: 'https://clearforgelabs.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to font CDN for faster load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect to Spline CDN */}
        <link rel="preconnect" href="https://prod.spline.design" />
        {/* Structured data — local business schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'ClearForgeLabs',
              description: 'Fast, mobile-first websites for local businesses. NJ-based, serving businesses nationwide.',
              url: 'https://clearforgelabs.com',
              founder: { '@type': 'Person', name: 'Aavash Lamichhane' },
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'NJ',
                addressCountry: 'US',
              },
              areaServed: { '@type': 'Country', name: 'United States' },
              priceRange: '$500–$2500',
              serviceType: 'Web Design',
            }),
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
