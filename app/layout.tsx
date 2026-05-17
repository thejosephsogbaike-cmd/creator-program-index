import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'The Creator Program Index',
  description: 'Intelligence from practitioners building B2B creator programs.',
  openGraph: {
    title: 'The Creator Program Index',
    description: 'Intelligence from practitioners building B2B creator programs.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased" style={{ background: 'var(--navy)', color: 'var(--text)' }}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
