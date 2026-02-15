import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-display font-bold mb-4">Clearforge Labs</h3>
            <p className="text-neutral-300 max-w-md">
              Founder-led builds for service businesses: fast websites, booking systems, and Stripe deposit/payment flows.
              Built in NJ, serving NYC + clients nationwide.
            </p>
            <p className="text-neutral-400 text-sm mt-4">Founded by Aavash Lamichhane</p>

            <div className="mt-6 space-y-2 text-sm">
              <p className="text-neutral-300">
                <span className="text-neutral-400">Email: </span>
                <a href="mailto:hello@clearforgelabs.com" className="hover:text-white transition-colors">
                  hello@clearforgelabs.com
                </a>
              </p>
              <p className="text-neutral-300">
                <span className="text-neutral-400">Text/Call: </span>
                <a href="tel:+17327349618" className="hover:text-white transition-colors">
                  (732) 734-9618
                </a>
              </p>
              <p className="text-neutral-300">
                <span className="text-neutral-400">Based in: </span>Edison, NJ
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/work" className="text-neutral-300 hover:text-white transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/#book-call" className="text-neutral-300 hover:text-white transition-colors">
                  Book a Call
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-neutral-300 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/privacy" className="text-neutral-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <div className="mt-6 text-sm text-neutral-400">
              <p>Response time:</p>
              <p className="text-neutral-300">Within 24 hours (business days)</p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-12 pt-8 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Clearforge Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
