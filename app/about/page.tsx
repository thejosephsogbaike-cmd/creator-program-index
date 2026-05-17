import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <nav className="flex items-center gap-2 mb-10">
        <Link
          href="/"
          className="font-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors hover:text-[var(--gold)]"
          style={{ color: 'var(--text-dim)' }}
        >
          Index
        </Link>
        <span className="font-mono text-[0.65rem]" style={{ color: 'var(--border-gold)' }}>›</span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em]" style={{ color: 'var(--muted)' }}>
          About
        </span>
      </nav>

      <p className="font-label text-[0.65rem] mb-4">The resource</p>
      <h1 className="font-serif font-bold text-3xl sm:text-4xl mb-10" style={{ color: 'var(--text)' }}>
        About the Index
      </h1>

      <div className="space-y-6">
        {[
          `The Creator Program Index is a free practitioner intelligence resource for the people building B2B creator programs. Every data point comes from a direct conversation with a practitioner — not a form submission, not a survey, not a scrape. We have spoken to each contributor.`,
          `We publish findings across ten areas of B2B creator program management. Each section updates as new conversations are conducted. The data point count on each section tells you exactly how many practitioner conversations it draws from.`,
          `The Index is free to access. We ask for a short professional profile in exchange for full access — so we can serve the right intelligence to the right practitioners and reach out when new research is relevant to their specific context.`,
        ].map((para, i) => (
          <p
            key={i}
            className="font-sans text-base leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            {para}
          </p>
        ))}
      </div>

      <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
        <Link href="/register" className="btn-primary">
          Register free →
        </Link>
      </div>
    </div>
  )
}
