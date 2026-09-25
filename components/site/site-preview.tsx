'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Lock, X } from 'lucide-react'
import s from './site.module.css'

type Preview = { url: string; name: string; embed: boolean; image?: string }

/**
 * Opens project links in an in-page preview instead of a new tab.
 * Any <a data-preview-url> on the page is picked up by a plain click;
 * cmd/ctrl/shift/middle clicks still behave like normal links.
 * Sites that refuse to be framed (X-Frame-Options) show their screenshot
 * with a button to open the real site.
 */
export function SitePreviewHost() {
  const [preview, setPreview] = useState<Preview | null>(null)
  const [loaded, setLoaded] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-preview-url]')
      if (!a) return
      e.preventDefault()
      returnFocus.current = a
      setLoaded(false)
      setPreview({
        url: a.dataset.previewUrl!,
        name: a.dataset.previewName ?? a.dataset.previewUrl!,
        embed: a.dataset.previewEmbed !== 'false',
        image: a.dataset.previewImage,
      })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const close = useCallback(() => setPreview(null), [])

  // Lock page scroll, trap focus, close on Escape; restore focus on close.
  useEffect(() => {
    if (!preview) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus())
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = [...panelRef.current.querySelectorAll<HTMLElement>('a[href], button, iframe')]
      if (!items.length) return
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    const target = returnFocus.current
    return () => {
      root.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      target?.focus({ preventScroll: true })
    }
  }, [preview, close])

  const host = preview ? new URL(preview.url).host.replace(/^www\./, '') : ''

  return (
    <AnimatePresence>
      {preview && (
        <motion.div
          className={s.previewOverlay}
          onClick={close}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.name} preview`}
            className={s.previewPanel}
            onClick={e => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={s.previewBar}>
              <div className={s.previewAddress}>
                <Lock size={12} aria-hidden="true" />
                <span>{host}</span>
              </div>
              <a href={preview.url} target="_blank" rel="noopener noreferrer" className={s.previewAction}>
                Open site <ArrowUpRight size={14} aria-hidden="true" />
                <span className={s.srOnly}>(opens in a new tab)</span>
              </a>
              <button type="button" className={s.previewClose} onClick={close} data-autofocus aria-label="Close preview">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className={s.previewBody}>
              {preview.embed ? (
                <>
                  {!loaded && <div className={s.previewLoading}>Loading {preview.name}…</div>}
                  <iframe
                    src={preview.url}
                    title={`${preview.name} (live site)`}
                    className={s.previewFrame}
                    onLoad={() => setLoaded(true)}
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </>
              ) : (
                <div className={s.previewFallback}>
                  {preview.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={preview.image} alt={`${preview.name} homepage`} />
                  )}
                  <div className={s.previewFallbackNote}>
                    <p>{preview.name} doesn&apos;t allow being shown inside other sites, so here&apos;s a screenshot.</p>
                    <a href={preview.url} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnPrimary}`}>
                      Visit {host} <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
