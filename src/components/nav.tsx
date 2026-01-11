import * as React from "react"
import Link from "next/link"
import { Button } from "@/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Dictionary } from "@/i18n/utils"

export function Nav({ dict }: { dict: Dictionary }) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sponsors/cursor.webp" alt="Cursor" className="h-7 w-auto object-contain" />
            <span>Hackathon</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button asChild variant="primary" size="sm">
            <Link href="#register">
              {dict.nav.register}
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
