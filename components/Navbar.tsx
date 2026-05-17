'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  return (
    <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--navy)' }}>
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="leading-none">
          <span
            className="font-serif font-semibold text-sm tracking-wide transition-colors hover:text-[var(--gold-light)]"
            style={{ color: 'var(--text)' }}
          >
            The Creator Program Index
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/how-it-works"
            className="font-sans text-sm transition-colors"
            style={{ color: pathname === '/how-it-works' ? 'var(--gold)' : 'var(--muted)' }}
            onMouseEnter={e => { if (pathname !== '/how-it-works') (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}
            onMouseLeave={e => { if (pathname !== '/how-it-works') (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
          >
            How it works
          </Link>
          <Link href="/register" className="btn-primary text-sm px-4 py-1.5">
            Register free
          </Link>
        </div>
      </nav>
    </header>
  )
}
