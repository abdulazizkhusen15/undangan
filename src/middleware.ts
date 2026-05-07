import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Jalankan sesi Supabase (untuk user biasa)
  const supabaseResponse = await updateSession(request)
  const { pathname } = request.nextUrl

  // Proteksi Rute Super Admin
  if (pathname.startsWith('/super-admin')) {
    // Jika mencoba akses login admin, biarkan lewat
    if (pathname === '/super-admin/login') {
      return supabaseResponse
    }

    // Jika akses rute admin lain, cek cookie session admin
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
