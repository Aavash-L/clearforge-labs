import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Reveal } from '@/components/site/reveal'
import { ContactForm } from '@/components/site/contact-form'
import { SitePreviewHost } from '@/components/site/site-preview'
import { BOOKING_URL, TEXT_NUMBER_DISPLAY, smsHref } from '@/lib/contact'
import site from '@/components/site/site.module.css'
import { HeroScroll } from './components/hero-scroll'
import { TallyStory } from './components/tally-story'
import s from './home.module.css'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

type Project = {
  id: string
  name: string
  url: string
  host: string
  meta: string
  role: string
  desc: string
  scope: string
  image: { src: string; w: number; h: number }
  /** false when the site refuses to be framed (X-Frame-Options) */
  embed: boolean
}

// Facts here are verified: live URLs, and scope from our own project records.
const WORK: Record<'rotgen' | 'wings' | 'truestar', Project> = {
  rotgen: {
    id: 'rotgen', name: 'Rotgen', url: 'https://rotgen.org', host: 'rotgen.org',
    meta: 'Web app', role: 'Aavash is the developer',
    desc: 'Turns a topic into a short-form video with AI voices, gameplay backgrounds and animated subtitles.',
    scope: 'Web app, video generation pipeline, publishing to TikTok, YouTube and Instagram, Stripe subscriptions.',
    image: { src: '/work/rotgen-desktop.jpg', w: 2000, h: 861 }, embed: false,
  },
  wings: {
    id: 'wings', name: 'Wings Citi Cafe', url: 'https://www.wingsciticafe.com', host: 'wingsciticafe.com',
    meta: 'Restaurant website', role: 'Carrollton, GA',
    desc: 'A wings, pizza and subs restaurant. Customers browse the menu and order ahead for pickup.',
    scope: 'Menu pages and online ordering.',
    image: { src: '/work/wings-desktop.jpg', w: 2000, h: 1250 }, embed: true,
  },
  truestar: {
    id: 'truestar', name: 'True Star Contracting', url: 'https://www.truestarcontracting.com', host: 'truestarcontracting.com',
    meta: 'Contractor website', role: 'Client · North Jersey',
    desc: 'Demolition and asbestos removal. Built so people in the towns they serve can find them and ask for an estimate.',
    scope: 'Service pages, pages for 60 towns, estimate requests.',
    image: { src: '/work/truestar-desktop.jpg', w: 2000, h: 1250 }, embed: true,
  },
}

/** Attributes that make a link open in the in-page site preview. */
function previewProps(p: Project) {
  return {
    href: p.url,
    target: '_blank',
    rel: 'noopener noreferrer',
    'data-preview-url': p.url,
    'data-preview-name': p.name,
    'data-preview-embed': String(p.embed),
    'data-preview-image': p.image.src,
  }
}

function Caption({ p, index, bodyClass, sideClass }: { p: Project; index: string; bodyClass?: string; sideClass?: string }) {
  return (
    <>
      <p className={s.pMeta}><b>{index}</b><span>{p.meta}</span><span>{p.role}</span></p>
      <div className={bodyClass}>
        <h3 id={`p-${p.id}`} className={s.pName}>{p.name}</h3>
        <p className={s.pDesc}>{p.desc}</p>
      </div>
      <div className={sideClass}>
        <p className={s.pScope}>{p.scope}</p>
        <a {...previewProps(p)} className={`${site.textLink} ${s.pLink}`}>
          View {p.host} <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </>
  )
}

function Media({ p, className, sizes }: { p: Project; className: string; sizes: string }) {
  return (
    <Reveal variant={s.clip} className={className}>
      <a {...previewProps(p)} className={s.media} style={{ position: 'absolute', inset: 0 }} tabIndex={-1} aria-hidden="true">
        <Image src={p.image.src} alt="" fill sizes={sizes} />
      </a>
    </Reveal>
  )
}

export default function HomePage() {
  const { rotgen, wings, truestar } = WORK
  return (
    <>
      <SiteHeader
        links={[
          { label: 'Work', href: '#work' },
          { label: 'Products', href: '#products' },
          { label: 'Company', href: '#company' },
          { label: 'Site Tally', href: '/sitetally' },
        ]}
        cta={{ label: 'Start a project', href: '#contact' }}
      />

      <main id="main">
        {/* ══ HERO: the working surface ══ */}
        <HeroScroll className={s.hero} labelledBy="hero-title">
          <div className={s.heroText}>
            <div className={`${s.wrap} ${s.heroInner}`}>
              <div className={s.heroCopy}>
                <p className={`${site.meta} ${s.heroMeta}`}>Software company · New Jersey</p>
                <h1 id="hero-title" className={s.heroTitle}>ClearForge Labs</h1>
                <Reveal onMount delay={0.12} y={12}>
                  <p className={s.positioning}>Software products. Custom systems.</p>
                  <p className={s.support}>We turn the way a business actually works into software people use every day.</p>
                </Reveal>
                <Reveal onMount delay={0.24} y={12}>
                  <div className={s.heroActions}>
                    <a href="#contact" className={`${site.btn} ${site.btnPrimary}`}>Start a project <ArrowRight size={16} aria-hidden="true" /></a>
                    <a href="#work" className={site.textLink}>See selected work</a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <div className={s.scene}>
            <div className={s.sceneFrame}>
              <div className={s.sceneMedia}>
                <Image className={s.sceneDesktop} src="/scene/working-surface-v3.jpg" alt="A fictional weight ticket and supplier invoice on a stone work surface, beside the Site Tally screen that checked them." fill priority sizes="100vw" />
                <Image className={s.sceneTall} src="/scene/working-surface-tall.jpg" alt="A fictional weight ticket and supplier invoice beside the Site Tally screen that checked them." fill priority sizes="100vw" />
              </div>
            </div>
            <span className={`${site.mark} ${s.markTL}`} aria-hidden="true" />
            <span className={`${site.mark} ${s.markTR}`} aria-hidden="true" />
            <span className={`${site.mark} ${s.markBL}`} aria-hidden="true" />
            <p className={s.caption}>Fig. 1 — A weight ticket and an invoice, read and checked in Site Tally. Fictional data.</p>
          </div>
          <p className={s.captionMobile}>Fig. 1 — Checked in Site Tally · Fictional data</p>
        </HeroScroll>

        {/* ══ 01 INTRODUCTION ══ */}
        <section className={s.intro} aria-label="Introduction">
          <div className={s.wrap}>
            <Reveal className={s.chapterRow}><p className={site.chapter}><b>01</b> What we do</p></Reveal>
            <div className={s.grid}>
              <Reveal className={s.introStatement}>
                <p>
                  We build our own software products and <em>custom systems</em> for businesses: practical
                  tools that take repetitive work off people&apos;s plates and make the rest easier to see.
                </p>
              </Reveal>
              <ul className={s.caps}>
                {[
                  ['Software', 'Internal tools, portals and our own products.'],
                  ['Automation', 'Paperwork, data entry and hand-offs between tools.'],
                  ['Digital experiences', 'Websites that take orders, bookings and estimate requests.'],
                ].map(([name, text], i) => (
                  <Reveal as="li" key={name} delay={0.08 * i} className={s.cap}>
                    <p className={s.capName}><span>0{i + 1}</span>{name}</p>
                    <p className={s.capText}>{text}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ══ 02 SELECTED WORK ══ */}
        <section id="work" tabIndex={-1} className={s.section} style={{ paddingTop: 0 }} aria-labelledby="work-title">
          <div className={s.wrap}>
            <Reveal className={s.chapterRow}><p className={site.chapter}><b>02</b> Work</p></Reveal>
            <div className={`${s.grid} ${s.workHead}`}>
              <h2 id="work-title" className={s.workTitle}>Selected work</h2>
              <p className={s.workNote}>A web app, a restaurant ordering site and a contractor website. Each opens here so you can look around.</p>
            </div>

            <div className={s.projects}>
              <article className={`${s.grid} ${s.project}`} aria-labelledby="p-rotgen">
                <Media p={rotgen} className={s.aMedia} sizes="(min-width: 1440px) 1330px, 100vw" />
                <Reveal delay={0.15} y={12} className={s.aCap}>
                  <Caption p={rotgen} index="02.1" bodyClass={s.aBody} sideClass={s.aSide} />
                </Reveal>
              </article>

              <article className={`${s.grid} ${s.project}`} aria-labelledby="p-wings">
                <Media p={wings} className={s.bMedia} sizes="(min-width: 900px) 66vw, 100vw" />
                <Reveal delay={0.15} y={12} className={s.bCap}>
                  <Caption p={wings} index="02.2" />
                </Reveal>
              </article>

              <article className={`${s.grid} ${s.project}`} aria-labelledby="p-truestar">
                <Media p={truestar} className={s.cMedia} sizes="(min-width: 900px) 74vw, 100vw" />
                <Reveal delay={0.15} y={12} className={s.cCap}>
                  <Caption p={truestar} index="02.3" />
                </Reveal>
              </article>
            </div>
          </div>
        </section>

        {/* ══ 03 PRODUCT ══ */}
        <TallyStory />

        {/* ══ 04 COMPANY ══ */}
        <section id="company" tabIndex={-1} className={s.section} aria-labelledby="company-title">
          <div className={s.wrap}>
            <Reveal className={s.chapterRow}><p className={site.chapter}><b>04</b> Company</p></Reveal>
            <div className={`${s.grid} ${s.companyGrid}`}>
              <Reveal className={s.companyText}>
                <h2 id="company-title" className={s.companyStatement}>Founder-led. You work directly with the person building your software.</h2>
                <p className={s.companyBody}>
                  ClearForge Labs is run by Aavash Lamichhane in New Jersey. No account managers and no
                  hand-offs: you describe how the work happens today, we agree on what to build first,
                  and you see working software early.
                </p>
                <p className={s.founderLine}><b>Aavash Lamichhane</b> · Founder</p>
              </Reveal>
              <Reveal delay={0.1} className={s.services}>
                <p className={site.kicker}>What we can build for you</p>
                <ul className={s.serviceList}>
                  {[
                    'Custom software and internal tools',
                    'Workflow automation',
                    'Connections between the tools you already use',
                    'Websites with ordering, booking and estimates',
                    'Document reading and checking',
                  ].map((x, i) => (
                    <li key={x} className={s.serviceItem}><span>0{i + 1}</span>{x}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ 05 CONTACT ══ */}
        <section id="contact" tabIndex={-1} className={`${s.section} ${s.contact}`} aria-labelledby="contact-title">
          <div className={s.wrap}>
            <Reveal className={s.chapterRow}><p className={site.chapter}><b>05</b> Contact</p></Reveal>
            <div className={`${s.grid} ${s.contactGrid}`}>
              <Reveal className={s.contactText}>
                <h2 id="contact-title" className={s.contactTitle}>What are you building?</h2>
                <p className={s.contactLead}>
                  Software, an automation, a website, or something you haven&apos;t named yet.
                  Describe it and send it as a text. We&apos;ll reply to talk it through.
                </p>
                <div className={s.contactAlt}>
                  <a href={smsHref()}>Text {TEXT_NUMBER_DISPLAY} <span>Text</span></a>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    Book a call <span>Calendar ↗</span>
                    <span className={site.srOnly}>(opens in a new tab)</span>
                  </a>
                </div>
              </Reveal>
              <div className={s.contactForm}><ContactForm /></div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <SitePreviewHost />
    </>
  )
}
