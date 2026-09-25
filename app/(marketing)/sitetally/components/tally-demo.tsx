'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AlertTriangle, Check, CreditCard, Info, Pause, Play, RotateCcw, X } from 'lucide-react'
import s from '../sitetally.module.css'

// ── Timeline (ms), shared by every example ────────────────
// 0–2s document appears · 2–5s fields fill · 5–7s checks run
// 7–9s flag appears · 9–11s card charge step · 11–12s hold, reset
const LOOP = 12000
const TICK = 100
const DOC_AT = 150
const SCAN_AT = 900
const FIELD_AT = 2000
const FIELD_SPAN = 2800
const CHECK_AT = 5000
const CHECK_SPAN = 1800
const FLAG_AT = 7000
const MATCH_AT = 9000
const NOTE_AT = 9700
const FADE_AT = 11650
const COMPLETE = 11000 // finished frame for reduced motion

type Tone = 'pass' | 'warn' | 'fail' | 'info'
type Field = { label: string; value: string; line?: string }
type CheckRow = { label: string; math: string; tone: Tone; lines?: string[] }

type Scenario = {
  id: 'ticket' | 'invoice' | 'charge'
  tab: string
  docLabel: string
  docTitle: string
  docMeta: string
  fields: Field[]
  checks: CheckRow[]
  flag: { tone: 'fail' | 'warn'; title: string; body: string; facts: string[] }
  final: { tone: Tone; title: string; meta: string; note: string }
  finalLabel: string
  read?: { label: string; tag: string }
  status: { label: string; tone: 'fail' | 'warn' }
  flagLine?: string
  sr: string
}

const SCENARIOS: Scenario[] = [
  {
    id: 'ticket',
    tab: 'Weight ticket',
    docLabel: 'Source · phone photo',
    docTitle: 'Weight ticket',
    docMeta: 'IMG_2231.jpg · 1 page',
    fields: [
      { label: 'Vendor', value: 'Example Disposal Co.', line: 'vendor' },
      { label: 'Ticket no.', value: 'DEMO-1042', line: 'ticket' },
      { label: 'Date', value: '09/15/26', line: 'date' },
      { label: 'Billed to', value: 'Demo Builders LLC', line: 'customer' },
      { label: 'Job', value: '2206 · 14 Maple Ave', line: 'job' },
      { label: 'Gross', value: '32,000 lb', line: 'gross' },
      { label: 'Tare', value: '20,000 lb', line: 'tare' },
      { label: 'Net', value: '12,000 lb · 6 tons', line: 'net' },
      { label: 'Rate', value: '$85.00 / ton', line: 'rate' },
      { label: 'Total', value: '$510.00', line: 'total' },
    ],
    checks: [
      { label: 'Gross − tare = net', math: '32,000 − 20,000 = 12,000 lb', tone: 'pass', lines: ['gross', 'tare', 'net'] },
      { label: 'Pounds to tons', math: '12,000 ÷ 2,000 = 6 tons', tone: 'pass', lines: ['net'] },
      { label: 'Tons × rate = total', math: '6 × $85.00 = $510.00', tone: 'pass', lines: ['rate', 'total'] },
      { label: 'Vendor, billed-to, job', math: 'All on file', tone: 'pass', lines: ['vendor', 'customer', 'job'] },
    ],
    flag: {
      tone: 'fail',
      title: 'Duplicate ticket · Already on file',
      body: 'DEMO-1042 was logged 09/15 on job 2206. This copy is held for review.',
      facts: ['Expenses on file: 1', 'New expense: none'],
    },
    flagLine: 'ticket',
    finalLabel: 'Card charge',
    final: {
      tone: 'pass',
      title: 'Card charge matched · $510.00',
      meta: '09/15 · EXAMPLE DISPOSAL · Card ••4417',
      note: 'Same charge as the ticket on file. The duplicate flag stays open.',
    },
    status: { label: 'Held for review', tone: 'fail' },
    sr: 'Weight ticket example with fictional data. Ticket DEMO-1042 from Example Disposal Co. is read: gross 32,000 pounds, tare 20,000 pounds, net 12,000 pounds or 6 tons, at $85 a ton, total $510. All math checks pass and the vendor, billed-to company and job are on file. It is flagged red as a duplicate that is already on file, so this copy is held for review and no second expense is created. It matches a $510 card charge, and the duplicate flag stays open.',
  },
  {
    id: 'invoice',
    tab: 'Invoice error',
    docLabel: 'Source · supplier PDF',
    docTitle: 'Supplier invoice',
    docMeta: 'INV-DEMO-2210.pdf · 1 page',
    fields: [
      { label: 'Vendor', value: 'Sample Lumber Supply', line: 'vendor' },
      { label: 'Invoice no.', value: 'DEMO-2210', line: 'number' },
      { label: 'Date', value: '09/17/26', line: 'date' },
      { label: 'Billed to', value: 'Demo Builders LLC', line: 'customer' },
      { label: 'Job / PO', value: 'Not printed', line: 'po' },
      { label: 'Terms', value: 'Net 30', line: 'terms' },
      { label: 'Line 1', value: '60 @ $4.50 · $270.00', line: 'l1' },
      { label: 'Line 2', value: '5 @ $38.00 · $190.00', line: 'l2' },
      { label: 'Subtotal', value: '$500.00', line: 'subtotal' },
      { label: 'Tax · Total', value: '$33.13 · $533.13', line: 'total' },
    ],
    checks: [
      { label: 'Lines add up to subtotal', math: '$270 + $190 = $460 ≠ $500', tone: 'fail', lines: ['l1', 'l2', 'subtotal'] },
      { label: 'Subtotal + tax = total', math: '$500.00 + $33.13 = $533.13', tone: 'pass', lines: ['subtotal', 'total'] },
      { label: 'Vendor and billed-to', math: 'On file', tone: 'pass', lines: ['vendor', 'customer'] },
      { label: 'Job or PO reference', math: 'None printed', tone: 'warn', lines: ['po'] },
    ],
    flag: {
      tone: 'fail',
      title: 'Invoice total error · Needs review',
      body: 'The line items add up to $460.00. The invoice says $500.00. It’s held before anyone approves it.',
      facts: ['Difference: $40.00', 'Status: not approved'],
    },
    flagLine: 'subtotal',
    finalLabel: 'Card charge',
    final: {
      tone: 'info',
      title: 'No card charge to match',
      meta: 'Terms Net 30 · billed on account',
      note: 'It stays in exceptions until someone checks the $40 difference.',
    },
    status: { label: 'Held for review', tone: 'fail' },
    sr: 'Invoice example with fictional data. Invoice DEMO-2210 from Sample Lumber Supply lists 60 studs at $4.50 for $270 and 5 sheets of plywood at $38 for $190. Those lines add up to $460, but the invoice prints a $500 subtotal, so it is flagged red and held for review. Subtotal plus $33.13 tax equals the printed $533.13 total, which passes. Vendor and billed-to company are on file. No job or PO is printed, which is a yellow note worth a look. It is on Net 30 terms, so there is no card charge to match.',
  },
  {
    id: 'charge',
    tab: 'Missing receipt',
    docLabel: 'Source · card statement',
    read: { label: 'From your card data', tag: 'Loaded' },
    docTitle: 'Card charge',
    docMeta: 'Statement · Card ••4417 · Sep 2026',
    fields: [
      { label: 'Merchant', value: 'Sample Hardware #212', line: 'c3' },
      { label: 'Amount', value: '$184.16', line: 'c3' },
      { label: 'Charged', value: '09/18/26', line: 'c3' },
      { label: 'Posted', value: '09/19/26', line: 'c3' },
      { label: 'Card', value: '••4417', line: 'card' },
      { label: 'Reference', value: 'DEMO-7731', line: 'c3' },
      { label: 'Receipt', value: 'None on file' },
      { label: 'Job', value: 'Not assigned' },
      { label: 'Open receipts', value: '3 unmatched' },
      { label: 'Statement', value: 'Sep 2026' },
    ],
    checks: [
      { label: 'Receipt behind this charge', math: 'None yet', tone: 'warn', lines: ['c3'] },
      { label: 'Open receipts compared', math: '3 checked · none $184.16', tone: 'pass' },
      { label: 'Charge already claimed', math: 'No', tone: 'pass', lines: ['c3'] },
      { label: 'Job assigned', math: 'Not yet', tone: 'warn' },
    ],
    flag: {
      tone: 'warn',
      title: 'Missing receipt · Worth a look',
      body: 'No receipt behind this $184.16 charge yet. It stays on the missing list. It doesn’t block anything else.',
      facts: ['Nothing booked', 'Other charges unaffected'],
    },
    flagLine: 'c3',
    finalLabel: 'Receipt',
    final: {
      tone: 'info',
      title: 'Waiting on the receipt',
      meta: 'Snap a photo of it and it matches to this charge',
      note: 'Until then, the charge shows as missing a receipt.',
    },
    status: { label: 'Missing receipt', tone: 'warn' },
    sr: 'Missing receipt example with fictional data. It starts from a card charge, not a receipt: $184.16 at Sample Hardware number 212 on 09/18 on card ending 4417. No receipt is on file and none of the 3 open receipts match that amount, so it is flagged yellow as a missing receipt, worth a look but not blocking. The charge is not claimed by any other receipt. No job is assigned yet. When someone photographs the receipt, it will match to this charge.',
  },
]

const STEPS = ['Read', 'Check', 'Flag', 'Match']

function ToneIcon({ tone, size = 11 }: { tone: Tone; size?: number }) {
  if (tone === 'pass') return <Check size={size} strokeWidth={3.5} />
  if (tone === 'fail') return <X size={size} strokeWidth={3.5} />
  if (tone === 'warn') return <span className={s.bang}>!</span>
  return <Info size={size + 1} strokeWidth={3} />
}

// ── Source document facsimiles ────────────────────────────
export function Ticket({ hl, flagged }: { hl: (n: string) => Record<string, string>; flagged: boolean }) {
  return (
    <>
      <div className={s.stamp} data-on={flagged ? 'true' : 'false'}>COPY · HELD</div>
      <div className={s.ticketHead}>
        <div className={s.tline} style={{ justifyContent: 'center' }} {...hl('vendor')}>
          <span className={s.ticketCo}>EXAMPLE DISPOSAL CO.</span>
        </div>
        <div className={s.ticketSub}>Transfer Station · Scale 2</div>
      </div>
      <div className={s.ticketTitle}><span>SCALE TICKET</span></div>
      <div className={s.tline} {...hl('ticket')}><span className={s.tkey}>TICKET</span><span>DEMO-1042</span></div>
      <div className={s.tline} {...hl('date')}><span className={s.tkey}>DATE</span><span>09/15/26 07:42</span></div>
      <div className={s.tline} {...hl('customer')}><span className={s.tkey}>CUST</span><span>DEMO BUILDERS LLC</span></div>
      <div className={s.tline} {...hl('job')}><span className={s.tkey}>JOB</span><span>2206 / 14 MAPLE AVE</span></div>
      <div className={s.tline}><span className={s.tkey}>MATL</span><span>C&amp;D MIXED</span></div>
      <div className={s.weights}>
        <div className={s.tline} {...hl('gross')}><span className={s.tkey}>GROSS</span><span>32,000 LB</span></div>
        <div className={s.tline} {...hl('tare')}><span className={s.tkey}>TARE</span><span>20,000 LB</span></div>
        <div className={s.tline} {...hl('net')}><span className={s.tkey}>NET</span><span>12,000 LB  6.00 TN</span></div>
      </div>
      <div className={s.tline} {...hl('rate')}><span className={s.tkey}>RATE</span><span>$85.00/TN</span></div>
      <div className={`${s.tline} ${s.tTotal}`} {...hl('total')}><span>TOTAL</span><span>$510.00</span></div>
      <div className={s.sig}>
        <span>WEIGHMASTER</span>
        <span className={s.sigLine}>
          <svg width="70" height="16" viewBox="0 0 70 16" fill="none">
            <path d="M2 12c6-9 9-9 10-3s4 5 8-2 6-5 7 0 5 4 10-3 7-2 9 2 6 2 10-2 8-1 12 0" stroke="#2d3a66" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </>
  )
}

function Invoice({ hl, flagged }: { hl: (n: string) => Record<string, string>; flagged: boolean }) {
  return (
    <>
      <div className={s.stamp} data-on={flagged ? 'true' : 'false'}>HELD · $40</div>
      <div className={s.invHead}>
        <div {...hl('vendor')} className={s.tline}><span className={s.invCo}>Sample Lumber Supply</span></div>
        <div className={s.invKind}>INVOICE</div>
      </div>
      <div className={s.tline} {...hl('number')}><span className={s.tkey}>Invoice</span><span>DEMO-2210</span></div>
      <div className={s.tline} {...hl('date')}><span className={s.tkey}>Date</span><span>09/17/26</span></div>
      <div className={s.tline} {...hl('customer')}><span className={s.tkey}>Bill to</span><span>Demo Builders LLC</span></div>
      <div className={s.tline} {...hl('po')}><span className={s.tkey}>PO / Job</span><span className={s.blank}>—</span></div>
      <div className={s.tline} {...hl('terms')}><span className={s.tkey}>Terms</span><span>Net 30</span></div>
      <div className={s.invTable}>
        <div className={`${s.invRow} ${s.invRowHead}`}><span>Item</span><span>Qty</span><span>Price</span><span>Amount</span></div>
        <div className={`${s.invRow} ${s.tline}`} {...hl('l1')}><span>2x4x8 SPF stud</span><span>60</span><span>4.50</span><span>270.00</span></div>
        <div className={`${s.invRow} ${s.tline}`} {...hl('l2')}><span>1/2&quot; CDX ply</span><span>5</span><span>38.00</span><span>190.00</span></div>
      </div>
      <div className={s.tline} {...hl('subtotal')}><span className={s.tkey}>Subtotal</span><span>$500.00</span></div>
      <div className={s.tline}><span className={s.tkey}>Tax 6.625%</span><span>$33.13</span></div>
      <div className={`${s.tline} ${s.tTotal}`} {...hl('total')}><span>Total due</span><span>$533.13</span></div>
    </>
  )
}

const STATEMENT = [
  { id: 'c1', date: '09/15', merchant: 'EXAMPLE DISPOSAL', amount: '510.00', receipt: true },
  { id: 'c2', date: '09/16', merchant: 'SAMPLE LUMBER SUPPLY', amount: '212.40', receipt: true },
  { id: 'c3', date: '09/18', merchant: 'SAMPLE HARDWARE #212', amount: '184.16', receipt: false },
  { id: 'c4', date: '09/19', merchant: 'FUEL STOP 88', amount: '96.40', receipt: true },
]

function Statement({ hl, flagged }: { hl: (n: string) => Record<string, string>; flagged: boolean }) {
  return (
    <>
      <div className={s.stmtHead}>
        <div {...hl('card')} className={s.tline}><span className={s.stmtBank}>Business card ••4417</span></div>
        <div className={s.ticketSub}>Statement · September 2026</div>
      </div>
      <div className={s.stmtRows}>
        {STATEMENT.map(r => (
          <div key={r.id} className={`${s.stmtRow} ${s.tline}`} {...hl(r.id)}>
            <span className={s.tkey}>{r.date}</span>
            <span className={s.stmtMerchant}>{r.merchant}</span>
            <span>{r.amount}</span>
            <span className={s.stmtMark} data-missing={!r.receipt && flagged ? 'true' : 'false'}>
              {r.receipt ? <Check size={11} strokeWidth={3} aria-hidden="true" /> : flagged ? '!' : ''}
            </span>
          </div>
        ))}
      </div>
      <div className={s.stmtFoot}>
        <span className={s.tkey}>Receipts matched</span><span>3 of 4</span>
      </div>
    </>
  )
}

// ── Demo ──────────────────────────────────────────────────
export function TallyDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const reduceRef = useRef(false)
  const rootRef = useRef<HTMLElement>(null)
  const sc = SCENARIOS[scenarioIndex]

  // Reduced motion: show the finished frame and stay there until asked.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      reduceRef.current = mq.matches
      if (mq.matches) { setPlaying(false); setT(COMPLETE) }
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Only tick while someone can actually see it.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    const onVis = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis) }
  }, [])

  useEffect(() => {
    if (!playing || !inView || !pageVisible) return
    const id = window.setInterval(() => setT(prev => (prev + TICK >= LOOP ? 0 : prev + TICK)), TICK)
    return () => window.clearInterval(id)
  }, [playing, inView, pageVisible])

  const toggle = useCallback(() => setPlaying(p => !p), [])
  const replay = useCallback(() => { setT(0); setPlaying(true) }, [])
  const choose = (i: number) => {
    setScenarioIndex(i)
    if (reduceRef.current) { setT(COMPLETE); setPlaying(false) }
    else { setT(0); setPlaying(true) }
  }

  const n = sc.fields.length
  const fieldStep = FIELD_SPAN / n
  const checkStep = CHECK_SPAN / sc.checks.length
  const fieldsShown = t < FIELD_AT ? 0 : Math.min(n, Math.floor((t - FIELD_AT) / fieldStep) + 1)
  const inFields = t >= FIELD_AT && t < FIELD_AT + FIELD_SPAN
  const fresh = inFields ? fieldsShown - 1 : -1
  const checkDone = (i: number) => t >= CHECK_AT + i * checkStep
  const flagged = t >= FLAG_AT
  const finalShown = t >= MATCH_AT
  const step = t < CHECK_AT ? 0 : t < FLAG_AT ? 1 : t < MATCH_AT ? 2 : 3

  let lit: string[] = []
  if (inFields) { const l = sc.fields[fresh]?.line; if (l) lit = [l] }
  else if (t >= CHECK_AT && t < FLAG_AT) {
    const i = Math.floor((t - CHECK_AT) / checkStep)
    lit = sc.checks[i]?.lines ?? []
  }

  const hl = (name: string) => ({
    'data-active': lit.includes(name) ? 'true' : 'false',
    'data-flag': flagged && sc.flagLine === name ? sc.flag.tone : 'none',
  })

  const status =
    t < FIELD_AT ? { label: 'Reading…', tone: 'neutral' } :
    t < CHECK_AT ? { label: 'Reading fields…', tone: 'neutral' } :
    t < FLAG_AT ? { label: 'Running checks…', tone: 'neutral' } :
    sc.status

  return (
    <figure ref={rootRef} className={s.demo} aria-labelledby={`demo-label-${sc.id}`}>
      <div className={s.demoFrame}>
        <div className={s.demoBar}>
          <div className={s.demoBarLeft}>
            <span className={s.demoApp} aria-hidden="true">Site Tally</span>
            <span id={`demo-label-${sc.id}`} className={s.exampleTag}>Example · Fictional data</span>
          </div>
          <div className={s.controls}>
            <button type="button" className={s.ctrl} onClick={toggle} aria-pressed={!playing}
              aria-label={playing ? 'Pause example animation' : 'Play example animation'}>
              {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
              <span className={s.ctrlLabel} aria-hidden="true">{playing ? 'Pause' : 'Play'}</span>
            </button>
            <button type="button" className={s.ctrl} onClick={replay} aria-label="Replay example from the start">
              <RotateCcw size={14} aria-hidden="true" />
              <span className={s.ctrlLabel} aria-hidden="true">Replay</span>
            </button>
          </div>
        </div>

        <div className={s.scenarioBar} role="group" aria-label="Choose an example">
          {SCENARIOS.map((x, i) => (
            <button key={x.id} type="button" className={s.scenario} aria-pressed={i === scenarioIndex} onClick={() => choose(i)}>
              {x.tab}
            </button>
          ))}
        </div>

        <p className={s.srOnly} aria-live="polite">{sc.sr}</p>

        {/* Visual only; the paragraph above is the text version. */}
        <div aria-hidden="true">
          <div className={s.progress}>
            <div className={s.progressFill} data-reset={t < TICK * 2 ? 'true' : 'false'} style={{ width: `${(t / LOOP) * 100}%` }} />
          </div>
          <div className={s.steps}>
            {STEPS.map((label, i) => (
              <div key={label} className={s.step} data-state={i === step ? 'active' : i < step ? 'done' : 'todo'}>
                <span className={s.stepNum}>0{i + 1}</span>{label}
              </div>
            ))}
          </div>

          <div key={sc.id} className={`${s.demoBody} ${s.fadeAll}`} data-out={t >= FADE_AT ? 'true' : 'false'}>
            <div className={s.paperStage}>
              <p className={s.stageLabel}>{sc.docLabel}</p>
              <div className={`${s.paper} ${sc.id === 'invoice' ? s.paperInvoice : sc.id === 'charge' ? s.paperStatement : ''}`}
                data-shown={t >= DOC_AT ? 'true' : 'false'}>
                <div className={s.scan} data-on={t >= SCAN_AT && t < FIELD_AT ? 'true' : 'false'} />
                {sc.id === 'ticket' && <Ticket hl={hl} flagged={flagged} />}
                {sc.id === 'invoice' && <Invoice hl={hl} flagged={flagged} />}
                {sc.id === 'charge' && <Statement hl={hl} flagged={flagged} />}
              </div>
            </div>

            <div className={s.panel}>
              <div className={s.panelHead}>
                <div>
                  <div className={s.docTitle}>{sc.docTitle}</div>
                  <div className={s.docMeta}>{sc.docMeta}</div>
                </div>
                <span className={s.pill} data-tone={status.tone}>
                  {status.tone !== 'neutral' && <ToneIcon tone={status.tone as Tone} size={10} />}
                  {status.label}
                </span>
              </div>

              <p className={s.subhead}><span className={s.subNum}>1</span>{sc.read?.label ?? 'Read from the document'} <em>{sc.read?.tag ?? 'AI'}</em></p>
              <div className={s.fields}>
                {sc.fields.map((f, i) => {
                  const shown = i < fieldsShown
                  return (
                    <div key={f.label} className={s.field} data-fresh={i === fresh ? 'true' : 'false'}>
                      <div className={s.fieldLabel}>{f.label}</div>
                      <div className={s.fieldValue}>
                        <span className={s.skeleton} style={{ opacity: shown ? 0 : 1 }} />
                        <span style={{ opacity: shown ? 1 : 0 }}>{f.value}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className={s.subhead}><span className={s.subNum}>2</span>Checked by code <em>No AI</em></p>
              <ul className={s.checks}>
                {sc.checks.map((c, i) => {
                  const done = checkDone(i)
                  return (
                    <li key={c.label} className={s.check} data-done={done ? 'true' : 'false'}>
                      <span className={s.dot} data-tone={done ? c.tone : 'none'}>{done && <ToneIcon tone={c.tone} />}</span>
                      <span className={s.checkLabel}>{c.label}</span>
                      <span className={s.checkMath} data-tone={c.tone} style={{ opacity: done ? 1 : 0 }}>{c.math}</span>
                    </li>
                  )
                })}
              </ul>

              <div className={s.slots}>
                <div className={s.slot}>
                  <p className={s.subhead}><span className={s.subNum}>3</span>{sc.flag.tone === 'fail' ? 'Exception' : 'Flag'}</p>
                  <div className={s.slotBox}>
                    <div className={s.slotWait} data-on={flagged ? 'false' : 'true'}>Waiting on checks</div>
                    <div className={`${s.flag} ${s.reveal}`} data-tone={sc.flag.tone} data-on={flagged ? 'true' : 'false'}>
                      <div className={s.flagTitle}>
                        {sc.flag.tone === 'fail' ? <AlertTriangle size={15} strokeWidth={2.5} /> : <span className={s.flagBang}>!</span>}
                        {sc.flag.title}
                      </div>
                      <div className={s.flagBody}>{sc.flag.body}</div>
                      <div className={s.flagFacts}>{sc.flag.facts.map(f => <span key={f}>{f}</span>)}</div>
                    </div>
                  </div>
                </div>

                <div className={s.slot}>
                  <p className={s.subhead}><span className={s.subNum}>4</span>{sc.finalLabel}</p>
                  <div className={s.slotBox}>
                    <div className={s.slotWait} data-on={finalShown ? 'false' : 'true'}>Waiting on checks</div>
                    <div className={`${s.match} ${s.reveal}`} data-on={finalShown ? 'true' : 'false'}>
                      <div className={s.matchRow}>
                        <span className={s.dot} data-tone={sc.final.tone}>
                          {sc.final.tone === 'pass' ? <CreditCard size={10} strokeWidth={2.5} /> : <ToneIcon tone={sc.final.tone} size={10} />}
                        </span>
                        <div className={s.matchMain}>
                          <div className={s.matchTitle}>{sc.final.title}</div>
                          <div className={s.matchMeta}>{sc.final.meta}</div>
                        </div>
                      </div>
                      <div className={`${s.matchNote} ${s.reveal}`} data-on={t >= NOTE_AT ? 'true' : 'false'}>{sc.final.note}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.legend}>
          <span className={s.legendItem}><span className={s.dot} data-tone="pass" aria-hidden="true"><ToneIcon tone="pass" size={9} /></span><b>Passed</b></span>
          <span className={s.legendItem}><span className={s.dot} data-tone="warn" aria-hidden="true"><ToneIcon tone="warn" size={9} /></span><b>Worth a look</b> doesn&apos;t block</span>
          <span className={s.legendItem}><span className={s.dot} data-tone="fail" aria-hidden="true"><ToneIcon tone="fail" size={9} /></span><b>Needs review</b> held as an exception</span>
        </div>
      </div>
    </figure>
  )
}
