"use client"

import { Button } from "@/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import type { Dictionary } from "@/i18n/utils"
import type { User } from "@supabase/supabase-js"

interface AuthButtonProps {
  dict: Dictionary
}

export function AuthButton({ dict }: AuthButtonProps) {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    const lang = window.location.pathname.split("/")[1] || "en"
    router.push(`/${lang}/portal/auth`)
    router.refresh()
  }

  if (loading) {
    return null
  }

  if (user) {
    return (
      <Button variant="ghost" size="sm" onClick={handleLogout}>
        {dict.portal?.auth?.logout || "Sign Out"}
      </Button>
    )
  }

  const lang = typeof window !== "undefined" ? window.location.pathname.split("/")[1] || "en" : "en"
  
  return (
    <Button asChild variant="primary" size="sm">
      <a href={`/${lang}/portal/auth`}>
        {dict.portal?.auth?.login_title || "Login"}
      </a>
    </Button>
  )
}
