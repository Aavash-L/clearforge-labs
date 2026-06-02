import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from './components/sidebar'

export const metadata = { title: { template: '%s | ClearForge Reviews', default: 'ClearForge Reviews' } }

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/app/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, businesses(*)')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/app/login')

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar profile={profile} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
