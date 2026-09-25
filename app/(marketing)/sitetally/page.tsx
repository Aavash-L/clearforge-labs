import type { Metadata } from 'next'
import { ArrowRight, Check, Plug, Plus } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Reveal } from '@/components/site/reveal'
import site from '@/components/site/site.module.css'
import { TallyDemo } from './components/tally-demo'
import { SignupForm } from './components/signup-form'
import s from './sitetally.module.css'

const TITLE = 'Site Tally — Receipt, Invoice & Dump Ticket Checks for Contractors'
const DESCRIPTION =
  'Site Tally checks contractor paperwork. Snap receipts, packing lists, dump tickets and supplier invoices. It checks the math, catches duplicates and matches card charges before weekly bookkeeping cleanup.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'contractor receipt tracking', 'dump ticket', 'landfill weight ticket', 'duplicate invoice check',
    'contractor bookkeeping', 'expense matching', 'missing receipts', 'Site Tally', 'ClearForge Labs',
  ],
  alternates: { canonical: '/sitetally' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/sitetally',
    siteName: 'ClearForge Labs',
    title: 'Site Tally — Stop paying for the same dump ticket twice',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Site Tally — Stop paying for the same dump ticket twice',
    description: DESCRIPTION,
  },
}

type Plan =
  | { name: string; who: string; custom?: false; price: number; docs: string; setup: number; users: string | null }
  | { name: string; who: string; custom: true; docs: string; users: string }

const PLANS: Plan[] = [
  { name: 'Solo',    who: 'Owner-operator.',                price: 99,  docs: '100 a month', setup: 299, users: null },
  { name: 'Crew',    who: 'Small crew with several jobs.', price: 199, docs: '400 a month', setup: 299, users: null },
  { name: 'Company', who: 'More volume, more people.',     custom: true, docs: 'Sized to your volume', users: 'Multiple users' },
]
const STANDARD = PLANS.filter((p): p is Extract<Plan, { custom?: false }> => !p.custom)

const PROBLEMS = [
  { where: 'Truck', text: 'Receipts ride around on the dash until they fade.' },
  { where: 'Email', text: 'Supplier invoices sit in an inbox nobody opens on Friday.' },
  { where: 'Card',  text: 'Charges show up with no receipt behind them.' },
  { where: 'Twice', text: 'The same dump ticket gets turned in two times.' },
  { where: 'Math',  text: 'Totals get paid without anyone adding them up.' },
]

type Tone = 'pass' | 'warn' | 'fail'
const TONE_LABEL: Record<Tone, string> = { pass: 'Passed', warn: 'Worth a look', fail: 'Needs review' }
const TONE_ICON: Record<Tone, string> = { pass: '✓', warn: '!', fail: '×' }

const CATCHES: { name: string; text: React.ReactNode; tones: Tone[] }[] = [
  { name: 'Weight math', tones: ['fail'],
    text: <>Gross <code>31,480 lb</code> minus tare <code>19,920 lb</code> is 11,560 lb. The ticket says <code>11,650</code>.</> },
  { name: 'Duplicate paperwork', tones: ['fail'],
    text: <>Same ticket number, same yard, turned in again. The copy gets held for review. Nothing gets booked twice.</> },
  { name: 'Invoice totals', tones: ['fail'],
    text: <>Line items add up to <code>$460.00</code>. The subtotal says <code>$500.00</code>.</> },
  { name: 'Missing receipts', tones: ['warn'],
    text: <>A <code>$184.16</code> card charge at a hardware store with no receipt behind it yet.</> },
  { name: 'Vendor or job mismatch', tones: ['fail', 'warn'],
    text: <>Billed to a different company? That&apos;s red. Vendor or job not on your list? Yellow, so someone takes a look.</> },
]

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What paperwork does it handle?',
    a: <p>Store receipts, supplier packing lists, dump and landfill weight tickets, and supplier invoices. A phone photo works. So does a PDF.</p>,
  },
  {
    q: 'How are documents counted?',
    a: <>
      <p>One document is one receipt, ticket, packing list or invoice. A two-page invoice counts as one. A duplicate photo of something already in doesn&apos;t count again.</p>
      <p>You get a heads-up at 80% of your plan. Past your plan, extra documents are $0.50 each.</p>
    </>,
  },
  {
    q: 'What happens when something gets flagged?',
    a: <>
      <p>Red means an exception. It&apos;s held until someone looks at it, like a duplicate ticket or a total that doesn&apos;t add up. Yellow is worth a look but doesn&apos;t block anything. Green means the check passed.</p>
      <p>Green doesn&apos;t mean anything got paid. Site Tally doesn&apos;t pay bills or move money. You make the call.</p>
    </>,
  },
  {
    q: 'How does my card data get in?',
    a: <p>During setup we load your card charges from your statements, along with your vendors and jobs. There&apos;s no live bank connection yet, so new charges get loaded from your statements too.</p>,
  },
  {
    q: 'Does it work with QuickBooks?',
    a: <p>QuickBooks integration coming soon. It&apos;s in development and not connected yet.</p>,
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Site Tally',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://clearforgelabs.com/sitetally',
  description: DESCRIPTION,
  publisher: { '@type': 'Organization', name: 'ClearForge Labs', url: 'https://clearforgelabs.com' },
  offers: STANDARD.map(p => ({
    '@type': 'Offer',
    name: `Site Tally ${p.name}`,
    price: p.price.toFixed(2),
    priceCurrency: 'USD',
    description: `${p.docs} documents per month. $${p.setup} setup.`,
  })),
}

function StatusTag({ tone }: { tone: Tone }) {
  return (
    <span className={s.status} data-tone={tone}>
      <span className={s.dot} data-tone={tone} aria-hidden="true"><span className={s.bang}>{TONE_ICON[tone]}</span></span>
      {TONE_LABEL[tone]}
    </span>
  )
}

export default function SiteTallyPage() {
  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SiteHeader
        links={[
          { label: 'Site Tally', href: '/sitetally', current: true },
          { label: 'How it works', href: '#how' },
          { label: 'What it catches', href: '#catches' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get started', href: '#signup' }}
      />

      <main id="main">
        {/* ══ HERO ══ */}
        <section className={s.hero}>
          <div className={`${s.wrap} ${s.heroGrid}`}>
            <div>
              <p className={`${site.meta} ${s.heroMeta}`}>A ClearForge Labs product · Early access</p>
              <h1 className={s.productTitle}>Site Tally</h1>
            </div>
            <div className={s.heroSide}>
              <p className={s.benefit}>Catch paperwork problems before they reach your books.</p>
              <p className={s.lede}>
                It checks receipts, packing lists, dump tickets and supplier invoices, and matches them
                to your card charges. Fewer missing receipts, clearer exceptions, less weekly cleanup.
              </p>
              <div className={s.heroCtas}>
                <a href="#signup" className={`${site.btn} ${site.btnPrimary}`}>Get started <ArrowRight size={16} aria-hidden="true" /></a>
                <a href="#pricing" className={site.textLink}>See pricing</a>
              </div>
            </div>
          </div>
        </section>

        {/* ══ DEMO ══ */}
        <section id="demo" className={s.demoBand} aria-label="Example of Site Tally checking paperwork">
          <div className={s.wrap}>
            <Reveal onMount delay={0.1} y={16}>
              <TallyDemo />
            </Reveal>
          </div>
        </section>

        {/* ══ PROBLEM ══ */}
        <section className={`${s.section} ${s.sectionDark}`} aria-labelledby="problem-title">
          <div className={`${s.wrap} ${s.problemGrid}`}>
            <Reveal>
              <p className={`${site.kicker} ${s.kickerDark}`}>The problem</p>
              <h2 id="problem-title" className={site.h2}>Paperwork is everywhere. Money slips through the gaps.</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className={s.problemList}>
                {PROBLEMS.map(p => (
                  <li key={p.where} className={s.problemItem}>
                    <span className={s.problemWhere}>{p.where}</span>
                    <span className={s.problemText}>{p.text}</span>
                  </li>
                ))}
              </ul>
              <p className={s.problemCoda}>Most of it turns up at cleanup time. Some of it never does.</p>
            </Reveal>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section id="how" tabIndex={-1} className={s.section} aria-labelledby="how-title">
          <div className={s.wrap}>
            <Reveal>
              <p className={site.kicker}>How it works</p>
              <h2 id="how-title" className={site.h2}>Three steps. No new habits.</h2>
            </Reveal>
            <ol className={s.stepsGrid}>
              {[
                ['Snap a photo.', 'Receipt, packing list, dump ticket or supplier invoice. Take a phone photo or send the PDF.'],
                ['Site Tally runs the checks.', 'AI reads the page. Then plain code does the math and checks it against your vendors, jobs and card charges.'],
                ['Review the flags.', 'Red needs a look before it goes further. Yellow is worth a glance. Clean documents stay in the list too, so you can open and review any of them.'],
              ].map(([title, text], i) => (
                <Reveal as="li" key={title} delay={i * 0.08} className={s.stepCard}>
                  <div className={s.stepIndex}>0{i + 1}</div>
                  <h3 className={s.stepTitle}>{title}</h3>
                  <p className={s.stepText}>{text}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal>
              <div className={s.aiNote}>
                <div>
                  <p className={s.aiNoteTitle}>AI reads. Code checks.</p>
                  <p className={s.aiNoteText}>AI copies the fields off the page, exactly as printed. It doesn&apos;t do the math.</p>
                </div>
                <div>
                  <p className={s.aiNoteTitle}>Same rules every time.</p>
                  <p className={s.aiNoteText}>Weights, totals, duplicates and card matches are checked by plain code, so the same document gets the same result.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ WHAT IT CATCHES ══ */}
        <section id="catches" tabIndex={-1} className={`${s.section} ${s.sectionAlt}`} aria-labelledby="catches-title">
          <div className={s.wrap}>
            <Reveal>
              <p className={site.kicker}>What it catches</p>
              <h2 id="catches-title" className={site.h2}>Stop paying for the same dump ticket twice.</h2>
              <p className={site.lead} style={{ marginTop: 16 }}>That one, and the other mistakes that cost you when nobody&apos;s looking.</p>
            </Reveal>
            <ul className={s.catchList}>
              {CATCHES.map((c, i) => (
                <Reveal as="li" key={c.name} delay={i * 0.04} className={s.catchItem}>
                  <h3 className={s.catchName}>{c.name}</h3>
                  <p className={s.catchText}>{c.text}</p>
                  <div className={s.catchStatuses}>{c.tones.map(t => <StatusTag key={t} tone={t} />)}</div>
                </Reveal>
              ))}
            </ul>
            <p className={s.disclaimer}>
              Site Tally points things out. You make the call. It doesn&apos;t pay anything, and it
              won&apos;t catch every mistake. Think of it as a second set of eyes for your bookkeeping,
              not a replacement for yours.
            </p>
          </div>
        </section>

        {/* ══ PRICING ══ */}
        <section id="pricing" tabIndex={-1} className={s.section} aria-labelledby="pricing-title">
          <div className={s.wrap}>
            <Reveal>
              <p className={site.kicker}>Pricing</p>
              <h2 id="pricing-title" className={site.h2}>Pick a plan by how much paper you push.</h2>
              <p className={site.lead} style={{ marginTop: 16 }}>Monthly plans plus a one-time setup. Extra documents are $0.50 each. Bigger operations get a custom quote.</p>
            </Reveal>

            <div className={s.plans}>
              {PLANS.map((p, i) => (
                <Reveal as="article" key={p.name} delay={i * 0.06} className={s.plan}>
                  <h3 id={`plan-${p.name}`} className={s.planName}>{p.name}</h3>
                  <p className={s.planFor}>{p.who}</p>
                  <div className={s.planPrice}>
                    {p.custom
                      ? <span className={s.planAmount}>Custom</span>
                      : <><span className={s.planAmount}>${p.price}</span><span className={s.planPer}>/month</span></>}
                  </div>
                  <dl className={s.planRows}>
                    <div className={s.planRow}><dt>Documents</dt><dd>{p.docs}</dd></div>
                    {p.users && <div className={s.planRow}><dt>Users</dt><dd>{p.users}</dd></div>}
                    {p.custom ? (
                      <div className={s.planRow}>
                        <dt>Pricing</dt>
                        <dd>Quoted for your company<span className={s.planRowNote}>Monthly price and setup</span></dd>
                      </div>
                    ) : (
                      <div className={s.planRow}>
                        <dt>Setup, one time</dt>
                        <dd>${p.setup}</dd>
                      </div>
                    )}
                  </dl>
                  <a href="#signup" className={`${site.btn} ${site.btnGhost} ${s.planBtn}`}>{p.custom ? 'Get a quote' : 'Get started'}</a>
                </Reveal>
              ))}
            </div>

            <div className={s.offers}>
              <Reveal className={s.offer}>
                <span className={s.offerTag}>Promo code</span>
                <h3 className={s.offerTitle}>Use code <span className={s.codeChip}>NJC</span> and setup is free.</h3>
                <p className={s.offerText}>
                  Enter NJC on the form below and we waive the one-time setup fee. That&apos;s $299 off
                  Solo or Crew. It doesn&apos;t change the monthly price. Company setup is part of your quote.
                </p>
                <p className={s.offerText}>
                  Setup means we load your vendors, jobs and card data, so the checks know what
                  &ldquo;right&rdquo; looks like on day one.
                </p>
              </Reveal>
            </div>

            <div className={s.usage}>
              <div>
                <p className={s.usageTitle}>How documents count</p>
                <ul className={s.usageList}>
                  <li>A two-page invoice counts as one document.</li>
                  <li>A duplicate photo doesn&apos;t count again.</li>
                </ul>
              </div>
              <div>
                <p className={s.usageTitle}>Going over</p>
                <ul className={s.usageList}>
                  <li>You get a heads-up when you hit 80% of your monthly documents.</li>
                  <li>Past your plan, extra documents are $0.50 each.</li>
                </ul>
              </div>
            </div>

            <p className={s.soon}>
              <Plug size={16} aria-hidden="true" />
              <span><b>QuickBooks integration coming soon.</b></span>
            </p>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section id="faq" tabIndex={-1} className={`${s.section} ${s.sectionAlt}`} aria-labelledby="faq-title">
          <div className={s.wrap}>
            <Reveal>
              <p className={site.kicker}>FAQ</p>
              <h2 id="faq-title" className={site.h2}>Straight answers.</h2>
            </Reveal>
            <div className={s.faqList}>
              {FAQ.map(item => (
                <details key={item.q} className={s.faqItem}>
                  <summary className={s.faqQ}>{item.q}<Plus size={20} className={s.faqIcon} aria-hidden="true" /></summary>
                  <div className={s.faqA}>{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SIGNUP ══ */}
        <section id="signup" tabIndex={-1} className={s.section} aria-labelledby="signup-title">
          <div className={`${s.wrap} ${s.signupGrid}`}>
            <Reveal className={s.signupAside}>
              <p className={site.kicker}>Get started</p>
              <h2 id="signup-title" className={site.h2}>Tell us about your paperwork.</h2>
              <p style={{ marginTop: 16 }}>
                Fill this out and we&apos;ll reach out to set things up. It&apos;s a request, not a checkout.
              </p>
              <ul>
                <li><Check size={16} aria-hidden="true" />We talk through your vendors, jobs and cards.</li>
                <li><Check size={16} aria-hidden="true" />We load them in during setup.</li>
                <li><Check size={16} aria-hidden="true" />You start snapping photos.</li>
              </ul>
            </Reveal>
            <SignupForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
