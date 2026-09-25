import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/site/legal-page'
import { TEXT_NUMBER_DISPLAY, smsHref } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms for using the ClearForge Labs website.',
  alternates: { canonical: '/terms' },
}

const text = <a href={smsHref()}>{TEXT_NUMBER_DISPLAY}</a>

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Terms"
      title="Terms of Use"
      updated="September 24, 2026"
      intro={<>These terms cover your use of clearforgelabs.com, including the Site Tally pages. By using the site, you agree to them. If you don&apos;t agree, please don&apos;t use the site.</>}
      sections={[
        {
          id: 'about',
          title: 'About these terms',
          body: <p>ClearForge Labs (&ldquo;we&rdquo; or &ldquo;us&rdquo;) is a software company based in New Jersey. These terms apply to the website only. Any work we do for you, and any subscription to one of our products, is governed by a separate written agreement.</p>,
        },
        {
          id: 'info',
          title: 'Information on this site',
          body: <>
            <p>The site describes our work, our services and our products for general information. We try to keep it accurate, but it may change, and it isn&apos;t an offer or a promise of any particular result.</p>
            <p>Prices shown on the site can change. Nothing here is a purchase: a setup request or a message is a conversation, and a price is only binding once it&apos;s in a written agreement.</p>
          </>,
        },
        {
          id: 'sitetally',
          title: 'Site Tally examples',
          body: <>
            <p>The Site Tally demo and the documents on this site use fictional data. They show how the product works; they aren&apos;t real customer records.</p>
            <p>Site Tally helps people review paperwork. It points things out for a person to check. It doesn&apos;t approve or send payments, and it doesn&apos;t guarantee that every error will be caught. QuickBooks integration is in development and not available yet.</p>
          </>,
        },
        {
          id: 'texts',
          title: 'Texts and calls',
          body: <p>If you text us or book a call, you agree that we may reply by text, phone or email about your inquiry. Your carrier&apos;s message and data rates may apply. Tell us to stop at any time and we will.</p>,
        },
        {
          id: 'third',
          title: 'Other websites',
          body: <p>Our homepage shows and links to websites we built or worked on. Those sites belong to their owners, who are responsible for their content and how they operate. Names and marks on them belong to their owners.</p>,
        },
        {
          id: 'use',
          title: 'Using the site',
          body: <p>Please don&apos;t misuse the site. That includes trying to break or overload it, getting around its security, scraping it in a way that disrupts it, or using it for anything unlawful.</p>,
        },
        {
          id: 'ip',
          title: 'Our content',
          body: <p>The site&apos;s design, text, images and code belong to ClearForge Labs, except for content owned by others. You may view and share links to the site, but don&apos;t copy or reuse our content in a way that suggests it&apos;s yours or that we endorse you.</p>,
        },
        {
          id: 'warranty',
          title: 'No warranties',
          body: <p>The site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the extent the law allows, we make no warranties about it, including that it will always be available, error-free or suitable for a particular purpose.</p>,
        },
        {
          id: 'liability',
          title: 'Limitation of liability',
          body: <p>To the extent the law allows, ClearForge Labs isn&apos;t liable for indirect, incidental or consequential losses arising from your use of the site, or from relying on information on it. This doesn&apos;t limit any liability that can&apos;t be limited by law.</p>,
        },
        {
          id: 'law',
          title: 'Governing law',
          body: <p>These terms are governed by the laws of the State of New Jersey, without regard to its conflict-of-law rules.</p>,
        },
        {
          id: 'changes',
          title: 'Changes and contact',
          body: <p>We may update these terms. When we do, we&apos;ll change the date at the top. Questions? Text {text}. See also our <Link href="/privacy">Privacy Policy</Link>.</p>,
        },
      ]}
    />
  )
}
