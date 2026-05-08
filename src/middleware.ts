import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request)
  const { pathname } = request.nextUrl

  // Proteksi Rute Super Admin
  if (pathname.startsWith('/super-admin')) {
    // Izinkan akses ke halaman login
    if (pathname === '/super-admin/login') {
      return supabaseResponse
    }

    // Cek session super admin (dari cookie)
    const superAdminSession = request.cookies.get('super_admin_session')
    
    if (!superAdminSession || superAdminSession.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/super-admin/login', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
