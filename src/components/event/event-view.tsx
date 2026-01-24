"use client"

import * as React from "react"
import { Card } from "@/ui/card"
import { Button } from "@/ui/button"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import type { Dictionary } from "@/i18n/utils"
import { cn } from "@/lib/utils"

const EVENT_PASSWORD = "#buildinpublic"
const STORAGE_KEY = "cursor_hackathon_event_access"

interface SectionProps {
  id: string
  title: string
  subtitle: string
  content: string
  icon: React.ReactNode
  index: number
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function UnlockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
    </svg>
  )
}

function Section({ id, title, subtitle, content, icon, index }: SectionProps) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()
  
  const isViewed = actions.includes(`event_section_${id}`)
  
  const handleClick = (e: React.MouseEvent) => {
    const completed = completeAction(`event_section_${id}`, { xp: 20 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+20xp // SECTION_UNLOCKED`, "text-cyan-400")
    }
  }

  return (
    <Card
      level={2}
      interactive={!isViewed}
      onClick={handleClick}
      className={cn(
        "relative transition-all",
        isViewed && "border-cyan-500/30"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-lg shrink-0",
          isViewed ? "bg-cyan-500/20" : "bg-accent/20"
        )}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-foreground/40">0{index + 1}</span>
            {isViewed && (
              <span className="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                VIEWED
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tight mb-1">{title}</h3>
          <p className="text-sm font-mono text-foreground/50 mb-4">{subtitle}</p>
          <div className="border-t border-white/10 pt-4">
            <p className="text-foreground/60 text-sm leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
      
      {/* Decorative index */}
      <div className="absolute top-4 right-4 text-6xl font-black text-white/5">
        0{index + 1}
      </div>
    </Card>
  )
}

function PasswordGate({ dict, onUnlock }: { dict: Dictionary; onUnlock: () => void }) {
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState(false)
  const [shaking, setShaking] = React.useState(false)
  const { completeAction } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === EVENT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true")
      const completed = completeAction("event_access_granted", { xp: 50 })
      if (completed) {
        const rect = (e.target as HTMLElement).getBoundingClientRect()
        spawnFloater(rect.left + rect.width / 2, rect.top, "+50xp // ACCESS_GRANTED", "text-green-400")
      }
      onUnlock()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card level={3} className="max-w-md w-full text-center">
        <div className="mb-6">
          <LockIcon />
        </div>
        
        <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">
          {dict.event.password_title}
        </h1>
        <p className="text-foreground/60 font-mono text-sm mb-8">
          {dict.event.password_subtitle}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={cn(shaking && "animate-[shake_0.5s_ease-in-out]")}>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder={dict.event.password_placeholder}
              className={cn(
                "w-full px-4 py-3 bg-background/50 border rounded-lg font-mono text-sm",
                "focus:outline-none focus:border-accent transition-colors",
                error ? "border-red-500" : "border-white/10"
              )}
              autoFocus
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-xs font-mono">{dict.event.password_error}</p>
          )}
          
          <Button type="submit" variant="primary" className="w-full">
            {dict.event.password_button}
          </Button>
        </form>
        
        <p className="mt-6 text-foreground/30 text-xs font-mono">
          {dict.event.password_hint}
        </p>
      </Card>
    </div>
  )
}

function EventContent({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()
  
  const sections = [
    {
      id: "introduction",
      ...dict.event.sections.introduction,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" x2="8" y1="13" y2="13"/>
          <line x1="16" x2="8" y1="17" y2="17"/>
          <line x1="10" x2="8" y1="9" y2="9"/>
        </svg>
      ),
    },
    {
      id: "sponsors",
      ...dict.event.sections.sponsors,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
      ),
    },
    {
      id: "prizes",
      ...dict.event.sections.prizes,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M4 22h16"/>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
        </svg>
      ),
    },
    {
      id: "theme",
      ...dict.event.sections.theme,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          <path d="M19 3v4"/>
          <path d="M21 5h-4"/>
        </svg>
      ),
    },
    {
      id: "judges",
      ...dict.event.sections.judges,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
  ]

  const viewedCount = sections.filter(s => actions.includes(`event_section_${s.id}`)).length

  const handleHeaderClick = (e: React.MouseEvent) => {
    const completed = completeAction("event_header_viewed", { xp: 15 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, "+15xp // BRIEFING_STARTED", "text-cyan-400")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div 
          className="text-center mb-16 cursor-pointer"
          onClick={handleHeaderClick}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <UnlockIcon />
          </div>
          <div className="flex justify-center mb-4">
            <span className="text-xs font-mono bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/30">
              {dict.event.wip_badge}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            <span className="text-accent">Event</span> Specs
          </h1>
          <p className="text-foreground/60 font-mono text-sm max-w-lg mx-auto">
            {dict.event.subtitle}
          </p>
          <div className="mt-6 text-xs font-mono text-foreground/40">
            {viewedCount} / {sections.length} sections viewed
          </div>
        </div>

        {/* Sections Grid */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Section
              key={section.id}
              id={section.id}
              title={section.title}
              subtitle={section.subtitle}
              content={section.content}
              icon={section.icon}
              index={index}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-foreground/30 border-t border-white/5 pt-8">
            // This document is confidential and for internal use only
          </p>
        </div>
      </div>
    </div>
  )
}

export function EventView({ dict }: { dict: Dictionary }) {
  const [hasAccess, setHasAccess] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    setHasAccess(stored === "true")
  }, [])

  // Loading state
  if (hasAccess === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-foreground/40 font-mono text-sm animate-pulse">
          // Checking access...
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return <PasswordGate dict={dict} onUnlock={() => setHasAccess(true)} />
  }

  return <EventContent dict={dict} />
}
