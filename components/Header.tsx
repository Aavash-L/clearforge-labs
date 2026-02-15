'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-xl font-display font-bold tracking-tight">
            Clearforge Labs
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/work" className="text-sm font-medium hover:text-accent transition-colors">
              Work
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-accent transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
              Contact
            </Link>

            {/* Always route to homepage sections */}
            <Link href="/#pricing" className="btn-secondary text-sm px-6 py-3">
              Book / Pay Now
            </Link>

            <Link href="/#book-call" className="btn-primary text-sm px-6 py-3">
              Book Call
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4">
            <div className="bg-white border-2 border-neutral-200 shadow-sm p-4 space-y-3">
              <Link href="/work" className="block text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Work
              </Link>
              <Link href="/services" className="block text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Services
              </Link>
              <Link href="/about" className="block text-sm font-medium" onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="block text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>

              <div className="pt-2 flex flex-col gap-3">
                <Link href="/#pricing" className="btn-secondary text-sm px-6 py-3" onClick={() => setMobileOpen(false)}>
                  Book / Pay Now
                </Link>
                <Link href="/#book-call" className="btn-primary text-sm px-6 py-3" onClick={() => setMobileOpen(false)}>
                  Book Call
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
