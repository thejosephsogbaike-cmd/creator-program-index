interface PractitionerQuoteProps {
  role: string
  company: string
  children: React.ReactNode
}

export function PractitionerQuote({ role, company, children }: PractitionerQuoteProps) {
  return (
    <blockquote
      className="my-8 pl-5 py-1"
      style={{ borderLeft: '2px solid var(--gold)' }}
    >
      <p
        className="font-serif text-base leading-relaxed mb-3"
        style={{ color: 'var(--text)', fontStyle: 'italic' }}
      >
        {children}
      </p>
      <footer className="flex items-center gap-2">
        <span
          className="font-mono text-[0.65rem] uppercase tracking-[0.1em] font-medium"
          style={{ color: 'var(--gold)' }}
        >
          {role}
        </span>
        <span style={{ color: 'var(--border-gold)' }}>·</span>
        <span
          className="font-mono text-[0.65rem] uppercase tracking-[0.1em]"
          style={{ color: 'var(--text-dim)' }}
        >
          {company}
        </span>
      </footer>
    </blockquote>
  )
}
