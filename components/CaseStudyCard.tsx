import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CaseStudyCardProps {
  title: string
  problem: string
  solution: string
  slug: string
}

export default function CaseStudyCard({ title, problem, solution, slug }: CaseStudyCardProps) {
  return (
    <div className="border-2 border-neutral-300 p-8 transition-all duration-300 hover:border-charcoal-900 hover:shadow-lg group">
      <h3 className="text-2xl font-display font-bold mb-4">{title}</h3>
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-1">Problem</p>
          <p className="text-neutral-700">{problem}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-1">Solution</p>
          <p className="text-neutral-700">{solution}</p>
        </div>
      </div>
      <Link
        href={`/work#${slug}`}
        className="inline-flex items-center gap-2 font-semibold text-charcoal-900 group-hover:gap-4 transition-all duration-300"
      >
        View Details
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  )
}
