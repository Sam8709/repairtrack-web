// src/app/login/page.tsx
'use client' // This component runs in the browser

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase' // Note the clean import path: @/lib/...
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // If the user is logged in, redirect them to the dashboard
      if (session) {
        router.push('/dashboard')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '350px' }}>
        <h2 style={{ textAlign: 'center' }}>Sign In to RepairTrack</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
          view="magic_link"
          showLinks={true}
          redirectTo={`${location.origin}/auth/callback`}
        />
      </div>
    </div>
  )
}