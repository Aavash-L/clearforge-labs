'use client'

import { useEffect, useRef, useState, useCallback, memo } from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import {
  motion, useScroll, useTransform, useInView, AnimatePresence
} from 'framer-motion'
import {
  ArrowRight, CheckCircle, Clock, CreditCard, MessageCircle,
  Zap, Shield, ChevronDown, Calendar, Globe, Smartphone,
  BarChart3, Lock, X, Sun, Moon, ExternalLink, Star, Quote
} from 'lucide-react'

import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'

// ── Tokens ────────────────────────────────────────────────
function tk(dark: boolean) {
  return {
    bg:          dark ? '#0c0c0c'                    : '#ffffff',
    bgAlt:       dark ? '#111111'                    : '#f7f7f7',
    bgSubtle:    dark ? '#1a1a1a'                    : '#f0f0f0',
    card:        dark ? '#141414'                    : '#ffffff',
    cardBorder:  dark ? 'rgba(255,255,255,0.08)'     : 'rgba(0,0,0,0.08)',
    borderSub:   dark ? 'rgba(255,255,255,0.14)'     : 'rgba(0,0,0,0.14)',
    text:        dark ? '#f0f0f0'                    : '#0c0c0c',
    textSub:     dark ? '#888888'                    : '#555555',
    muted:       dark ? '#444444'                    : '#aaaaaa',
    nav:         dark ? 'rgba(12,12,12,0.95)'        : 'rgba(255,255,255,0.95)',
    modal:       dark ? '#141414'                    : '#ffffff',
    overlay:     dark ? 'rgba(0,0,0,0.88)'           : 'rgba(0,0,0,0.5)',
    input:       dark ? 'rgba(255,255,255,0.05)'     : 'rgba(0,0,0,0.04)',
    inputBorder: dark ? 'rgba(255,255,255,0.1)'      : 'rgba(0,0,0,0.1)',
    heroGrad:    dark
      ? 'linear-gradient(to bottom,rgba(12,12,12,0.15) 0%,rgba(12,12,12,0.05) 40%,rgba(12,12,12,0.97) 88%)'
      : 'linear-gradient(to bottom,rgba(255,255,255,0.15) 0%,rgba(255,255,255,0.05) 40%,rgba(255,255,255,0.97) 88%)',
    btnBg:       dark ? '#f0f0f0'  : '#0c0c0c',
    btnTxt:      dark ? '#0c0c0c'  : '#ffffff',
    shadow:      dark ? '0 1px 12px rgba(0,0,0,0.6)' : '0 1px 12px rgba(0,0,0,0.06)',
    shadowMd:    dark ? '0 8px 40px rgba(0,0,0,0.7)' : '0 8px 40px rgba(0,0,0,0.1)',
  }
}

// ── Helpers ───────────────────────────────────────────────
// ── Memoized FadeIn (avoids re-renders on scroll) ─────────
const FadeIn = memo(function FadeIn({
  children, delay = 0, style = {}
}: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
})

const SectionLabel = memo(function SectionLabel({ text, dark: d }: { text: string; dark: boolean }) {
  const c = tk(d)
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: c.muted, marginBottom: 14 }}>
      {text}
    </p>
  )
})

// ── Booking Modal ─────────────────────────────────────────
const GCAL_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1fXnsNiypWIUeTE3Mgtm6PPUYxWCtW_E3NiN8wQv0kAiCSaU7zGJUTfhePcfJMdFuqbZKwGNKE?gv=true'

const BookingModal = memo(function BookingModal({ open, onClose, dark: d }: { open: boolean; onClose: () => void; dark: boolean }) {
  const c = tk(d)

  // Prevent body scroll when modal open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16,
            background: c.overlay,
            backdropFilter: 'blur(10px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 720,
              background: c.modal,
              border: `1px solid ${c.cardBorder}`,
              borderRadius: 18,
              overflow: 'hidden',
              boxShadow: c.shadowMd,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '92vh',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: `1px solid ${c.cardBorder}`,
              flexShrink: 0,
            }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: c.muted, marginBottom: 2 }}>
                  Free Mock Website
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: c.text, letterSpacing: '-0.02em' }}>
                  Pick a time that works for you
                </h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: c.bgSubtle, border: `1px solid ${c.cardBorder}`,
                  borderRadius: 8, cursor: 'pointer', color: c.textSub,
                  padding: 7, display: 'flex', flexShrink: 0,
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Google Calendar iframe */}
            <div style={{ flex: 1, overflowY: 'auto', background: d ? '#0c0c0c' : '#ffffff' }}>
              <iframe
                src={GCAL_URL}
                style={{ border: 'none', display: 'block', background: 'transparent' }}
                width="100%"
                height="600"
                loading="lazy"
                title="Book a free call with ClearForgeLabs"
              />
            </div>

            {/* Footer note */}
            <div style={{
              padding: '10px 20px',
              borderTop: `1px solid ${c.cardBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <p style={{ fontSize: 11, color: c.muted, textAlign: 'center' }}>
                15-min call · No pitch · Aavash responds within 24 hrs
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

// ── Site Preview Modal ────────────────────────────────────
const SitePreviewModal = memo(function SitePreviewModal({ site, onClose, dark: d }: { site: { name: string; url: string } | null; onClose: () => void; dark: boolean }) {
  const c = tk(d)
  useEffect(() => {
    if (site) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [site])

  return (
    <AnimatePresence>
      {site && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: c.overlay, backdropFilter: 'blur(12px)' }}>
          <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 1100, height: '88vh', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: c.modal, border: `1px solid ${c.borderSub}`, boxShadow: '0 24px 80px rgba(0,0,0,0.45)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: d ? '#1c1c1c' : '#ebebeb', borderBottom: `1px solid ${c.cardBorder}`, flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {['#ff5f56','#ffbd2e','#27c93f'].map((col, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: col }} />)}
              </div>
              <div style={{ flex: 1, margin: '0 10px', padding: '5px 12px', borderRadius: 6, background: d ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Lock size={9} color={c.muted} />
                <span style={{ fontSize: 11, color: c.muted, fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{site.url}</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <a href={site.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, background: d ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', color: c.textSub, fontSize: 11, fontWeight: 600, textDecoration: 'none' }}>
                  <ExternalLink size={10} /> Open
                </a>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.muted, display: 'flex', padding: 4 }}><X size={14} /></button>
              </div>
            </div>
            <iframe src={site.url} title={site.name} style={{ flex: 1, border: 'none', width: '100%' }} loading="lazy" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

// ── Ticker ────────────────────────────────────────────────
const TICKER_ITEMS = ['NJ-Based Builder','5–10 Day Delivery','Payment Integration','Mobile-First','Direct Communication','No Middlemen','SEO Ready','Booking Systems','Max 3 Clients','Founder-Led']

const Ticker = memo(function Ticker({ dark: d }: { dark: boolean }) {
  const c = tk(d)
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div style={{ overflow: 'hidden', padding: '11px 0', borderTop: `1px solid ${c.cardBorder}`, borderBottom: `1px solid ${c.cardBorder}` }}>
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 52, whiteSpace: 'nowrap' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 500, color: c.muted }}>
            <span style={{ fontSize: 5, color: c.textSub }}>●</span>{item}
          </span>
        ))}
      </motion.div>
    </div>
  )
})

// ── Pricing Card ──────────────────────────────────────────
const PricingCard = memo(function PricingCard({ dark: d, tier, price, sub, desc, features, popular, onBook }: {
  dark: boolean; tier: string; price: string; sub: string; desc: string
  features: string[]; popular?: boolean; onBook: () => void
}) {
  const c = tk(d)
  const invText = popular ? (d ? 'rgba(12,12,12,0.55)' : 'rgba(240,240,240,0.65)') : c.textSub
  const invFeat = popular ? (d ? 'rgba(12,12,12,0.75)' : 'rgba(255,255,255,0.82)') : c.textSub
  const divider = popular ? (d ? 'rgba(12,12,12,0.12)' : 'rgba(255,255,255,0.15)') : c.cardBorder

  return (
    <div style={{
      position: 'relative', borderRadius: 14, padding: '28px 24px',
      background: popular ? c.btnBg : c.card,
      border: popular ? 'none' : `1px solid ${c.cardBorder}`,
      boxShadow: popular ? c.shadowMd : c.shadow,
      display: 'flex', flexDirection: 'column', height: '100%',
    }}>
      {popular && (
        <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)' }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: d ? '#f0f0f0' : '#0c0c0c', color: d ? '#0c0c0c' : '#f0f0f0', whiteSpace: 'nowrap' }}>
            Popular
          </span>
        </div>
      )}
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: popular ? invText : c.muted, marginBottom: 16 }}>{tier}</p>
      <div style={{ marginBottom: 6 }}>
        <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-0.04em', color: popular ? c.btnTxt : c.text }}>{price}</span>
        <span style={{ fontSize: 13, color: invText, marginLeft: 4 }}>{sub}</span>
      </div>
      <p style={{ fontSize: 13, color: invText, lineHeight: 1.6, marginBottom: 22, minHeight: 40 }}>{desc}</p>
      <div style={{ height: 1, background: divider, marginBottom: 18 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1, marginBottom: 22 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
            <CheckCircle size={13} color={popular ? (d ? 'rgba(12,12,12,0.55)' : 'rgba(255,255,255,0.65)') : c.textSub} style={{ marginTop: 1, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: invFeat, lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
      </div>
      <button onClick={onBook} style={{
        width: '100%', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 13,
        cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em', border: 'none',
        background: popular ? (d ? 'rgba(12,12,12,0.12)' : 'rgba(255,255,255,0.18)') : c.btnBg,
        color: popular ? c.btnTxt : c.btnTxt,
        transition: 'opacity 0.18s',
      }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.78')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Get started →
      </button>
    </div>
  )
})

// ── Testimonials data ─────────────────────────────────────
const REVIEWS = [
  { name: 'Marcus T.',  role: 'Owner, Urban Slice Pizza',       loc: 'Newark, NJ',      initials: 'MT', text: "Aavash built our site in under a week and it already looks better than places open for 20 years. We started getting online orders the same week we launched. No back and forth — just results." },
  { name: 'Ganga K.',   role: 'Owner, Urmi Threading',          loc: 'Edison, NJ',     initials: 'GK', text: "Aavash completely transformed our online presence. The booking system is seamless and my clients love how professional the new site looks. It has made managing appointments so much easier!" },
  { name: 'Dylan M.',   role: 'Founder, Dominus Capital',       loc: 'New York, NY',   initials: 'DM', text: "Dominus Capital needed a high-end digital presence that reflected our brand's authority. Aavash delivered a clean, sophisticated site that has significantly improved our conversion rates and investor confidence." },
  { name: 'Lena K.',   role: 'Owner, Bloom Nail Studio',         loc: 'Jersey City, NJ',initials: 'LK', text: "I had zero website before this. Aavash walked me through everything and delivered something that looks like it belongs to a brand 10x my size. Clients literally compliment the site in person." },
  { name: 'Tony R.',   role: 'Owner, RT Contracting LLC',        loc: 'Trenton, NJ',    initials: 'TR', text: "Bigger agencies were quoting me $8k+. Aavash delivered faster, communicated better, and the result is cleaner than anything they showed me. My quote requests doubled in two weeks." },
  { name: 'Shane L.',   role: 'Manager, Wingciti Cafe',         loc: 'Piscataway, NJ', initials: 'SL', text: "Our experience with ClearForgeLabs was top-notch. The team at Wingciti Cafe couldn't be happier with our new, fast-loading site. It’s significantly improved our local search ranking and foot traffic." },
]

const WORKS = [
  { name: 'Dominus Capital',       type: 'Trading / Finance', url: 'https://www.dominuscapitalofficial.com/', tag: 'Multi-page + Discord CTA' },
  { name: 'Wings Citi Cafe',       type: 'Restaurant / Food', url: 'https://www.wingsciticafe.com/',          tag: 'Menu + Online Ordering' },
  { name: 'Urmi Threading Salon',  type: 'Beauty / Salon',    url: 'https://www.urmithreadingsalon.com/',     tag: 'Booking + Gallery' },
]

// ── Main ──────────────────────────────────────────────────
export default function ClearForgeLabs() {
  const [dark, setDark]           = useState(false)   // ← DEFAULT LIGHT
  const [modalOpen, setModalOpen] = useState(false)
  const [preview, setPreview]     = useState<{ name: string; url: string } | null>(null)
  const [scrollY, setScrollY]     = useState(0)
  const [mobile, setMobile]       = useState(false)
  const [mounted, setMounted]     = useState(false)

  useEffect(() => setMounted(true), [])

  const heroRef             = useRef(null)
  const { scrollYProgress } = useScroll()
  const heroOp              = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroMoveY           = useTransform(scrollYProgress, [0, 0.2], [0, -36])

  useEffect(() => {
    const s = () => setScrollY(window.scrollY)
    const r = () => setMobile(window.innerWidth < 768)
    r()
    window.addEventListener('scroll', s)
    window.addEventListener('resize', r)
    return () => { window.removeEventListener('scroll', s); window.removeEventListener('resize', r) }
  }, [])

  const openModal  = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])
  const closePreview = useCallback(() => setPreview(null), [])

  const c = tk(dark)
  const sp = mobile ? '56px 20px' : '88px 60px'
  const mw = 980
  const col2 = mobile ? '1fr' : '1fr 1fr'
  const col3 = mobile ? '1fr' : '1fr 1fr 1fr'
  const col4 = mobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr'

  if (!mounted) return null

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          /* prevent layout shift from scrollbar */
          scrollbar-gutter: stable;
        }
        /* Prevent zoom on input focus on iOS */
        input, select, textarea { font-size: 16px !important; font-family: inherit; }
        /* Better tap targets on mobile */
        button, a { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        ::selection { background: ${dark ? '#f0f0f0' : '#0c0c0c'}; color: ${dark ? '#0c0c0c' : '#ffffff'}; }
        a { text-decoration: none; }
        iframe { display: block; }
        @keyframes pulseRed { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.7);opacity:0} }
        @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        .slot-dot { width:7px;height:7px;border-radius:50%;background:#ef4444;display:inline-block;position:relative;flex-shrink:0 }
        .slot-dot::after { content:'';position:absolute;inset:0;border-radius:50%;background:#ef4444;animation:pulseRed 1.6s ease-out infinite }
        .bob { animation:bob 1.8s ease-in-out infinite }
        /* Smooth theme transition */
        * { transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease; }
        /* Override transition for things that shouldn't animate */
        iframe, img, video, canvas { transition: none !important; }
      `}</style>

      <div suppressHydrationWarning style={{ background: c.bg, color: c.text, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>

        {/* ══ NAV ══ */}
        <motion.nav initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: mobile ? '14px 20px' : '14px 48px',
            background: scrollY > 50 ? c.nav : 'transparent',
            backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
            borderBottom: scrollY > 50 ? `1px solid ${c.cardBorder}` : 'none',
            transition: 'all 0.28s' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/favicon.png" alt="ClearForgeLabs Logo" style={{ width: 28, height: 28, borderRadius: 7, objectFit: 'cover' }} />
            <span style={{ fontWeight: 800, fontSize: 13, color: c.text, letterSpacing: '-0.02em' }}>ClearForgeLabs</span>
          </div>
          {/* Links */}
          {!mobile && (
            <div style={{ display: 'flex', gap: 32 }}>
              {[['Work','#work'],['Pricing','#pricing'],['Reviews','#reviews'],['About','#about']].map(([l,h]) => (
                <a key={l} href={h} style={{ color: c.textSub, fontSize: 13, fontWeight: 500, transition: 'color 0.18s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = c.text)}
                  onMouseLeave={e => (e.currentTarget.style.color = c.textSub)}>{l}</a>
              ))}
            </div>
          )}
          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setDark(!dark)}
              style={{ width: 32, height: 32, borderRadius: 8, background: c.bgSubtle, border: `1px solid ${c.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: c.textSub }}>
              {dark ? <Sun size={13} /> : <Moon size={13} />}
            </button>
            <button onClick={openModal}
              style={{ padding: '9px 18px', borderRadius: 9, background: c.btnBg, color: c.btnTxt, fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', letterSpacing: '-0.01em', whiteSpace: 'nowrap', transition: 'opacity 0.18s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Get Free Mock
            </button>
          </div>
        </motion.nav>

        {/* ══ HERO ══ */}
        <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: 80 }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Card className="w-full h-full bg-transparent border-0 rounded-none overflow-hidden">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill={dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} />
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
            </Card>
          </div>
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: c.heroGrad, pointerEvents: 'none' }} />

          <motion.div style={{ opacity: heroOp, y: heroMoveY, position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: mobile ? '60px 20px 100px' : '60px 24px 120px' }}>
            {/* Slot badge */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ marginBottom: 28, display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 12px', borderRadius: 999, background: c.bgSubtle, border: `1px solid ${c.cardBorder}` }}>
              <span className="slot-dot" />
              <span style={{ fontSize: 12, fontWeight: 500, color: c.textSub }}>1 slot open this month</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.22,1,0.36,1] }}
              style={{ fontSize: 'clamp(38px,7vw,82px)', fontWeight: 900, lineHeight: 0.96, letterSpacing: '-0.035em', color: c.text, marginBottom: 22 }}>
              Modern websites that<br />
              <span style={{ color: c.text }}>actually bring you</span><br />
              clients.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}
              style={{
                fontSize: mobile ? 15 : 17, color: c.textSub, maxWidth: 460, lineHeight: 1.65, marginBottom: 32, letterSpacing: '-0.01em',
                background: dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)',
                padding: '12px 20px', borderRadius: 12, backdropFilter: 'blur(10px)',
                border: `1px solid ${c.cardBorder}`,
              }}>
              Fast, mobile-first websites with payment integration and booking built in. Delivered in 5–10 days. Built in NJ, serving businesses nationwide.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
              <button onClick={openModal}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 11, background: c.btnBg, color: c.btnTxt, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', letterSpacing: '-0.01em', transition: 'opacity 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Get Free Mock Website <ArrowRight size={15} />
              </button>
              <a href="#work"
                style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '14px 28px', borderRadius: 11, color: c.textSub, fontWeight: 600, fontSize: 15, background: c.bgSubtle, border: `1px solid ${c.cardBorder}`, transition: 'color 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.color = c.text)}
                onMouseLeave={e => (e.currentTarget.style.color = c.textSub)}>
                See the Work
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.78 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {[
                { icon: <Clock size={11}/>,        text: '5–10 day delivery' },
                { icon: <CreditCard size={11}/>,   text: 'Payment integration built in' },
                { icon: <MessageCircle size={11}/>,text: 'Talk directly to Aavash' },
              ].map((p, i) => (
                <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 12px', borderRadius:999, background:c.bgSubtle, border:`1px solid ${c.cardBorder}`, fontSize:12, color:c.textSub }}>
                  <span style={{ opacity: 0.7 }}>{p.icon}</span>{p.text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:5, color:c.muted }}>
            <span style={{ fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase' }}>Scroll</span>
            <div className="bob"><ChevronDown size={14} /></div>
          </motion.div>
        </section>

        <Ticker dark={dark} />

        {/* ══ STATS ══ */}
        <section style={{ padding: sp }}>
          <div style={{ maxWidth: mw, margin: '0 auto', display: 'grid', gridTemplateColumns: col4, gap: 12 }}>
            {[
              { num:'3',     label:'Live client sites' },
              { num:'5–10',  label:'Day delivery' },
              { num:'100%',  label:'Founder-led' },
              { num:'3 max', label:'Clients at once' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ padding:'22px 20px', borderRadius:12, background:c.card, border:`1px solid ${c.cardBorder}`, textAlign:'center', boxShadow:c.shadow }}>
                  <div style={{ fontSize:28, fontWeight:900, letterSpacing:'-0.03em', color:c.text, marginBottom:4 }}>{s.num}</div>
                  <div style={{ fontSize:12, color:c.textSub, fontWeight:500 }}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section style={{ padding: sp, borderTop:`1px solid ${c.cardBorder}` }}>
          <div style={{ maxWidth: mw, margin: '0 auto' }}>
            <FadeIn>
              <SectionLabel text="How it works" dark={dark} />
              <h2 style={{ fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:c.text, marginBottom:48, letterSpacing:'-0.025em', lineHeight:1.1 }}>
                From first call to live site<br />in under two weeks.
              </h2>
            </FadeIn>
            <div style={{ display:'grid', gridTemplateColumns:col4, gap:12 }}>
              {[
                { n: '01', title: 'Free mock call', desc: '15 min. Tell me about your business. I ask the right questions so the mock hits first time.', icon: <Calendar size={16} /> },
                { n:'02', title:'Mock delivered',    desc:"Full design preview in 3–5 days. You see exactly what you're getting before a single dollar changes hands.",             icon:<Globe size={16}/> },
                { n:'03', title:'Approve + deposit', desc:"Love it? Sign a one-page agreement and pay 50% up front. I start building that same day.",                            icon:<Lock size={16}/> },
                { n:'04', title:'You go live',       desc:"5–10 days later your site is live. No surprise fees, no delays.",                           icon:<Zap size={16}/> },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.08} style={{ height:'100%' }}>
                  <div style={{ padding:22, borderRadius:12, background:c.card, border:`1px solid ${c.cardBorder}`, height:'100%', boxShadow:c.shadow, position:'relative' }}>
                    <div style={{ position:'absolute', top:14, right:16, fontSize:20, fontWeight:900, color: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', letterSpacing:'-0.02em' }}>{item.n}</div>
                    <div style={{ width:32, height:32, borderRadius:8, background:c.bgSubtle, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14, color:c.textSub }}>{item.icon}</div>
                    <div style={{ fontWeight:700, fontSize:14, color:c.text, marginBottom:7, letterSpacing:'-0.015em' }}>{item.title}</div>
                    <div style={{ fontSize:12, color:c.textSub, lineHeight:1.65 }}>{item.desc}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PORTFOLIO ══ */}
        <section id="work" style={{ padding: sp, borderTop:`1px solid ${c.cardBorder}` }}>
          <div style={{ maxWidth: mw, margin: '0 auto' }}>
            <FadeIn>
              <SectionLabel text="Portfolio" dark={dark} />
              <h2 style={{ fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:c.text, marginBottom:10, letterSpacing:'-0.025em', lineHeight:1.1 }}>
                Real sites.<br />Real businesses.
              </h2>
              <p style={{ fontSize:13, color:c.textSub, marginBottom:40, maxWidth:380, lineHeight:1.6 }}>
                Every site was built personally by Aavash — no templates, no outsourcing. Click any card to preview live.
              </p>
            </FadeIn>
            <div style={{ display:'grid', gridTemplateColumns:col3, gap:16 }}>
              {WORKS.map((w, i) => (
                <FadeIn key={i} delay={i * 0.09}>
                  <div onClick={() => setPreview({ name: w.name, url: w.url })}
                    style={{ borderRadius:12, overflow:'hidden', border:`1px solid ${c.cardBorder}`, background:c.card, cursor:'pointer', boxShadow:c.shadow, transition:'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow=c.shadowMd }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow=c.shadow }}>
                    <div style={{ aspectRatio:'16/9', position:'relative', overflow:'hidden', background: dark ? '#1a1a1a' : '#e8e8e8' }}>
                      <iframe src={w.url} title={w.name} scrolling="no" loading="lazy"
                        style={{ width:'200%', height:'200%', transform:'scale(0.5)', transformOrigin:'top left', border:'none', pointerEvents:'none' }} />
                    </div>
                    <div style={{ padding:'14px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:3 }}>
                        <span style={{ fontWeight:700, fontSize:13, color:c.text, letterSpacing:'-0.01em' }}>{w.name}</span>
                        <ExternalLink size={11} color={c.muted} />
                      </div>
                      <div style={{ fontSize:11, color:c.muted, marginBottom:9 }}>{w.type}</div>
                      <span style={{ fontSize:11, padding:'3px 9px', borderRadius:5, background:c.bgSubtle, color:c.textSub, fontWeight:600, border:`1px solid ${c.cardBorder}` }}>{w.tag}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRICING ══ */}
        <section id="pricing" style={{ padding: sp, borderTop:`1px solid ${c.cardBorder}`, background: dark ? '#0e0e0e' : '#f7f7f7' }}>
          <div style={{ maxWidth: mw, margin: '0 auto' }}>
            <FadeIn>
              <SectionLabel text="Pricing" dark={dark} />
              <h2 style={{ fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:c.text, marginBottom:10, letterSpacing:'-0.025em', lineHeight:1.1 }}>
                Simple pricing.<br />No surprises.
              </h2>
              <p style={{ fontSize:13, color:c.textSub, marginBottom:10, maxWidth:420, lineHeight:1.6 }}>
                50% upfront, 50% on launch. All packages include a free mock before you commit.
              </p>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 12px', borderRadius:999, background:c.card, border:`1px solid ${c.cardBorder}`, marginBottom:44 }}>
                <CheckCircle size={11} color={c.textSub} />
                <span style={{ fontSize:12, color:c.textSub }}>Free mock website included — no commitment until you approve</span>
              </div>
            </FadeIn>

            <div style={{ display:'grid', gridTemplateColumns:col3, gap:16, alignItems:'start' }}>
              <FadeIn delay={0}>
                <PricingCard dark={dark} tier="Starter" price="$500" sub="setup" onBook={openModal}
                  desc="Perfect for restaurants, salons, and solo contractors who need a clean, professional presence online."
                  features={['1–3 page website','Mobile responsive','Contact form','Google Maps embed','Basic SEO setup','5–7 day delivery']} />
              </FadeIn>
              <FadeIn delay={0.1}>
                <PricingCard dark={dark} tier="Growth" price="$1,500" sub="setup" popular onBook={openModal}
                  desc="For businesses ready to convert visitors. Booking, Stripe deposits, SEO, and Google integration included."
                  features={['4–6 page website','Booking system setup','Payment integration','On-page SEO','Google Business integration','Analytics setup','7–10 day delivery']} />
              </FadeIn>
              <FadeIn delay={0.2}>
                <PricingCard dark={dark} tier="Pro" price="$2,500" sub="setup" onBook={openModal}
                  desc="Full custom build for businesses that want to dominate their local market and grow online."
                  features={['Full custom design','CMS / blog setup','Email capture + automation','Social media setup','Advanced SEO','Speed optimization','Monthly maintenance option']} />
              </FadeIn>
            </div>

            {/* Maintenance add-on */}
            <FadeIn delay={0.3}>
              <div style={{ marginTop:16, padding:'18px 22px', borderRadius:12, background:c.card, border:`1px solid ${c.cardBorder}`, display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12, boxShadow:c.shadow }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:13, color:c.text, letterSpacing:'-0.01em' }}>Monthly maintenance</div>
                  <div style={{ fontSize:12, color:c.textSub, marginTop:2 }}>Updates, backups, uptime monitoring, and priority support.</div>
                </div>
                <div style={{ fontWeight:900, fontSize:22, color:c.text, letterSpacing:'-0.03em' }}>
                  $50<span style={{ fontSize:13, fontWeight:400, color:c.textSub }}>/mo</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section id="reviews" style={{ padding: sp, borderTop:`1px solid ${c.cardBorder}` }}>
          <div style={{ maxWidth: mw, margin: '0 auto' }}>
            <FadeIn>
              <SectionLabel text="Client Reviews" dark={dark} />
              <h2 style={{ fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:c.text, marginBottom:10, letterSpacing:'-0.025em', lineHeight:1.1 }}>
                What our clients say.
              </h2>
              <p style={{ fontSize:13, color:c.textSub, marginBottom:14, maxWidth:360, lineHeight:1.6 }}>Real businesses. Real results.</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'9px 16px', borderRadius:10, background:c.card, border:`1px solid ${c.cardBorder}`, marginBottom:36, boxShadow:c.shadow }}>
                <div style={{ display:'flex', gap:2 }}>
                  {[...Array(5)].map((_,i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <span style={{ fontWeight:800, fontSize:14, color:c.text, letterSpacing:'-0.02em' }}>5.0</span>
                <div style={{ width:1, height:14, background:c.cardBorder }} />
                <span style={{ fontSize:12, color:c.textSub }}>6 verified reviews</span>
              </div>
            </FadeIn>
            <div style={{ display:'grid', gridTemplateColumns:col3, gap:14 }}>
              {REVIEWS.map((r, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div style={{ padding:22, borderRadius:12, background:c.card, border:`1px solid ${c.cardBorder}`, boxShadow:c.shadow, display:'flex', flexDirection:'column', gap:14, height:'100%' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div style={{ display:'flex', gap:2 }}>
                        {[...Array(5)].map((_,j) => <Star key={j} size={11} fill="#f59e0b" color="#f59e0b" />)}
                      </div>
                      <Quote size={14} color={c.muted} style={{ opacity:0.35 }} />
                    </div>
                    <p style={{ fontSize:12, color:c.textSub, lineHeight:1.72, flex:1 }}>"{r.text}"</p>
                    <div style={{ display:'flex', alignItems:'center', gap:10, paddingTop:12, borderTop:`1px solid ${c.cardBorder}` }}>
                      <div style={{ width:32, height:32, borderRadius:'50%', background:c.bgSubtle, border:`1px solid ${c.cardBorder}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <span style={{ fontSize:10, fontWeight:800, color:c.textSub }}>{r.initials}</span>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:700, fontSize:12, color:c.text, letterSpacing:'-0.01em' }}>{r.name}</div>
                        <div style={{ fontSize:10, color:c.muted, marginTop:1 }}>{r.role}</div>
                      </div>
                      <span style={{ fontSize:10, color:c.muted, flexShrink:0 }}>{r.loc}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section style={{ padding: sp, borderTop:`1px solid ${c.cardBorder}`, background: dark ? '#0e0e0e' : '#f7f7f7' }}>
          <div style={{ maxWidth: mw, margin: '0 auto' }}>
            <FadeIn>
              <SectionLabel text="Every build includes" dark={dark} />
              <h2 style={{ fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:c.text, marginBottom:48, letterSpacing:'-0.025em', lineHeight:1.1 }}>
                Built to perform,<br />not just look good.
              </h2>
            </FadeIn>
            <div style={{ display:'grid', gridTemplateColumns:col3, gap:12 }}>
              {[
                { icon:<Smartphone size={14}/>, title:'Mobile-first',    desc:'Designed for phones first. Works perfectly on every screen size.' },
                { icon:<Zap size={14}/>,        title:'Fast load times', desc:'Optimized for Core Web Vitals. Speed affects your Google ranking.' },
                { icon:<BarChart3 size={14}/>,  title:'SEO foundation',  desc:'Meta tags, sitemaps, structured data — Google finds you from day one.' },
                { icon:<CreditCard size={14}/>, title:'Payment integration', desc:'Collect payments at booking automatically. No-shows drop immediately.' },
                { icon:<Calendar size={14}/>,   title:'Booking system',  desc:'Calendly or custom booking embedded and live at launch.' },
                { icon:<Shield size={14}/>,     title:'SSL + Security',  desc:'HTTPS, security headers, and industry best practices built in.' },
              ].map((f, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:12, padding:18, borderRadius:10, background:c.card, border:`1px solid ${c.cardBorder}`, boxShadow:c.shadow }}>
                    <div style={{ width:30, height:30, borderRadius:7, background:c.bgSubtle, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:c.textSub }}>{f.icon}</div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:13, color:c.text, marginBottom:3, letterSpacing:'-0.01em' }}>{f.title}</div>
                      <div style={{ fontSize:12, color:c.textSub, lineHeight:1.6 }}>{f.desc}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section id="about" style={{ padding: sp, borderTop:`1px solid ${c.cardBorder}` }}>
          <div style={{ maxWidth: mw, margin:'0 auto', display:'grid', gridTemplateColumns:col2, gap: mobile ? 40 : 80, alignItems:'center' }}>
            <FadeIn>
              <SectionLabel text="The builder" dark={dark} />
              <h2 style={{ fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:c.text, marginBottom:18, letterSpacing:'-0.025em' }}>Hi, I'm Aavash.</h2>
              {[
                "I'm a college student from New Jersey building websites for local businesses across the USA. Every site under ClearForgeLabs is built by me personally — no contractors, no templates, no layers.",
                "I cap at 3 clients at a time so every build gets real attention. You get my direct line, fast replies, and a site that's live in days — not months.",
                "I've built for trading platforms, restaurants, and salons in the NYC metro. I know what makes local business sites convert — and I'll build that for you.",
              ].map((p, i) => (
                <p key={i} style={{ fontSize:14, color:c.textSub, lineHeight:1.75, marginBottom:14 }}>{p}</p>
              ))}
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:10 }}>
                {['NJ-based · NYC + nationwide','You work directly with me','Fast replies, real deadlines','Max 3 clients for quality'].map((item, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <CheckCircle size={12} color={c.textSub} style={{ flexShrink:0 }} />
                    <span style={{ fontSize:13, color:c.textSub }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ borderRadius:14, background:c.card, border:`1px solid ${c.cardBorder}`, padding: mobile ? 28 : 44, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', minHeight:300, justifyContent:'center', boxShadow:c.shadow }}>
                <div style={{ width:90, height:90, borderRadius:20, overflow:'hidden', border:`1px solid ${c.cardBorder}`, marginBottom:16 }}>
                  <img src="/headshot.jpg" alt="Aavash Lamichhane" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
                <div style={{ fontWeight:800, color:c.text, fontSize:16, letterSpacing:'-0.02em' }}>Aavash Lamichhane</div>
                <div style={{ fontSize:12, color:c.textSub, marginTop:3 }}>Founder, ClearForgeLabs</div>
                <div style={{ fontSize:11, color:c.muted, marginTop:2 }}>NJ · Est. 2026</div>
                <div style={{ marginTop:20, padding:'12px 22px', borderRadius:10, background:c.bgSubtle, border:`1px solid ${c.cardBorder}` }}>
                  <div style={{ fontSize:24, fontWeight:900, color:c.text, letterSpacing:'-0.03em' }}>3</div>
                  <div style={{ fontSize:11, color:c.muted, marginTop:1 }}>max clients at once</div>
                </div>
                <div style={{ display:'flex', gap:7, marginTop:16 }}>
                  {['NJ Based','Fast','Direct Line'].map(b => (
                    <span key={b} style={{ fontSize:10, padding:'3px 9px', borderRadius:5, background:c.bgSubtle, border:`1px solid ${c.cardBorder}`, color:c.muted, fontWeight:600 }}>{b}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section style={{ padding: mobile ? '80px 20px' : '100px 60px', borderTop:`1px solid ${c.cardBorder}`, background: dark ? '#111' : '#f0f0f0' }}>
          <div style={{ maxWidth:640, margin:'0 auto', textAlign:'center' }}>
            <FadeIn>
              <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'6px 12px', borderRadius:999, background:c.bgSubtle, border:`1px solid ${c.cardBorder}`, marginBottom:24 }}>
                <span className="slot-dot" />
                <span style={{ fontSize:12, fontWeight:500, color:c.textSub }}>1 slot remaining this month</span>
              </div>
              <h2 style={{ fontSize:'clamp(30px,5vw,56px)', fontWeight:900, color:c.text, lineHeight:1.05, marginBottom:16, letterSpacing:'-0.03em' }}>
                Your competitors<br />already have a site.<br />
                <span style={{ color: dark ? 'rgba(240,240,240,0.35)' : 'rgba(12,12,12,0.3)' }}>Do it better.</span>
              </h2>
              <p style={{ fontSize:15, color:c.textSub, marginBottom:30, lineHeight:1.65 }}>
                Get a free mock website — no pitch, no obligation. Just see what your site could look like before you decide anything.
              </p>
              <button onClick={openModal}
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'15px 32px', borderRadius:12, background:c.btnBg, color:c.btnTxt, fontWeight:700, fontSize:15, border:'none', cursor:'pointer', letterSpacing:'-0.01em', transition:'opacity 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Get Free Mock Website <ArrowRight size={15} />
              </button>
              <p style={{ marginTop:14, fontSize:12, color:c.muted }}>No commitment until you approve the design.</p>
            </FadeIn>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{ padding:'24px 48px', borderTop:`1px solid ${c.cardBorder}` }}>
          <div style={{ maxWidth:mw, margin:'0 auto', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7 }}>
              <img src="/favicon.png" alt="ClearForgeLabs Logo" style={{ width: 22, height: 22, borderRadius: 5, objectFit: 'cover' }} />
              <span style={{ fontWeight:700, fontSize:12, color:c.text, letterSpacing:'-0.01em' }}>ClearForgeLabs</span>
            </div>
            <span style={{ fontSize:11, color:c.muted }}>© 2026 ClearForgeLabs · NJ-based · Built by Aavash Lamichhane</span>
            <button onClick={openModal}
              style={{ fontSize:12, fontWeight:700, color:c.textSub, background:'none', border:'none', cursor:'pointer', letterSpacing:'-0.01em' }}>
              Get free mock →
            </button>
          </div>
        </footer>

        </div>

      <BookingModal open={modalOpen} onClose={closeModal} dark={dark} />
      <SitePreviewModal site={preview} onClose={closePreview} dark={dark} />
    </>
  )
}
