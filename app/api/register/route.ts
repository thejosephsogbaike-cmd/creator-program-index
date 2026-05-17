import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createMagicLink, buildMagicLinkUrl } from '@/lib/magic-link'
import { sendMagicLinkEmail } from '@/lib/email'
import { createBeehiivSubscriber } from '@/lib/beehiiv'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, first_name, role, company_stage, geography } = body

    // Basic validation
    if (!email || !first_name || !role || !company_stage || !geography) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id, first_name, email')
      .eq('email', normalizedEmail)
      .single()

    let userId: string
    let userFirstName: string

    if (existingUser) {
      // Returning user — just send a new magic link
      userId = existingUser.id
      userFirstName = existingUser.first_name
    } else {
      // New user — create record and subscribe to beehiiv
      const { data: newUser, error: insertError } = await supabaseAdmin
        .from('users')
        .insert({
          email: normalizedEmail,
          first_name: first_name.trim(),
          role,
          company_stage,
          geography,
        })
        .select('id')
        .single()

      if (insertError || !newUser) {
        console.error('User insert error:', insertError)
        return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
      }

      userId = newUser.id
      userFirstName = first_name.trim()

      // Subscribe to beehiiv (non-blocking — don't fail registration if this errors)
      const beehiivId = await createBeehiivSubscriber({
        email: normalizedEmail,
        firstName: first_name.trim(),
        role,
        companyStage: company_stage,
        geography,
      })

      if (beehiivId) {
        await supabaseAdmin
          .from('users')
          .update({ beehiiv_subscriber_id: beehiivId })
          .eq('id', userId)
      }
    }

    // Generate magic link
    const token = await createMagicLink(userId)
    const magicLinkUrl = buildMagicLinkUrl(token)

    // Send email
    await sendMagicLinkEmail(normalizedEmail, userFirstName, magicLinkUrl)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Registration error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
