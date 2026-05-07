'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createEvent(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const date = formData.get('date') as string
  const bride_name = formData.get('bride_name') as string
  const groom_name = formData.get('groom_name') as string
  const location_name = formData.get('location_name') as string
  const location_address = formData.get('location_address') as string

  const { error } = await supabase.from('events').insert({
    user_id: user.id,
    title,
    slug: slug.toLowerCase(),
    date,
    bride_name,
    groom_name,
    location_name,
    location_address,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
