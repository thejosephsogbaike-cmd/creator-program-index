import crypto from 'crypto'
import { supabaseAdmin } from './supabase'

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export async function createMagicLink(userId: string): Promise<string> {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes

  const { error } = await supabaseAdmin.from('magic_links').insert({
    user_id: userId,
    token,
    expires_at: expiresAt,
    used: false,
  })

  if (error) throw error
  return token
}

export function buildMagicLinkUrl(token: string, redirectTo?: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const url = new URL('/verify', base)
  url.searchParams.set('token', token)
  if (redirectTo) url.searchParams.set('redirect', redirectTo)
  return url.toString()
}
