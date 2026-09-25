import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BOOKING_URL, TEXT_NUMBER_DISPLAY, smsHref } from '@/lib/contact'
import s from './site.module.css'

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div className={s.footerTop}>
          <p className={s.footerLine}>Software products and custom systems, built in New Jersey.</p>
          <div>
            <p className={s.footerHead}>Company</p>
            <ul className={s.footerList}>
              <li><Link href="/#work">Work</Link></li>
              <li><Link href="/#company">Company</Link></li>
              <li><Link href="/#contact">Start a project</Link></li>
            </ul>
          </div>
          <div>
            <p className={s.footerHead}>Products</p>
            <ul className={s.footerList}>
              <li><Link href="/sitetally">Site Tally</Link></li>
              <li><Link href="/sitetally#pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <p className={s.footerHead}>Contact</p>
            <ul className={s.footerList}>
              <li><a href={smsHref()}>Text {TEXT_NUMBER_DISPLAY}</a></li>
              <li>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book a call <ArrowUpRight size={14} aria-hidden="true" /><span className={s.srOnly}>(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={s.footerBottom}>
          <span>© {new Date().getFullYear()} ClearForge Labs · New Jersey</span>
          <span className={s.legalLinks}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </div>
      <p className={s.footerMark} aria-hidden="true">ClearForge Labs</p>
    </footer>
  )
}
