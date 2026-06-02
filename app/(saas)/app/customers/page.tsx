import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CustomersClient from './components/customers-client'

export const metadata = { title: 'Customers' }

export default async function CustomersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/app/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, businesses(*)')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/app/login')

  const { data: customers } = await supabase
    .from('customers')
    .select('*')
    .eq('business_id', profile.business_id)
    .order('created_at', { ascending: false })

  return (
    <CustomersClient
      customers={customers ?? []}
      businessId={profile.business_id}
      business={profile.businesses!}
    />
  )
}
