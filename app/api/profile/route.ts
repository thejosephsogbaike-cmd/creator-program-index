import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  try {
    const { vertical, program_maturity, biggest_challenge } = await req.json()

    // Validate biggest_challenge length
    if (biggest_challenge && biggest_challenge.length > 100) {
      return NextResponse.json({ error: 'Challenge description must be 100 characters or fewer.' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from('practitioner_profiles').insert({
      user_id: session.userId,
      vertical: vertical || null,
      program_maturity: program_maturity || null,
      biggest_challenge: biggest_challenge?.trim() || null,
    })

    if (error) {
      // Silently handle duplicate — profile already exists
      if (error.code === '23505') {
        return NextResponse.json({ success: true })
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Profile error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
