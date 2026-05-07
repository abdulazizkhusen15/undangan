import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request)

  // Super Admin Protection
  if (request.nextUrl.pathname.startsWith('/super-admin') && !request.nextUrl.pathname.startsWith('/super-admin/login')) {
    const session = request.cookies.get('super_admin_session')
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/super-admin/login', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
