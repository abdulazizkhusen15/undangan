export default function InvitationPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-serif">Wedding Invitation</h1>
      <p className="mt-4">Slug: {params.slug}</p>
      <div className="mt-8 p-6 border rounded-lg shadow-sm">
        <p className="text-xl">Kepada Yth.</p>
        <p className="text-2xl font-bold mt-2">Nama Tamu</p>
      </div>
    </div>
  )
}
