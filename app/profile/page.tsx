'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { VERTICALS, PROGRAM_MATURITIES } from '@/types'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    vertical: '',
    program_maturity: '',
    biggest_challenge: '',
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function submit(data: typeof form) {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Something went wrong.')
      } else {
        router.push('/intelligence/attribution')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* One-time invitation banner */}
      <div
        className="rounded-lg px-4 py-3.5 mb-8 flex items-start gap-3"
        style={{ background: 'var(--gold-pale)', border: '1px solid var(--border-gold)' }}
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] mt-0.5 shrink-0" style={{ color: 'var(--gold)' }}>
          Optional
        </span>
        <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
          Tell us about your programme and you may be invited to contribute to future research.
        </p>
      </div>

      <p className="font-label text-[0.65rem] mb-3">One-time setup</p>
      <h1 className="font-serif font-bold text-3xl mb-3" style={{ color: 'var(--text)' }}>
        Your practitioner profile
      </h1>
      <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
        Three optional fields. This helps us serve better intelligence and may lead to an invitation to contribute your perspective.
      </p>

      <form onSubmit={e => { e.preventDefault(); submit(form) }} className="space-y-5">
        <FormField label="Company vertical" optional>
          <select
            value={form.vertical}
            onChange={e => update('vertical', e.target.value)}
            className="field"
          >
            <option value="">Select your vertical</option>
            {VERTICALS.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </FormField>

        <FormField label="How long running a creator program" optional>
          <select
            value={form.program_maturity}
            onChange={e => update('program_maturity', e.target.value)}
            className="field"
          >
            <option value="">Select</option>
            {PROGRAM_MATURITIES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </FormField>

        <FormField label="Biggest current challenge" optional>
          <input
            type="text"
            value={form.biggest_challenge}
            onChange={e => update('biggest_challenge', e.target.value)}
            maxLength={100}
            className="field"
            placeholder="e.g. Proving ROI to finance"
          />
          <p
            className="font-mono text-[0.6rem] uppercase tracking-[0.08em] mt-1.5 text-right"
            style={{ color: 'var(--text-dim)' }}
          >
            {form.biggest_challenge.length}/100
          </p>
        </FormField>

        {error && (
          <div
            className="rounded-lg px-4 py-3 font-sans text-sm"
            style={{ background: 'rgba(224, 85, 85, 0.1)', border: '1px solid rgba(224, 85, 85, 0.3)', color: '#e05555' }}
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? 'Saving…' : 'Save profile and view intelligence →'}
          </button>
          <button
            type="button"
            onClick={() => submit({ vertical: '', program_maturity: '', biggest_challenge: '' })}
            disabled={loading}
            className="btn-ghost w-full py-3"
          >
            Skip for now
          </button>
        </div>
      </form>
    </div>
  )
}

function FormField({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          className="font-mono text-[0.65rem] uppercase tracking-[0.1em]"
          style={{ color: 'var(--text-dim)' }}
        >
          {label}
        </label>
        {optional && (
          <span
            className="font-mono text-[0.55rem] uppercase tracking-[0.08em]"
            style={{ color: 'var(--text-dim)', opacity: 0.6 }}
          >
            Optional
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
