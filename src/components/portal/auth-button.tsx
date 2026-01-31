"use client"

import { Button } from "@/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { Dictionary } from "@/i18n/utils"
import type { User } from "@supabase/supabase-js"

interface AuthButtonProps {
  dict: Dictionary
  variant?: "portal" | "nav"
  lang?: "en" | "es"
  className?: string
}

export function AuthButton({ dict, variant = "portal", lang, className }: AuthButtonProps) {
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

  const getLang = () => {
    if (lang) return lang
    if (typeof window !== "undefined") {
      return window.location.pathname.split("/")[1] || "en"
    }
    return "en"
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    const currentLang = getLang()
    router.push(`/${currentLang}/portal/auth`)
    router.refresh()
  }

  if (loading) {
    return null
  }

  if (user) {
    const currentLang = getLang()
    
    if (variant === "nav") {
      const buttonClassName = className?.includes("flex-col") ? "w-full" : undefined
      return (
        <div className={className}>
          <Button asChild variant="primary" size="sm" className={buttonClassName}>
            <Link href={`/${currentLang}/portal`}>
              {dict.nav.portal}
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} className={buttonClassName}>
            {dict.portal.auth.logout}
          </Button>
        </div>
      )
    }
    
    return (
      <Button variant="ghost" size="sm" onClick={handleLogout} className="text-foreground/70 hover:text-foreground">
        {dict.portal.auth.logout}
      </Button>
    )
  }

  const currentLang = getLang()
  
  return (
    <Button asChild variant="primary" size="sm">
      <Link href={`/${currentLang}/portal/auth`}>
        {dict.nav.login}
      </Link>
    </Button>
  )
}
