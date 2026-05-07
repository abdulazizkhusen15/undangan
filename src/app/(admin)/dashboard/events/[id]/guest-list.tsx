'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Copy, Trash2, ExternalLink, UserPlus } from 'lucide-react'
import { deleteGuest, addGuest } from '../../actions'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

interface Guest {
  id: string
  name: string
  whatsapp_number: string | null
  rsvp_status: string
}

interface GuestListProps {
  eventId: string
  eventSlug: string
  initialGuests: Guest[]
}

export function GuestList({ eventId, eventSlug, initialGuests }: GuestListProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Hadir</Badge>
      case 'declined':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Menolak</Badge>
      default:
        return <Badge variant="secondary" className="bg-slate-100 text-slate-700">Pending</Badge>
    }
  }

  const copyInviteLink = (guestName: string) => {
    const baseUrl = window.location.origin
    const inviteUrl = `${baseUrl}/invite/${eventSlug}?to=${encodeURIComponent(guestName)}`
    navigator.clipboard.writeText(inviteUrl)
    toast.success(`Link undangan untuk ${guestName} disalin!`)
  }

  const handleDelete = async (guestId: string) => {
    if (!confirm('Hapus tamu ini?')) return
    
    setLoading(guestId)
    const result = await deleteGuest(guestId, eventId)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Tamu berhasil dihapus')
    }
    setLoading(null)
  }

  const handleAddGuest = async (formData: FormData) => {
    const result = await addGuest(formData)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Tamu berhasil ditambahkan')
      setIsAddOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Daftar Tamu</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Tambah Tamu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form action={handleAddGuest}>
              <DialogHeader>
                <DialogTitle>Tambah Tamu Baru</DialogTitle>
                <DialogDescription>
                  Masukkan nama tamu untuk membuat link undangan unik.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <input type="hidden" name="event_id" value={eventId} />
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Tamu</Label>
                  <Input id="name" name="name" placeholder="Contoh: Budi Santoso" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="whatsapp_number">WhatsApp (Opsional)</Label>
                  <Input id="whatsapp_number" name="whatsapp_number" placeholder="628123456789" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Simpan Tamu</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Status RSVP</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialGuests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Belum ada tamu.
                </TableCell>
              </TableRow>
            ) : (
              initialGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell className="font-medium">{guest.name}</TableCell>
                  <TableCell>{guest.whatsapp_number || '-'}</TableCell>
                  <TableCell>{getStatusBadge(guest.rsvp_status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyInviteLink(guest.name)}
                        title="Salin Link Undangan"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(guest.id)}
                        disabled={loading === guest.id}
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
