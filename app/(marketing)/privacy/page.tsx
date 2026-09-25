import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/site/legal-page'
import { TEXT_NUMBER_DISPLAY, smsHref } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How ClearForge Labs handles information from this website, text messages and call bookings.',
  alternates: { canonical: '/privacy' },
}

const text = <a href={smsHref()}>{TEXT_NUMBER_DISPLAY}</a>

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Privacy"
      title="Privacy Policy"
      updated="September 24, 2026"
      intro={<>This policy explains what information ClearForge Labs gets when you use clearforgelabs.com, text us, or book a call, and what we do with it. We keep it short because we collect very little.</>}
      sections={[
        {
          id: 'who',
          title: 'Who we are',
          body: <p>ClearForge Labs is a software company based in New Jersey. &ldquo;We&rdquo; and &ldquo;us&rdquo; in this policy mean ClearForge Labs. You can reach us any time by texting {text}.</p>,
        },
        {
          id: 'collect',
          title: 'What we collect',
          body: <>
            <p><strong>When you text us.</strong> The contact and Site Tally forms on this site don&apos;t send anything to our servers. They open your own messaging app with a text already written, and nothing is sent unless you tap send. If you do, we receive your phone number and whatever the message contains, such as your name, company, email, project details, document volume or a promo code.</p>
            <p><strong>When you book a call.</strong> Booking links go to Google Calendar&apos;s appointment page. We receive the details you enter there, such as your name, email and the time you pick. Google handles that page under its own privacy policy.</p>
            <p><strong>When you browse.</strong> Our hosting provider, Vercel, automatically processes technical information needed to deliver and protect the site, such as your IP address, browser type and the pages requested. We don&apos;t use this to identify you.</p>
            <p><strong>What we don&apos;t do.</strong> This website doesn&apos;t use advertising or analytics trackers, and it doesn&apos;t set cookies for those purposes.</p>
          </>,
        },
        {
          id: 'previews',
          title: 'Project previews and other sites',
          body: <p>When you open a project preview on our homepage, your browser loads that website directly from its owner, just as if you had visited it. The same goes for links to other sites. Those sites have their own privacy practices, and we don&apos;t control what they collect.</p>,
        },
        {
          id: 'use',
          title: 'How we use information',
          body: <ul>
            <li>To reply to you and talk about your project or a Site Tally setup.</li>
            <li>To prepare quotes, set up services you ask for, and keep records of our conversations.</li>
            <li>To keep the site secure and working.</li>
            <li>To meet legal obligations.</li>
          </ul>,
        },
        {
          id: 'share',
          title: 'Sharing',
          body: <>
            <p>We don&apos;t sell your personal information, and we don&apos;t share it for advertising.</p>
            <p>We share it only with the services that make this possible (our hosting provider, our phone carrier, and Google Calendar for bookings), if the law requires it, or to protect our rights and the safety of others.</p>
          </>,
        },
        {
          id: 'products',
          title: 'Our software products',
          body: <p>This policy covers the website. If you become a customer of one of our products, such as Site Tally, the agreement for that product explains how it handles the documents and business data you give it.</p>,
        },
        {
          id: 'retention',
          title: 'How long we keep it',
          body: <p>We keep messages and booking details for as long as we need them to work with you and for normal business records, and then delete them. You can ask us to delete them sooner.</p>,
        },
        {
          id: 'choices',
          title: 'Your choices',
          body: <p>You can ask us what information we have about you, ask us to correct or delete it, or ask us to stop texting you. Text {text} and we&apos;ll take care of it. We may need to confirm it&apos;s you first.</p>,
        },
        {
          id: 'security',
          title: 'Security',
          body: <p>We use reasonable measures to protect the information we have. No method of sending or storing data is perfectly secure, so please don&apos;t text us passwords, full card numbers or other highly sensitive information.</p>,
        },
        {
          id: 'children',
          title: 'Children',
          body: <p>This site is meant for businesses and isn&apos;t directed to children under 13. We don&apos;t knowingly collect their information.</p>,
        },
        {
          id: 'changes',
          title: 'Changes to this policy',
          body: <p>If we change this policy, we&apos;ll update it here and change the date at the top. See also our <Link href="/terms">Terms of Use</Link>.</p>,
        },
      ]}
    />
  )
}
