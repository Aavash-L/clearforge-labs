import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy | Clearforge Labs',
  description: 'Privacy policy for clearforgelabs.com',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h1 className="heading-xl mb-8">Privacy Policy</h1>
              <p className="text-sm text-neutral-500 mb-12">Last updated: February 2026</p>

              <h2 className="heading-md mt-12 mb-4">Information We Collect</h2>
              <p className="text-neutral-700 mb-6">
                When you use our contact forms or book a call, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-8">
                <li>Name and contact information (email, phone if provided)</li>
                <li>Business information you choose to share</li>
                <li>Messages and project details you submit</li>
                <li>Basic usage data (pages visited, time on site)</li>
              </ul>

              <h2 className="heading-md mt-12 mb-4">How We Use Your Information</h2>
              <p className="text-neutral-700 mb-6">
                We use the information you provide to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-8">
                <li>Respond to your inquiries and provide quotes</li>
                <li>Schedule and conduct strategy calls</li>
                <li>Deliver services you request</li>
                <li>Send project updates and communications</li>
                <li>Improve our website and services</li>
              </ul>

              <h2 className="heading-md mt-12 mb-4">Information Sharing</h2>
              <p className="text-neutral-700 mb-8">
                We do not sell, rent, or share your personal information with third parties except as necessary to 
                provide services (e.g., email service providers, calendar scheduling tools) or as required by law.
              </p>

              <h2 className="heading-md mt-12 mb-4">Cookies and Analytics</h2>
              <p className="text-neutral-700 mb-8">
                We may use basic analytics tools (such as Google Analytics) to understand how visitors use our site. 
                This helps us improve the user experience. You can opt out of analytics tracking through your browser settings.
              </p>

              <h2 className="heading-md mt-12 mb-4">Data Security</h2>
              <p className="text-neutral-700 mb-8">
                We take reasonable measures to protect your information from unauthorized access, use, or disclosure. 
                However, no internet transmission is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="heading-md mt-12 mb-4">Your Rights</h2>
              <p className="text-neutral-700 mb-6">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-8">
                <li>Access the personal information we have about you</li>
                <li>Request correction or deletion of your information</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>

              <h2 className="heading-md mt-12 mb-4">Third-Party Services</h2>
              <p className="text-neutral-700 mb-8">
                Our website may use third-party services such as Google Calendar, Stripe, and form providers. 
                These services have their own privacy policies, which we encourage you to review.
              </p>

              <h2 className="heading-md mt-12 mb-4">Changes to This Policy</h2>
              <p className="text-neutral-700 mb-8">
                We may update this privacy policy from time to time. We will notify you of any changes by posting 
                the new policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="heading-md mt-12 mb-4">Contact Us</h2>
              <p className="text-neutral-700">
                If you have questions about this privacy policy or how we handle your data, please contact us at:
                <br />
                <a href="mailto:hello@clearforgelabs.com" className="text-charcoal-900 hover:underline font-medium">
                  hello@clearforgelabs.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
