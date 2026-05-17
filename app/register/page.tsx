'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ROLES, COMPANY_STAGES, GEOGRAPHIES } from '@/types'

type Step = 'form' | 'sent'

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')

  const [form, setForm] = useState({
    email: '',
    first_name: '',
    role: '',
    company_stage: '',
    geography: '',
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
      } else {
        setSubmittedEmail(form.email)
        setStep('sent')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'sent') {
    return (
      <div className="min-h-[65vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-6"
            style={{ background: 'var(--gold-pale)', border: '1px solid var(--border-gold)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--gold)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="font-label text-[0.65rem] mb-3">Sign-in link sent</p>
          <h1 className="font-serif font-bold text-2xl mb-3" style={{ color: 'var(--text)' }}>
            Check your inbox
          </h1>
          <p className="font-sans text-sm leading-relaxed mb-2" style={{ color: 'var(--muted)' }}>
            We sent a sign-in link to <span style={{ color: 'var(--text)' }}>{submittedEmail}</span>.
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] mb-8" style={{ color: 'var(--text-dim)' }}>
            Link expires in 15 minutes
          </p>
          <Link
            href="/"
            className="font-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors hover:text-[var(--gold)]"
            style={{ color: 'var(--text-dim)' }}
          >
            ← Back to the Index
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="font-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors hover:text-[var(--gold)] inline-block mb-6"
          style={{ color: 'var(--text-dim)' }}
        >
          ← The Creator Program Index
        </Link>
        <p className="font-label text-[0.65rem] mb-3">Free access</p>
        <h1 className="font-serif font-bold text-3xl mb-3" style={{ color: 'var(--text)' }}>
          Register
        </h1>
        <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          Full access to all published intelligence sections. We ask for a short professional profile so we can serve the right intelligence to the right practitioners.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email address">
          <input
            type="email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            className="field"
            placeholder="you@company.com"
            required
          />
        </FormField>

        <FormField label="First name">
          <input
            type="text"
            value={form.first_name}
            onChange={e => update('first_name', e.target.value)}
            className="field"
            placeholder="Your first name"
            required
          />
        </FormField>

        <FormField label="Role">
          <select
            value={form.role}
            onChange={e => update('role', e.target.value)}
            className="field"
            required
          >
            <option value="">Select your role</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </FormField>

        <FormField label="Company stage">
          <select
            value={form.company_stage}
            onChange={e => update('company_stage', e.target.value)}
            className="field"
            required
          >
            <option value="">Select your company stage</option>
            {COMPANY_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>

        <FormField label="Geography">
          <select
            value={form.geography}
            onChange={e => update('geography', e.target.value)}
            className="field"
            required
          >
            <option value="">Select your geography</option>
            {GEOGRAPHIES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </FormField>

        {error && (
          <div
            className="rounded-lg px-4 py-3 font-sans text-sm"
            style={{ background: 'rgba(224, 85, 85, 0.1)', border: '1px solid rgba(224, 85, 85, 0.3)', color: '#e05555' }}
          >
            {error}
          </div>
        )}

        <div className="pt-2">
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? 'Sending your link…' : 'Register and get access →'}
          </button>
        </div>

        <p className="font-sans text-xs text-center leading-relaxed" style={{ color: 'var(--text-dim)' }}>
          By registering you&apos;ll also be subscribed to The Charter newsletter.
        </p>
      </form>

      {/* Returning visitor sign-in */}
      <div id="signin" className="mt-10 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
        <ReturningVisitorSignIn />
      </div>
    </div>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        className="block font-mono text-[0.65rem] uppercase tracking-[0.1em] mb-2"
        style={{ color: 'var(--text-dim)' }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

function ReturningVisitorSignIn() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p className="font-label text-[0.65rem] mb-4">Already registered? Sign in</p>
      {sent ? (
        <p className="font-sans text-sm" style={{ color: 'var(--gold-light)' }}>
          Check your inbox — we sent you a sign-in link.
        </p>
      ) : (
        <form onSubmit={handleSignIn} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="field flex-1"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-ghost shrink-0"
          >
            {loading ? '…' : 'Sign in'}
          </button>
        </form>
      )}
    </div>
  )
}
