import { Button } from '@/components/ui/button'
import { Heart, Calendar, MapPin, Music, Clock, MessageCircle, ChevronLeft, Star, Crown, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default async function TemplatePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // 1. RUSTIC BLOOM DESIGN
  if (id === 'rustic') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#5D4037] font-serif overflow-x-hidden">
        {/* Tombol Back */}
        <div className="fixed top-6 left-6 z-[100]">
          <Button asChild variant="secondary" className="rounded-full shadow-2xl bg-white/80 backdrop-blur-md border-none hover:bg-white">
            <Link href="/super-admin">
              <ChevronLeft className="mr-2 h-4 w-4" /> Kembali ke Admin
            </Link>
          </Button>
        </div>

        {/* HERO SECTION */}
        <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 text-white space-y-8 animate-in fade-in zoom-in duration-1000">
            <p className="uppercase tracking-[0.4em] text-sm font-sans font-medium">The Wedding of</p>
            <h1 className="text-6xl md:text-8xl font-serif italic">Khusen & Gita</h1>
            <div className="w-24 h-[1px] bg-white/50 mx-auto my-8"></div>
            <p className="text-xl md:text-2xl font-light italic">Minggu, 12 Mei 2026</p>
            <Button className="mt-12 bg-white/20 backdrop-blur-md text-white border border-white/40 hover:bg-white hover:text-black rounded-full px-10 py-6 transition-all duration-500 font-sans tracking-widest text-xs uppercase">
              Buka Undangan
            </Button>
          </div>
        </section>

        {/* QUOTE SECTION */}
        <section className="py-24 px-6 text-center max-w-3xl mx-auto space-y-8">
          <Heart className="mx-auto text-[#D4A373] h-10 w-10 animate-pulse" />
          <p className="text-lg md:text-xl leading-relaxed italic text-[#8B5E3C]">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..."
          </p>
          <p className="font-sans font-bold text-sm tracking-widest uppercase text-[#D4A373]">— Ar-Rum: 21</p>
        </section>

        {/* MEMPELAI SECTION */}
        <section className="py-24 px-6 bg-[#F5EBE0]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="text-center space-y-6 group">
              <div className="relative w-72 h-96 mx-auto rounded-[10rem] overflow-hidden border-8 border-white shadow-2xl transition-transform duration-700 group-hover:scale-105">
                <img src="https://images.unsplash.com/photo-1594462759160-53c1b2add7bc?q=80&w=1887&auto=format&fit=crop" alt="Bride" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-4xl font-serif italic">Agita Pratiwi</h3>
              <p className="text-lg">Putri dari Bapak Ahmad Pratiwi & Ibu Siti Aminah</p>
            </div>
            <div className="text-center space-y-6 group">
              <div className="relative w-72 h-96 mx-auto rounded-[10rem] overflow-hidden border-8 border-white shadow-2xl transition-transform duration-700 group-hover:scale-105">
                <img src="https://images.unsplash.com/photo-1550005816-193a68a15db1?q=80&w=1887&auto=format&fit=crop" alt="Groom" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-4xl font-serif italic">Abdul Aziz Khusen</h3>
              <p className="text-lg">Putra dari Bapak Bambang Khusen & Ibu Laksmi Dewi</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // 2. MODERN MINIMALIST DESIGN
  if (id === 'modern') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans tracking-tight overflow-x-hidden">
        {/* Tombol Back */}
        <div className="fixed top-6 left-6 z-[100]">
          <Button asChild variant="outline" className="rounded-none border-slate-900 bg-white/80 backdrop-blur-md hover:bg-slate-900 hover:text-white transition-all">
            <Link href="/super-admin">
              <ChevronLeft className="mr-2 h-4 w-4" /> BACK TO ADMIN
            </Link>
          </Button>
        </div>

        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center p-6">
          <div className="absolute inset-10 border border-slate-100 pointer-events-none"></div>
          <div className="grid md:grid-cols-2 gap-0 w-full max-w-7xl items-center">
            <div className="space-y-12 p-8 order-2 md:order-1">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-[0.5em] uppercase text-slate-400">JOIN US ON OUR WEDDING</p>
                <h1 className="text-7xl md:text-9xl font-light leading-none uppercase">KHUSEN <br/> & GITA</h1>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-medium text-slate-900">15 . 06 . 2026</p>
                <p className="text-slate-500 uppercase tracking-widest text-xs">Saturday Afternoon — Jakarta</p>
              </div>
              <Button className="rounded-none bg-slate-900 text-white px-12 py-8 hover:bg-slate-700 transition-all text-xs tracking-widest">
                OPEN INVITATION
              </Button>
            </div>
            <div className="relative h-[600px] md:h-[800px] order-1 md:order-2 overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover" />
              <div className="absolute top-0 right-0 p-8">
                <Star className="text-slate-200 h-12 w-12" />
              </div>
            </div>
          </div>
        </section>

        {/* MINIMALIST INFO */}
        <section className="py-32 px-6 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter">OUR LOVE STORY</h2>
            <div className="h-20 w-[1px] bg-slate-200 mx-auto"></div>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-600 italic">
              "Minimalism is not about having less, it's about making room for more of what matters — like our love."
            </p>
            <div className="grid md:grid-cols-2 gap-20 py-20">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold uppercase tracking-tighter">Abdul Aziz Khusen</h3>
                <p className="text-sm text-slate-400 font-medium">Son of Mr. Bambang Khusen & Mrs. Laksmi</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold uppercase tracking-tighter">Agita Pratiwi</h3>
                <p className="text-sm text-slate-400 font-medium">Daughter of Mr. Ahmad Pratiwi & Mrs. Siti</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // 3. ROYAL GOLD DESIGN
  if (id === 'royal') {
    return (
      <div className="min-h-screen bg-[#0A192F] text-[#E2C08D] font-serif overflow-x-hidden">
        {/* Tombol Back */}
        <div className="fixed top-6 left-6 z-[100]">
          <Button asChild variant="outline" className="rounded-full border-[#E2C08D] text-[#E2C08D] bg-[#0A192F]/80 backdrop-blur-md hover:bg-[#E2C08D] hover:text-[#0A192F]">
            <Link href="/super-admin">
              <ChevronLeft className="mr-2 h-4 w-4" /> KEMBALI
            </Link>
          </Button>
        </div>

        {/* HERO SECTION */}
        <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
          {/* Animated Patterns */}
          <div className="absolute inset-0 opacity-10 scale-150 rotate-12 bg-[url('https://www.transparenttextures.com/patterns/black-linen-2.png')]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0A192F] via-transparent to-[#0A192F] z-10"></div>
          
          <div className="relative z-20 space-y-12 max-w-4xl animate-in fade-in slide-in-from-bottom-20 duration-1000">
            <Crown className="mx-auto h-16 w-16 text-[#E2C08D] animate-bounce" />
            <div className="space-y-4">
              <p className="uppercase tracking-[0.5em] text-xs font-sans font-bold text-[#E2C08D]/60">THE ROYAL WEDDING OF</p>
              <h1 className="text-7xl md:text-8xl font-serif leading-tight text-white uppercase">KHUSEN <br/> & GITA</h1>
            </div>
            <div className="flex items-center justify-center gap-8 text-2xl tracking-[0.2em] font-light">
              <div className="h-[1px] w-20 bg-[#E2C08D]/40"></div>
              <span>20 . 08 . 2026</span>
              <div className="h-[1px] w-20 bg-[#E2C08D]/40"></div>
            </div>
            <Button className="bg-[#E2C08D] text-[#0A192F] hover:bg-white rounded-full px-16 py-8 text-sm font-bold tracking-[0.3em] shadow-2xl shadow-[#E2C08D]/20 transition-all duration-500">
              OPEN INVITATION
            </Button>
          </div>
          
          {/* Corner Ornaments */}
          <div className="absolute top-10 left-10 w-40 h-40 border-t-2 border-l-2 border-[#E2C08D]/30 z-20"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border-b-2 border-r-2 border-[#E2C08D]/30 z-20"></div>
        </section>

        {/* GRAND MEMPELAI */}
        <section className="py-32 px-6 bg-[#0D253F] relative">
          <Sparkles className="absolute top-20 right-20 text-[#E2C08D]/20 h-40 w-40" />
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">
            <div className="text-center space-y-8 order-2 md:order-1">
              <h3 className="text-5xl font-serif italic text-white leading-relaxed">Abdul Aziz <br/> Khusen</h3>
              <p className="text-[#E2C08D] text-lg font-medium tracking-widest uppercase">Putra Mahkota</p>
              <h3 className="text-5xl font-serif italic text-white leading-relaxed mt-12">Agita <br/> Pratiwi</h3>
              <p className="text-[#E2C08D] text-lg font-medium tracking-widest uppercase">Putri Kerajaan</p>
            </div>
            <div className="relative order-1 md:order-2 group">
              <div className="absolute inset-0 border-2 border-[#E2C08D] translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700"></div>
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" className="relative z-10 w-full h-[600px] object-cover shadow-2xl" />
            </div>
          </div>
        </section>
      </div>
    )
  }

  return null
}
