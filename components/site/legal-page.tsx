import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
import site from './site.module.css'
import s from './legal.module.css'

export type LegalSection = { id: string; title: string; body: React.ReactNode }

export function LegalPage({ kicker, title, updated, intro, sections }: {
  kicker: string
  title: string
  updated: string
  intro: React.ReactNode
  sections: LegalSection[]
}) {
  return (
    <div className={s.page}>
      <SiteHeader
        links={[
          { label: 'Work', href: '/#work' },
          { label: 'Products', href: '/#products' },
          { label: 'Company', href: '/#company' },
          { label: 'Site Tally', href: '/sitetally' },
        ]}
        cta={{ label: 'Start a project', href: '/#contact' }}
      />
      <main id="main">
        <header className={s.head}>
          <div className={s.wrap}>
            <p className={site.chapter}><b>Legal</b> {kicker}</p>
            <h1 className={s.title}>{title}</h1>
            <p className={s.meta}>Last updated {updated}</p>
            <p className={s.intro}>{intro}</p>
          </div>
        </header>
        <div className={`${s.wrap} ${s.body}`}>
          <nav className={s.toc} aria-label="On this page">
            <ol>
              {sections.map((sec, i) => (
                <li key={sec.id}><a href={`#${sec.id}`}><span>{String(i + 1).padStart(2, '0')}</span>{sec.title}</a></li>
              ))}
            </ol>
          </nav>
          <div className={s.content}>
            {sections.map((sec, i) => (
              <section key={sec.id} id={sec.id} className={s.section} aria-labelledby={`${sec.id}-h`}>
                <h2 id={`${sec.id}-h`} className={s.h2}><span>{String(i + 1).padStart(2, '0')}</span>{sec.title}</h2>
                {sec.body}
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
