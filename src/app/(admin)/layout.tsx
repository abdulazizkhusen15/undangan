import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { logout } from '../(auth)/actions'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
              U
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">Undangan</span>
              <span className="text-xs font-medium text-primary tracking-[0.2em] uppercase mt-1">Premium Digital</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Logged in as</span>
                  <span className="text-sm font-medium text-slate-900">{user.email}</span>
                </div>
                <form action={logout}>
                  <Button variant="outline" size="sm" className="rounded-full px-6 hover:bg-slate-50 transition-all border-slate-200">
                    Keluar
                  </Button>
                </form>
              </div>
            ) : (
              <Button size="sm" asChild className="rounded-full px-6 shadow-lg shadow-primary/20">
                <a href="https://wa.me/628123456789" target="_blank">Hubungi Admin</a>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 bg-slate-50">
        {children}
      </main>
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">&copy; 2024 Undangan Digital Premium. Dibuat dengan cinta untuk momen berharga Anda.</p>
        </div>
      </footer>
    </div>
  )
}
