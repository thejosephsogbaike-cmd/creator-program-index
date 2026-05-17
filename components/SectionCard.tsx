import Link from 'next/link'
import { SectionFrontmatter } from '@/types'

interface SectionCardProps {
  section: SectionFrontmatter
  isRegistered: boolean
}

function StatusBadge({ status }: { status: SectionFrontmatter['status'] }) {
  if (status === 'published') {
    return <span className="badge badge-live"><span>●</span> Live</span>
  }
  if (status === 'draft') {
    return <span className="badge badge-partial">Partial</span>
  }
  return <span className="badge badge-soon">Coming soon</span>
}

export function SectionCard({ section, isRegistered }: SectionCardProps) {
  const href = `/intelligence/${section.slug}`
  const isComingSoon = section.status === 'coming_soon' || section.data_points === 0

  return (
    <Link href={href} className="block group">
      <div
        className="card h-full p-5 sm:p-6 flex flex-col"
        style={{ borderRadius: '10px' }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2
            className="font-serif font-semibold text-base leading-snug transition-colors group-hover:text-[var(--gold-light)]"
            style={{ color: 'var(--text)' }}
          >
            {section.title}
          </h2>
          <div className="shrink-0 mt-0.5">
            <StatusBadge status={section.status} />
          </div>
        </div>

        {/* Headline finding */}
        <p
          className="font-sans text-sm leading-relaxed flex-1 mb-4"
          style={{ color: 'var(--muted)' }}
        >
          {section.headline_finding}
        </p>

        {/* Metadata footer */}
        <div className="flex items-center gap-3 flex-wrap">
          {isComingSoon ? (
            <span className="font-label-dim text-[0.6rem]">Intelligence being compiled</span>
          ) : (
            <>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em]" style={{ color: 'var(--gold)' }}>
                {section.data_points} conversations
              </span>
              {section.last_updated && (
                <>
                  <span style={{ color: 'var(--border)' }}>·</span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.08em]" style={{ color: 'var(--text-dim)' }}>
                    {new Date(section.last_updated).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </span>
                </>
              )}
              {!isRegistered && (
                <>
                  <span style={{ color: 'var(--border)' }}>·</span>
                  <span
                    className="font-mono text-[0.6rem] uppercase tracking-[0.08em] transition-colors group-hover:text-[var(--gold)]"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    Register to read →
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
