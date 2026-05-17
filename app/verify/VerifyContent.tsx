'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const ERROR_MESSAGES: Record<string, string> = {
  missing: 'No sign-in token found in this link.',
  invalid: 'This sign-in link is not valid.',
  used: 'This sign-in link has already been used.',
  expired: 'This sign-in link has expired.',
  server: 'Something went wrong on our end.',
}

export function VerifyContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function requestNewLink(e: React.FormEvent) {
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

  if (!error) {
    return (
      <div className="text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em]" style={{ color: 'var(--text-dim)' }}>
          Verifying your link…
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-sm w-full text-center">
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-5"
        style={{ background: 'rgba(224, 85, 85, 0.1)', border: '1px solid rgba(224, 85, 85, 0.25)' }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#e05555' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <p className="font-label text-[0.65rem] mb-3">Sign-in issue</p>
      <h1 className="font-serif font-bold text-2xl mb-3" style={{ color: 'var(--text)' }}>
        Link problem
      </h1>
      <p className="font-sans text-sm leading-relaxed mb-7" style={{ color: 'var(--muted)' }}>
        {ERROR_MESSAGES[error] || ERROR_MESSAGES.invalid}
      </p>

      {sent ? (
        <p className="font-sans text-sm" style={{ color: 'var(--gold-light)' }}>
          Check your inbox — we sent a new link.
        </p>
      ) : (
        <>
          <p
            className="font-mono text-[0.65rem] uppercase tracking-[0.1em] mb-3"
            style={{ color: 'var(--text-dim)' }}
          >
            Enter your email to get a new link
          </p>
          <form onSubmit={requestNewLink} className="flex flex-col gap-2 max-w-xs mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="field"
              required
            />
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Sending…' : 'Send new link'}
            </button>
          </form>
        </>
      )}

      <div className="mt-8">
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
