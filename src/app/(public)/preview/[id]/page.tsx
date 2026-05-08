'use client'

import React, { useEffect, useState, use } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Heart, Calendar, MapPin, Music, Clock, 
  MessageCircle, ChevronLeft, Star, Crown, 
  Sparkles, Gift, Copy, CheckCircle2, Send,
  Volume2, VolumeX, MailOpen, History, Bell
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

  // Initialize Audio with a more suitable wedding song (instrumental)
  useEffect(() => {
    const music = new Audio('https://www.bensound.com/bensound-music/bensound-love.mp3') // Beautiful instrumental
    music.loop = true
    setAudio(music)
    return () => {
      music.pause()
      music.src = ""
    }
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

  // --- REUSABLE SECTIONS ---

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

  const JourneyTimeline = ({ themeColor }: { themeColor: string }) => (
    <section className="py-24 px-6 reveal">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-serif italic" style={{ color: themeColor }}>Our Journey</h2>
        <p className="text-slate-500 uppercase tracking-[0.3em] text-xs font-bold">Kisah Cinta Kami</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-12">
        {[
          { date: 'Mei 2022', title: 'Pertama Bertemu', desc: 'Pertemuan pertama kami yang berawal dari hobi yang sama.' },
          { date: 'Januari 2023', title: 'Menjalin Kasih', desc: 'Kami memutuskan untuk melangkah bersama dalam komitmen.' },
          { date: 'Maret 2024', title: 'Lamaran', desc: 'Janji suci di hadapan keluarga untuk membangun rumah tangga.' }
        ].map((item, i) => (
          <div key={i} className="flex gap-6 items-start">
            <div className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: themeColor }}>
              <History className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold opacity-60 uppercase">{item.date}</span>
              <h4 className="text-2xl font-serif italic">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )

  const GallerySection = ({ themeColor }: { themeColor: string }) => (
    <section className="py-24 px-6 reveal">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-serif italic" style={{ color: themeColor }}>Our Gallery</h2>
        <p className="text-slate-500 uppercase tracking-[0.3em] text-xs font-bold">Momen Indah Kami</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1887&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1465495910483-0d674115f97d?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop'
        ].map((url, i) => (
          <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-lg group">
            <img src={url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
        ))}
      </div>
    </section>
  )

  const WeddingDaySection = ({ themeColor }: { themeColor: string }) => (
    <section className="py-24 px-6 bg-slate-50 reveal">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="p-10 rounded-[3rem] border-2 space-y-8 text-center bg-white" style={{ borderColor: themeColor }}>
          <Calendar className="w-12 h-12 mx-auto" style={{ color: themeColor }} />
          <div className="space-y-4">
            <h3 className="text-3xl font-serif italic">Akad Nikah</h3>
            <p className="font-bold">Pukul 09.00 - 11.00 WIB</p>
            <p>Gedung Kencana, Jakarta Selatan</p>
            <Button className="w-full rounded-full" style={{ backgroundColor: themeColor }}>Lihat Lokasi</Button>
          </div>
        </div>
        <div className="p-10 rounded-[3rem] space-y-8 text-center text-white" style={{ backgroundColor: themeColor }}>
          <Clock className="w-12 h-12 mx-auto text-white" />
          <div className="space-y-4">
            <h3 className="text-3xl font-serif italic">Resepsi</h3>
            <p className="font-bold">Pukul 12.00 - 15.00 WIB</p>
            <p>Gedung Kencana, Jakarta Selatan</p>
            <Button variant="outline" className="w-full rounded-full border-white text-white">Simpan Jadwal</Button>
          </div>
        </div>
      </div>
    </section>
  )

  const GiftAndWishes = ({ themeColor }: { themeColor: string }) => (
    <>
      <section className="py-24 px-6 text-center reveal">
        <Gift className="mx-auto h-12 w-12 mb-8" style={{ color: themeColor }} />
        <h2 className="text-4xl font-serif italic mb-12">Wedding Gift</h2>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-4">
          <p className="text-sm font-bold tracking-widest text-slate-400">BCA - Abdul Aziz Khusen</p>
          <p className="text-3xl font-bold">1234567890</p>
          <Button variant="outline" onClick={() => handleCopy('1234567890')} className="rounded-full w-full">Salin No. Rekening</Button>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50 reveal">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center">
            <MessageCircle className="mx-auto h-12 w-12 opacity-30 mb-4" />
            <h2 className="text-4xl font-serif italic">Pray & Wishes</h2>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-xl space-y-4">
            <input type="text" placeholder="Nama Anda" className="w-full bg-slate-50 border-none rounded-xl p-4 outline-none" />
            <textarea placeholder="Ucapan & Doa..." rows={3} className="w-full bg-slate-50 border-none rounded-xl p-4 outline-none" />
            <Button className="w-full rounded-full py-6 font-bold shadow-lg" style={{ backgroundColor: themeColor }}>Kirim Ucapan</Button>
          </div>
          <div className="space-y-4 pt-8 text-left">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-bold">Siti Aminah</h4>
              <p className="text-slate-500 italic text-sm mt-1">"Selamat ya Khusen & Gita! Sakinah Mawaddah Warahmah."</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-bold">Bambang S.</h4>
              <p className="text-slate-500 italic text-sm mt-1">"Bahagia selalu untuk kalian berdua!"</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )

  const CoverSection = ({ names, imageUrl }: { names: string, imageUrl: string }) => (
    <div className={`fixed inset-0 z-[9999] transition-all duration-[1200ms] ease-in-out flex flex-col items-center justify-center ${hasOpened ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-20 text-white text-center p-6 space-y-12 max-w-lg">
        <h1 className="text-6xl md:text-8xl font-serif italic">{names}</h1>
        <div className="space-y-2">
          <p className="text-sm opacity-70 tracking-widest">KAMI MENGUNDANG ANDA</p>
          <h3 className="text-2xl font-bold">Tamu Undangan</h3>
        </div>
        <Button onClick={handleOpenInvitation} className="rounded-full px-16 py-10 bg-white text-slate-900 hover:bg-slate-100 shadow-2xl font-bold">
          <MailOpen className="mr-3 h-6 w-6" /> BUKA UNDANGAN
        </Button>
      </div>
    </div>
  )

  const FloatingControls = () => (
    <div className="fixed bottom-6 right-6 z-[100]">
      <Button 
        onClick={() => setIsPlaying(!isPlaying)}
        variant="secondary" 
        className="h-14 w-14 rounded-full shadow-2xl p-0 bg-white/90 backdrop-blur-md border-none"
      >
        {isPlaying ? <Volume2 className="h-6 w-6 text-primary" /> : <VolumeX className="h-6 w-6 text-slate-400" />}
      </Button>
    </div>
  )

  const BackButton = () => (
    <div className="fixed top-6 left-6 z-[100]">
      <Button asChild variant="secondary" className="rounded-full shadow-2xl bg-white/90 backdrop-blur-md border-none px-6 py-6">
        <Link href={backUrl}><ChevronLeft className="mr-2 h-4 w-4" /> {backLabel}</Link>
      </Button>
    </div>
  )

  // --- RENDER PER THEME ---

  if (id === 'rustic') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#5D4037] font-serif overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: `.reveal { opacity: 0; transform: translateY(30px); transition: all 1s ease-out; } .reveal-active { opacity: 1; transform: translateY(0); }` }} />
        <CoverSection names="Khusen & Gita" imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" />
        <FloatingControls />
        <BackButton />
        <section className="h-screen bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex items-center justify-center relative reveal">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-white text-center space-y-6">
            <h1 className="text-7xl italic">Khusen & Gita</h1>
            <p className="text-xl">12 Mei 2026</p>
          </div>
        </section>
        <FormalGreeting themeColor="#D4A373" bg="bg-[#FDFBF7]" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 py-16 px-6 reveal text-center">
          <div><img src="https://images.unsplash.com/photo-1594462759160-53c1b2add7bc?q=80&w=1887&auto=format&fit=crop" className="w-64 h-80 mx-auto rounded-[8rem] object-cover border-8 border-white shadow-xl" /><h3 className="text-3xl mt-6">Agita Pratiwi</h3></div>
          <div><img src="https://images.unsplash.com/photo-1550005816-193a68a15db1?q=80&w=1887&auto=format&fit=crop" className="w-64 h-80 mx-auto rounded-[8rem] object-cover border-8 border-white shadow-xl" /><h3 className="text-3xl mt-6">Abdul Aziz Khusen</h3></div>
        </div>
        <JourneyTimeline themeColor="#D4A373" />
        <GallerySection themeColor="#D4A373" />
        <WeddingDaySection themeColor="#D4A373" />
        <GiftAndWishes themeColor="#D4A373" />
        <footer className="py-20 text-center bg-white"><Heart className="mx-auto text-[#D4A373] h-6 w-6 mb-4" /><h3 className="text-3xl italic">Khusen & Gita</h3></footer>
      </div>
    )
  }

  if (id === 'modern') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans tracking-tight overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: `.reveal { opacity: 0; transform: translateY(30px); transition: all 1s ease-out; } .reveal-active { opacity: 1; transform: translateY(0); }` }} />
        <CoverSection names="Khusen & Gita" imageUrl="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" />
        <FloatingControls />
        <BackButton />
        <section className="h-screen flex items-center justify-center p-12 reveal">
          <div className="text-center space-y-6">
            <p className="tracking-[0.5em] text-xs font-bold text-slate-400">THE WEDDING OF</p>
            <h1 className="text-8xl font-light leading-none">KHUSEN <br/> & GITA</h1>
            <p className="text-2xl font-medium">15 . 06 . 2026</p>
          </div>
        </section>
        <FormalGreeting themeColor="#000" bg="bg-white" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 py-16 px-6 reveal text-center">
          <div className="space-y-4">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" className="w-full h-96 object-cover grayscale" />
            <h3 className="text-2xl font-bold uppercase tracking-widest">Agita Pratiwi</h3>
          </div>
          <div className="space-y-4">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" className="w-full h-96 object-cover grayscale" />
            <h3 className="text-2xl font-bold uppercase tracking-widest">Abdul Aziz Khusen</h3>
          </div>
        </div>
        <JourneyTimeline themeColor="#000" />
        <GallerySection themeColor="#000" />
        <WeddingDaySection themeColor="#000" />
        <GiftAndWishes themeColor="#000" />
        <footer className="py-20 text-center bg-slate-900 text-white"><h3 className="text-3xl uppercase tracking-tighter">Khusen & Gita</h3></footer>
      </div>
    )
  }

  if (id === 'royal') {
    return (
      <div className="min-h-screen bg-[#0A192F] text-[#E2C08D] font-serif overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: `.reveal { opacity: 0; transform: scale(0.95) translateY(30px); transition: all 1.2s ease-out; } .reveal-active { opacity: 1; transform: scale(1) translateY(0); }` }} />
        <CoverSection names="Khusen & Gita" imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" />
        <FloatingControls />
        <BackButton />
        <section className="h-screen flex flex-col items-center justify-center text-center reveal">
          <Crown className="w-16 h-16 mb-8 text-[#E2C08D] animate-bounce" />
          <h1 className="text-8xl uppercase tracking-widest">Khusen & Gita</h1>
          <p className="text-2xl mt-8 tracking-[0.3em]">20 . 08 . 2026</p>
        </section>
        <FormalGreeting themeColor="#E2C08D" bg="bg-[#0A192F]" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 py-16 px-6 reveal text-center">
          <div className="space-y-4">
            <div className="border-4 border-[#E2C08D] p-2"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" className="w-full h-96 object-cover" /></div>
            <h3 className="text-3xl italic">Agita Pratiwi</h3>
          </div>
          <div className="space-y-4">
            <div className="border-4 border-[#E2C08D] p-2"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" className="w-full h-96 object-cover" /></div>
            <h3 className="text-3xl italic">Abdul Aziz Khusen</h3>
          </div>
        </div>
        <JourneyTimeline themeColor="#E2C08D" />
        <GallerySection themeColor="#E2C08D" />
        <WeddingDaySection themeColor="#E2C08D" />
        <GiftAndWishes themeColor="#E2C08D" />
        <footer className="py-20 text-center text-white"><Crown className="w-8 h-8 mx-auto mb-4" /><h3 className="text-4xl italic">Khusen & Gita</h3></footer>
      </div>
    )
  }

  return null
}
