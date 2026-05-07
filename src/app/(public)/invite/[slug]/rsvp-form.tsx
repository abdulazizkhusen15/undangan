'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { submitRsvp } from './actions'

interface RsvpFormProps {
  eventId: string
  guestName: string
}

export function RsvpForm({ eventId, guestName }: RsvpFormProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      const result = await submitRsvp(formData)
      if (result.success) {
        toast.success('Terima kasih! Konfirmasi Anda telah terkirim.')
        setSubmitted(true)
      }
    } catch (error) {
      toast.error('Gagal mengirim konfirmasi. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="p-8 bg-green-50 border border-green-100 rounded-xl text-center space-y-2">
        <h5 className="font-bold text-green-800">Terkirim!</h5>
        <p className="text-sm text-green-700">Konfirmasi dan ucapan Anda telah kami terima.</p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="mt-4">
          Kirim Ucapan Lain
        </Button>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="event_id" value={eventId} />
      
      <div className="space-y-2">
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input id="name" name="name" defaultValue={guestName} placeholder="Masukkan nama Anda" required />
      </div>

      <div className="space-y-2">
        <Label>Konfirmasi Kehadiran</Label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="rsvp_status" value="confirmed" defaultChecked className="w-4 h-4 text-primary" />
            <span className="text-sm">Hadir</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="rsvp_status" value="declined" className="w-4 h-4 text-primary" />
            <span className="text-sm">Tidak Hadir</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Ucapan & Doa</Label>
        <Textarea id="message" name="message" placeholder="Tuliskan ucapan selamat & doa untuk mempelai..." className="min-h-[100px]" required />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Mengirim...' : 'Kirim Konfirmasi'}
      </Button>
    </form>
  )
}
