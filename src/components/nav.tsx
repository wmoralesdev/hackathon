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
            <div className="size-6 bg-foreground text-background flex items-center justify-center rounded-sm">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M21.79 13.91 12 22 2.21 13.91 12 6.09l9.79 7.82ZM12 0 2.21 7.82 12 15.64l9.79-7.82L12 0Z" />
              </svg>
            </div>
            <span>Cursor Hackathon</span>
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
