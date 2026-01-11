"use client"

import * as React from "react"
import { Dictionary } from "@/i18n/utils"
import { Button } from "@/ui/button"
import { Badge } from "@/ui/badge"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

export function Hero({ dict }: { dict: Dictionary }) {
  const { unlockBadge, addXp, badges } = useXp()
  const { spawnFloater } = useXpFloater()
  const [isFixed, setIsFixed] = React.useState(false)

  const handleFixGlitch = (e: React.MouseEvent) => {
    if (isFixed) return
    
    setIsFixed(true)
    unlockBadge("DEBUGGER")
    addXp(150)
    spawnFloater(e.clientX, e.clientY, "// BUG_FIXED +150xp", "text-green-400")
  }

  // Pre-check if already unlocked to keep state persistent during session
  React.useEffect(() => {
    if (badges.includes("DEBUGGER")) {
      setIsFixed(true)
    }
  }, [badges])

  return (
    <section id="hero" className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 pt-20 pb-12 text-center overflow-hidden">
      {/* Dynamic Grid Background - Replaces static gradient */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(245,78,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,78,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] animate-[pulse-slow_8s_ease-in-out_infinite]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 hidden md:block opacity-20 font-mono text-xs vertical-rl text-accent/50 tracking-[0.5em] animate-pulse">
        SYSTEM_READY // 0101
      </div>
      <div className="absolute bottom-1/4 right-10 hidden md:block opacity-20 font-mono text-xs vertical-rl text-accent/50 tracking-[0.5em] animate-pulse delay-700">
        INIT_SEQUENCE // START
      </div>

      <Badge variant="secondary" className="mb-4 animate-in fade-in zoom-in duration-500 border-accent/20 bg-accent/5 text-accent/80">
        <span className="animate-pulse mr-2">●</span> {dict.hero.date} <span className="mx-2 text-white/20">|</span> {dict.hero.time}
      </Badge>
      
      <p className="text-sm font-mono text-foreground/50 mb-6 animate-in fade-in duration-500 delay-100">
        {dict.hero.location}
      </p>

      <p className="text-xs font-mono text-foreground/40 mb-8 animate-in fade-in duration-500 delay-150">
        {dict.hero.time_note}
      </p>
      
      <div className="relative mb-6 group cursor-help" onClick={handleFixGlitch}>
         <h1 className={cn(
           "max-w-5xl text-6xl font-black tracking-tighter sm:text-8xl md:text-9xl uppercase leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 selection:bg-accent selection:text-black",
           !isFixed && "cyber-glitch-text"
         )}>
          {dict.hero.title} <br/>
          <span className={cn(
            "relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-500 to-accent bg-300% animate-gradient",
            isFixed && "text-accent filter-none"
          )}>
            {dict.hero.subtitle}
            <span className="absolute -inset-1 blur-2xl bg-accent/20 -z-10"></span>
          </span>
        </h1>
        {/* Decorative corner lines on title */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-accent/20 hidden sm:block transition-all group-hover:border-accent" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-accent/20 hidden sm:block transition-all group-hover:border-accent" />
        
        {!isFixed && (
          <div className="absolute -right-16 top-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse">
            <span className="text-xs font-mono text-red-500 bg-red-500/10 px-2 py-1 border border-red-500/50 rounded">
              ⚠ // CLICK TO DEBUG
            </span>
          </div>
        )}
      </div>

      <p className="max-w-xl text-lg text-foreground/60 font-mono mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        &gt; {dict.hero.xp_teaser}
        <span className="inline-block w-2 h-4 bg-accent ml-2 animate-pulse align-middle" />
      </p>
      
      <div className="flex flex-col gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <Button size="lg" className="h-14 px-10 text-lg relative overflow-visible" asChild>
          <a href="#register">
            {dict.hero.cta}
          </a>
        </Button>
        <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-accent/30 hover:bg-accent/10" asChild>
          <a 
            href="https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj" 
            target="_blank" 
            rel="noreferrer"
          >
            {dict.hero.cta_whatsapp}
          </a>
        </Button>
      </div>

      {/* Scrolling Text Background */}
      <div className="absolute bottom-0 w-full overflow-hidden whitespace-nowrap opacity-5 font-mono text-[10rem] font-bold text-transparent stroke-text select-none pointer-events-none -z-20">
        BUILD SHIP DEPLOY BUILD SHIP DEPLOY
      </div>
    </section>
  )
}
