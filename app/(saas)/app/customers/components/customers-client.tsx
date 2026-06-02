'use client'

import { useState, useRef } from 'react'
import Papa from 'papaparse'
import { createClient } from '@/lib/supabase/client'
import type { Customer, Business } from '@/types'
import { UserPlus, Upload, Send, X } from 'lucide-react'

interface Props {
  customers: Customer[]
  businessId: string
  business: Business
}

interface AddForm { name: string; phone: string; email: string; consent: boolean }
const emptyForm: AddForm = { name: '', phone: '', email: '', consent: false }

export default function CustomersClient({ customers: initial, businessId, business }: Props) {
  const [customers, setCustomers] = useState(initial)
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [showSend, setShowSend] = useState<Customer | null>(null)
  const [form, setForm] = useState<AddForm>(emptyForm)
  const [addLoading, setAddLoading] = useState(false)
  const [addError, setAddError] = useState('')
  const [sendLoading, setSendLoading] = useState(false)
  const [sendChannel, setSendChannel] = useState<'sms' | 'email' | 'both'>('both')
  const [sendFeedback, setSendFeedback] = useState('')
  const [csvRows, setCsvRows] = useState<AddForm[]>([])
  const [importLoading, setImportLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.email ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (c.phone ?? '').includes(search)
  )

  const supabase = createClient()

  async function addCustomer() {
    if (!form.name.trim() || (!form.phone.trim() && !form.email.trim())) {
      setAddError('Name and at least one contact method are required.')
      return
    }
    if (!form.consent) {
      setAddError('You must confirm this customer has given consent to be contacted.')
      return
    }
    setAddLoading(true)
    setAddError('')
    const { data, error } = await supabase
      .from('customers')
      .insert({ business_id: businessId, name: form.name.trim(), phone: form.phone.trim() || null, email: form.email.trim() || null, consent: true })
      .select()
      .single()

    if (error) {
      setAddError(error.message)
    } else {
      setCustomers(prev => [data, ...prev])
      setForm(emptyForm)
      setShowAdd(false)
    }
    setAddLoading(false)
  }

  function handleCSVFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data.map(row => ({
          name: row.name ?? row.Name ?? '',
          phone: row.phone ?? row.Phone ?? '',
          email: row.email ?? row.Email ?? '',
          consent: true,
        })).filter(r => r.name)
        setCsvRows(rows)
      },
    })
  }

  async function importCSV() {
    if (!csvRows.length) return
    setImportLoading(true)
    const inserts = csvRows.map(r => ({
      business_id: businessId,
      name: r.name.trim(),
      phone: r.phone.trim() || null,
      email: r.email.trim() || null,
      consent: true,
    })).filter(r => r.phone || r.email)

    const { data, error } = await supabase.from('customers').insert(inserts).select()
    if (!error && data) {
      setCustomers(prev => [...data, ...prev])
    }
    setCsvRows([])
    setShowImport(false)
    setImportLoading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function sendRequest() {
    if (!showSend) return
    setSendLoading(true)
    setSendFeedback('')
    const res = await fetch('/api/requests/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: showSend.id, channel: sendChannel }),
    })
    const json = await res.json()
    if (!res.ok) {
      setSendFeedback(json.error ?? 'Failed to send request.')
    } else {
      setSendFeedback('Request sent successfully!')
      setTimeout(() => { setShowSend(null); setSendFeedback('') }, 1500)
    }
    setSendLoading(false)
  }

  const atLimit = business.monthly_request_limit !== -1 &&
    business.requests_used_this_period >= business.monthly_request_limit

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-0.5">{customers.length} total</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowImport(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <UserPlus className="w-4 h-4" /> Add customer
          </button>
        </div>
      </div>

      {atLimit && (
        <div className="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
          You&apos;ve reached your monthly request limit. <a href="/app/settings" className="underline font-medium">Upgrade your plan</a> to send more.
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">
            {customers.length ? 'No results match your search.' : 'No customers yet. Add one or import a CSV.'}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Added</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.phone ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{c.email ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => { setShowSend(c); setSendFeedback('') }}
                      disabled={atLimit}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md disabled:opacity-40 ml-auto"
                    >
                      <Send className="w-3 h-3" /> Send request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add customer modal */}
      {showAdd && (
        <Modal title="Add customer" onClose={() => { setShowAdd(false); setAddError(''); setForm(emptyForm) }}>
          <div className="space-y-4">
            {addError && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{addError}</p>}
            {[
              { label: 'Full name *', field: 'name', type: 'text' },
              { label: 'Phone', field: 'phone', type: 'tel' },
              { label: 'Email', field: 'email', type: 'email' },
            ].map(({ label, field, type }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  value={form[field as keyof AddForm] as string}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                className="mt-0.5 accent-blue-600"
              />
              <span className="text-xs text-gray-600">
                I confirm this is an existing customer who has consented to receive messages from my business (required by TCPA).
              </span>
            </label>
            <button
              onClick={addCustomer}
              disabled={addLoading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg"
            >
              {addLoading ? 'Adding…' : 'Add customer'}
            </button>
          </div>
        </Modal>
      )}

      {/* CSV import modal */}
      {showImport && (
        <Modal title="Import from CSV" onClose={() => { setShowImport(false); setCsvRows([]) }}>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              CSV must have columns: <code className="bg-gray-100 px-1 rounded">name</code>,{' '}
              <code className="bg-gray-100 px-1 rounded">phone</code>,{' '}
              <code className="bg-gray-100 px-1 rounded">email</code>. At least phone or email required per row.
            </p>
            <input ref={fileRef} type="file" accept=".csv" onChange={handleCSVFile} className="text-sm" />
            {csvRows.length > 0 && (
              <p className="text-sm text-gray-700 font-medium">{csvRows.length} customers ready to import.</p>
            )}
            <p className="text-xs text-gray-500 bg-amber-50 border border-amber-100 rounded-lg p-2">
              By importing, you confirm all contacts are existing customers with consent to be contacted (TCPA).
            </p>
            <button
              onClick={importCSV}
              disabled={!csvRows.length || importLoading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg"
            >
              {importLoading ? 'Importing…' : `Import ${csvRows.length} customers`}
            </button>
          </div>
        </Modal>
      )}

      {/* Send request modal */}
      {showSend && (
        <Modal title={`Send request to ${showSend.name}`} onClose={() => { setShowSend(null); setSendFeedback('') }}>
          <div className="space-y-4">
            {sendFeedback && (
              <p className={`text-sm px-3 py-2 rounded-lg ${sendFeedback.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                {sendFeedback}
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Send via</label>
              <div className="flex gap-2">
                {(['sms', 'email', 'both'] as const).map(ch => (
                  <button
                    key={ch}
                    onClick={() => setSendChannel(ch)}
                    disabled={ch !== 'email' && !showSend.phone || ch !== 'sms' && !showSend.email}
                    className={`flex-1 py-2 text-sm rounded-lg border transition-colors capitalize ${
                      sendChannel === ch
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
              {!showSend.phone && <p className="text-xs text-amber-600 mt-1">No phone on file — SMS unavailable.</p>}
              {!showSend.email && <p className="text-xs text-amber-600 mt-1">No email on file — email unavailable.</p>}
            </div>
            <button
              onClick={sendRequest}
              disabled={sendLoading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg"
            >
              {sendLoading ? 'Sending…' : 'Send review request'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
