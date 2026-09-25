'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { EMAIL_RE, TEXT_NUMBER_DISPLAY, smsHref } from '@/lib/contact'
import f from './site.module.css'

const PROJECT_TYPES = [
  'Custom software or internal tool',
  'Workflow automation or integration',
  'Website',
  'Site Tally',
  'Not sure yet',
]

type Values = { name: string; email: string; company: string; type: string; message: string }
type Field = keyof Values
type Errors = Partial<Record<Field, string>>

const EMPTY: Values = { name: '', email: '', company: '', type: '', message: '' }
const ORDER: Field[] = ['name', 'email', 'company', 'type', 'message']

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!v.email.trim()) e.email = 'Enter your email.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'That email doesn’t look right.'
  if (!v.type) e.type = 'Pick the closest fit. “Not sure yet” is fine.'
  const msg = v.message.trim()
  if (!msg) e.message = 'Tell us a little about the project.'
  else if (msg.length < 20) e.message = 'A bit more detail helps. A couple of sentences is plenty.'
  else if (msg.length > 1500) e.message = 'Keep it under 1,500 characters so it fits in a text.'
  return e
}

function composeText(v: Values) {
  return [
    `Hi, I'm ${v.name.trim()}${v.company.trim() ? ` from ${v.company.trim()}` : ''}.`,
    `Project: ${v.type}`,
    '',
    v.message.trim(),
    '',
    `Email: ${v.email.trim()}`,
    '(Sent from clearforgelabs.com)',
  ].join('\n')
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [opened, setOpened] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (opened) noteRef.current?.focus() }, [opened])

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value }
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
    setTouched({ name: true, email: true, company: true, type: true, message: true })
    const first = ORDER.find(k => found[k])
    if (first) { formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return }
    window.location.href = smsHref(composeText(values))
    setOpened(true)
  }

  const err = (k: Field) => (touched[k] ? errors[k] : undefined)
  const described = (k: Field, hint?: boolean) =>
    [err(k) ? `c-${k}-error` : null, hint ? `c-${k}-hint` : null].filter(Boolean).join(' ') || undefined

  return (
    <form ref={formRef} className={f.form} onSubmit={onSubmit} noValidate aria-describedby="contact-note">
      <div className={f.formGrid}>
        <div>
          <label className={f.label} htmlFor="c-name">Name</label>
          <input id="c-name" name="name" className={f.input} autoComplete="name" required
            value={values.name} onChange={set('name')} onBlur={blur('name')}
            aria-invalid={!!err('name')} aria-describedby={described('name')} />
          {err('name') && <p id="c-name-error" className={f.error}>{err('name')}</p>}
        </div>
        <div>
          <label className={f.label} htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" inputMode="email" className={f.input} autoComplete="email" required
            spellCheck={false} autoCapitalize="none"
            value={values.email} onChange={set('email')} onBlur={blur('email')}
            aria-invalid={!!err('email')} aria-describedby={described('email')} />
          {err('email') && <p id="c-email-error" className={f.error}>{err('email')}</p>}
        </div>
        <div>
          <label className={f.label} htmlFor="c-company">Company <span className={f.optional}>(optional)</span></label>
          <input id="c-company" name="company" className={f.input} autoComplete="organization"
            value={values.company} onChange={set('company')} onBlur={blur('company')} />
        </div>
        <div>
          <label className={f.label} htmlFor="c-type">Project type</label>
          <select id="c-type" name="type" className={`${f.input} ${f.select}`} required
            value={values.type} onChange={set('type')} onBlur={blur('type')}
            aria-invalid={!!err('type')} aria-describedby={described('type')}>
            <option value="" disabled>Pick one</option>
            {PROJECT_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {err('type') && <p id="c-type-error" className={f.error}>{err('type')}</p>}
        </div>
        <div className={f.full}>
          <label className={f.label} htmlFor="c-message">What are you building?</label>
          <textarea id="c-message" name="message" className={`${f.input} ${f.textarea}`} required rows={6}
            value={values.message} onChange={set('message')} onBlur={blur('message')}
            aria-invalid={!!err('message')} aria-describedby={described('message', true)} />
          {err('message')
            ? <p id="c-message-error" className={f.error}>{err('message')}</p>
            : <p id="c-message-hint" className={f.hint}>What it should do, who uses it, and what happens today without it.</p>}
        </div>
      </div>

      {opened && (
        <div ref={noteRef} tabIndex={-1} className={f.textNote} role="status">
          Your messages app should open with this ready to go. Tap send and it comes straight to us.
          Didn&apos;t open? Text <a className={f.inlineLink} href={smsHref()}>{TEXT_NUMBER_DISPLAY}</a> directly.
        </div>
      )}

      <div className={f.formFoot}>
        <button type="submit" className={`${f.btn} ${f.btnPrimary}`}>
          <MessageSquare size={16} aria-hidden="true" />Text us this
        </button>
        <p id="contact-note" className={f.formNote}>
          Opens your messages app with this filled in. Or text <a className={f.inlineLink} href={smsHref()}>{TEXT_NUMBER_DISPLAY}</a>.
        </p>
      </div>
    </form>
  )
}
