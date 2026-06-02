'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface FeedbackRow {
  id: string
  rating: number
  comment: string
  resolved: boolean
  created_at: string
  review_requests?: {
    customers?: { name: string } | null
  } | null
}

interface Props {
  rows: FeedbackRow[]
  businessId: string
}

export default function FeedbackInbox({ rows, businessId }: Props) {
  const [items, setItems] = useState(rows)

  async function resolve(id: string) {
    const supabase = createClient()
    await supabase.from('feedback').update({ resolved: true }).eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  if (!items.length) {
    return (
      <p className="text-sm text-gray-400">No open feedback — all clear!</p>
    )
  }

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
      {items.map(item => (
        <div key={item.id} className="border border-gray-100 rounded-lg p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">
                {item.review_requests?.customers?.name ?? 'Customer'}{' '}
                <span className="text-yellow-500">{'★'.repeat(item.rating)}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.comment}</p>
            </div>
            <button
              onClick={() => resolve(item.id)}
              className="shrink-0 text-xs px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded-md transition-colors"
            >
              Resolve
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
