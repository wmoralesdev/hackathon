"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/ui/button"
// TEMPORARY: Commented out for refactor - using inline EN/ES buttons instead
// import { LanguageSwitcher } from "@/components/language-switcher"
import type { Dictionary } from "@/i18n/utils"

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  )
}

export function Nav({ dict }: { dict: Dictionary }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // Get current language and build language paths
  const segments = pathname.split("/")
  const currentLang = segments[1] || "en"
  
  const enSegments = [...segments]
  enSegments[1] = "en"
  const enPath = enSegments.join("/") || "/en"
  
  const esSegments = [...segments]
  esSegments[1] = "es"
  const esPath = esSegments.join("/") || "/es"

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sponsors/cursor.webp" alt="Cursor" className="h-7 w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/es/equipos"
            className="text-sm font-mono text-foreground/70 hover:text-accent transition-colors"
          >
            {dict.nav.teams}
          </Link>
          {/* TEMPORARY: Replaced LanguageSwitcher with EN/ES buttons styled like register button */}
          {/* <LanguageSwitcher /> */}
          <div className="flex items-center gap-2">
            <Button 
              asChild 
              variant={currentLang === "en" ? "primary" : "ghost"} 
              size="sm"
              className="font-mono text-xs"
            >
              <Link href={enPath}>EN</Link>
            </Button>
            <Button 
              asChild 
              variant={currentLang === "es" ? "primary" : "ghost"} 
              size="sm"
              className="font-mono text-xs"
            >
              <Link href={esPath}>ES</Link>
            </Button>
          </div>
          {/* TEMPORARY: Register button hidden - uncomment to restore */}
          {/* <Button asChild variant="primary" size="sm">
            <Link href="#register">
              {dict.nav.register}
            </Link>
          </Button> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-foreground/70 hover:text-accent transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <HamburgerIcon open={mobileMenuOpen} />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <Link
            href="/es/equipos"
            className="text-sm font-mono text-foreground/70 hover:text-accent transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            {dict.nav.teams}
          </Link>
            {/* TEMPORARY: Replaced LanguageSwitcher with EN/ES buttons styled like register button */}
            {/* <div className="flex items-center justify-between py-2">
              <span className="text-sm font-mono text-foreground/50">
                {dict.nav.language || "Language"}
              </span>
              <LanguageSwitcher />
            </div> */}
            <div className="flex items-center gap-2">
              <Button 
                asChild 
                variant={currentLang === "en" ? "primary" : "ghost"} 
                size="sm"
                className="font-mono text-xs flex-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href={enPath}>EN</Link>
              </Button>
              <Button 
                asChild 
                variant={currentLang === "es" ? "primary" : "ghost"} 
                size="sm"
                className="font-mono text-xs flex-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href={esPath}>ES</Link>
              </Button>
            </div>
            {/* TEMPORARY: Register button hidden - uncomment to restore */}
            {/* <Button asChild variant="primary" size="sm" className="w-full">
              <Link href="#register" onClick={() => setMobileMenuOpen(false)}>
                {dict.nav.register}
              </Link>
            </Button> */}
          </div>
        </div>
      )}
    </nav>
  )
}
