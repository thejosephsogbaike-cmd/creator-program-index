import Link from 'next/link'

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: '01',
    label: 'Research',
    heading: 'We have conversations.',
    body: 'We approach B2B creator program practitioners directly — in-house CPMs, agency leads, fractional program managers, and founders running their own programs. We ask specific, structured questions across 22 topic areas. Every conversation is recorded or captured in writing with the practitioner\'s knowledge.',
  },
  {
    number: '02',
    label: 'Analysis',
    heading: 'We find the patterns.',
    body: 'Across every conversation, we look for the findings that keep coming up — the attribution approach that survives CFO reviews, the brief section that every creator ignores, the onboarding failure that a better process would have prevented. We also look for the contradictions: the received wisdom that the data challenges.',
  },
  {
    number: '03',
    label: 'Publication',
    heading: 'We publish what we find.',
    body: 'Each section of the Index is written from the accumulated research — with the data point count, the last updated date, and honest framing about what the evidence supports and what it does not. Every practitioner voice quote is confirmed with the contributor before it goes live. Nothing is published that cannot be traced to a source.',
  },
]

const tiers = [
  {
    number: '01',
    heading: 'No registration required',
    items: [
      'Headline finding for every section',
      'Data point count and last updated date',
      'First two paragraphs of each section',
    ],
    primary: false,
  },
  {
    number: '02',
    heading: 'Register free',
    items: [
      'Full section access across all 22 sections',
      'Practitioner voice quotes',
      'Open questions',
      'All sub-section content',
    ],
    primary: true,
  },
  {
    number: '03',
    heading: 'Optional practitioner profile',
    items: [
      'Tell us about your programme',
      'You may be invited to contribute to future research',
      'Your perspective shapes what the Index covers next',
    ],
    primary: false,
  },
]

const commitments = [
  {
    label: 'Verified sources',
    body: 'Every data point comes from a direct practitioner conversation. We never publish a finding we cannot source.',
  },
  {
    label: 'Honest about sample size',
    body: 'Every section shows exactly how many conversations it draws from. Small samples are labelled as directional. We never present incomplete data as definitive truth.',
  },
  {
    label: 'Free forever',
    body: 'The Index is free to access. We will never put the core intelligence behind a paywall.',
  },
  {
    label: 'No vendor influence',
    body: 'We have no commercial relationship with any creator program tool, agency, or platform. What we publish reflects what practitioners told us — not what any vendor wants us to say.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-12">
        <Link
          href="/"
          className="font-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors hover:text-[var(--gold)]"
          style={{ color: 'var(--text-dim)' }}
        >
          Index
        </Link>
        <span className="font-mono text-[0.65rem]" style={{ color: 'var(--border-gold)' }}>›</span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em]" style={{ color: 'var(--muted)' }}>
          How it works
        </span>
      </nav>

      {/* ── SECTION 1: Hero ── */}
      <section className="mb-20 max-w-3xl">
        <p className="font-label text-[0.65rem] mb-5">The method</p>
        <h1
          className="font-serif font-bold text-4xl sm:text-5xl leading-tight mb-0"
          style={{ color: 'var(--text)' }}
        >
          Intelligence built from
          <br />
          conversations.
        </h1>
        <p
          className="font-serif text-xl sm:text-2xl mt-4 leading-snug"
          style={{ color: 'var(--muted)', fontStyle: 'italic' }}
        >
          Not surveys. Not scrapes. Not AI-generated summaries.
        </p>
      </section>

      {/* ── SECTION 2: The Source ── */}
      <section className="mb-20 pb-20" style={{ borderBottom: '1px solid var(--border)' }}>
        <p className="font-label text-[0.65rem] mb-5">Where the intelligence comes from</p>
        <h2
          className="font-serif font-bold text-2xl sm:text-3xl mb-6"
          style={{ color: 'var(--text)' }}
        >
          Every data point is a real conversation.
        </h2>
        <div className="max-w-2xl space-y-4">
          <p className="font-sans text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            Every finding on the Creator Program Index comes from a direct conversation with a practitioner
            who is actively building or running a B2B creator program. We have spoken to each contributor.
            We know their role, their company stage, their vertical, and the specific context behind what
            they shared.
          </p>
          <p className="font-sans text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            We do not aggregate publicly available content. We do not train models on scraped data. We do
            not infer findings from job postings or LinkedIn activity. If a data point appears on this
            site, it comes from a practitioner who said it — in a structured research conversation,
            confirmed before publication.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: Three Steps ── */}
      <section className="mb-20 pb-20" style={{ borderBottom: '1px solid var(--border)' }}>
        <p className="font-label text-[0.65rem] mb-10">The process</p>

        {/* Desktop: horizontal flow. Mobile: stacked. */}
        <div className="flex flex-col sm:flex-row gap-0 sm:gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col sm:flex-row flex-1 min-w-0">
              {/* Step card */}
              <div
                className="flex-1 p-6 rounded-xl sm:rounded-none sm:first:rounded-l-xl sm:last:rounded-r-xl relative"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  marginRight: i < steps.length - 1 ? '-1px' : 0,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-mono text-2xl font-medium"
                    style={{ color: 'var(--gold)' }}
                  >
                    {step.number}
                  </span>
                  <span
                    className="font-mono text-[0.65rem] uppercase tracking-[0.1em]"
                    style={{ color: 'var(--gold)' }}
                  >
                    {step.label}
                  </span>
                </div>
                <h3
                  className="font-serif font-semibold text-lg mb-3"
                  style={{ color: 'var(--text)' }}
                >
                  {step.heading}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: 'var(--muted)' }}
                >
                  {step.body}
                </p>
              </div>

              {/* Connector arrow — desktop only, between steps */}
              {i < steps.length - 1 && (
                <div
                  className="hidden sm:flex items-center justify-center w-8 shrink-0 z-10"
                  style={{ color: 'var(--gold)' }}
                >
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <path
                      d="M0 8h16M12 2l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {/* Mobile: vertical connector */}
              {i < steps.length - 1 && (
                <div
                  className="flex sm:hidden items-center justify-center h-8 w-full"
                  style={{ color: 'var(--gold)' }}
                >
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <path
                      d="M8 0v16M2 12l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: Access Tiers ── */}
      <section className="mb-20 pb-20" style={{ borderBottom: '1px solid var(--border)' }}>
        <p className="font-label text-[0.65rem] mb-5">How access works</p>
        <h2
          className="font-serif font-bold text-2xl sm:text-3xl mb-10"
          style={{ color: 'var(--text)' }}
        >
          Free to access. Always.
        </h2>

        <div className="max-w-2xl mb-8 space-y-4">
          <p className="font-sans text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            The Creator Program Index is free. It always will be. We ask for a short professional profile
            in exchange for full section access — your role, your company stage, and your geography. This
            lets us serve the right intelligence to the right practitioners, and reach out when new research
            is relevant to your specific context.
          </p>
          <p className="font-sans text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            Registration also subscribes you to The Charter — the weekly interview newsletter for B2B
            creator program managers. You can unsubscribe at any time.
          </p>
        </div>

        {/* Access tier columns */}
        <div className="grid sm:grid-cols-3 gap-0 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {tiers.map((tier, i) => (
            <div
              key={tier.number}
              className="p-6 flex flex-col"
              style={{
                background: tier.primary ? 'rgba(184,146,42,0.08)' : 'rgba(255,255,255,0.02)',
                borderRight: i < tiers.length - 1 ? '1px solid var(--border)' : 'none',
                borderTop: i > 0 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="font-mono text-[0.6rem] uppercase tracking-[0.1em]"
                  style={{ color: tier.primary ? 'var(--gold)' : 'var(--text-dim)' }}
                >
                  Tier {tier.number}
                </span>
                {tier.primary && (
                  <span className="badge badge-live text-[0.55rem]">Primary</span>
                )}
              </div>
              <h3
                className="font-serif font-semibold text-base mb-4"
                style={{ color: tier.primary ? 'var(--text)' : 'var(--muted)' }}
              >
                {tier.heading}
              </h3>
              <ul className="space-y-2 flex-1">
                {tier.items.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: tier.primary ? 'var(--gold)' : 'var(--text-dim)' }}
                    />
                    <span
                      className="font-sans text-sm leading-relaxed"
                      style={{ color: tier.primary ? 'var(--text)' : 'var(--muted)' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: Commitments ── */}
      <section className="mb-20 pb-20" style={{ borderBottom: '1px solid var(--border)' }}>
        <p className="font-label text-[0.65rem] mb-10">Our commitments</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {commitments.map(c => (
            <div
              key={c.label}
              className="p-6 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
              }}
            >
              <p
                className="font-mono text-[0.65rem] uppercase tracking-[0.1em] font-medium mb-3"
                style={{ color: 'var(--gold)' }}
              >
                {c.label}
              </p>
              <p
                className="font-sans text-sm leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6: CTA ── */}
      <section>
        <h2
          className="font-serif font-bold text-2xl sm:text-3xl mb-4"
          style={{ color: 'var(--text)' }}
        >
          Start with the research.
        </h2>
        <p
          className="font-sans text-base leading-relaxed mb-8 max-w-xl"
          style={{ color: 'var(--muted)' }}
        >
          Register free to access all 22 sections — including Attribution and Measurement, Building the
          Business Case, Creator Payment Operations, and Programme Design and Architecture.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/register" className="btn-primary">
            Register free →
          </Link>
          <Link href="/" className="btn-ghost">
            Browse sections without registering →
          </Link>
        </div>
      </section>

    </div>
  )
}
