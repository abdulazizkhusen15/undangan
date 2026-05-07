'use client'

import { useState } from 'react'
import { loginSuperAdmin } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function SuperAdminLoginPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await loginSuperAdmin(formData)
    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Super Admin Login</CardTitle>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input name="username" required />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input name="password" type="password" required />
            </div>
            <Button className="w-full" disabled={loading}>
              {loading ? 'Masuk...' : 'Masuk'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
