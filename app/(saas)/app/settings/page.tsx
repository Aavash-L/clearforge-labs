'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { DEFAULT_SMS_TEMPLATE, DEFAULT_EMAIL_SUBJECT, DEFAULT_EMAIL_BODY } from '@/lib/templates'
import type { Business } from '@/types'
import { PLANS } from '@/lib/stripe'
import { ExternalLink } from 'lucide-react'

export default function SettingsPage() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    google_review_url: '',
    brand_color: '#3B82F6',
    sms_template: '',
    email_template_subject: '',
    email_template_body: '',
  })

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase
        .from('profiles')
        .select('*, businesses(*)')
        .eq('id', user.id)
        .single()
      if (!profile?.businesses) return
      const b = profile.businesses as Business
      setBusiness(b)
      setForm({
        name: b.name,
        google_review_url: b.google_review_url,
        brand_color: b.brand_color,
        sms_template: b.sms_template ?? DEFAULT_SMS_TEMPLATE,
        email_template_subject: b.email_template_subject ?? DEFAULT_EMAIL_SUBJECT,
        email_template_body: b.email_template_body ?? DEFAULT_EMAIL_BODY,
      })
      setLoading(false)
    }
    load()
  }, [])

  async function save() {
    if (!business) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('businesses').update(form).eq('id', business.id)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setSaving(false)
  }

  async function openPortal() {
    setPortalLoading(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    setPortalLoading(false)
  }

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  if (loading) return <div className="p-8 text-sm text-gray-400">Loading…</div>

  const planInfo = business ? PLANS[business.plan as keyof typeof PLANS] : null
  const isTrialing = business?.subscription_status === null && business?.trial_ends_at
    ? new Date(business.trial_ends_at) > new Date()
    : false

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Settings</h1>

      {/* Business info */}
      <Section title="Business">
        <Field label="Business name">
          <input value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} />
        </Field>
        <Field label="Google review URL" hint="The URL customers see when they leave a 4-5 star rating.">
          <input value={form.google_review_url} onChange={e => set('google_review_url', e.target.value)} placeholder="https://g.page/r/..." className={inputCls} />
        </Field>
        <Field label="Brand color">
          <div className="flex items-center gap-3">
            <input type="color" value={form.brand_color} onChange={e => set('brand_color', e.target.value)} className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer p-0.5" />
            <input value={form.brand_color} onChange={e => set('brand_color', e.target.value)} className={`${inputCls} w-32`} />
          </div>
        </Field>
      </Section>

      {/* Message templates */}
      <Section title="Message templates">
        <p className="text-xs text-gray-500 mb-4">Variables: <code className="bg-gray-100 px-1 rounded">{'{{customer_name}}'}</code>, <code className="bg-gray-100 px-1 rounded">{'{{business_name}}'}</code>, <code className="bg-gray-100 px-1 rounded">{'{{link}}'}</code></p>
        <Field label="SMS template">
          <textarea
            value={form.sms_template}
            onChange={e => set('sms_template', e.target.value)}
            rows={4}
            className={`${inputCls} resize-none`}
          />
        </Field>
        <Field label="Email subject">
          <input value={form.email_template_subject} onChange={e => set('email_template_subject', e.target.value)} className={inputCls} />
        </Field>
        <Field label="Email body (HTML)">
          <textarea
            value={form.email_template_body}
            onChange={e => set('email_template_body', e.target.value)}
            rows={6}
            className={`${inputCls} resize-none font-mono text-xs`}
          />
        </Field>
      </Section>

      <button
        onClick={save}
        disabled={saving}
        className="mb-10 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
      >
        {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save changes'}
      </button>

      {/* Billing */}
      <Section title="Billing">
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-gray-800 capitalize">
              {business?.plan ?? 'starter'} plan
              {isTrialing && <span className="ml-2 text-xs text-amber-600 font-normal">trial</span>}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {planInfo?.limit === -1 ? 'Unlimited requests' : `${planInfo?.limit ?? 100} requests/mo`}
            </p>
          </div>
          <button
            onClick={openPortal}
            disabled={portalLoading}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 hover:border-gray-400 text-sm text-gray-700 rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {portalLoading ? 'Loading…' : 'Manage billing'}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {(Object.entries(PLANS) as [string, typeof PLANS[keyof typeof PLANS]][]).map(([key, plan]) => (
            <div
              key={key}
              className={`border rounded-xl p-4 ${business?.plan === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              <p className="text-sm font-semibold text-gray-800">{plan.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                ${plan.monthly_cents / 100}/mo
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {plan.limit === -1 ? 'Unlimited' : `${plan.limit} req/mo`}
              </p>
              {business?.plan !== key && (
                <a
                  href={`/api/stripe/checkout?plan=${key}&interval=monthly`}
                  className="mt-3 block text-center text-xs py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Upgrade
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1.5">{hint}</p>}
      {children}
    </div>
  )
}

const inputCls =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
