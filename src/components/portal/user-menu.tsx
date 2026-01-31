"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { Dictionary } from "@/i18n/utils"
import type { User } from "@supabase/supabase-js"

interface UserMenuProps {
  dict: Dictionary
  lang: "en" | "es"
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  )
}

export function UserMenu({ dict, lang }: UserMenuProps) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Build language paths
  const segments = pathname.split("/")
  const enSegments = [...segments]
  enSegments[1] = "en"
  const enPath = enSegments.join("/") || "/en"
  
  const esSegments = [...segments]
  esSegments[1] = "es"
  const esPath = esSegments.join("/") || "/es"

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsOpen(false)
    router.push(`/${lang}/portal/auth`)
    router.refresh()
  }

  if (loading) {
    return null
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative" ref={menuRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="gap-1 font-mono text-xs"
          >
            <GlobeIcon className="h-4 w-4" />
            <span>{lang.toUpperCase()}</span>
            <ChevronDownIcon className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </Button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-24 border border-white/10 bg-card shadow-lg z-50">
              <div className="p-1 flex flex-col gap-0.5">
                <Link
                  href={enPath}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-1.5 text-xs font-mono transition-colors hover:bg-white/5 ${lang === "en" ? "text-accent" : "text-foreground/70"}`}
                >
                  English
                </Link>
                <Link
                  href={esPath}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-1.5 text-xs font-mono transition-colors hover:bg-white/5 ${lang === "es" ? "text-accent" : "text-foreground/70"}`}
                >
                  Español
                </Link>
              </div>
            </div>
          )}
        </div>
        <Button asChild variant="primary" size="sm">
          <Link href={`/${lang}/portal/auth`}>
            {dict.nav.login}
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="primary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <UserIcon className="h-4 w-4" />
        <span className="hidden sm:inline">{user.email?.split("@")[0] || "User"}</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 border border-white/10 bg-card shadow-lg z-50 [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
          <div className="p-2 flex flex-col gap-1">
            <div className="px-3 py-2 text-xs font-mono text-foreground/60 border-b border-white/5">
              {user.email}
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="justify-start w-full"
              onClick={() => setIsOpen(false)}
            >
              <Link href={`/${lang}/portal`}>
                {dict.nav.portal}
              </Link>
            </Button>
            {/* Language Switcher */}
            <div className="px-3 py-2 border-t border-white/5 mt-1">
              <div className="flex items-center gap-2 text-xs font-mono text-foreground/60 mb-2">
                <GlobeIcon className="h-3 w-3" />
                {dict.nav.language || "Language"}
              </div>
              <div className="flex gap-1">
                <Link
                  href={enPath}
                  onClick={() => setIsOpen(false)}
                  className={`px-2 py-1 text-xs font-mono transition-colors hover:text-accent ${lang === "en" ? "text-accent" : "text-foreground/70"}`}
                >
                  EN
                </Link>
                <span className="text-foreground/30">|</span>
                <Link
                  href={esPath}
                  onClick={() => setIsOpen(false)}
                  className={`px-2 py-1 text-xs font-mono transition-colors hover:text-accent ${lang === "es" ? "text-accent" : "text-foreground/70"}`}
                >
                  ES
                </Link>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={handleLogout}
            >
              {dict.portal.auth.logout}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
