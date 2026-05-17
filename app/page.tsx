import { getAllSections } from '@/lib/content'
import { getSession } from '@/lib/auth'
import { SectionCard } from '@/components/SectionCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [sections, session] = await Promise.all([
    getAllSections(),
    getSession(),
  ])

  const isRegistered = !!session
  const totalConversations = sections.reduce((sum, s) => sum + s.data_points, 0)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

      {/* Hero */}
      <div className="mb-16 max-w-2xl">
        <p className="font-label text-[0.65rem] mb-5">
          Free practitioner intelligence
        </p>
        <h1 className="font-serif font-bold text-4xl sm:text-5xl leading-tight mb-5" style={{ color: 'var(--text)' }}>
          The Creator<br />Program Index
        </h1>
        <p className="font-sans text-base sm:text-lg leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
          Intelligence from practitioners building B2B creator programs. Every data point comes from a direct conversation with a practitioner — not a survey, not a scrape.
        </p>

        {isRegistered ? (
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em]" style={{ color: 'var(--gold)' }}>
            ● Full access active
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">
              Register free →
            </Link>
            <Link href="/how-it-works" className="btn-ghost">
              How it works
            </Link>
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div
        className="flex flex-wrap gap-8 mb-12 pb-10"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {[
          { value: String(sections.length), label: 'Intelligence sections' },
          { value: String(totalConversations), label: 'Practitioner conversations' },
          { value: 'Monthly', label: 'Update cadence' },
        ].map(({ value, label }) => (
          <div key={label}>
            <p className="font-serif font-semibold text-2xl mb-0.5" style={{ color: 'var(--gold)' }}>{value}</p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.08em]" style={{ color: 'var(--text-dim)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Section grid */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {sections.map(section => (
          <SectionCard
            key={section.slug}
            section={section}
            isRegistered={isRegistered}
          />
        ))}
      </div>

      {/* Returning visitor strip */}
      {!isRegistered && (
        <div
          className="mt-16 pt-8 text-center"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>
            Already registered?{' '}
            <Link
              href="/register#signin"
              className="transition-colors"
              style={{ color: 'var(--gold)' }}
            >
              Sign in with your email →
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
