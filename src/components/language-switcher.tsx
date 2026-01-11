"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/ui/button"

export function LanguageSwitcher() {
  const pathname = usePathname()
  
  // If we are on a path like /en/foo, switch to /es/foo
  // If we are on /en, switch to /es
  const segments = pathname.split("/")
  // segments[0] is empty, segments[1] is lang
  const currentLang = segments[1]
  
  const targetLang = currentLang === "en" ? "es" : "en"
  const label = targetLang === "en" ? "EN" : "ES"
  
  const newSegments = [...segments]
  newSegments[1] = targetLang
  const targetPath = newSegments.join("/") || `/${targetLang}`

  return (
    <Button variant="ghost" size="sm" className="font-mono text-xs" asChild>
      <Link href={targetPath}>
        {label}
      </Link>
    </Button>
  )
}
