'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import s from './site.module.css'

export type NavItem = { label: string; href: string; current?: boolean }

type Props = {
  links: NavItem[]
  cta: NavItem
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function SiteHeader({ links, cta }: Props) {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = 'site-menu' // one header per page
  const reduce = useReducedMotion()

  // Compact header once the page has moved. The header is fixed and the page
  // reserves its full height, so shrinking it never shifts the content.
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setCompact(window.scrollY > 16))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll) }
  }, [])

  const close = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) buttonRef.current?.focus()
  }, [])

  // While the menu is open: lock page scroll, trap focus, close on Escape or
  // when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    const first = headerRef.current?.querySelector<HTMLElement>(`#${panelId} a`)
    first?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
      if (e.key !== 'Tab' || !headerRef.current) return
      const items = [...headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
        .filter(el => el.offsetParent !== null)
      if (!items.length) return
      const firstEl = items[0], lastEl = items[items.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus() }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus() }
    }
    const mq = window.matchMedia('(min-width: 960px)')
    const onWide = () => { if (mq.matches) close(false) }

    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onWide)
    return () => {
      root.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onWide)
    }
  }, [open, close, panelId])

  // Same-page anchors from the menu: close first so scrolling is unlocked,
  // then jump. Other links navigate normally.
  const onMenuLink = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = href.startsWith('#') ? href : null
    if (!hash) { setOpen(false); return }
    e.preventDefault()
    setOpen(false)
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(hash)
      if (!target) return
      history.pushState(null, '', hash)
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      target.focus({ preventScroll: true })
    })
  }

  const all = [...links, cta]

  return (
    <header ref={headerRef} className={s.header} data-compact={compact || open ? 'true' : 'false'} data-open={open ? 'true' : 'false'}>
      <div className={`${s.wrap} ${s.headerInner}`}>
        <Link href="/" className={s.wordmark} aria-label="ClearForge Labs, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.png" alt="" width={22} height={22} />
          <span>ClearForge Labs</span>
        </Link>

        <nav className={s.navLinks} aria-label="Main">
          {links.map(l => (
            <a key={l.href} href={l.href} className={s.navLink} aria-current={l.current ? 'page' : undefined}>{l.label}</a>
          ))}
        </nav>

        <div className={s.headerActions}>
          <a href={cta.href} className={`${s.textLink} ${s.headerCta}`}>{cta.label} <ArrowRight size={15} aria-hidden="true" /></a>
          <button
            ref={buttonRef}
            type="button"
            className={s.menuButton}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen(o => !o)}
          >
            <span className={s.menuIcon} aria-hidden="true"><span /><span /></span>
            <span className={s.menuLabel}>{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            className={s.menuPanel}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className={s.wrap} aria-label="Main menu">
              <ul className={s.menuList}>
                {all.map((l, i) => (
                  <motion.li
                    key={l.href}
                    className={s.menuItem}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: reduce ? 0 : 0.03 * i + 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a href={l.href} className={s.menuLink} onClick={onMenuLink(l.href)}>
                      {l.label}<ArrowRight size={20} aria-hidden="true" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className={s.menuFoot}>
                <p className={s.menuNote}>ClearForge Labs · New Jersey</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
