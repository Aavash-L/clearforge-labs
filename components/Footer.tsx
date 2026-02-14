import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-display font-bold mb-4">Clearforge Labs</h3>
            <p className="text-neutral-300 max-w-md">
              Building automated client systems for small businesses. 
              Fast websites, booking systems, and payment integration.
            </p>
            <p className="text-neutral-400 text-sm mt-4">
              Founded by Aavash Lamichhane
            </p>
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
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-12 pt-8 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Clearforge Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
