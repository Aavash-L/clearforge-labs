'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { EMAIL_RE, TEXT_NUMBER_DISPLAY, smsHref } from '@/lib/contact'
import f from '@/components/site/site.module.css'

const PROMO_CODE = 'NJC'
const VOLUME_OPTIONS = ['Under 100', '100 to 400', '400 to 1,500', 'Over 1,500', 'Not sure yet']

type Values = { name: string; company: string; phone: string; email: string; volume: string; promo: string }
type Field = keyof Values
type Errors = Partial<Record<Field, string>>

const EMPTY: Values = { name: '', company: '', phone: '', email: '', volume: '', promo: '' }
const ORDER: Field[] = ['name', 'company', 'phone', 'email', 'volume', 'promo']

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!v.company.trim()) e.company = 'Enter your company name.'
  const digits = v.phone.replace(/\D/g, '')
  if (!digits) e.phone = 'Enter a phone number.'
  else if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))))
    e.phone = 'Enter a 10-digit phone number.'
  if (!v.email.trim()) e.email = 'Enter your email.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'That email doesn’t look right.'
  if (!v.volume) e.volume = 'Pick a rough number. A guess is fine.'
  if (v.promo.length > 20) e.promo = 'That code is too long.'
  return e
}

function composeText(v: Values) {
  return [
    `Site Tally setup request`,
    `Name: ${v.name.trim()}`,
    `Company: ${v.company.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `Email: ${v.email.trim()}`,
    `Documents per month: ${v.volume}`,
    ...(v.promo.trim() ? [`Promo code: ${v.promo.trim()}`] : []),
    '(Sent from clearforgelabs.com/sitetally)',
  ].join('\n')
}

export function SignupForm() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [opened, setOpened] = useState(false)
  const promoEdited = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)

  // ?promo=NJC fills the code, unless the visitor has already typed their own.
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('promo')
    if (code && !promoEdited.current) {
      // The page is static, so the query string is only readable after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValues(v => ({ ...v, promo: code.trim().toUpperCase().slice(0, 20) }))
    }
  }, [])

  useEffect(() => { if (opened) noteRef.current?.focus() }, [opened])

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = field === 'promo' ? e.target.value.toUpperCase() : e.target.value
    if (field === 'promo') promoEdited.current = true
    const next = { ...values, [field]: value }
    setValues(next)
    if (touched[field]) setErrors(validate(next))
  }

  const blur = (field: Field) => () => {
    setTouched(t => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, company: true, phone: true, email: true, volume: true, promo: true })
    const first = ORDER.find(k => found[k])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    window.location.href = smsHref(composeText(values))
    setOpened(true)
  }

  const err = (k: Field) => (touched[k] ? errors[k] : undefined)
  const described = (k: Field, hint?: boolean) =>
    [err(k) ? `${k}-error` : null, hint ? `${k}-hint` : null].filter(Boolean).join(' ') || undefined
  const promoOk = values.promo.trim() === PROMO_CODE

  return (
    <form ref={formRef} className={f.form} onSubmit={onSubmit} noValidate aria-describedby="signup-note">
      <div className={f.formGrid}>
        <div>
          <label className={f.label} htmlFor="name">Name</label>
          <input id="name" name="name" className={f.input} autoComplete="name" required
            value={values.name} onChange={set('name')} onBlur={blur('name')}
            aria-invalid={!!err('name')} aria-describedby={described('name')} />
          {err('name') && <p id="name-error" className={f.error}>{err('name')}</p>}
        </div>

        <div>
          <label className={f.label} htmlFor="company">Company</label>
          <input id="company" name="company" className={f.input} autoComplete="organization" required
            value={values.company} onChange={set('company')} onBlur={blur('company')}
            aria-invalid={!!err('company')} aria-describedby={described('company')} />
          {err('company') && <p id="company-error" className={f.error}>{err('company')}</p>}
        </div>

        <div>
          <label className={f.label} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" className={f.input} autoComplete="tel" required
            value={values.phone} onChange={set('phone')} onBlur={blur('phone')}
            aria-invalid={!!err('phone')} aria-describedby={described('phone')} />
          {err('phone') && <p id="phone-error" className={f.error}>{err('phone')}</p>}
        </div>

        <div>
          <label className={f.label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" inputMode="email" className={f.input} autoComplete="email" required
            spellCheck={false} autoCapitalize="none"
            value={values.email} onChange={set('email')} onBlur={blur('email')}
            aria-invalid={!!err('email')} aria-describedby={described('email')} />
          {err('email') && <p id="email-error" className={f.error}>{err('email')}</p>}
        </div>

        <div>
          <label className={f.label} htmlFor="volume">Documents per month, roughly</label>
          <select id="volume" name="volume" className={`${f.input} ${f.select}`} required
            value={values.volume} onChange={set('volume')} onBlur={blur('volume')}
            aria-invalid={!!err('volume')} aria-describedby={described('volume', true)}>
            <option value="" disabled>Pick one</option>
            {VOLUME_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {err('volume')
            ? <p id="volume-error" className={f.error}>{err('volume')}</p>
            : <p id="volume-hint" className={f.hint}>Receipts, tickets and invoices combined.</p>}
        </div>

        <div>
          <label className={f.label} htmlFor="promo">Promo code <span className={f.optional}>(optional)</span></label>
          <input id="promo" name="promo" className={`${f.input} ${f.monoInput}`} autoComplete="off"
            autoCapitalize="characters" spellCheck={false} maxLength={20}
            value={values.promo} onChange={set('promo')} onBlur={blur('promo')}
            aria-invalid={!!err('promo')} aria-describedby={described('promo', true)} />
          {err('promo')
            ? <p id="promo-error" className={f.error}>{err('promo')}</p>
            : <p id="promo-hint" className={`${f.hint} ${promoOk ? f.hintOk : ''}`}>
                {promoOk ? 'NJC applied: setup fee waived.' : 'Have a promo code? Enter it here.'}
              </p>}
        </div>
      </div>

      {opened && (
        <div ref={noteRef} tabIndex={-1} className={f.textNote} role="status">
          Your messages app should open with your request ready to go. Tap send and it comes straight to us.
          Didn&apos;t open? Text <a className={f.inlineLink} href={smsHref()}>{TEXT_NUMBER_DISPLAY}</a> directly.
        </div>
      )}

      <div className={f.formFoot}>
        <button type="submit" className={`${f.btn} ${f.btnPrimary}`}>
          <MessageSquare size={16} aria-hidden="true" />Request setup
        </button>
        <p id="signup-note" className={f.formNote}>
          Opens your messages app with this filled in. It&apos;s a request, not a purchase. Nothing gets charged.
        </p>
      </div>
    </form>
  )
}
