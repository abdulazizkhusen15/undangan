'use client'

import { Card, CardContent } from '@/components/ui/card'

interface Greeting {
  id: string
  guest_name: string
  message: string
  created_at: string
}

interface GreetingsListProps {
  greetings: Greeting[]
}

export function GreetingsList({ greetings }: GreetingsListProps) {
  if (greetings.length === 0) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center border rounded-xl bg-slate-50 text-muted-foreground italic p-8 text-center">
        Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
      </div>
    )
  }

  return (
    <div className="h-[400px] overflow-y-auto pr-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
      {greetings.map((greeting) => (
        <Card key={greeting.id} className="border-none shadow-sm bg-white">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="font-bold text-sm">{greeting.guest_name}</h5>
              <span className="text-[10px] text-muted-foreground">
                {new Date(greeting.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short'
                })}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed italic">
              "{greeting.message}"
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
