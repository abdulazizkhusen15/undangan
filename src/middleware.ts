import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Proteksi Rute Super Admin (Jalankan ini sebelum redirect user biasa)
  if (pathname.startsWith('/super-admin')) {
    if (pathname === '/super-admin/login') {
      return NextResponse.next()
    }

    const session = request.cookies.get('super_admin_session')
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/super-admin/login', request.url))
    }
  }

  // 2. Jalankan sesi Supabase (untuk user biasa)
  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
