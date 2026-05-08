'use client'

import React, { useEffect, useState, use } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Heart, Calendar, MapPin, Music, Clock, 
  MessageCircle, ChevronLeft, Star, Crown, 
  Sparkles, Gift, Copy, CheckCircle2, Send,
  Volume2, VolumeX, MailOpen, Camera, Info,
  History, MapIcon, Bell
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
  const resolvedParams = use(params)
  const resolvedSearchParams = use(searchParams)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const { id } = resolvedParams
  const from = resolvedSearchParams?.from
  const backUrl = from === 'admin' ? '/super-admin' : '/dashboard'
  const backLabel = from === 'admin' ? 'Kembali ke Admin' : 'Kembali ke Katalog'

  useEffect(() => {
    const music = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
    music.loop = true
    setAudio(music)
    return () => music.pause()
  }, [])

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play().catch(e => console.log('Audio play failed:', e))
      } else {
        audio.pause()
      }
    }
  }, [isPlaying, audio])

  useEffect(() => {
    if (!hasOpened) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active')
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [hasOpened])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Berhasil disalin!')
  }

  const handleOpenInvitation = () => {
    setHasOpened(true)
    setIsPlaying(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
  }

  // --- REUSABLE COMPONENTS ---

  const SectionTitle = ({ title, subtitle, color }: { title: string, subtitle?: string, color: string }) => (
    <div className="text-center space-y-4 mb-16 reveal">
      <h2 className="text-4xl md:text-5xl font-serif italic" style={{ color }}>{title}</h2>
      {subtitle && <p className="text-slate-500 uppercase tracking-[0.3em] text-xs font-bold">{subtitle}</p>}
      <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: color }}></div>
    </div>
  )

  const JourneyTimeline = ({ themeColor }: { themeColor: string }) => (
    <section className="py-24 px-6 reveal">
      <SectionTitle title="Our Journey" subtitle="Kisah Cinta Kami" color={themeColor} />
      <div className="max-w-4xl mx-auto space-y-12">
        {[
          { date: 'Mei 2022', title: 'Pertama Bertemu', desc: 'Pertemuan pertama kami di sebuah cafe kecil di Jakarta, berawal dari hobi yang sama.' },
          { date: 'Januari 2023', title: 'Menjalin Kasih', desc: 'Setelah sekian lama saling mengenal, kami memutuskan untuk memulai lembaran baru bersama.' },
          { date: 'Maret 2024', title: 'Lamaran', desc: 'Di depan keluarga besar, kami mengikrarkan janji untuk melangkah ke jenjang pernikahan.' }
        ].map((item, i) => (
          <div key={i} className="flex gap-6 items-start relative group">
            <div className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center font-bold shadow-lg text-white" style={{ backgroundColor: themeColor }}>
              <History className="w-6 h-6" />
            </div>
            <div className="space-y-2 pb-8">
              <span className="text-sm font-bold opacity-60 tracking-widest uppercase">{item.date}</span>
              <h4 className="text-2xl font-serif italic">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed max-w-lg">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )

  const GalleryGrid = ({ themeColor }: { themeColor: string }) => (
    <section className="py-24 px-6 reveal">
      <SectionTitle title="Our Gallery" subtitle="Momen Bahagia" color={themeColor} />
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1887&auto=format&fit=crop', span: 'md:col-span-1 md:row-span-2' },
          { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop', span: '' },
          { url: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2070&auto=format&fit=crop', span: '' },
          { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop', span: 'md:col-span-2' },
          { url: 'https://images.unsplash.com/photo-1465495910483-0d674115f97d?q=80&w=2070&auto=format&fit=crop', span: '' },
        ].map((img, i) => (
          <div key={i} className={`relative overflow-hidden rounded-2xl group shadow-xl ${img.span}`}>
            <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>
    </section>
  )

  const WeddingDay = ({ themeColor }: { themeColor: string }) => (
    <section className="py-24 px-6 bg-white reveal">
      <SectionTitle title="Wedding Day" subtitle="Detail Acara" color={themeColor} />
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="p-10 rounded-[3rem] border-2 space-y-8 text-center bg-slate-50 transition-all hover:shadow-2xl" style={{ borderColor: themeColor }}>
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white" style={{ backgroundColor: themeColor }}>
            <Calendar className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-serif italic">Akad Nikah</h3>
            <div className="flex items-center justify-center gap-2 text-slate-500 font-bold tracking-widest text-sm">
              <Clock className="w-4 h-4" /> 09.00 - 11.00 WIB
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xl font-bold">Gedung Kencana</p>
            <p className="text-slate-500 italic">Jl. Mawar No. 45, Jakarta Selatan</p>
            <Button className="w-full rounded-full py-6 font-bold shadow-lg" style={{ backgroundColor: themeColor }}>
              <MapPin className="mr-2 h-4 w-4" /> Google Maps
            </Button>
          </div>
        </div>
        <div className="p-10 rounded-[3rem] border-2 space-y-8 text-center text-white transition-all hover:shadow-2xl" style={{ backgroundColor: themeColor, borderColor: themeColor }}>
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-white" style={{ color: themeColor }}>
            <Bell className="w-8 h-8" />
          </div>
          <div className="space-y-2 text-white/90">
            <h3 className="text-3xl font-serif italic text-white">Resepsi</h3>
            <div className="flex items-center justify-center gap-2 font-bold tracking-widest text-sm">
              <Clock className="w-4 h-4" /> 12.00 - 15.00 WIB
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xl font-bold">Gedung Kencana</p>
            <p className="text-white/70 italic">Jl. Mawar No. 45, Jakarta Selatan</p>
            <Button variant="outline" className="w-full rounded-full py-6 font-bold border-white text-white hover:bg-white hover:text-slate-900 transition-all">
              <Calendar className="mr-2 h-4 w-4" /> Save the Date
            </Button>
          </div>
        </div>
      </div>
    </section>
  )

  const FormalGreeting = ({ themeColor, bg }: { themeColor: string, bg: string }) => (
    <section className={`py-24 px-6 text-center reveal ${bg}`}>
      <div className="max-w-3xl mx-auto space-y-8">
        <p className="text-2xl font-serif italic" style={{ color: themeColor }}>Assalamu'alaikum Wr. Wb.</p>
        <p className="text-slate-600 leading-relaxed">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami:
        </p>
        <div className="h-[1px] w-12 bg-slate-300 mx-auto"></div>
      </div>
    </section>
  )

  const CoverSection = ({ names, imageUrl }: { names: string, imageUrl: string }) => (
    <div className={`fixed inset-0 z-[9999] transition-all duration-[1500ms] ease-in-out flex flex-col items-center justify-center overflow-hidden ${hasOpened ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
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
        <Button onClick={handleOpenInvitation} className="group rounded-full px-16 py-10 bg-white text-slate-900 hover:bg-slate-100 shadow-2xl transition-all duration-500 scale-110 hover:scale-125">
          <MailOpen className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12" /> 
          <span className="font-bold tracking-widest uppercase text-sm">Buka Undangan</span>
        </Button>
      </div>
    </div>
  )

  const FloatingControls = () => (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">
      <Button onClick={() => setIsPlaying(!isPlaying)} variant="secondary" className="h-14 w-14 rounded-full shadow-2xl p-0 bg-white/90 backdrop-blur-md border-none hover:scale-110 transition-transform">
        {isPlaying ? <Volume2 className="h-6 w-6 text-primary" /> : <VolumeX className="h-6 w-6 text-slate-400" />}
      </Button>
    </div>
  )

  const BackButton = () => (
    <div className="fixed top-6 left-6 z-[100]">
      <Button asChild variant="secondary" className="rounded-full shadow-2xl bg-white/90 backdrop-blur-md border-none hover:bg-white hover:scale-105 transition-all px-6 py-6">
        <Link href={backUrl}><ChevronLeft className="mr-2 h-4 w-4" /> {backLabel}</Link>
      </Button>
    </div>
  )

  // --- RENDER PER THEME ---

  if (id === 'rustic') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#5D4037] font-serif overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s ease-out; }
          .reveal-active { opacity: 1; transform: translateY(0); }
          .ornament-leaf { position: absolute; pointer-events: none; opacity: 0.1; }
        `}} />
        <CoverSection names="Khusen & Gita" imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" />
        <FloatingControls />
        <BackButton />

        {/* HERO */}
        <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center reveal">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-white space-y-8">
            <p className="uppercase tracking-[0.4em] text-sm font-sans font-medium">The Wedding of</p>
            <h1 className="text-6xl md:text-8xl font-serif italic">Khusen & Gita</h1>
            <p className="text-xl md:text-2xl font-light italic">Minggu, 12 Mei 2026</p>
          </div>
        </section>

        <FormalGreeting themeColor="#D4A373" bg="bg-[#FDFBF7]" />

        {/* MEMPELAI */}
        <section className="py-24 px-6 bg-[#F5EBE0] reveal relative overflow-hidden">
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

        <JourneyTimeline themeColor="#D4A373" />
        <GalleryGrid themeColor="#D4A373" />
        <WeddingDay themeColor="#D4A373" />

        <section className="py-24 px-6 text-center max-w-3xl mx-auto space-y-8 reveal">
          <Heart className="mx-auto text-[#D4A373] h-10 w-10 animate-pulse" />
          <p className="text-lg md:text-xl leading-relaxed italic text-[#8B5E3C]">"Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu..."</p>
        </section>

        <section className="py-24 bg-[#F5EBE0]/30"><div className="max-w-4xl mx-auto"><div className="grid md:grid-cols-2 gap-8 px-6 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl space-y-4">
            <h4 className="font-bold text-slate-400 text-xs tracking-widest uppercase">Wedding Gift</h4>
            <p className="text-2xl font-bold">1234567890</p>
            <p className="font-medium">Abdul Aziz Khusen (BCA)</p>
            <Button variant="outline" onClick={() => handleCopy('1234567890')} className="rounded-full w-full">Copy</Button>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl space-y-4">
            <h4 className="font-bold text-slate-400 text-xs tracking-widest uppercase">Send Wish</h4>
            <p className="text-slate-500 text-sm italic">Berikan ucapan terbaik Anda melalui kolom komentar di bawah.</p>
          </div>
        </div></div></section>

        <footer className="py-20 text-center space-y-6 bg-white reveal">
          <Heart className="mx-auto text-[#D4A373] h-6 w-6" />
          <h3 className="text-4xl font-serif italic">Khusen & Gita</h3>
          <p className="text-slate-400 text-xs tracking-widest uppercase">Terima Kasih</p>
        </footer>
      </div>
    )
  }

  if (id === 'modern') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans tracking-tight overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); }
          .reveal-active { opacity: 1; transform: translateY(0); }
        `}} />
        <CoverSection names="Khusen & Gita" imageUrl="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" />
        <FloatingControls />
        <BackButton />

        {/* HERO */}
        <section className="relative h-screen flex items-center justify-center p-6 reveal">
          <div className="absolute inset-10 border border-slate-100 pointer-events-none"></div>
          <div className="grid md:grid-cols-2 gap-0 w-full max-w-7xl items-center">
            <div className="space-y-12 p-8 order-2 md:order-1">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-[0.5em] uppercase text-slate-400">JOIN US ON OUR WEDDING</p>
                <h1 className="text-7xl md:text-9xl font-light leading-none uppercase tracking-tighter">KHUSEN <br/> & GITA</h1>
              </div>
              <p className="text-2xl font-medium">15 . 06 . 2026 — JAKARTA</p>
            </div>
            <div className="relative h-[600px] md:h-[800px] order-1 md:order-2 overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <FormalGreeting themeColor="#000" bg="bg-white" />
        <JourneyTimeline themeColor="#000" />
        <GalleryGrid themeColor="#000" />
        <WeddingDay themeColor="#000" />

        <footer className="py-20 text-center space-y-6 bg-slate-900 text-white reveal">
          <h3 className="text-4xl font-light tracking-tighter uppercase">Khusen & Gita</h3>
          <p className="opacity-50 text-xs tracking-widest uppercase font-bold">Thank You For Coming</p>
        </footer>
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

        {/* HERO */}
        <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden reveal">
          <div className="absolute inset-0 opacity-10 scale-150 rotate-12 bg-[url('https://www.transparenttextures.com/patterns/black-linen-2.png')]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0A192F] via-transparent to-[#0A192F] z-10"></div>
          <div className="relative z-20 space-y-12 max-w-4xl">
            <Crown className="mx-auto h-16 w-16 text-[#E2C08D] animate-bounce" />
            <div className="space-y-4">
              <p className="uppercase tracking-[0.5em] text-xs font-sans font-bold text-[#E2C08D]/60">THE ROYAL WEDDING OF</p>
              <h1 className="text-7xl md:text-8xl font-serif leading-tight text-white uppercase">KHUSEN <br/> & GITA</h1>
            </div>
            <p className="text-2xl tracking-[0.2em] font-light">20 . 08 . 2026</p>
          </div>
        </section>

        <FormalGreeting themeColor="#E2C08D" bg="bg-[#0A192F]" />

        <section className="py-24 px-6 bg-[#0D253F] reveal relative overflow-hidden">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">
            <div className="text-center space-y-8 order-2 md:order-1">
              <h3 className="text-5xl font-serif italic text-white">Abdul Aziz Khusen</h3>
              <p className="text-[#E2C08D] text-lg font-medium tracking-widest uppercase">Putra Mahkota</p>
              <h3 className="text-5xl font-serif italic text-white mt-12">Agita Pratiwi</h3>
              <p className="text-[#E2C08D] text-lg font-medium tracking-widest uppercase">Putri Kerajaan</p>
            </div>
            <div className="relative order-1 md:order-2 group">
              <div className="absolute inset-0 border-2 border-[#E2C08D] translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700"></div>
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" className="relative z-10 w-full h-[600px] object-cover shadow-2xl" />
            </div>
          </div>
        </section>

        <JourneyTimeline themeColor="#E2C08D" />
        <GalleryGrid themeColor="#E2C08D" />
        <WeddingDay themeColor="#E2C08D" />

        <footer className="py-20 text-center space-y-6 bg-[#0A192F] reveal">
          <Crown className="mx-auto text-[#E2C08D] h-8 w-8" />
          <h3 className="text-4xl font-serif italic text-white uppercase">Khusen & Gita</h3>
          <p className="text-[#E2C08D] text-xs tracking-widest uppercase">The Royal Wedding Finale</p>
        </footer>
      </div>
    )
  }

  return null
}
