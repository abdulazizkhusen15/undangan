'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createEvent } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ChevronLeft } from 'lucide-react'

export default function NewEventPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await createEvent(formData)
    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" asChild className="-ml-4">
        <Link href="/dashboard">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Kembali ke Dashboard
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Buat Undangan Baru</CardTitle>
          <CardDescription>
            Isi informasi dasar untuk mulai membuat halaman undangan Anda.
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informasi Utama</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Acara (Misal: Wedding of Budi & Ani)</Label>
                  <Input id="title" name="title" placeholder="Wedding of..." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug URL (misal: budi-ani)</Label>
                  <div className="flex items-center">
                    <span className="bg-slate-100 px-3 py-2 border border-r-0 rounded-l-md text-sm text-muted-foreground">
                      /invite/
                    </span>
                    <Input id="slug" name="slug" className="rounded-l-none" placeholder="budi-ani" required />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Detail Mempelai</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bride_name">Nama Mempelai Wanita</Label>
                  <Input id="bride_name" name="bride_name" placeholder="Nama Lengkap" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groom_name">Nama Mempelai Pria</Label>
                  <Input id="groom_name" name="groom_name" placeholder="Nama Lengkap" required />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Waktu & Lokasi</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Tanggal Acara</Label>
                  <Input id="date" name="date" type="datetime-local" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location_name">Nama Tempat (Misal: Gedung Serbaguna)</Label>
                  <Input id="location_name" name="location_name" placeholder="Nama Gedung/Tempat" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location_address">Alamat Lengkap</Label>
                  <Textarea id="location_address" name="location_address" placeholder="Jln. Melati No. 123..." required />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan & Lanjutkan'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
