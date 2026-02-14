import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  title: string
  subtitle?: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
}

export default function CTASection({ title, subtitle, primaryCTA, secondaryCTA }: CTASectionProps) {
  return (
    <section className="section-padding bg-charcoal-900 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg mb-6 animate-fade-in">{title}</h2>

          {subtitle && (
            <p className="text-xl text-neutral-300 mb-8 animate-fade-in animation-delay-200">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-400">
            <a
              href={primaryCTA.href}
              className="btn-primary bg-white text-charcoal-900 hover:bg-neutral-100"
            >
              {primaryCTA.text}
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>

            {secondaryCTA && (
              <a
                href={secondaryCTA.href}
                className="text-white hover:text-neutral-300 transition-colors font-medium"
              >
                {secondaryCTA.text}
              </a>
            )}
          </div>

          {/* Scarcity Line */}
          <p className="mt-6 text-sm text-neutral-400 animate-fade-in animation-delay-500">
            I only take on <span className="font-semibold text-white">3 new client builds per month</span> to keep delivery fast.
          </p>
        </div>
      </div>
    </section>
  )
}
