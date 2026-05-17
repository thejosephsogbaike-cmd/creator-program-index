'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SignInModal } from './SignInModal'

interface RegistrationPromptProps {
  dataPoints: number
  sectionTitle: string
}

export function RegistrationPrompt({ dataPoints, sectionTitle }: RegistrationPromptProps) {
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <>
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      <div
        className="rounded-xl p-6 sm:p-8 mt-2"
        style={{
          background: 'var(--gold-pale)',
          border: '1px solid var(--border-gold)',
        }}
      >
        <p className="font-label text-[0.65rem] mb-3">Full access required</p>
        <p className="font-serif text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
          This section draws from {dataPoints} practitioner conversations.
        </p>
        <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
          Register free to read the full {sectionTitle} intelligence — what works, what doesn't,
          practitioner voices, and open questions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/register" className="btn-primary">
            Register free →
          </Link>
          <button
            onClick={() => setShowSignIn(true)}
            className="btn-ghost"
          >
            Already registered? Sign in
          </button>
        </div>
      </div>
    </>
  )
}
