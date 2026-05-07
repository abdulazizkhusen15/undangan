import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChevronLeft, Users, CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react'
import { GuestList } from './guest-list'

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch event details
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (!event) {
    notFound()
  }

  // Fetch guests
  const { data: guests } = await supabase
    .from('guests')
    .select('*')
    .eq('event_id', id)
    .order('created_at', { ascending: false })

  const guestList = guests || []
  
  // Analytics calculations
  const totalGuests = guestList.length
  const confirmed = guestList.filter(g => g.rsvp_status === 'confirmed').length
  const declined = guestList.filter(g => g.rsvp_status === 'declined').length
  const pending = guestList.filter(g => g.rsvp_status === 'pending').length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="font-mono text-sm">/invite/{event.slug}</span>
              <Link href={`/invite/${event.slug}`} target="_blank" className="text-primary hover:underline flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                Lihat Halaman
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tamu</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests}</div>
            <p className="text-xs text-muted-foreground text-nowrap">Orang yang diundang</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hadir</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmed}</div>
            <p className="text-xs text-muted-foreground">Konfirmasi kedatangan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menolak</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{declined}</div>
            <p className="text-xs text-muted-foreground">Berhalangan hadir</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending}</div>
            <p className="text-xs text-muted-foreground">Belum merespons</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {/* Guest Management Section */}
        <div className="lg:col-span-2">
          <GuestList eventId={event.id} eventSlug={event.slug} initialGuests={guestList} />
        </div>

        {/* Event Details Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detail Acara</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Mempelai Wanita</p>
                <p>{event.bride_name}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Mempelai Pria</p>
                <p>{event.groom_name}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Tanggal & Waktu</p>
                <p>{new Date(event.date).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Lokasi</p>
                <p className="font-semibold">{event.location_name}</p>
                <p className="text-muted-foreground leading-relaxed">{event.location_address}</p>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild disabled>
                <Link href="#">Edit Detail (Coming Soon)</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
