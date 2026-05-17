import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createSessionToken, setSessionCookieHeaders } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  const redirectTo = req.nextUrl.searchParams.get('redirect') || '/intelligence/attribution'

  if (!token) {
    return NextResponse.redirect(new URL('/verify?error=missing', req.url))
  }

  try {
    // Look up the magic link
    const { data: magicLink, error } = await supabaseAdmin
      .from('magic_links')
      .select('*, users(id, email, first_name)')
      .eq('token', token)
      .single()

    if (error || !magicLink) {
      return NextResponse.redirect(new URL('/verify?error=invalid', req.url))
    }

    if (magicLink.used) {
      return NextResponse.redirect(new URL('/verify?error=used', req.url))
    }

    if (new Date(magicLink.expires_at) < new Date()) {
      return NextResponse.redirect(new URL('/verify?error=expired', req.url))
    }

    const user = magicLink.users as { id: string; email: string; first_name: string }

    // Mark token as used and update last_seen_at
    await Promise.all([
      supabaseAdmin
        .from('magic_links')
        .update({ used: true })
        .eq('id', magicLink.id),
      supabaseAdmin
        .from('users')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('id', user.id),
    ])

    // Check if practitioner profile already exists
    const { data: profile } = await supabaseAdmin
      .from('practitioner_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    // Create session token
    const sessionToken = await createSessionToken({ userId: user.id, email: user.email })

    // Determine redirect: show profile page once if not yet completed
    const finalRedirect = profile ? redirectTo : '/profile'

    const response = NextResponse.redirect(new URL(finalRedirect, req.url))
    response.headers.set('Set-Cookie', setSessionCookieHeaders(sessionToken))
    return response
  } catch (err) {
    console.error('Verify error:', err)
    return NextResponse.redirect(new URL('/verify?error=server', req.url))
  }
}
