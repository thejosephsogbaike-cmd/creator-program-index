import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

// Paths that require authentication for full content
const PROTECTED_CONTENT_PATHS = ['/intelligence']
// Paths that require authentication entirely
const FULLY_PROTECTED_PATHS = ['/profile', '/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await getSessionFromRequest(request)

  // Admin route — handled by the page itself with password check
  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Profile requires a session — redirect to register if none
  if (pathname.startsWith('/profile') && !session) {
    return NextResponse.redirect(new URL('/register', request.url))
  }

  // For intelligence pages: pass session info via headers so the page
  // can decide which content layer to render (open vs registered)
  if (pathname.startsWith('/intelligence')) {
    const response = NextResponse.next()
    if (session) {
      response.headers.set('x-user-id', session.userId)
      response.headers.set('x-user-email', session.email)
    }
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/intelligence/:path*', '/profile', '/admin/:path*'],
}
