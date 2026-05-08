'use client'

import React, { useEffect, useState, use } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Calendar, Clock, MessageCircle, ChevronLeft, Crown, Gift, Copy, Send, Volume2, VolumeX, MailOpen, History, MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

// ─── SUB-COMPONENTS (outside main to prevent remount on state change) ───────

function CoverSection({ names, imageUrl, hasOpened, onOpen }: { names: string, imageUrl: string, hasOpened: boolean, onOpen: () => void }) {
  return (
    <div className={`fixed inset-0 z-[9999] transition-all duration-[1200ms] ease-in-out flex flex-col items-center justify-center ${hasOpened ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="cover" />
      <div className="relative z-20 text-white text-center p-6 space-y-10 max-w-lg">
        <div className="space-y-4">
          <p className="uppercase tracking-[0.5em] text-xs font-bold opacity-70">Wedding Invitation</p>
          <h1 className="text-6xl md:text-8xl font-serif italic drop-shadow-2xl">{names}</h1>
        </div>
        <div className="space-y-2">
          <p className="text-sm opacity-70 tracking-widest uppercase">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="text-xl font-bold">Tamu Undangan</p>
        </div>
        <Button onClick={onOpen} className="rounded-full px-14 py-8 bg-white text-slate-900 hover:bg-slate-100 shadow-2xl font-bold text-sm tracking-widest uppercase">
          <MailOpen className="mr-3 h-5 w-5" /> Buka Undangan
        </Button>
      </div>
    </div>
  )
}

function FloatingMusic({ isPlaying, onToggle }: { isPlaying: boolean, onToggle: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <Button onClick={onToggle} variant="secondary" className="h-14 w-14 rounded-full shadow-2xl p-0 bg-white/90 backdrop-blur-md border-none hover:scale-110 transition-transform">
        {isPlaying ? <Volume2 className="h-6 w-6 text-primary" /> : <VolumeX className="h-6 w-6 text-slate-400" />}
      </Button>
    </div>
  )
}

function BackBtn({ href, label }: { href: string, label: string }) {
  return (
    <div className="fixed top-6 left-6 z-[100]">
      <Button asChild variant="secondary" className="rounded-full shadow-2xl bg-white/90 backdrop-blur-md border-none px-5 py-5">
        <Link href={href}><ChevronLeft className="mr-2 h-4 w-4" />{label}</Link>
      </Button>
    </div>
  )
}

function FormalGreeting({ themeColor }: { themeColor: string }) {
  return (
    <section className="py-20 px-6 text-center reveal">
      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-2xl font-serif italic" style={{ color: themeColor }}>Assalamu'alaikum Wr. Wb.</p>
        <p className="text-slate-600 leading-relaxed">Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.</p>
        <div className="h-px w-16 bg-slate-200 mx-auto"></div>
      </div>
    </section>
  )
}

function JourneyTimeline({ themeColor }: { themeColor: string }) {
  const items = [
    { date: 'Mei 2022', title: 'Pertama Bertemu', desc: 'Pertemuan pertama di sebuah kafe kecil di Jakarta.' },
    { date: 'Januari 2023', title: 'Menjalin Kasih', desc: 'Memulai lembaran baru bersama dalam komitmen.' },
    { date: 'Maret 2024', title: 'Lamaran', desc: 'Janji suci di hadapan keluarga untuk bersatu.' },
  ]
  return (
    <section className="py-20 px-6 reveal">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-serif italic" style={{ color: themeColor }}>Our Journey</h2>
        <p className="text-slate-400 uppercase tracking-widest text-xs mt-2">Kisah Cinta Kami</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-10">
        {items.map((item, i) => (
          <div key={i} className="flex gap-6 items-start">
            <div className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: themeColor }}>
              <History className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-50">{item.date}</p>
              <h4 className="text-2xl font-serif italic mt-1">{item.title}</h4>
              <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function GallerySection({ themeColor }: { themeColor: string }) {
  const photos = [
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1465495910483-0d674115f97d?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop',
  ]
  return (
    <section className="py-20 px-6 reveal">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-serif italic" style={{ color: themeColor }}>Our Gallery</h2>
        <p className="text-slate-400 uppercase tracking-widest text-xs mt-2">Momen Indah Kami</p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((url, i) => (
          <div key={i} className={`rounded-2xl overflow-hidden shadow-lg group ${i === 0 ? 'row-span-2' : ''}`}>
            <img src={url} alt={`gallery-${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ minHeight: '200px' }} />
          </div>
        ))}
      </div>
    </section>
  )
}

function WeddingDaySection({ themeColor }: { themeColor: string }) {
  return (
    <section className="py-20 px-6 bg-slate-50 reveal">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-serif italic" style={{ color: themeColor }}>Wedding Day</h2>
        <p className="text-slate-400 uppercase tracking-widest text-xs mt-2">Detail Acara</p>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="p-10 rounded-3xl border-2 bg-white text-center space-y-6" style={{ borderColor: themeColor }}>
          <Calendar className="w-10 h-10 mx-auto" style={{ color: themeColor }} />
          <h3 className="text-2xl font-serif italic">Akad Nikah</h3>
          <div className="space-y-1">
            <p className="font-bold">09.00 – 11.00 WIB</p>
            <p className="text-slate-500 text-sm">Gedung Kencana, Jakarta Selatan</p>
          </div>
          <Button className="w-full rounded-full" style={{ backgroundColor: themeColor }}><MapPin className="mr-2 h-4 w-4" />Lihat Lokasi</Button>
        </div>
        <div className="p-10 rounded-3xl text-center text-white space-y-6" style={{ backgroundColor: themeColor }}>
          <Clock className="w-10 h-10 mx-auto text-white" />
          <h3 className="text-2xl font-serif italic">Resepsi</h3>
          <div className="space-y-1">
            <p className="font-bold">12.00 – 15.00 WIB</p>
            <p className="text-white/70 text-sm">Gedung Kencana, Jakarta Selatan</p>
          </div>
          <Button variant="outline" className="w-full rounded-full border-white text-white hover:bg-white hover:text-slate-900"><Calendar className="mr-2 h-4 w-4" />Simpan Jadwal</Button>
        </div>
      </div>
    </section>
  )
}

function GiftSection({ onCopy }: { onCopy: (text: string) => void }) {
  return (
    <section className="py-20 px-6 text-center reveal">
      <Gift className="mx-auto h-10 w-10 mb-6 text-primary" />
      <h2 className="text-4xl font-serif italic mb-10">Wedding Gift</h2>
      <div className="max-w-lg mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-3">
          <p className="text-xs font-bold tracking-widest text-slate-400">BCA</p>
          <p className="text-2xl font-bold">1234567890</p>
          <p className="text-sm">Abdul Aziz Khusen</p>
          <Button variant="outline" onClick={() => onCopy('1234567890')} className="rounded-full w-full text-xs"><Copy className="mr-2 h-3 w-3" />Salin</Button>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-3">
          <p className="text-xs font-bold tracking-widest text-slate-400">DANA</p>
          <p className="text-2xl font-bold">081234567890</p>
          <p className="text-sm">Agita Pratiwi</p>
          <Button variant="outline" onClick={() => onCopy('081234567890')} className="rounded-full w-full text-xs"><Copy className="mr-2 h-3 w-3" />Salin</Button>
        </div>
      </div>
    </section>
  )
}

function WishesSection({ themeColor }: { themeColor: string }) {
  const sampleWishes = [
    { name: 'Siti Aminah', wish: 'Selamat ya Khusen & Gita! Sakinah Mawaddah Warahmah.' },
    { name: 'Bambang S.', wish: 'Bahagia selalu untuk kalian berdua!' },
  ]
  return (
    <section className="py-20 px-6 bg-slate-50 reveal">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <MessageCircle className="mx-auto h-10 w-10 opacity-30 mb-4" />
          <h2 className="text-4xl font-serif italic">Pray & Wishes</h2>
          <p className="text-slate-400 text-sm mt-2">Berikan ucapan doa untuk kedua mempelai</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl space-y-4">
          <input type="text" placeholder="Nama Anda" className="w-full bg-slate-50 rounded-xl p-4 outline-none border border-slate-100 focus:border-slate-300 transition-colors" />
          <textarea placeholder="Ucapan & Doa..." rows={3} className="w-full bg-slate-50 rounded-xl p-4 outline-none border border-slate-100 focus:border-slate-300 transition-colors resize-none" />
          <Button className="w-full rounded-full py-6 font-bold text-white" style={{ backgroundColor: themeColor }}>
            <Send className="mr-2 h-4 w-4" /> Kirim Ucapan
          </Button>
        </div>
        <div className="mt-8 space-y-4">
          {sampleWishes.map((w, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
              <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: themeColor }}>
                {w.name[0]}
              </div>
              <div>
                <p className="font-bold text-sm">{w.name}</p>
                <p className="text-slate-500 italic text-sm mt-1">"{w.wish}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── MAIN PAGE COMPONENT ─────────────────────────────────────────────────────

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
    return () => { music.pause(); music.src = '' }
  }, [])

  useEffect(() => {
    if (!audio) return
    if (isPlaying) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [isPlaying, audio])

  useEffect(() => {
    if (!hasOpened) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal-active') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [hasOpened])

  const handleOpen = () => {
    setHasOpened(true)
    setIsPlaying(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Berhasil disalin!')
  }

  const REVEAL_STYLE = `.reveal { opacity: 0; transform: translateY(32px); transition: opacity 1s ease-out, transform 1s ease-out; } .reveal-active { opacity: 1; transform: translateY(0); }`

  // ── RUSTIC BLOOM ──────────────────────────────────────────────────────────
  if (id === 'rustic') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#5D4037] font-serif overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: REVEAL_STYLE }} />
        <CoverSection names="Khusen & Gita" imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" hasOpened={hasOpened} onOpen={handleOpen} />
        <FloatingMusic isPlaying={isPlaying} onToggle={() => setIsPlaying(p => !p)} />
        <BackBtn href={backUrl} label={backLabel} />

        <section className="h-screen bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex items-center justify-center relative reveal">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-white text-center space-y-6">
            <p className="uppercase tracking-[0.4em] text-sm">The Wedding of</p>
            <h1 className="text-7xl italic">Khusen & Gita</h1>
            <p className="text-xl italic">Minggu, 12 Mei 2026</p>
          </div>
        </section>
        <FormalGreeting themeColor="#D4A373" />
        <section className="py-16 px-6 bg-[#F5EBE0] reveal">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 text-center">
            <div className="space-y-4"><img src="https://images.unsplash.com/photo-1594462759160-53c1b2add7bc?q=80&w=600&auto=format&fit=crop" className="w-60 h-80 mx-auto rounded-[8rem] object-cover border-8 border-white shadow-xl" alt="bride" /><h3 className="text-3xl italic">Agita Pratiwi</h3><p className="text-sm">Putri dari Bapak Ahmad & Ibu Siti</p></div>
            <div className="space-y-4"><img src="https://images.unsplash.com/photo-1550005816-193a68a15db1?q=80&w=600&auto=format&fit=crop" className="w-60 h-80 mx-auto rounded-[8rem] object-cover border-8 border-white shadow-xl" alt="groom" /><h3 className="text-3xl italic">Abdul Aziz Khusen</h3><p className="text-sm">Putra dari Bapak Bambang & Ibu Laksmi</p></div>
          </div>
        </section>
        <JourneyTimeline themeColor="#D4A373" />
        <GallerySection themeColor="#D4A373" />
        <WeddingDaySection themeColor="#D4A373" />
        <GiftSection onCopy={handleCopy} />
        <WishesSection themeColor="#D4A373" />
        <footer className="py-16 text-center bg-white reveal"><Heart className="mx-auto text-[#D4A373] h-6 w-6 mb-4" /><h3 className="text-3xl italic">Khusen & Gita</h3><p className="text-sm text-slate-400 mt-2 tracking-widest uppercase">Terima Kasih</p></footer>
      </div>
    )
  }

  // ── MODERN MINIMALIST ─────────────────────────────────────────────────────
  if (id === 'modern') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans tracking-tight overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: REVEAL_STYLE }} />
        <CoverSection names="Khusen & Gita" imageUrl="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" hasOpened={hasOpened} onOpen={handleOpen} />
        <FloatingMusic isPlaying={isPlaying} onToggle={() => setIsPlaying(p => !p)} />
        <BackBtn href={backUrl} label={backLabel} />

        <section className="h-screen flex items-center justify-center relative reveal">
          <div className="absolute inset-10 border border-slate-100 pointer-events-none"></div>
          <div className="text-center space-y-6 p-8">
            <p className="uppercase tracking-[0.5em] text-xs text-slate-400">The Wedding of</p>
            <h1 className="text-7xl md:text-9xl font-light leading-none uppercase">KHUSEN<br/>&amp; GITA</h1>
            <p className="text-xl">15 . 06 . 2026 — Jakarta</p>
          </div>
        </section>
        <FormalGreeting themeColor="#000" />
        <section className="py-16 px-6 bg-slate-50 reveal">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-4"><img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop" className="w-full h-96 object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="bride" /><h3 className="text-2xl font-bold uppercase tracking-widest text-center">Agita Pratiwi</h3></div>
            <div className="space-y-4"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop" className="w-full h-96 object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="groom" /><h3 className="text-2xl font-bold uppercase tracking-widest text-center">Abdul Aziz Khusen</h3></div>
          </div>
        </section>
        <JourneyTimeline themeColor="#000" />
        <GallerySection themeColor="#000" />
        <WeddingDaySection themeColor="#000" />
        <GiftSection onCopy={handleCopy} />
        <WishesSection themeColor="#000" />
        <footer className="py-16 text-center bg-slate-900 text-white reveal"><h3 className="text-3xl uppercase tracking-tighter">Khusen & Gita</h3><p className="text-sm opacity-40 mt-2 tracking-widest uppercase">Thank You</p></footer>
      </div>
    )
  }

  // ── ROYAL GOLD ────────────────────────────────────────────────────────────
  if (id === 'royal') {
    return (
      <div className="min-h-screen bg-[#0A192F] text-[#E2C08D] font-serif overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: REVEAL_STYLE }} />
        <CoverSection names="Khusen & Gita" imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" hasOpened={hasOpened} onOpen={handleOpen} />
        <FloatingMusic isPlaying={isPlaying} onToggle={() => setIsPlaying(p => !p)} />
        <BackBtn href={backUrl} label={backLabel} />

        <section className="h-screen flex flex-col items-center justify-center text-center reveal">
          <Crown className="w-14 h-14 mb-8 text-[#E2C08D] animate-bounce" />
          <p className="uppercase tracking-[0.5em] text-xs text-[#E2C08D]/60 mb-4">The Royal Wedding of</p>
          <h1 className="text-7xl md:text-8xl uppercase text-white">KHUSEN<br/>&amp; GITA</h1>
          <p className="text-2xl mt-8 tracking-[0.3em]">20 . 08 . 2026</p>
        </section>
        <FormalGreeting themeColor="#E2C08D" />
        <section className="py-16 px-6 bg-[#0D253F] reveal">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 text-center">
            <div className="space-y-4"><div className="border-4 border-[#E2C08D] p-1"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop" className="w-full h-96 object-cover" alt="bride" /></div><h3 className="text-3xl italic text-white">Agita Pratiwi</h3></div>
            <div className="space-y-4"><div className="border-4 border-[#E2C08D] p-1"><img src="https://images.unsplash.com/photo-1550005816-193a68a15db1?q=80&w=600&auto=format&fit=crop" className="w-full h-96 object-cover" alt="groom" /></div><h3 className="text-3xl italic text-white">Abdul Aziz Khusen</h3></div>
          </div>
        </section>
        <JourneyTimeline themeColor="#E2C08D" />
        <GallerySection themeColor="#E2C08D" />
        <WeddingDaySection themeColor="#E2C08D" />
        <GiftSection onCopy={handleCopy} />
        <WishesSection themeColor="#E2C08D" />
        <footer className="py-16 text-center bg-[#0A192F] reveal"><Crown className="mx-auto w-8 h-8 text-[#E2C08D] mb-4" /><h3 className="text-4xl italic text-white">Khusen & Gita</h3><p className="text-[#E2C08D] text-xs mt-2 tracking-widest uppercase">The Royal Wedding</p></footer>
      </div>
    )
  }

  // ── RED FLORAL 3D ──────────────────────────────────────────────────────────
  if (id === 'red-floral') {
    return (
      <div className="min-h-screen bg-[#4A0404] text-[#FDF5E6] font-serif overflow-x-hidden selection:bg-[#D4AF37] selection:text-white">
        <style dangerouslySetInnerHTML={{ __html: REVEAL_STYLE }} />
        
        {/* 3D Envelope Opening */}
        <AnimatePresence>
          {!hasOpened && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ y: '-100%', opacity: 0, transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } }}
              className="fixed inset-0 z-[9999] bg-[#2D0202] flex items-center justify-center p-6"
            >
              <div className="absolute inset-0 opacity-20 bg-[url('/templates/red-floral/ornament.png')] bg-repeat bg-center" />
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, rotateY: 45 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10 w-full max-w-md aspect-[3/4] bg-[#FDF5E6] rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between p-10 overflow-hidden border-8 border-[#D4AF37]/20"
              >
                <img src="/templates/red-floral/ornament.png" className="absolute top-0 right-0 w-40 h-40 opacity-20 rotate-90" alt="ornament" />
                <img src="/templates/red-floral/ornament.png" className="absolute bottom-0 left-0 w-40 h-40 opacity-20 -rotate-90" alt="ornament" />
                
                <div className="text-center space-y-4">
                  <p className="text-[#800000] tracking-[0.4em] text-xs font-bold uppercase">Wedding Invitation</p>
                  <div className="h-px w-12 bg-[#D4AF37] mx-auto" />
                </div>

                <div className="text-center">
                  <h1 className="text-6xl text-[#800000] font-serif italic mb-2 leading-tight">Khusen<br/>& Gita</h1>
                  <p className="text-[#800000]/60 text-sm tracking-widest uppercase">15 . 06 . 2026</p>
                </div>

                <div className="text-center space-y-8 w-full">
                  <div className="space-y-1">
                    <p className="text-[#800000]/40 text-[10px] tracking-widest uppercase">Special Guest</p>
                    <p className="text-xl text-[#800000] font-bold">Tamu Undangan</p>
                  </div>
                  <Button onClick={handleOpen} className="w-full bg-[#800000] hover:bg-[#600000] text-white rounded-none py-8 shadow-xl group overflow-hidden relative">
                    <span className="relative z-10 flex items-center">
                      <MailOpen className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> BUKA UNDANGAN
                    </span>
                    <motion.div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <FloatingMusic isPlaying={isPlaying} onToggle={() => setIsPlaying(p => !p)} />
        <BackBtn href={backUrl} label={backLabel} />

        {/* Hero Section */}
        <section className="h-screen relative flex items-center justify-center">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-[#4A0404]/80 backdrop-blur-[2px]" />
          
          <div className="relative z-10 text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Star className="w-8 h-8 text-[#D4AF37] mx-auto animate-pulse" />
              <p className="text-[#D4AF37] uppercase tracking-[0.6em] text-xs">The Wedding of</p>
              <h1 className="text-8xl md:text-9xl italic text-white drop-shadow-2xl">Khusen & Gita</h1>
            </motion.div>
            <div className="h-px w-32 bg-[#D4AF37] mx-auto" />
            <p className="text-2xl text-[#D4AF37]/80 tracking-[0.2em] font-light italic">Sunday, 15 June 2026</p>
          </div>
          
          {/* Decorative Corner Ornaments */}
          <img src="/templates/red-floral/ornament.png" className="absolute top-0 left-0 w-64 h-64 opacity-40" alt="decor" />
          <img src="/templates/red-floral/ornament.png" className="absolute bottom-0 right-0 w-64 h-64 opacity-40 rotate-180" alt="decor" />
        </section>

        <FormalGreeting themeColor="#D4AF37" />

        {/* Mempelai Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          {/* Animated Background Ornaments */}
          <motion.img 
            animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            src="/templates/red-floral/ornament.png" 
            className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none" 
          />
          <motion.img 
            animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            src="/templates/red-floral/ornament.png" 
            className="absolute bottom-0 left-0 w-80 h-80 opacity-10 pointer-events-none rotate-180" 
          />

          <div className="absolute top-1/2 left-0 w-full h-px bg-[#D4AF37]/20" />
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, rotateY: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-center space-y-6 cursor-default"
            >
              <div className="relative inline-block group">
                <div className="absolute -inset-4 border-2 border-[#D4AF37] rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop" className="relative z-10 w-64 h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" alt="bride" />
              </div>
              <h3 className="text-4xl italic text-white">Agita Pratiwi</h3>
              <p className="text-[#D4AF37]/60 text-sm tracking-widest uppercase">Putri dari Bapak Ahmad & Ibu Siti</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-center space-y-6 cursor-default"
            >
              <div className="relative inline-block group">
                <div className="absolute -inset-4 border-2 border-[#D4AF37] -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop" className="relative z-10 w-64 h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" alt="groom" />
              </div>
              <h3 className="text-4xl italic text-white">Abdul Aziz Khusen</h3>
              <p className="text-[#D4AF37]/60 text-sm tracking-widest uppercase">Putra dari Bapak Bambang & Ibu Laksmi</p>
            </motion.div>
          </div>
        </section>

        <JourneyTimeline themeColor="#D4AF37" />
        <GallerySection themeColor="#D4AF37" />
        <WeddingDaySection themeColor="#D4AF37" />
        
        <GiftSection onCopy={handleCopy} />
        <WishesSection themeColor="#D4AF37" />

        <footer className="py-32 text-center bg-[#2D0202] relative overflow-hidden">
          <img src="/templates/red-floral/ornament.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] opacity-5 pointer-events-none" alt="bg" />
          <div className="relative z-10 space-y-6">
            <Heart className="mx-auto text-[#D4AF37] h-10 w-10 animate-beat" />
            <h3 className="text-6xl italic text-white">Khusen & Gita</h3>
            <p className="text-[#D4AF37] text-xs tracking-[1em] uppercase">Terima Kasih</p>
          </div>
        </footer>
      </div>
    )
  }

  return null
}
