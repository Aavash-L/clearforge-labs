import { Geist, Geist_Mono, Newsreader } from 'next/font/google'
import s from '@/components/site/site.module.css'

// Self-hosted at build time by next/font (all SIL Open Font License).
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})

// Entrances are progressive enhancement: content is visible by default and
// only starts hidden once this runs (before paint) with motion allowed.
const MOTION_FLAG = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-motion','')}catch(e){}`

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geist.variable} ${geistMono.variable} ${newsreader.variable} ${s.site}`}>
      <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />
      <a href="#main" className={s.skip}>Skip to content</a>
      {children}
    </div>
  )
}
