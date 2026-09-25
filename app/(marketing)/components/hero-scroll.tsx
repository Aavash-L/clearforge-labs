'use client'

import { useEffect, useRef } from 'react'

/**
 * Publishes the hero's scroll-out progress (0–1) as the CSS variable --p on
 * the wrapped section, so the scene can tighten its crop as the intro enters.
 * Native scrolling only: this reads scroll position, it never intercepts it.
 * Listens only while the hero is on screen and skips reduced motion.
 */
export function HeroScroll({ className, children, labelledBy }: { className?: string; children: React.ReactNode; labelledBy?: string }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const h = el.offsetHeight || 1
      const p = Math.min(1, Math.max(0, window.scrollY / h))
      el.style.setProperty('--p', p.toFixed(4))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { window.addEventListener('scroll', onScroll, { passive: true }); update() }
      else window.removeEventListener('scroll', onScroll)
    })
    io.observe(el)
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [])

  return <section ref={ref} className={className} aria-labelledby={labelledBy}>{children}</section>
}
