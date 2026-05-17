'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
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
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--navy)' }} className="mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 gap-10 items-start">

          <div>
            <p className="font-serif font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>
              The Creator Program Index
            </p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--text-dim)' }}>
              B2B practitioner intelligence
            </p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              New intelligence added monthly. A living reference for B2B creator program professionals.
            </p>
          </div>

          <div>
            <p className="font-label text-[0.65rem] mb-3">
              Already registered? Sign in
            </p>
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
                  className="btn-primary px-4 py-2 text-sm shrink-0"
                >
                  {loading ? '…' : 'Sign in'}
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="mt-10 pt-8 flex flex-wrap gap-5" style={{ borderTop: '1px solid var(--border)' }}>
          <Link
            href="/about"
            className="font-sans text-xs transition-colors hover:text-[var(--text)]"
            style={{ color: 'var(--text-dim)' }}
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="font-sans text-xs transition-colors hover:text-[var(--text)]"
            style={{ color: 'var(--text-dim)' }}
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
