'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, ArrowRight, Check, CreditCard } from 'lucide-react'
import { Ticket } from '../sitetally/components/tally-demo'
import demo from '../sitetally/sitetally.module.css'
import site from '@/components/site/site.module.css'
import h from '../home.module.css'

const STEPS = [
  { name: 'Document', text: 'A dump ticket comes in as a phone photo. AI reads the fields off the page, exactly as printed.' },
  { name: 'Checked', text: 'Plain code does the math. 32,000 − 20,000 = 12,000 lb. 6 tons × $85 = $510. Vendor, customer and job are on file.' },
  { name: 'Exception', text: 'The same ticket is already on file, so this copy is held for review. The matching $510 card charge doesn’t clear it.' },
]

const CHECKS = [
  { label: 'Gross − tare = net', math: '32,000 − 20,000 = 12,000 lb' },
  { label: 'Tons × rate = total', math: '6 × $85.00 = $510.00' },
  { label: 'Vendor, billed-to, job', math: 'All on file' },
]

const SPAN = 0.62 // share of the section's scroll distance used by the three steps

/**
 * Site Tally chapter. On large screens (with motion allowed) the visual stays
 * pinned while the section scrolls past, stepping Document → Checked → Exception.
 * Everywhere else it is normal document flow with the step buttons, starting
 * on the completed state. Text and controls always stay in the DOM.
 */
export function TallyStory() {
  const ref = useRef<HTMLElement>(null)
  const [sticky, setSticky] = useState(false)
  const [step, setStep] = useState(2)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)')
    const apply = () => { setSticky(mq.matches); setStep(mq.matches ? 0 : 2) }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // In sticky mode, derive the step from the section's position over its scrollable distance.
  useEffect(() => {
    const el = ref.current
    if (!sticky || !el) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const dist = el.offsetHeight - window.innerHeight
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, dist)))
      setStep(p < SPAN / 3 ? 0 : p < (SPAN * 2) / 3 ? 1 : 2)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { window.addEventListener('scroll', onScroll, { passive: true }); update() }
      else window.removeEventListener('scroll', onScroll)
    })
    io.observe(el)
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [sticky])

  const go = useCallback((i: number) => {
    const el = ref.current
    if (!sticky || !el) { setStep(i); return }
    const dist = el.offsetHeight - window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + dist * (SPAN / 3) * (i + 0.5), behavior: 'smooth' })
  }, [sticky])

  const checked = step >= 1
  const flagged = step >= 2
  const hl = (name: string) => ({
    'data-active': step === 1 && ['gross', 'tare', 'net', 'rate', 'total'].includes(name) ? 'true' : 'false',
    'data-flag': flagged && name === 'ticket' ? 'fail' : 'none',
  })

  return (
    <section
      id="products"
      ref={ref}
      tabIndex={-1}
      className={`${h.section} ${h.product}`}
      data-mode={sticky ? 'sticky' : 'flow'}
      aria-labelledby="products-title"
    >
      <div className={h.stickyBox}>
        <div className={`${h.wrap} ${h.grid} ${h.productGrid}`}>
          <div className={h.productText}>
            <p className={site.chapter}><b>03</b> Product</p>
            <h2 id="products-title" className={h.productTitle}>Site Tally</h2>
            <p className={h.productLead}>
              Our own product for contractors. It checks receipts, dump tickets, packing lists and
              supplier invoices, then puts problems in front of a person before they reach the books.
            </p>

            <ol className={h.steps}>
              {STEPS.map((st, i) => (
                <li key={st.name}>
                  <button type="button" className={h.stepBtn} aria-pressed={step === i} onClick={() => go(i)}>
                    <span className={h.stepNum}>0{i + 1}</span>
                    <span className={h.stepName}>{st.name}</span>
                    <span className={h.stepText}><span>{st.text}</span></span>
                  </button>
                </li>
              ))}
            </ol>

            <div className={h.productLinks}>
              <Link href="/sitetally" className={`${site.btn} ${site.btnPrimary}`}>Try the full demo <ArrowRight size={16} aria-hidden="true" /></Link>
              <span className={h.fictional}>Example · Fictional data</span>
            </div>
          </div>

          <div className={h.productStage} aria-hidden="true">
            <div className={h.stage}>
              <div className={h.stageDoc}>
                <div className={demo.paper} data-shown="true">
                  <Ticket hl={hl} flagged={flagged} />
                </div>
              </div>

              <div className={h.result}>
                <div className={h.resultHead}>
                  <div>
                    <div className={h.resultTitle}>Weight ticket</div>
                    <div className={h.resultMeta}>DEMO-1042 · Example Disposal Co.</div>
                  </div>
                  <span className={h.pill} data-tone={flagged ? 'fail' : checked ? 'pass' : 'none'}>
                    {flagged ? 'Held for review' : checked ? 'Math checks out' : 'Read'}
                  </span>
                </div>
                <ul className={h.rows}>
                  {CHECKS.map(c => (
                    <li key={c.label} className={`${h.row} ${checked ? '' : h.pending}`}>
                      <span className={h.dot} data-tone={checked ? 'pass' : 'none'}>{checked && <Check size={11} strokeWidth={3.5} />}</span>
                      <span className={h.rowLabel}>{c.label}</span>
                      <span className={h.rowMath}>{c.math}</span>
                    </li>
                  ))}
                </ul>
                <div className={`${h.exception} ${flagged ? '' : h.hiddenStep}`}>
                  <div className={h.exceptionTitle}><AlertTriangle size={15} strokeWidth={2.5} />Duplicate ticket · Already on file</div>
                  <div className={h.exceptionBody}>This copy is held for review. No second expense is created.</div>
                </div>
                <div className={`${h.matchNote} ${flagged ? '' : h.hiddenFade}`}>
                  <span className={h.dot} data-tone="pass"><CreditCard size={10} strokeWidth={2.5} /></span>
                  Card charge $510.00 matched. The duplicate flag stays open.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
