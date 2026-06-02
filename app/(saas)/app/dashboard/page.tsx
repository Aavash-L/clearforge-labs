import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import RatingChart from './components/rating-chart'
import FeedbackInbox from './components/feedback-inbox'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/app/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, businesses(*)')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/app/login')

  const business = profile.businesses!

  // Stats
  const { count: sentCount } = await supabase
    .from('review_requests')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .not('sent_at', 'is', null)

  const { count: respondedCount } = await supabase
    .from('review_requests')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .in('status', ['rated', 'completed'])

  const { data: ratingRows } = await supabase
    .from('review_requests')
    .select('rating')
    .eq('business_id', business.id)
    .not('rating', 'is', null)

  const avgRating = ratingRows?.length
    ? (ratingRows.reduce((s, r) => s + (r.rating ?? 0), 0) / ratingRows.length).toFixed(1)
    : '—'

  const { count: publicCount } = await supabase
    .from('review_requests')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('status', 'completed')
    .gte('rating', 4)

  const remaining =
    business.monthly_request_limit === -1
      ? '∞'
      : Math.max(0, business.monthly_request_limit - business.requests_used_this_period)

  // Rating trend — last 30 days, group by day
  const since = new Date()
  since.setDate(since.getDate() - 29)

  const { data: trendRows } = await supabase
    .from('review_requests')
    .select('rating, responded_at')
    .eq('business_id', business.id)
    .not('rating', 'is', null)
    .gte('responded_at', since.toISOString())
    .order('responded_at')

  const trendMap: Record<string, { sum: number; count: number }> = {}
  for (const row of trendRows ?? []) {
    const day = row.responded_at!.slice(0, 10)
    if (!trendMap[day]) trendMap[day] = { sum: 0, count: 0 }
    trendMap[day].sum += row.rating!
    trendMap[day].count++
  }
  const chartData = Object.entries(trendMap).map(([date, { sum, count }]) => ({
    date,
    avg: parseFloat((sum / count).toFixed(2)),
  }))

  // Recent unresolved feedback
  const { data: feedbackRows } = await supabase
    .from('feedback')
    .select('*, review_requests(*, customers(name, email, phone))')
    .eq('business_id', business.id)
    .eq('resolved', false)
    .order('created_at', { ascending: false })
    .limit(10)

  const stats = [
    { label: 'Requests sent', value: sentCount ?? 0 },
    {
      label: 'Response rate',
      value: sentCount ? `${Math.round(((respondedCount ?? 0) / sentCount) * 100)}%` : '—',
    },
    { label: 'Avg rating', value: avgRating },
    { label: 'Public reviews driven', value: publicCount ?? 0 },
    { label: 'Remaining this period', value: remaining },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Rating trend (30 days)</h2>
          <RatingChart data={chartData} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Private feedback inbox</h2>
          <FeedbackInbox rows={feedbackRows ?? []} businessId={business.id} />
        </div>
      </div>
    </div>
  )
}
