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
  title: 'Clearforge Labs | Automated Client Systems for Small Businesses',
  description: 'We build fast, modern websites + booking + payments + simple automations so your business captures leads 24/7. Built by Aavash Lamichhane.',
  keywords: ['web development', 'automation', 'stripe integration', 'booking systems', 'small business websites', 'clearforge labs'],
  openGraph: {
    title: 'Clearforge Labs | Automated Client Systems',
    description: 'Fast, modern websites that convert. Booking + payments + automation included.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
