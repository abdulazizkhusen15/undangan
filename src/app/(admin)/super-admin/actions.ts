'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginSuperAdmin(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  // Kredensial dari Environment Variables
  const adminUser = process.env.SUPER_ADMIN_USERNAME
  const adminPass = process.env.SUPER_ADMIN_PASSWORD

  if (username === adminUser && password === adminPass) {
    const cookieStore = await cookies()
    cookieStore.set('super_admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600, // 1 jam
    })
    redirect('/super-admin')
  }

  return { error: 'Username atau Password salah!' }
}

export async function logoutSuperAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete('super_admin_session')
  redirect('/super-admin/login')
}
