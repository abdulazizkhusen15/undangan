import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, MapPin, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: events } = await supabase.from('events').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daftar Acara</h1>
          <p className="text-muted-foreground">
            Kelola semua undangan digital Anda di sini.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">
            <Plus className="mr-2 h-4 w-4" />
            Buat Undangan Baru
          </Link>
        </Button>
      </div>

      {!events || events.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <Calendar className="h-10 w-10 text-slate-400" />
          </div>
          <CardHeader>
            <CardTitle>Belum Ada Acara</CardTitle>
            <CardDescription>
              Anda belum membuat acara apapun. Klik tombol di atas untuk memulai.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="bg-slate-50/50">
                <CardTitle>{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <span className="font-mono text-xs">/{event.slug}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(event.date).toLocaleDateString('id-ID', {
                      dateStyle: 'long'
                    })}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location_name || 'Lokasi belum ditentukan'}
                  </div>
                </div>
              </CardContent>
              <div className="flex border-t divide-x">
                <Button variant="ghost" className="flex-1 rounded-none h-12" asChild>
                  <Link href={`/invite/${event.slug}`} target="_blank">
                    Lihat Undangan
                  </Link>
                </Button>
                <Button variant="ghost" className="flex-1 rounded-none h-12" asChild>
                  <Link href={`/dashboard/events/${event.id}`}>
                    Kelola
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
