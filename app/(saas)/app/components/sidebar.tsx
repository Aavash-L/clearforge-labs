'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types'
import { LayoutDashboard, Users, Settings, Shield, LogOut, Star } from 'lucide-react'

interface SidebarProps {
  profile: Profile & { businesses?: { name: string; plan: string; trial_ends_at: string | null; subscription_status: string | null } }
}

const navItems = [
  { href: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/customers', label: 'Customers', icon: Users },
  { href: '/app/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const business = profile.businesses

  const isTrialing = business?.subscription_status === null && business?.trial_ends_at
    ? new Date(business.trial_ends_at) > new Date()
    : false

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/app/login')
  }

  return (
    <aside className="w-60 flex flex-col bg-white border-r border-gray-200 shrink-0">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-blue-600 fill-blue-600" />
          <span className="font-semibold text-gray-900 text-sm">ClearForge Reviews</span>
        </div>
        {business && (
          <p className="mt-2 text-xs text-gray-500 truncate">{business.name}</p>
        )}
      </div>

      {isTrialing && (
        <div className="mx-3 mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-700 font-medium">Free trial active</p>
          <p className="text-xs text-amber-600">
            Ends {business?.trial_ends_at ? new Date(business.trial_ends_at).toLocaleDateString() : ''}
          </p>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
        {profile.role === 'admin' && (
          <Link
            href="/app/admin"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname === '/app/admin'
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            Admin
          </Link>
        )}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100">
        <div className="px-3 mb-3">
          <p className="text-xs font-medium text-gray-800 truncate">{profile.full_name || 'Account'}</p>
          <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">
            {business?.plan ?? 'starter'}
          </span>
        </div>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
