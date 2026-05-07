import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Heart className="h-6 w-6 text-pink-500 mr-2" />
          <span className="font-bold text-xl">UndanganKita</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/register">
            Daftar
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Buat Undangan Digital Modern dalam Hitungan Menit
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Platform undangan digital yang cantik, responsif, dan mudah digunakan. Bagikan momen spesial Anda dengan cara yang elegan.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
                  <Link href="/register">Mulai Sekarang - Gratis</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Masuk ke Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2026 UndanganKita. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
