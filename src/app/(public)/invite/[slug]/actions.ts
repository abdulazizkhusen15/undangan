'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function submitRsvp(formData: FormData) {
  const supabase = await createClient()
  const event_id = formData.get('event_id') as string
  const name = formData.get('name') as string
  const rsvp_status = formData.get('rsvp_status') as string

  // Update guest status if they exist in the guest list
  // or just record it in greetings if we want to be simple.
  // The schema has 'guests' and 'greetings'.
  // We should try to find the guest by name and event_id to update their status.
  
  const { data: guest } = await supabase
    .from('guests')
    .select('id')
    .eq('event_id', event_id)
    .eq('name', name)
    .single()

  if (guest) {
    await supabase
      .from('guests')
      .update({ rsvp_status })
      .eq('id', guest.id)
  }

  // Also add to greetings if message is provided
  const message = formData.get('message') as string
  if (message) {
    await supabase.from('greetings').insert({
      event_id,
      guest_name: name,
      message
    })
  }

  revalidatePath(`/invite/[slug]`, 'page')
  return { success: true }
}
