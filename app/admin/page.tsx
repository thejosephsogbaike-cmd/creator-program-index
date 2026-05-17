'use client'

import { useState } from 'react'

interface AdminData {
  total_users: number
  profiles_completed: number
  profile_completion_rate: number
  beehiiv_synced: number
  beehiiv_sync_rate: number
  by_role: Record<string, number>
  by_company_stage: Record<string, number>
  by_geography: Record<string, number>
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [data, setData] = useState<AdminData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/admin?password=${encodeURIComponent(password)}`)
      if (!res.ok) {
        setError('Incorrect password.')
      } else {
        setData(await res.json())
      }
    } catch {
      setError('Request failed.')
    } finally {
      setLoading(false)
    }
  }

  if (!data) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <p className="font-label text-[0.65rem] mb-4">Admin access</p>
          <h1 className="font-serif font-bold text-2xl mb-6" style={{ color: 'var(--text)' }}>
            Dashboard
          </h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Admin password"
              className="field"
              required
              autoFocus
            />
            {error && (
              <p className="font-sans text-sm" style={{ color: '#e05555' }}>{error}</p>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Checking…' : 'Access dashboard'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <p className="font-label text-[0.65rem] mb-3">Admin</p>
      <h1 className="font-serif font-bold text-2xl mb-10" style={{ color: 'var(--text)' }}>
        Dashboard
      </h1>

      {/* Overview stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        <StatCard label="Registered users" value={String(data.total_users)} />
        <StatCard label="Profiles completed" value={`${data.profiles_completed}`} sub={`${data.profile_completion_rate}%`} />
        <StatCard label="beehiiv synced" value={`${data.beehiiv_synced}`} sub={`${data.beehiiv_sync_rate}%`} />
        <StatCard label="Profiles skipped" value={String(data.total_users - data.profiles_completed)} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <BreakdownTable title="By role" data={data.by_role} />
        <BreakdownTable title="By company stage" data={data.by_company_stage} />
        <BreakdownTable title="By geography" data={data.by_geography} />
      </div>
    </div>
  )
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card rounded-lg p-4">
      <p
        className="font-mono text-[0.6rem] uppercase tracking-[0.08em] mb-2"
        style={{ color: 'var(--text-dim)' }}
      >
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <p className="font-serif font-semibold text-2xl" style={{ color: 'var(--gold)' }}>{value}</p>
        {sub && (
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.08em]" style={{ color: 'var(--text-dim)' }}>{sub}</p>
        )}
      </div>
    </div>
  )
}

function BreakdownTable({ title, data }: { title: string; data: Record<string, number> }) {
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1])
  const total = sorted.reduce((sum, [, n]) => sum + n, 0)

  return (
    <div className="card rounded-lg p-5">
      <p
        className="font-mono text-[0.65rem] uppercase tracking-[0.1em] mb-4"
        style={{ color: 'var(--gold)' }}
      >
        {title}
      </p>
      <table className="w-full">
        <tbody>
          {sorted.map(([label, count]) => (
            <tr
              key={label}
              style={{ borderTop: '1px solid var(--border)' }}
              className="first:border-0"
            >
              <td className="py-2 font-sans text-xs" style={{ color: 'var(--muted)' }}>{label}</td>
              <td className="py-2 text-right font-mono text-[0.65rem] font-medium" style={{ color: 'var(--text)' }}>{count}</td>
              <td className="py-2 text-right font-mono text-[0.6rem] pl-2" style={{ color: 'var(--text-dim)' }}>
                {total > 0 ? Math.round((count / total) * 100) : 0}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
