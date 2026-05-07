import { createClient } from '@/lib/supabase/server'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default async function SuperAdminPage() {
  const supabase = await createClient()
  
  // Mengambil data acara beserta email pemiliknya melalui relasi profil
  const { data: allEvents } = await supabase
    .from('events')
    .select('title, slug, date, profiles(email)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Super Admin Panel</h1>
      </div>
      
      <div className="border rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul Acara</TableHead>
              <TableHead>Email Pemilik</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allEvents && allEvents.length > 0 ? (
              allEvents.map((event: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.profiles?.email || 'N/A'}</TableCell>
                  <TableCell className="font-mono text-xs">/{event.slug}</TableCell>
                  <TableCell>{new Date(event.date).toLocaleDateString('id-ID')}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Belum ada acara yang dibuat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
