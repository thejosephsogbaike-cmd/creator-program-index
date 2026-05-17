import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const password = req.nextUrl.searchParams.get('password')

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  try {
    const [usersRes, profilesRes, beehiivRes] = await Promise.all([
      supabaseAdmin.from('users').select('role, company_stage, geography, created_at, beehiiv_subscriber_id'),
      supabaseAdmin.from('practitioner_profiles').select('id'),
      supabaseAdmin.from('users').select('id').not('beehiiv_subscriber_id', 'is', null),
    ])

    const users = usersRes.data || []
    const profiles = profilesRes.data || []
    const beehiivSynced = beehiivRes.data || []

    const byRole = groupBy(users, 'role')
    const byStage = groupBy(users, 'company_stage')
    const byGeo = groupBy(users, 'geography')

    return NextResponse.json({
      total_users: users.length,
      profiles_completed: profiles.length,
      profile_completion_rate: users.length > 0
        ? Math.round((profiles.length / users.length) * 100)
        : 0,
      beehiiv_synced: beehiivSynced.length,
      beehiiv_sync_rate: users.length > 0
        ? Math.round((beehiivSynced.length / users.length) * 100)
        : 0,
      by_role: byRole,
      by_company_stage: byStage,
      by_geography: byGeo,
    })
  } catch (err) {
    console.error('Admin error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}

function groupBy(arr: Record<string, string>[], key: string): Record<string, number> {
  return arr.reduce((acc, item) => {
    const val = item[key] || 'Unknown'
    acc[val] = (acc[val] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}
