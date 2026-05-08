import { createClient } from '@/lib/supabase/server'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LayoutDashboard, Users, Settings, Eye, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TEMPLATES = [
  {
    id: 'rustic',
    name: 'Rustic Bloom',
    category: 'Terpopuler',
    image: '/templates/rustic.png',
    price: 'Rp 149.000',
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    category: 'Eksklusif',
    image: '/templates/modern.png',
    price: 'Rp 199.000',
  },
  {
    id: 'royal',
    name: 'Royal Gold',
    category: 'Premium',
    image: '/templates/royal.png',
    price: 'Rp 299.000',
  }
]

export default async function SuperAdminPage() {
  const supabase = await createClient()
  
  // Mengambil data acara beserta email pemiliknya melalui relasi profil
  const { data: allEvents } = await supabase
    .from('events')
    .select('title, slug, date, profiles(email)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-12 pb-20">
      {/* Header Admin */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Super Admin Control</h1>
          <p className="text-slate-500 mt-1">Kelola seluruh template dan data undangan dalam satu panel.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full shadow-sm">
            <Settings className="mr-2 h-4 w-4" /> Pengaturan Sistem
          </Button>
          <Button className="rounded-full shadow-lg shadow-primary/20">
            <LayoutDashboard className="mr-2 h-4 w-4" /> Lihat Statistik
          </Button>
        </div>
      </div>

      {/* Template Management Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Katalog Template Aktif</h2>
          <Button variant="link" className="text-primary font-semibold">Kelola Semua Template</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TEMPLATES.map((tpl) => (
            <Card key={tpl.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all rounded-3xl group">
              <div className="relative aspect-video overflow-hidden">
                <img src={tpl.image} alt={tpl.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <Badge className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 border-none px-3 py-0.5 rounded-full">
                  {tpl.category}
                </Badge>
              </div>
              <CardHeader className="p-5">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold">{tpl.name}</CardTitle>
                  <span className="text-primary text-sm font-bold">{tpl.price}</span>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Events Monitoring Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Daftar Undangan Masuk</h2>
          </div>
          <Badge variant="outline" className="bg-white px-4 py-1 text-slate-600">Total: {allEvents?.length || 0} Acara</Badge>
        </div>
        
        <div className="border border-slate-100 rounded-[2rem] bg-white shadow-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="py-5 px-6">Judul Acara</TableHead>
                <TableHead>Email Pemilik</TableHead>
                <TableHead>Slug (URL)</TableHead>
                <TableHead>Tanggal Acara</TableHead>
                <TableHead className="text-right px-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allEvents && allEvents.length > 0 ? (
                allEvents.map((event: any, index: number) => (
                  <TableRow key={index} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="py-4 px-6 font-semibold text-slate-900">{event.title}</TableCell>
                    <TableCell className="text-slate-600 font-medium">{event.profiles?.email || 'Guest Account'}</TableCell>
                    <TableCell className="font-mono text-xs text-blue-600 font-medium">/{event.slug}</TableCell>
                    <TableCell className="text-slate-500">
                      {new Date(event.date).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Button variant="ghost" size="sm" className="rounded-full hover:bg-white hover:shadow-sm h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-400">
                    Belum ada acara yang dibuat oleh user.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  )
}

