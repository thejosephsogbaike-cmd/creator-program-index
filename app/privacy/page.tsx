import Link from 'next/link'

const sections = [
  {
    heading: 'What we collect',
    body: `When you register, we collect your email address, first name, role, company stage, and geography. Optionally, you may provide your company vertical, programme maturity, and a brief description of your current challenge.`,
  },
  {
    heading: 'How we use it',
    body: `Your information is used to provide access to the Index, send transactional sign-in emails, and subscribe you to The Charter newsletter. We do not sell your data to third parties.`,
  },
  {
    heading: 'Session cookie',
    body: `We set a single HTTP-only session cookie to keep you signed in for seven days. This is a functional cookie — it is not used for advertising or tracking. It does not require a cookie consent banner.`,
  },
  {
    heading: 'Analytics',
    body: `We use Vercel Analytics for privacy-friendly page view measurement. No third-party tracking pixels are used.`,
  },
  {
    heading: 'Data storage',
    body: `Registration data is stored in Supabase. Transactional emails are sent via Resend. Newsletter subscriptions are managed by beehiiv.`,
  },
  {
    heading: 'Your rights',
    body: `You can request deletion of your account and data at any time by emailing hello@creatorprogramindex.com. Newsletter unsubscription is available via any Charter email footer.`,
  },
]

export default function PrivacyPage() {
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
          Privacy
        </span>
      </nav>

      <p className="font-label text-[0.65rem] mb-4">Legal</p>
      <h1 className="font-serif font-bold text-3xl mb-10" style={{ color: 'var(--text)' }}>
        Privacy policy
      </h1>

      <div className="space-y-8">
        {sections.map(({ heading, body }) => (
          <div key={heading} className="pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2
              className="font-serif font-semibold text-lg mb-3"
              style={{ color: 'var(--text)' }}
            >
              {heading}
            </h2>
            <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
