'use client'

import { useState } from 'react'

interface SignInModalProps {
  onClose: () => void
}

export function SignInModal({ onClose }: SignInModalProps) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(14, 31, 56, 0.85)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="max-w-sm w-full rounded-xl p-6"
        style={{
          background: 'var(--navy-mid)',
          border: '1px solid var(--border)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        {sent ? (
          <>
            <p className="font-label text-[0.65rem] mb-3">Sign-in link sent</p>
            <h2 className="font-serif text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>
              Check your inbox
            </h2>
            <p className="font-sans text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
              We sent a sign-in link to <span style={{ color: 'var(--text)' }}>{email}</span>. It expires in 15 minutes.
            </p>
            <button onClick={onClose} className="btn-ghost w-full">
              Close
            </button>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="font-label text-[0.65rem] mb-2">Returning visitor</p>
                <h2 className="font-serif text-xl font-semibold" style={{ color: 'var(--text)' }}>
                  Sign in
                </h2>
              </div>
              <button
                onClick={onClose}
                className="font-sans text-lg leading-none transition-colors"
                style={{ color: 'var(--text-dim)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                ×
              </button>
            </div>
            <p className="font-sans text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Enter your email to receive a sign-in link.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="field"
                required
                autoFocus
              />
              {error && (
                <p className="font-sans text-xs" style={{ color: '#e05555' }}>{error}</p>
              )}
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Sending…' : 'Send sign-in link'}
              </button>
            </form>
            <p className="font-sans text-center mt-4 text-xs" style={{ color: 'var(--text-dim)' }}>
              Not registered?{' '}
              <a href="/register" style={{ color: 'var(--gold)' }} className="hover:text-[var(--gold-light)]">
                Register free
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
