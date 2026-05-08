import { Button } from '@/components/ui/button'
import { Heart, Calendar, MapPin, Music, Clock, MessageCircle, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function TemplatePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (id !== 'rustic') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-2xl font-bold">Preview untuk template ini sedang dikembangkan.</h1>
        <Button asChild className="mt-4 rounded-full">
          <Link href="/super-admin">Kembali ke Panel</Link>
        </Button>
      </div>
    )
  }

  // Desain Rustic Bloom Full Preview
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4037] font-serif overflow-x-hidden">
      {/* Tombol Back (Hanya muncul di Admin Preview) */}
      <div className="fixed top-6 left-6 z-[100]">
        <Button asChild variant="secondary" className="rounded-full shadow-2xl bg-white/80 backdrop-blur-md border-none hover:bg-white">
          <Link href="/super-admin">
            <ChevronLeft className="mr-2 h-4 w-4" /> Kembali ke Admin
          </Link>
        </Button>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-white space-y-8 animate-in fade-in zoom-in duration-1000">
          <p className="uppercase tracking-[0.4em] text-sm font-sans font-medium">The Wedding of</p>
          <h1 className="text-6xl md:text-8xl font-serif italic">Budi & Ani</h1>
          <div className="w-24 h-[1px] bg-white/50 mx-auto my-8"></div>
          <p className="text-xl md:text-2xl font-light italic">Minggu, 12 Mei 2024</p>
          <Button className="mt-12 bg-white/20 backdrop-blur-md text-white border border-white/40 hover:bg-white hover:text-black rounded-full px-10 py-6 transition-all duration-500 font-sans tracking-widest text-xs uppercase">
            Buka Undangan
          </Button>
        </div>
      </section>

      {/* 2. QUOTE SECTION */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto space-y-8">
        <Heart className="mx-auto text-[#D4A373] h-10 w-10 animate-pulse" />
        <p className="text-lg md:text-xl leading-relaxed italic text-[#8B5E3C]">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."
        </p>
        <p className="font-sans font-bold text-sm tracking-widest uppercase text-[#D4A373]">— Ar-Rum: 21</p>
      </section>

      {/* 3. MEMPELAI SECTION */}
      <section className="py-24 px-6 bg-[#F5EBE0]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="text-center space-y-6 group">
            <div className="relative w-72 h-96 mx-auto rounded-[10rem] overflow-hidden border-8 border-white shadow-2xl transition-transform duration-700 group-hover:scale-105">
              <img src="https://images.unsplash.com/photo-1594462759160-53c1b2add7bc?q=80&w=1887&auto=format&fit=crop" alt="Bride" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-4xl font-serif italic">Ani Wijaya, S.T.</h3>
            <p className="font-sans text-sm tracking-widest text-[#A98467] font-bold">PUTRI DARI</p>
            <p className="text-lg">Bapak Ahmad Wijaya & Ibu Siti Aminah</p>
          </div>
          <div className="text-center space-y-6 group">
            <div className="relative w-72 h-96 mx-auto rounded-[10rem] overflow-hidden border-8 border-white shadow-2xl transition-transform duration-700 group-hover:scale-105">
              <img src="https://images.unsplash.com/photo-1550005816-193a68a15db1?q=80&w=1887&auto=format&fit=crop" alt="Groom" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-4xl font-serif italic">Budi Santoso, M.B.A.</h3>
            <p className="font-sans text-sm tracking-widest text-[#A98467] font-bold">PUTRA DARI</p>
            <p className="text-lg">Bapak Bambang Santoso & Ibu Laksmi Dewi</p>
          </div>
        </div>
      </section>

      {/* 4. EVENT DETAILS */}
      <section className="py-32 px-6 relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4A373]/5 rounded-full -ml-32 -mt-32 blur-3xl"></div>
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-serif italic text-[#5D4037]">Acara Bahagia</h2>
            <div className="w-16 h-1 bg-[#D4A373] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-[#F5EBE0] space-y-8 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A373]/5 rounded-bl-full transition-all duration-500 group-hover:scale-150"></div>
              <Calendar className="mx-auto text-[#D4A373] h-12 w-12" />
              <div className="space-y-4">
                <h3 className="text-3xl font-serif italic">Akad Nikah</h3>
                <div className="h-[1px] bg-[#F5EBE0] w-full"></div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-[#D4A373]">12 . 05 . 2024</p>
                  <p className="text-lg font-sans font-medium">Pukul 09.00 - 11.00 WIB</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold">Gedung Kencana</p>
                  <p className="text-[#8B5E3C]">Jl. Mawar No. 45, Jakarta Selatan</p>
                </div>
              </div>
              <Button className="w-full rounded-full bg-[#D4A373] hover:bg-[#8B5E3C] shadow-lg shadow-[#D4A373]/20">
                Buka Google Maps
              </Button>
            </div>

            <div className="bg-[#5D4037] p-12 rounded-[3rem] shadow-xl space-y-8 text-center text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full transition-all duration-500 group-hover:scale-150"></div>
              <Clock className="mx-auto text-white h-12 w-12" />
              <div className="space-y-4">
                <h3 className="text-3xl font-serif italic">Resepsi</h3>
                <div className="h-[1px] bg-white/10 w-full"></div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-[#D4A373]">12 . 05 . 2024</p>
                  <p className="text-lg font-sans font-medium">Pukul 12.00 - 15.00 WIB</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold">Gedung Kencana</p>
                  <p className="text-white/70">Jl. Mawar No. 45, Jakarta Selatan</p>
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-full border-white/30 text-white hover:bg-white/10">
                Simpan ke Kalender
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PHOTO GALLERY */}
      <section className="py-24 bg-[#F5EBE0]/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-serif italic">Momen Bahagia</h2>
            <p className="text-[#8B5E3C] font-sans tracking-widest text-xs uppercase font-bold">Our Love Story in Photos</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1887&auto=format&fit=crop" className="rounded-2xl shadow-md" />
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" className="rounded-2xl shadow-md" />
            </div>
            <div className="space-y-4 pt-8">
              <img src="https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-md" />
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-md" />
            </div>
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1465495910483-0d674115f97d?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-md" />
              <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-md" />
            </div>
            <div className="space-y-4 pt-8">
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-md" />
              <img src="https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1887&auto=format&fit=crop" className="rounded-2xl shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center space-y-6 bg-white">
        <Heart className="mx-auto text-[#D4A373] h-6 w-6" />
        <p className="text-sm font-sans tracking-[0.3em] uppercase text-[#A98467]">Terima Kasih</p>
        <h3 className="text-4xl font-serif italic">Budi & Ani</h3>
        <p className="text-slate-400 text-xs">#BudiAniWedding2024</p>
      </footer>
    </div>
  )
}
