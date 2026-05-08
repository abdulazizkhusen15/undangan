import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LayoutDashboard, Users, Settings, Eye, Star, ExternalLink } from 'lucide-react'
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
    <div className="space-y-12 pb-20 p-6 md:p-12">
      {/* Header Admin */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 font-serif">Super Admin Control</h1>
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
        <div className="grid gap-8 md:grid-cols-3">
          {TEMPLATES.map((tpl) => (
            <Link href={`/super-admin/preview/${tpl.id}`} key={tpl.id} className="block group">
              <Card className="overflow-hidden border-none shadow-md group-hover:shadow-2xl transition-all duration-500 rounded-[2rem] bg-white relative">
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg">
                    <ExternalLink className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={tpl.image} alt={tpl.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <Badge className="mb-2 bg-white/20 backdrop-blur-md text-white border-none px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {tpl.category}
                    </Badge>
                    <h3 className="text-2xl font-bold font-serif leading-tight">{tpl.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-primary-foreground font-semibold">{tpl.price}</span>
                      <span className="text-xs font-medium opacity-80 flex items-center gap-1">
                        Klik untuk Preview <Eye className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
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
          <Badge variant="outline" className="bg-white px-4 py-1 text-slate-600 rounded-full border-slate-200">Total: {allEvents?.length || 0} Acara</Badge>
        </div>
        
        <div className="border border-slate-100 rounded-[2.5rem] bg-white shadow-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-6 px-8 text-slate-900 font-bold">Judul Acara</TableHead>
                <TableHead className="text-slate-900 font-bold">Email Pemilik</TableHead>
                <TableHead className="text-slate-900 font-bold">Slug (URL)</TableHead>
                <TableHead className="text-slate-900 font-bold">Tanggal Acara</TableHead>
                <TableHead className="text-right px-8 text-slate-900 font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allEvents && allEvents.length > 0 ? (
                allEvents.map((event: any, index: number) => (
                  <TableRow key={index} className="hover:bg-slate-50/30 transition-colors border-slate-50">
                    <TableCell className="py-5 px-8 font-semibold text-slate-900">{event.title}</TableCell>
                    <TableCell className="text-slate-600 font-medium">{event.profiles?.email || 'Guest Account'}</TableCell>
                    <TableCell className="font-mono text-xs text-primary font-bold">/{event.slug}</TableCell>
                    <TableCell className="text-slate-500 font-medium">
                      {new Date(event.date).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <Button variant="ghost" size="sm" className="rounded-full hover:bg-white hover:shadow-md h-10 w-10 p-0 text-slate-400 hover:text-primary transition-all">
                        <Eye className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center text-slate-400 italic">
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

