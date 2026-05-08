'use client'

import React, { useEffect, useState, use } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Heart, Calendar, MapPin, Music, Clock, 
  MessageCircle, ChevronLeft, Star, Crown, 
  Sparkles, Gift, Copy, CheckCircle2, Send,
  Volume2, VolumeX, MailOpen
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function PublicTemplatePreviewPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ from?: string }>
}) {
  // Unwrap promises
  const resolvedParams = use(params)
  const resolvedSearchParams = use(searchParams)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const { id } = resolvedParams
  const from = resolvedSearchParams?.from
  const backUrl = from === 'admin' ? '/super-admin' : '/dashboard'
  const backLabel = from === 'admin' ? 'Kembali ke Admin' : 'Kembali ke Katalog'

  // Initialize Audio
  useEffect(() => {
    const music = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
    music.loop = true
    setAudio(music)
    return () => {
      music.pause()
    }
  }, [])

  // Handle Play/Pause
  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play().catch(e => console.log('Audio play failed:', e))
      } else {
        audio.pause()
      }
    }
  }, [isPlaying, audio])

  // Animation on Scroll Logic
  useEffect(() => {
    if (!hasOpened) return

    const observerOptions = {
      root: null,
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active')
        }
      })
    }, observerOptions)

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [hasOpened])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Nomor rekening berhasil disalin!')
  }

  const handleOpenInvitation = () => {
    setHasOpened(true)
    setIsPlaying(true)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  // --- SUB-COMPONENTS ---

  const GiftSection = ({ themeColor }: { themeColor: string }) => (
    <section className="py-24 px-6 text-center reveal">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <Gift className="mx-auto h-12 w-12" style={{ color: themeColor }} />
          <h2 className="text-4xl font-serif italic">Wedding Gift</h2>
          <p className="text-slate-500 max-w-md mx-auto">Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, Anda dapat memberikannya melalui:</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="BCA" className="h-8 mx-auto object-contain" />
            <div className="space-y-2">
              <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">Nomor Rekening</p>
              <p className="text-2xl font-bold tracking-tighter">1234567890</p>
              <p className="text-lg font-medium">Abdul Aziz Khusen</p>
            </div>
            <Button variant="outline" onClick={() => handleCopy('1234567890')} className="rounded-full w-full hover:bg-slate-50">
              <Copy className="mr-2 h-4 w-4" /> Salin No. Rekening
            </Button>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png" alt="DANA" className="h-8 mx-auto object-contain" />
            <div className="space-y-2">
              <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">Nomor DANA</p>
              <p className="text-2xl font-bold tracking-tighter">0812-3456-7890</p>
              <p className="text-lg font-medium">Agita Pratiwi</p>
            </div>
            <Button variant="outline" onClick={() => handleCopy('081234567890')} className="rounded-full w-full hover:bg-slate-50">
              <Copy className="mr-2 h-4 w-4" /> Salin No. DANA
            </Button>
          </div>
        </div>
      </div>
    </section>
  )

  const WishesSection = () => (
    <section className="py-24 px-6 bg-slate-50 reveal">
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <MessageCircle className="mx-auto h-12 w-12 text-primary/40" />
          <h2 className="text-4xl font-serif italic">Pray & Wishes</h2>
          <p className="text-slate-500">Berikan ucapan doa dan restu Anda untuk kedua mempelai.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-8">
          <div className="space-y-4 text-left">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Nama Anda</label>
              <input type="text" placeholder="Masukkan nama..." className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 ring-primary/20 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Ucapan & Doa</label>
              <textarea placeholder="Tulis ucapan..." rows={4} className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 ring-primary/20 outline-none transition-all" />
            </div>
            <Button className="w-full rounded-full py-8 font-bold shadow-lg shadow-primary/20 text-lg">
              <Send className="mr-2 h-5 w-5" /> Kirim Ucapan
            </Button>
          </div>

          <div className="space-y-6 pt-10 border-t text-left">
            {[
              { name: 'Siti Aminah', wish: 'Selamat menempuh hidup baru Khusen & Gita! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.' },
              { name: 'Bambang Sudjatmiko', wish: 'Turut berbahagia atas pernikahan kalian. Semoga langgeng sampai kakek nenek!' }
            ].map((w, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary shrink-0">
                  {w.name[0]}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">{w.name}</h4>
                  <p className="text-slate-600 leading-relaxed text-sm italic">"{w.wish}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )

  const CoverSection = ({ names, imageUrl }: { names: string, imageUrl: string }) => (
    <div 
      className={`fixed inset-0 z-[9999] transition-all duration-[1500ms] ease-in-out flex flex-col items-center justify-center overflow-hidden
      ${hasOpened ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
    >
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover scale-110" />
      <div className="relative z-20 text-white text-center p-6 space-y-12 max-w-lg">
        <div className="space-y-6">
          <p className="uppercase tracking-[0.6em] text-xs font-bold opacity-80">Wedding Invitation</p>
          <div className="w-12 h-[1px] bg-white/40 mx-auto"></div>
          <h1 className="text-6xl md:text-8xl font-serif italic drop-shadow-2xl">{names}</h1>
        </div>
        <div className="space-y-4">
          <p className="text-sm opacity-70 tracking-widest uppercase">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <h3 className="text-2xl font-bold tracking-tight">Tamu Undangan</h3>
        </div>
        <Button 
          onClick={handleOpenInvitation} 
          className="group rounded-full px-16 py-10 bg-white text-slate-900 hover:bg-slate-100 shadow-2xl transition-all duration-500 scale-110 hover:scale-125"
        >
          <MailOpen className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12" /> 
          <span className="font-bold tracking-widest uppercase text-sm">Buka Undangan</span>
        </Button>
      </div>
    </div>
  )

  const FloatingControls = () => (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">
      <Button 
        onClick={() => setIsPlaying(!isPlaying)}
        variant="secondary" 
        className="h-14 w-14 rounded-full shadow-2xl p-0 bg-white/90 backdrop-blur-md border-none hover:scale-110 transition-transform"
      >
        {isPlaying ? <Volume2 className="h-6 w-6 text-primary" /> : <VolumeX className="h-6 w-6 text-slate-400" />}
      </Button>
    </div>
  )

  const BackButton = () => (
    <div className="fixed top-6 left-6 z-[100]">
      <Button asChild variant="secondary" className="rounded-full shadow-2xl bg-white/90 backdrop-blur-md border-none hover:bg-white hover:scale-105 transition-all px-6 py-6">
        <Link href={backUrl}>
          <ChevronLeft className="mr-2 h-4 w-4" /> {backLabel}
        </Link>
      </Button>
    </div>
  )

  if (id === 'rustic') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#5D4037] font-serif overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s ease-out; }
          .reveal-active { opacity: 1; transform: translateY(0); }
        `}} />
        
        <CoverSection names="Khusen & Gita" imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" />
        <FloatingControls />
        <BackButton />

        <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center reveal">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-white space-y-8">
            <p className="uppercase tracking-[0.4em] text-sm font-sans font-medium">The Wedding of</p>
            <h1 className="text-6xl md:text-8xl font-serif italic">Khusen & Gita</h1>
            <div className="w-24 h-[1px] bg-white/50 mx-auto my-8"></div>
            <p className="text-xl md:text-2xl font-light italic">Minggu, 12 Mei 2026</p>
          </div>
        </section>

        <section className="py-24 px-6 text-center max-w-3xl mx-auto space-y-8 reveal">
          <Heart className="mx-auto text-[#D4A373] h-10 w-10 animate-pulse" />
          <p className="text-lg md:text-xl leading-relaxed italic text-[#8B5E3C]">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..."
          </p>
          <p className="font-sans font-bold text-sm tracking-widest uppercase text-[#D4A373]">— Ar-Rum: 21</p>
        </section>

        <section className="py-24 px-6 bg-[#F5EBE0] reveal">
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

        <GiftSection themeColor="#D4A373" />
        <WishesSection />

        <footer className="py-20 text-center space-y-6 bg-white reveal">
          <Heart className="mx-auto text-[#D4A373] h-6 w-6" />
          <p className="text-sm font-sans tracking-[0.3em] uppercase text-[#A98467]">Terima Kasih</p>
          <h3 className="text-4xl font-serif italic">Khusen & Gita</h3>
        </footer>
      </div>
    )
  }

  if (id === 'modern') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans tracking-tight overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s ease-out; }
          .reveal-active { opacity: 1; transform: translateY(0); }
        `}} />
        <CoverSection names="Khusen & Gita" imageUrl="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" />
        <FloatingControls />
        <BackButton />
        <section className="relative h-screen flex items-center justify-center p-6 reveal">
          <div className="absolute inset-10 border border-slate-100 pointer-events-none"></div>
          <div className="grid md:grid-cols-2 gap-0 w-full max-w-7xl items-center">
            <div className="space-y-12 p-8 order-2 md:order-1">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-[0.5em] uppercase text-slate-400">JOIN US ON OUR WEDDING</p>
                <h1 className="text-7xl md:text-9xl font-light leading-none uppercase tracking-tighter">KHUSEN <br/> & GITA</h1>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-medium">15 . 06 . 2026</p>
                <p className="text-slate-500 uppercase tracking-widest text-xs">Saturday Afternoon — Jakarta</p>
              </div>
            </div>
            <div className="relative h-[600px] md:h-[800px] order-1 md:order-2 overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
        <GiftSection themeColor="#000000" />
        <WishesSection />
      </div>
    )
  }

  if (id === 'royal') {
    return (
      <div className="min-h-screen bg-[#0A192F] text-[#E2C08D] font-serif overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          .reveal { opacity: 0; transform: scale(0.95) translateY(40px); transition: all 1.2s ease-out; }
          .reveal-active { opacity: 1; transform: scale(1) translateY(0); }
        `}} />
        <CoverSection names="Khusen & Gita" imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" />
        <FloatingControls />
        <BackButton />
        <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden reveal">
          <div className="absolute inset-0 opacity-10 scale-150 rotate-12 bg-[url('https://www.transparenttextures.com/patterns/black-linen-2.png')]"></div>
          <div className="relative z-20 space-y-12 max-w-4xl">
            <Crown className="mx-auto h-16 w-16 text-[#E2C08D] animate-bounce" />
            <div className="space-y-4">
              <p className="uppercase tracking-[0.5em] text-xs font-sans font-bold text-[#E2C08D]/60">THE ROYAL WEDDING OF</p>
              <h1 className="text-7xl md:text-8xl font-serif leading-tight text-white uppercase">KHUSEN <br/> & GITA</h1>
            </div>
          </div>
        </section>
        <GiftSection themeColor="#E2C08D" />
        <WishesSection />
      </div>
    )
  }

  return null
}
