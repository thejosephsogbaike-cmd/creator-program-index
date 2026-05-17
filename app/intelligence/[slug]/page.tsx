import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getSectionBySlug, getAllSectionSlugs, getOpenLayerContent } from '@/lib/content'
import { SUBSECTIONS } from '@/lib/subsections'
import { getSession } from '@/lib/auth'
import { PractitionerQuote } from '@/components/PractitionerQuote'
import { RegistrationPrompt } from '@/components/RegistrationPrompt'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSectionSlugs().map(slug => ({ slug }))
}

const mdxComponents = {
  PractitionerQuote,
}

function StatusBadge({ status, dataPoints }: { status: string; dataPoints: number }) {
  if (status === 'published' && dataPoints > 0) {
    return <span className="badge badge-live"><span>●</span> Live</span>
  }
  if (status === 'draft') {
    return <span className="badge badge-partial">Partial</span>
  }
  return <span className="badge badge-soon">Coming soon</span>
}

export default async function SectionPage({ params }: Props) {
  const [section, session] = await Promise.all([
    getSectionBySlug(params.slug),
    getSession(),
  ])

  if (!section) notFound()

  const { frontmatter, content } = section
  const isRegistered = !!session
  const isComingSoon = frontmatter.status === 'coming_soon' || frontmatter.data_points === 0
  const openContent = getOpenLayerContent(content)
  const subSections = SUBSECTIONS[params.slug] ?? []

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-8">
        <Link
          href="/"
          className="font-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors hover:text-[var(--gold)]"
          style={{ color: 'var(--text-dim)' }}
        >
          Index
        </Link>
        <span className="font-mono text-[0.65rem]" style={{ color: 'var(--border-gold)' }}>›</span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em]" style={{ color: 'var(--muted)' }}>
          {frontmatter.title}
        </span>
      </nav>

      {/* Header */}
      <header className="mb-10 pb-10" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <StatusBadge status={frontmatter.status} dataPoints={frontmatter.data_points} />
          {!isComingSoon && (
            <>
              <span
                className="font-mono text-[0.65rem] uppercase tracking-[0.1em]"
                style={{ color: 'var(--gold)' }}
              >
                {frontmatter.data_points} conversations
              </span>
              {frontmatter.last_updated && (
                <>
                  <span style={{ color: 'var(--border-gold)' }}>·</span>
                  <span
                    className="font-mono text-[0.6rem] uppercase tracking-[0.08em]"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    Updated {new Date(frontmatter.last_updated).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                  </span>
                </>
              )}
            </>
          )}
        </div>

        <h1
          className="font-serif font-bold text-3xl sm:text-4xl leading-tight mb-6"
          style={{ color: 'var(--text)' }}
        >
          {frontmatter.title}
        </h1>

        {/* Headline finding */}
        <div
          className="pl-5 py-1"
          style={{ borderLeft: '2px solid var(--gold)' }}
        >
          <p
            className="font-serif text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--text)', fontStyle: 'italic' }}
          >
            {frontmatter.headline_finding}
          </p>
        </div>
      </header>

      {/* Main content */}
      {isComingSoon ? (
        <div className="py-6">
          {/* Section purpose — visible in coming soon state */}
          {(frontmatter as any).section_purpose && (
            <div
              className="rounded-lg p-5 mb-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}
            >
              <p className="font-label text-[0.6rem] mb-2">Section scope</p>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {(frontmatter as any).section_purpose}
              </p>
            </div>
          )}
          <p
            className="font-sans text-base leading-relaxed mb-6"
            style={{ color: 'var(--muted)' }}
          >
            Intelligence for this section is being compiled from practitioner conversations. Check back soon.
          </p>
          <Link
            href="/"
            className="font-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors hover:text-[var(--gold)]"
            style={{ color: 'var(--text-dim)' }}
          >
            ← All sections
          </Link>
        </div>

      ) : isRegistered ? (
        /* ── Full registered content ── */
        <div className="section-prose">
          <MDXRemote source={content} components={mdxComponents} />
        </div>

      ) : (
        /* ── Open layer: headline + 2 paragraphs + fade + gate ── */
        <>
          <div>
            <h2
              className="font-serif font-semibold text-xl mb-5"
              style={{ color: 'var(--text)', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}
            >
              What Practitioners Actually Do
            </h2>
            <div className="relative">
              <div style={{ maxHeight: '200px', overflow: 'hidden', position: 'relative' }}>
                {openContent.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className="font-sans text-sm sm:text-base leading-relaxed mb-4"
                    style={{ color: 'var(--muted)' }}
                  >
                    {para}
                  </p>
                ))}
              </div>
              {/* Fade overlay */}
              <div className="content-fade-overlay" />
            </div>
          </div>

          <RegistrationPrompt
            dataPoints={frontmatter.data_points}
            sectionTitle={frontmatter.title}
          />
        </>
      )}

      {/* ── Sub-sections ────────────────────────────────── */}
      {subSections.length > 0 && (
        <div className="mt-14 pt-10" style={{ borderTop: '1px solid var(--border-gold)' }}>
          <p className="font-label text-[0.65rem] mb-8">Sub-sections</p>
          <div className="space-y-4">
            {subSections.map(sub => (
              <div
                key={sub.title}
                className="rounded-xl p-5 sm:p-6"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="badge badge-soon">Sub-section</span>
                  <span className="badge badge-soon">Intelligence being compiled</span>
                </div>
                <h3
                  className="font-serif font-semibold text-lg mb-2"
                  style={{ color: 'var(--text)' }}
                >
                  {sub.title}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: 'var(--muted)' }}
                >
                  {sub.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section nav */}
      <div className="mt-14 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
        <Link
          href="/"
          className="font-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors hover:text-[var(--gold)]"
          style={{ color: 'var(--text-dim)' }}
        >
          ← All sections
        </Link>
      </div>
    </div>
  )
}
