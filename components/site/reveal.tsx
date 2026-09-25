'use client'

import { useEffect, useRef } from 'react'
import site from './site.module.css'

type Props = {
  children: React.ReactNode
  /** Seconds, for a small stagger. */
  delay?: number
  /** Vertical travel in px (12–24). */
  y?: number
  /** Run on first paint instead of when scrolled into view. */
  onMount?: boolean
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'figure'
  /** Extra class used instead of the default fade/rise (e.g. a clip reveal). */
  variant?: string
  id?: string
}

/**
 * One-time entrance driven by IntersectionObserver + CSS.
 * Content is visible unless html[data-motion] is set (see the marketing layout),
 * so no-JS and reduced-motion visitors always see everything.
 */
export function Reveal({ children, delay = 0, y = 16, onMount = false, className, as = 'div', variant, id }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (onMount) {
      const f = requestAnimationFrame(() => el.setAttribute('data-inview', 'true'))
      return () => cancelAnimationFrame(f)
    }
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) { el.setAttribute('data-inview', 'true'); io.disconnect() }
      }
    }, { rootMargin: '0px 0px -4% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [onMount])

  const Tag = as as 'div'
  const style = { '--rd': `${Math.round(delay * 1000)}ms`, '--ry': `${y}px` } as React.CSSProperties
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      id={id}
      className={[variant ?? site.reveal, className].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </Tag>
  )
}
