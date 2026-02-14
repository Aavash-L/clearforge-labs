// components/PricingCard.tsx
import { CheckCircle2 } from 'lucide-react'

interface PricingCardProps {
  name: string
  price: string
  originalPrice?: string
  description: string
  features: string[]
  featured?: boolean
}

export default function PricingCard({
  name,
  price,
  originalPrice,
  description,
  features,
  featured = false,
}: PricingCardProps) {
  return (
    <div
      className={[
        // Base card
        'relative border-2 p-8 transition-all duration-300',
        // Hover polish (subtle)
        'hover:shadow-xl hover:-translate-y-1',
        // Non-featured
        !featured ? 'border-neutral-300 hover:border-charcoal-900' : '',
        // Featured styling (keep your colors)
        featured ? 'border-charcoal-900 bg-charcoal-900 text-white' : '',
        // Scale ONLY on desktop for featured (prevents mobile layout weirdness)
        featured ? 'md:scale-105' : '',
      ].join(' ')}
    >
      {/* Badge (only featured) */}
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-white text-charcoal-900 border-2 border-charcoal-900 px-4 py-1 text-xs font-bold tracking-wide uppercase">
            Most Popular
          </div>
        </div>
      )}

      {/* Give space so the badge never overlaps content */}
      <div className={featured ? 'pt-6' : ''}>
        <h3 className="text-2xl font-display font-bold mb-2">{name}</h3>

        {/* Price block (supports founders strikethrough) */}
        <div className="mb-4">
          {originalPrice && (
            <div className={`text-sm mb-1 ${featured ? 'text-neutral-300' : 'text-neutral-500'}`}>
              <span className="line-through">{originalPrice}</span>
              <span className={`ml-2 font-semibold ${featured ? 'text-white' : 'text-charcoal-900'}`}>
                Founders Rate
              </span>
            </div>
          )}
          <span className="text-4xl font-bold">{price}</span>
        </div>

        <p className={`mb-6 ${featured ? 'text-neutral-300' : 'text-neutral-600'}`}>{description}</p>

        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${featured ? 'text-white' : 'text-charcoal-900'}`} />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Buttons: consistent heights + clean alignment */}
        <div className="space-y-3">
          <a
            href="#book-call"
            className={[
              'block w-full text-center font-semibold transition-all duration-200',
              // consistent height
              'py-4',
              featured ? 'bg-white text-charcoal-900 hover:bg-neutral-100' : 'bg-charcoal-900 text-white hover:bg-charcoal-800',
            ].join(' ')}
          >
            Book Free Strategy Call
          </a>

          <a
            href="/contact"
            className={[
              'block w-full text-center font-medium border-2 transition-all duration-200',
              // match height visually with top button (outline buttons look smaller)
              'py-4',
              featured
                ? 'border-white text-white hover:bg-white hover:text-charcoal-900'
                : 'border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white',
            ].join(' ')}
          >
            Get Quote
          </a>
        </div>
      </div>
    </div>
  )
}
