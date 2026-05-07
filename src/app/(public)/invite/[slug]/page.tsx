import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { RsvpForm } from './rsvp-form'
import { GreetingsList } from './greetings-list'
import { MapPin, Calendar, Heart, Music, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ to?: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: event } = await supabase.from('events').select('title').eq('slug', slug).single()
  
  return {
    title: event?.title || 'Undangan Digital',
    description: 'Buka undangan digital kami untuk informasi selengkapnya.'
  }
}

export default async function InvitationPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { to: guestName } = await searchParams
  const supabase = await createClient()

  const { data: event } = await supabase
    .from('events')
    .select('*, greetings(*)')
    .eq('slug', slug)
    .single()

  if (!event) {
    notFound()
  }

  const greetings = event.greetings || []

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white space-y-6 animate-in fade-in zoom-in duration-1000">
          <p className="uppercase tracking-[0.3em] text-sm">Walimatul 'Ursy</p>
          <h1 className="text-5xl md:text-7xl font-serif">{event.bride_name} & {event.groom_name}</h1>
          <div className="mt-12 space-y-2">
            <p className="text-lg">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <h2 className="text-3xl font-bold">{guestName || 'Tamu Undangan'}</h2>
            <p className="text-sm opacity-80 italic max-w-xs mx-auto">
              *Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di acara pernikahan kami.
            </p>
          </div>
          <Button className="mt-8 bg-white text-black hover:bg-slate-200 rounded-full px-8">
            Buka Undangan
          </Button>
        </div>
      </section>

      {/* 2. MEMPELAI SECTION */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <Heart className="mx-auto text-pink-500 h-8 w-8" />
          <h2 className="text-3xl font-serif">Mempelai</h2>
          <p className="text-muted-foreground italic">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya..."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="w-48 h-48 mx-auto rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-lg">
              <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${event.bride_name}`} alt={event.bride_name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-serif">{event.bride_name}</h3>
            <p className="text-sm text-muted-foreground">Putri dari Bapak & Ibu ...</p>
          </div>
          <div className="space-y-4">
            <div className="w-48 h-48 mx-auto rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-lg">
              <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${event.groom_name}`} alt={event.groom_name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-serif">{event.groom_name}</h3>
            <p className="text-sm text-muted-foreground">Putra dari Bapak & Ibu ...</p>
          </div>
        </div>
      </section>

      {/* 3. EVENT DETAILS */}
      <section className="py-20 px-6 bg-slate-100">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 text-center">
            <Calendar className="mx-auto text-primary h-8 w-8" />
            <h3 className="text-2xl font-serif">Akad Nikah</h3>
            <div className="space-y-2">
              <p className="font-bold">{new Date(event.date).toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
              <p>Pukul 09.00 - 10.00 WIB</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">{event.location_name}</p>
              <p className="text-sm text-muted-foreground">{event.location_address}</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 text-center">
            <Clock className="mx-auto text-primary h-8 w-8" />
            <h3 className="text-2xl font-serif">Resepsi</h3>
            <div className="space-y-2">
              <p className="font-bold">{new Date(event.date).toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
              <p>Pukul 11.00 - Selesai</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">{event.location_name}</p>
              <p className="text-sm text-muted-foreground">{event.location_address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RSVP & GREETINGS */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-serif">RSVP & Ucapan</h2>
          <p className="text-muted-foreground">Konfirmasikan kehadiran Anda dan berikan ucapan doa.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Kirim Konfirmasi</h4>
            <RsvpForm eventId={event.id} guestName={guestName || ''} />
          </div>
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Buku Tamu</h4>
            <GreetingsList greetings={greetings} />
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-sm text-muted-foreground border-t">
        <p>&copy; 2024 {event.bride_name} & {event.groom_name}. All rights reserved.</p>
        <p className="mt-2">Dibuat dengan ❤️ oleh Platform Undangan Digital</p>
      </footer>
    </main>
  )
}
