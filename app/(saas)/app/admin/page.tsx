import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Admin' }

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/app/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/app/dashboard')
  }

  const { data: businesses } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false })

  const businessIds = (businesses ?? []).map(b => b.id)

  const { data: requestStats } = await supabase
    .from('review_requests')
    .select('business_id, status, rating')
    .in('business_id', businessIds)

  const statsByBusiness: Record<string, { sent: number; avgRating: number | null }> = {}
  for (const id of businessIds) {
    const rows = (requestStats ?? []).filter(r => r.business_id === id && r.status !== 'queued')
    const rated = rows.filter(r => r.rating)
    statsByBusiness[id] = {
      sent: rows.length,
      avgRating: rated.length
        ? parseFloat((rated.reduce((s, r) => s + (r.rating ?? 0), 0) / rated.length).toFixed(1))
        : null,
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admin</h1>
      <p className="text-sm text-gray-500 mb-6">{(businesses ?? []).length} businesses total</p>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Business</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Plan</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Requests sent</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Avg rating</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Trial ends</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Created</th>
            </tr>
          </thead>
          <tbody>
            {(businesses ?? []).map(b => {
              const stats = statsByBusiness[b.id] ?? { sent: 0, avgRating: null }
              return (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-800">{b.name}</td>
                  <td className="px-4 py-3 capitalize text-gray-600">{b.plan}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                      b.subscription_status === 'active'
                        ? 'bg-green-50 text-green-700'
                        : b.subscription_status === 'past_due'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {b.subscription_status ?? (b.trial_ends_at && new Date(b.trial_ends_at) > new Date() ? 'trialing' : 'no sub')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{stats.sent}</td>
                  <td className="px-4 py-3 text-gray-600">{stats.avgRating != null ? `${stats.avgRating} ★` : '—'}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {b.trial_ends_at ? new Date(b.trial_ends_at).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(b.created_at).toLocaleDateString()}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
