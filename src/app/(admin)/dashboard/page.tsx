import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Eye, ShoppingCart, CheckCircle2, Zap } from 'lucide-react'

const TEMPLATES = [
  {
    id: 'rustic',
    name: 'Rustic Bloom',
    description: 'Sentuhan alam yang hangat dengan palet warna kayu dan bunga-bunga cantik.',
    price: 'Rp 149.000',
    image: '/templates/rustic.png',
    category: 'Terpopuler',
    features: ['Music Background', 'RSVP & Guest Book', 'Gallery Photo']
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Desain bersih dan elegan yang fokus pada keindahan tipografi dan ruang.',
    price: 'Rp 199.000',
    image: '/templates/modern.png',
    category: 'Eksklusif',
    features: ['Interactive Maps', 'Countdown Timer', 'Gift Registry']
  },
  {
    id: 'royal',
    name: 'Royal Gold',
    description: 'Nuansa mewah kerajaan dengan aksen emas dan pola hias yang megah.',
    price: 'Rp 299.000',
    image: '/templates/royal.png',
    category: 'Premium',
    features: ['Custom Music', 'VIP Guest Access', 'Video Background']
  }
]

export default function TemplateCatalogPage() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container relative mx-auto px-6 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full">
            Katalog Template 2024
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold md:text-6xl tracking-tight">
            Pilih Desain <span className="text-primary italic">Impian</span> Anda
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Temukan berbagai pilihan tema undangan digital yang mewah, elegan, dan profesional untuk momen sekali seumur hidup Anda.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <div className="container mx-auto px-6 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          {[
            { label: 'Template Ready', val: '50+', icon: Zap },
            { label: 'Kepuasan', val: '99%', icon: Star },
            { label: 'User Aktif', val: '10k+', icon: CheckCircle2 },
            { label: 'Support', val: '24/7', icon: Clock }
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-2 p-2 bg-primary/10 rounded-lg">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{s.val}</span>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <section className="container mx-auto px-6 mt-20">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Koleksi Desain Terkini</h2>
            <p className="text-slate-600">Setiap desain dikerjakan dengan teliti untuk memberikan kesan mewah dan eksklusif bagi para tamu undangan Anda.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full">Semua</Button>
            <Button variant="ghost" className="rounded-full">Modern</Button>
            <Button variant="ghost" className="rounded-full">Traditional</Button>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((tpl) => (
            <Card key={tpl.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={tpl.image} 
                  alt={tpl.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <Button asChild className="w-full rounded-full bg-white text-black hover:bg-slate-100 shadow-lg cursor-pointer">
                    <Link href={`/preview/${tpl.id}`}>
                      <Eye className="mr-2 h-4 w-4" /> Quick Preview
                    </Link>
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 border-none px-4 py-1 font-semibold rounded-full shadow-sm">
                  {tpl.category}
                </Badge>
              </div>
              <CardHeader className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/preview/${tpl.id}`}>
                    <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight hover:text-primary transition-colors cursor-pointer">{tpl.name}</CardTitle>
                  </Link>
                  <span className="text-primary font-bold text-lg">{tpl.price}</span>
                </div>
                <CardDescription className="text-slate-600 leading-relaxed">
                  {tpl.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tpl.features.map((f, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pb-8">
                <Button className="w-full rounded-full h-12 text-md font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Pesan Sekarang
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 mt-32">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Siap Membuat Undangan Anda Sendiri?</h2>
          <p className="text-primary-foreground/80 mb-10 text-lg max-w-2xl mx-auto relative z-10">
            Bergabunglah dengan ribuan pasangan yang telah mempercayakan momen bahagianya bersama kami.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 rounded-full px-10 h-14 text-lg font-bold">
              Mulai Gratis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-10 h-14 text-lg font-bold">
              Hubungi Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
