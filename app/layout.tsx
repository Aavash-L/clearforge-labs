import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  metadataBase: new URL('https://clearforgelabs.com'),

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

  openGraph: {
    title: 'Clearforge Labs | Websites + Booking + Stripe Deposits',
    description:
      'Fast, modern websites that convert — booking + Stripe deposits included. NJ-based, founder-led builds.',
    url: 'https://clearforgelabs.com',
    siteName: 'Clearforge Labs',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og.png', // optional (add later). If you don’t have it, leave it — won’t break.
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
    images: ['/og.png'], // optional (add later)
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
