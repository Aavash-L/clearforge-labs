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
const DESCRIPTION =
  'ClearForge Labs is a founder-led software company in New Jersey. We build our own software products, like Site Tally, and custom systems for businesses: internal tools, workflow automation, integrations and websites.'

export const metadata: Metadata = {
  metadataBase: new URL('https://clearforgelabs.com'),

  title: {
    default: 'ClearForge Labs — Software products and custom systems',
    template: '%s | ClearForge Labs',
  },
  description: DESCRIPTION,
  keywords: [
    'ClearForge Labs',
    'software company New Jersey',
    'custom software NJ',
    'internal tools',
    'workflow automation',
    'business integrations',
    'web development NJ',
    'Site Tally',
  ],
  authors: [{ name: 'Aavash Lamichhane', url: 'https://clearforgelabs.com' }],
  creator: 'ClearForge Labs',
  publisher: 'ClearForge Labs',

  // Open Graph (Facebook, LinkedIn, iMessage previews).
  // The share image comes from app/(marketing)/opengraph-image.tsx.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://clearforgelabs.com',
    siteName: 'ClearForge Labs',
    title: 'ClearForge Labs — Software products and custom systems',
    description: 'We build practical software, connect business workflows, and create better digital experiences.',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ClearForge Labs — Software products and custom systems',
    description: 'We build practical software, connect business workflows, and create better digital experiences.',
  },

  icons: {
    icon: [{ url: '/favicon.png', sizes: 'any' }],
    apple: '/favicon.png',
  },

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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to font CDN for faster load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Structured data — organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ClearForge Labs',
              description: DESCRIPTION,
              url: 'https://clearforgelabs.com',
              logo: 'https://clearforgelabs.com/favicon.png',
              founder: { '@type': 'Person', name: 'Aavash Lamichhane' },
              address: { '@type': 'PostalAddress', addressRegion: 'NJ', addressCountry: 'US' },
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
