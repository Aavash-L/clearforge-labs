'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  token: string
  customerName: string
  businessName: string
  businessColor: string
  businessLogoUrl: string | null
  googleReviewUrl: string
  alreadyResponded: boolean
}

type Stage = 'rating' | 'high' | 'low' | 'done'

export default function FeedbackFlow({
  token,
  customerName,
  businessName,
  businessColor,
  businessLogoUrl,
  googleReviewUrl,
  alreadyResponded,
}: Props) {
  const [stage, setStage] = useState<Stage>(alreadyResponded ? 'done' : 'rating')
  const [hoveredStar, setHoveredStar] = useState(0)
  const [selectedRating, setSelectedRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function submitRating(rating: number) {
    setSelectedRating(rating)
    if (rating >= 4) {
      setStage('high')
    } else {
      setStage('low')
    }
    // Persist the rating
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, rating }),
    })
  }

  async function submitPrivateFeedback() {
    setSubmitting(true)
    setSubmitError('')
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, rating: selectedRating, comment }),
    })
    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      setSubmitError(json.error ?? 'Something went wrong. Please try again.')
      setSubmitting(false)
    } else {
      setStage('done')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Business header */}
        <div className="text-center mb-8">
          {businessLogoUrl ? (
            <Image
              src={businessLogoUrl}
              alt={businessName}
              width={80}
              height={80}
              className="mx-auto mb-3 rounded-xl object-cover"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: businessColor }}
            >
              {businessName.charAt(0)}
            </div>
          )}
          <h1 className="text-xl font-semibold text-gray-900">{businessName}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Stage: rating */}
          {stage === 'rating' && (
            <div className="text-center">
              <p className="text-lg font-medium text-gray-800 mb-2">
                Hi {customerName}! How was your experience?
              </p>
              <p className="text-sm text-gray-500 mb-8">Tap a star to rate us.</p>
              <div className="flex justify-center gap-3 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => submitRating(star)}
                    className="text-4xl transition-transform hover:scale-110 active:scale-95"
                    aria-label={`${star} star`}
                  >
                    <span style={{ color: star <= (hoveredStar || selectedRating) ? '#F59E0B' : '#D1D5DB' }}>
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stage: high rating (4-5 stars) */}
          {stage === 'high' && (
            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                We&apos;re so glad to hear that!
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Would you mind sharing your experience on Google? It only takes 30 seconds and helps us a lot.
              </p>
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl font-semibold text-white text-center transition-opacity hover:opacity-90"
                style={{ backgroundColor: businessColor }}
              >
                Leave a Google review ★
              </a>
              <p className="text-xs text-gray-400 mt-4">
                Your kind words really make a difference. Thank you!
              </p>
            </div>
          )}

          {/* Stage: low rating (1-3 stars) */}
          {stage === 'low' && (
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-1">
                We&apos;re sorry we missed the mark.
              </p>
              <p className="text-sm text-gray-500 mb-5">
                Tell us what happened so we can make it right. Your feedback goes directly to the owner.
              </p>
              {submitError && (
                <p className="mb-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{submitError}</p>
              )}
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="What could we have done better?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
              />
              <button
                onClick={submitPrivateFeedback}
                disabled={submitting || !comment.trim()}
                className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ backgroundColor: businessColor }}
              >
                {submitting ? 'Sending…' : 'Send private feedback'}
              </button>
              {/* Compliance: always show public review link */}
              <div className="mt-5 pt-5 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400 mb-2">Prefer to share publicly?</p>
                <a
                  href={googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 underline hover:text-gray-700"
                >
                  Leave a public Google review instead
                </a>
              </div>
            </div>
          )}

          {/* Stage: done */}
          {stage === 'done' && (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">✓</div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Thank you!</p>
              <p className="text-sm text-gray-500">
                {alreadyResponded
                  ? "You've already submitted feedback for this request."
                  : 'Your feedback has been received. We really appreciate it.'}
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-300 mt-6">
          Powered by ClearForge Reviews
        </p>
      </div>
    </div>
  )
}
