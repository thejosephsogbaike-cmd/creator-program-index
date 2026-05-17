import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createMagicLink, buildMagicLinkUrl } from '@/lib/magic-link'
import { sendMagicLinkEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id, email, first_name')
      .eq('email', normalizedEmail)
      .single()

    // Always return success to avoid email enumeration
    // If user doesn't exist, silently succeed
    if (!user) {
      return NextResponse.json({ success: true })
    }

    const token = await createMagicLink(user.id)
    const magicLinkUrl = buildMagicLinkUrl(token)
    await sendMagicLinkEmail(user.email, user.first_name, magicLinkUrl)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Sign-in error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
