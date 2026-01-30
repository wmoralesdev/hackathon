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

// Section theme configuration for 8 sections
const sectionThemes = {
  welcome: {
    color: "cyan",
    bgClass: "bg-cyan-500/5",
    borderClass: "border-cyan-500/30",
    textClass: "text-cyan-400",
    badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    xp: 25,
    badge: "WELCOME",
    badgeViewed: "BRIEFED",
    floaterMsg: "WELCOME_UNLOCKED",
  },
  challenge: {
    color: "violet",
    bgClass: "bg-violet-500/5",
    borderClass: "border-violet-500/30",
    textClass: "text-violet-400",
    badgeClass: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    xp: 25,
    badge: "CHALLENGE",
    badgeViewed: "MISSION_SET",
    floaterMsg: "CHALLENGE_ACCEPTED",
  },
  logistics: {
    color: "orange",
    bgClass: "bg-accent/5",
    borderClass: "border-accent/30",
    textClass: "text-accent",
    badgeClass: "bg-accent/10 text-accent border-accent/30",
    xp: 20,
    badge: "LOGISTICS",
    badgeViewed: "LOCATED",
    floaterMsg: "LOGISTICS_LOADED",
  },
  agenda: {
    color: "blue",
    bgClass: "bg-blue-500/5",
    borderClass: "border-blue-500/30",
    textClass: "text-blue-400",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    xp: 20,
    badge: "AGENDA",
    badgeViewed: "SYNCED",
    floaterMsg: "AGENDA_SYNCED",
  },
  deliverables: {
    color: "yellow",
    bgClass: "bg-yellow-500/5",
    borderClass: "border-yellow-500/30",
    textClass: "text-yellow-400",
    badgeClass: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    xp: 30,
    badge: "DELIVERABLES",
    badgeViewed: "CHECKLIST_READY",
    floaterMsg: "DELIVERABLES_REVEALED",
  },
  judges: {
    color: "green",
    bgClass: "bg-green-500/5",
    borderClass: "border-green-500/30",
    textClass: "text-green-400",
    badgeClass: "bg-green-500/10 text-green-400 border-green-500/30",
    xp: 25,
    badge: "PANEL",
    badgeViewed: "EVALUATORS_READY",
    floaterMsg: "PANEL_REVEALED",
  },
  finale: {
    color: "rose",
    bgClass: "bg-rose-500/5",
    borderClass: "border-rose-500/30",
    textClass: "text-rose-400",
    badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    xp: 15,
    badge: "READY",
    badgeViewed: "LOCKED_AND_LOADED",
    floaterMsg: "READY_TO_BUILD",
  },
} as const

type SectionId = keyof typeof sectionThemes

interface Judge {
  name: string
  title: string
  bio: string
  image: string
  x: string
  linkedin: string
}

// Icons
function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

// Navigation Dots
function NavDots({ 
  sections, 
  currentSection, 
  onNavigate 
}: { 
  sections: { id: string; title: string }[]
  currentSection: number
  onNavigate: (index: number) => void 
}) {
  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3" aria-label="Section navigation">
      {["hero", ...sections.map(s => s.id)].map((id, i) => (
        <button
          key={id}
          type="button"
          onClick={() => onNavigate(i)}
          className={cn(
            "size-2.5 rounded-full transition-all duration-300",
            currentSection === i 
              ? "bg-accent scale-150" 
              : "bg-white/20 hover:bg-white/40"
          )}
          aria-label={`Go to section ${i + 1}`}
          aria-current={currentSection === i ? "true" : undefined}
        />
      ))}
    </nav>
  )
}

// HERO SECTION
function HeroSection({ 
  dict, 
  viewedCount, 
  totalSections,
  onScrollHint 
}: { 
  dict: Dictionary
  viewedCount: number
  totalSections: number
  onScrollHint: () => void
}) {
  const { completeAction } = useXp()
  const { spawnFloater } = useXpFloater()
  const progressPercent = (viewedCount / totalSections) * 100
  const allViewed = viewedCount === totalSections

  const handleClick = (e: React.MouseEvent) => {
    const completed = completeAction("event_header_viewed", { xp: 15 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, "+15xp // BRIEFING_STARTED", "text-cyan-400")
    }
  }

  return (
    <section className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,78,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,78,0,0.03)_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Decorative text */}
      <div className="absolute top-20 left-8 hidden lg:block opacity-15 font-mono text-xs text-accent tracking-widest" style={{ writingMode: 'vertical-rl' }}>
        {"CLASSIFIED // MISSION_BRIEFING"}
      </div>
      <div className="absolute bottom-20 right-8 hidden lg:block opacity-15 font-mono text-xs text-accent tracking-widest" style={{ writingMode: 'vertical-rl' }}>
        {"ACCESS_LEVEL: PARTICIPANT"}
      </div>

      <button 
        type="button"
        onClick={handleClick}
        className="relative text-center group bg-transparent border-none cursor-pointer max-w-2xl"
      >
        {/* Corner brackets */}
        <div className="absolute -top-8 -left-8 w-12 h-12 border-t-2 border-l-2 border-accent/30 group-hover:border-accent transition-colors hidden sm:block" />
        <div className="absolute -top-8 -right-8 w-12 h-12 border-t-2 border-r-2 border-accent/30 group-hover:border-accent transition-colors hidden sm:block" />
        <div className="absolute -bottom-8 -left-8 w-12 h-12 border-b-2 border-l-2 border-accent/30 group-hover:border-accent transition-colors hidden sm:block" />
        <div className="absolute -bottom-8 -right-8 w-12 h-12 border-b-2 border-r-2 border-accent/30 group-hover:border-accent transition-colors hidden sm:block" />

        {/* Status badge */}
        <div className="mb-8">
          <span className={cn(
            "text-[10px] font-mono px-4 py-1.5 rounded-full border",
            allViewed 
              ? "bg-green-500/10 text-green-400 border-green-500/30" 
              : "bg-accent/10 text-accent border-accent/30"
          )}>
            {allViewed ? (dict.event.ui?.complete || "MISSION_COMPLETE") : (dict.event.ui?.in_progress || "INTEL_GATHERING")}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-balance">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-orange-400 to-accent">
            {dict.event.ui?.title_part1 || "Mission"}
          </span>
          <br />
          <span className="text-foreground">{dict.event.ui?.title_part2 || "Briefing"}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-foreground/60 font-mono text-sm md:text-base mb-10 text-pretty">
          {">"} {dict.event.subtitle}
          <span className="inline-block w-2 h-5 bg-accent ml-1 animate-pulse align-middle" />
        </p>

        {/* Progress */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-64 h-2 bg-white/10 overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-700",
                allViewed 
                  ? "bg-linear-to-r from-green-500 to-cyan-500" 
                  : "bg-linear-to-r from-accent to-orange-400"
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-foreground/40">
              {viewedCount}/{totalSections} {dict.event.ui?.sections || "sections"}
            </span>
            <span className="text-foreground/20">|</span>
            <span className={allViewed ? "text-green-400" : "text-accent"}>
              {Math.round(progressPercent)}% {dict.event.ui?.unlocked || "unlocked"}
            </span>
          </div>
        </div>
      </button>

      {/* Scroll hint */}
      <button 
        type="button"
        onClick={onScrollHint}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30 hover:text-accent transition-colors"
        aria-label="Scroll to first section"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ChevronDownIcon className="animate-bounce" />
      </button>
    </section>
  )
}

// WELCOME SECTION - Split layout
function WelcomeSection({ 
  dict, 
  sectionRef 
}: { 
  dict: Dictionary
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const theme = sectionThemes.welcome
  const { actions } = useXp()
  const isViewed = actions.includes("event_section_welcome")

  return (
    <section 
      ref={sectionRef}
      data-section="welcome"
      className="min-h-dvh flex items-center relative overflow-hidden py-12"
    >
      {/* Background */}
      <div className={cn("absolute inset-0 transition-opacity", isViewed ? "opacity-100" : "opacity-0", theme.bgClass)} />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Left - Title area (2 cols) */}
          <div className="md:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className={cn("text-sm font-mono", isViewed ? theme.textClass : "text-foreground/40")}>01</span>
              <span className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border",
                isViewed ? theme.badgeClass : "bg-white/5 text-foreground/40 border-white/10"
              )}>
                {isViewed ? theme.badgeViewed : theme.badge}
              </span>
            </div>
            <h2 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-balance",
              isViewed && theme.textClass
            )}>
              {dict.event.sections.welcome.title}
            </h2>
            <p className="font-mono text-foreground/50 text-sm">
              {">"} {dict.event.sections.welcome.subtitle}
            </p>
          </div>

          {/* Right - Content card (3 cols) */}
          <div className="md:col-span-3">
            <Card level={2} className={cn(
              "relative p-6 md:p-8 transition-all",
              isViewed && theme.borderClass
            )}>
              {/* Decorative grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none rounded-lg" />
              
              <div className="relative">
                <p className="text-foreground/80 text-base md:text-lg leading-relaxed text-pretty mb-6">
                  {dict.event.sections.welcome.content}
                </p>
                
                {/* Stats row */}
                <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-3xl font-black text-cyan-400">{dict.event.sections.welcome.stats.builders}</div>
                    <div className="text-xs font-mono text-foreground/40">BUILDERS</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-cyan-400">{dict.event.sections.welcome.stats.teams}</div>
                    <div className="text-xs font-mono text-foreground/40">PER TEAM</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-cyan-400">∞</div>
                    <div className="text-xs font-mono text-foreground/40">POSSIBILITIES</div>
                  </div>
                </div>
              </div>
              
              {/* Large decorative number */}
              <div className={cn(
                "absolute -top-4 -right-4 text-[120px] font-black pointer-events-none select-none leading-none",
                isViewed ? "text-cyan-500/10" : "text-white/5"
              )}>
                01
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

// CHALLENGE SECTION - Terminal aesthetic
function ChallengeSection({ 
  dict, 
  sectionRef 
}: { 
  dict: Dictionary
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const theme = sectionThemes.challenge
  const { actions } = useXp()
  const isViewed = actions.includes("event_section_challenge")

  return (
    <section 
      ref={sectionRef}
      data-section="challenge"
      className="min-h-dvh flex items-center relative overflow-hidden py-12"
    >
      {/* Background */}
      <div className={cn("absolute inset-0 transition-opacity", isViewed ? "opacity-100" : "opacity-0", theme.bgClass)} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className={cn("text-sm font-mono", isViewed ? theme.textClass : "text-foreground/40")}>02</span>
              <span className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border",
                isViewed ? theme.badgeClass : "bg-white/5 text-foreground/40 border-white/10"
              )}>
                {isViewed ? theme.badgeViewed : theme.badge}
              </span>
            </div>
            <h2 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-2 text-balance",
              isViewed && theme.textClass
            )}>
              {dict.event.sections.challenge.title}
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-foreground/80 mb-4">
              SaaS — Software as a Service
            </p>
          </div>

          {/* Terminal-style content */}
          <Card level={2} className={cn(
            "p-6 md:p-8 font-mono text-sm transition-all",
            isViewed && theme.borderClass
          )}>
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
              <div className="size-3 rounded-full bg-red-500/60" />
              <div className="size-3 rounded-full bg-yellow-500/60" />
              <div className="size-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-foreground/40">mission_parameters.sh</span>
            </div>

            {/* Terminal content */}
            <div className="space-y-3 text-foreground/70">
              <p><span className="text-violet-400">$</span> cat challenge.txt</p>
              <p className="pl-4 text-foreground/60 text-pretty">
                {dict.event.sections.challenge.content}
              </p>
              <p className="mt-4"><span className="text-violet-400">$</span> cat rules.txt</p>
              <div className="pl-4 space-y-1">
                {dict.event.sections.challenge.rules.map((rule) => (
                  <p key={rule} className="text-green-400">
                    ✓ {rule}
                  </p>
                ))}
              </div>
              <p className="mt-4"><span className="text-violet-400">$</span> ls ./valid_projects/</p>
              <div className="pl-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                {dict.event.sections.challenge.examples.map((example) => (
                  <span key={example} className="text-green-400">
                    ✓ {example}
                  </span>
                ))}
                <span className="text-cyan-400">+ anything else</span>
              </div>
              <p className="mt-4"><span className="text-violet-400">$</span> echo $TIP</p>
              <p className="pl-4 text-foreground/50 italic">
                {">"} {dict.event.sections.challenge.tip}
              </p>
              <p className="mt-4">
                <span className="text-violet-400">$</span> 
                <span className="inline-block w-2 h-4 bg-violet-400 ml-1 animate-pulse align-middle" />
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Decorative */}
      <div className={cn(
        "absolute bottom-8 left-8 text-[150px] font-black pointer-events-none select-none leading-none",
        isViewed ? "text-violet-500/10" : "text-white/5"
      )}>
        02
      </div>
    </section>
  )
}

// LOGISTICS SECTION - Classroom cards
function LogisticsSection({ 
  dict, 
  sectionRef 
}: { 
  dict: Dictionary
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const theme = sectionThemes.logistics
  const { actions } = useXp()
  const isViewed = actions.includes("event_section_logistics")

  return (
    <section 
      ref={sectionRef}
      data-section="logistics"
      className="min-h-dvh flex items-center relative overflow-hidden py-12"
    >
      {/* Background */}
      <div className={cn("absolute inset-0 transition-opacity", isViewed ? "opacity-100" : "opacity-0", theme.bgClass)} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className={cn("text-sm font-mono", isViewed ? theme.textClass : "text-foreground/40")}>03</span>
              <span className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border",
                isViewed ? theme.badgeClass : "bg-white/5 text-foreground/40 border-white/10"
              )}>
                {isViewed ? theme.badgeViewed : theme.badge}
              </span>
            </div>
            <h2 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-balance",
              isViewed && theme.textClass
            )}>
              {dict.event.sections.logistics.title}
            </h2>
            <p className="font-mono text-foreground/50 text-sm">
              {">"} {dict.event.sections.logistics.subtitle}
            </p>
          </div>

          {/* Classrooms grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {dict.event.sections.logistics.classrooms.map((classroom) => (
              <Card key={classroom.id} level={2} className={cn(
                "p-6 text-center transition-all",
                isViewed && theme.borderClass
              )}>
                <div className="text-4xl font-black text-accent mb-2">{classroom.id}</div>
                <div className="text-sm font-mono text-foreground/60">{classroom.name}</div>
              </Card>
            ))}
          </div>

          {/* Timeline and info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card level={2} className="p-6">
              <h3 className="text-xl font-bold uppercase mb-4">Development Window</h3>
              <div className="space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Start:</span>
                  <span className="text-accent font-bold">{dict.event.sections.logistics.timeline.start}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">End:</span>
                  <span className="text-accent font-bold">{dict.event.sections.logistics.timeline.end}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Pitch:</span>
                  <span className="text-accent font-bold">{dict.event.sections.logistics.timeline.pitch_duration}</span>
                </div>
              </div>
            </Card>

            <Card level={2} className="p-6">
              <h3 className="text-xl font-bold uppercase mb-4">Support & Resources</h3>
              <p className="text-foreground/70 text-sm mb-4 text-pretty">
                {dict.event.sections.logistics.support}
              </p>
              <p className="text-foreground/60 text-xs font-mono">
                {dict.event.sections.logistics.swag}
              </p>
            </Card>
          </div>

          <p className="text-center text-foreground/50 text-sm mt-8 max-w-2xl mx-auto text-pretty">
            {dict.event.sections.logistics.content}
          </p>
        </div>
      </div>
      
      {/* Decorative */}
      <div className={cn(
        "absolute top-8 right-8 text-[150px] font-black pointer-events-none select-none leading-none",
        isViewed ? "text-accent/10" : "text-white/5"
      )}>
        03
      </div>
    </section>
  )
}

// AGENDA SECTION - Timeline
function AgendaSection({ 
  dict, 
  sectionRef 
}: { 
  dict: Dictionary
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const theme = sectionThemes.agenda
  const { actions } = useXp()
  const isViewed = actions.includes("event_section_agenda")

  return (
    <section 
      ref={sectionRef}
      data-section="agenda"
      className="min-h-dvh flex items-center relative overflow-hidden py-12"
    >
      {/* Background */}
      <div className={cn("absolute inset-0 transition-opacity", isViewed ? "opacity-100" : "opacity-0", theme.bgClass)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className={cn("text-sm font-mono", isViewed ? theme.textClass : "text-foreground/40")}>04</span>
              <span className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border",
                isViewed ? theme.badgeClass : "bg-white/5 text-foreground/40 border-white/10"
              )}>
                {isViewed ? theme.badgeViewed : theme.badge}
              </span>
            </div>
            <h2 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-balance",
              isViewed && theme.textClass
            )}>
              {dict.event.sections.agenda.title}
            </h2>
            <p className="font-mono text-foreground/50 text-sm">
              {">"} {dict.event.sections.agenda.subtitle}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className={cn("absolute left-2.5 top-0 bottom-0 w-px bg-linear-to-b from-transparent to-transparent", isViewed ? "via-blue-500/50" : "via-white/5")} />
            
            <div className="space-y-6">
              {dict.event.sections.agenda.items.map((item) => (
                <div key={`${item.time}-${item.title}`} className="relative pl-12">
                  {/* Connector node */}
                  <div className={cn(
                    "absolute left-0 top-1.5 size-5 bg-background border rounded-full flex items-center justify-center z-10",
                    isViewed ? theme.borderClass : "border-white/10"
                  )}>
                    <div className={cn("size-2 rounded-full", isViewed ? "bg-blue-500" : "bg-white/20")} />
                  </div>

                  <Card level={2} className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
                      <span className={cn("font-mono font-bold text-lg", isViewed ? theme.textClass : "text-foreground/40")}>
                        {item.time}
                      </span>
                      <h3 className="text-lg font-bold uppercase tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm font-mono text-foreground/50 border-t border-white/5 pt-2 mt-2">
                      {"//"} {item.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative */}
      <div className={cn(
        "absolute bottom-8 left-8 text-[150px] font-black pointer-events-none select-none leading-none",
        isViewed ? "text-blue-500/10" : "text-white/5"
      )}>
        04
      </div>
    </section>
  )
}

// DELIVERABLES SECTION - Checklist
function DeliverablesSection({ 
  dict, 
  sectionRef 
}: { 
  dict: Dictionary
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const theme = sectionThemes.deliverables
  const { actions } = useXp()
  const isViewed = actions.includes("event_section_deliverables")

  return (
    <section 
      ref={sectionRef}
      data-section="deliverables"
      className="min-h-dvh flex items-center relative overflow-hidden py-12"
    >
      {/* Background glow */}
      <div className={cn(
        "absolute inset-0 transition-opacity",
        isViewed ? "opacity-100" : "opacity-0",
        "bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.1)_0%,transparent_70%)]"
      )} />
      
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Trophy icon */}
          <div className={cn(
            "mb-8 inline-flex items-center justify-center size-24 rounded-2xl transition-all",
            isViewed ? "bg-yellow-500/20" : "bg-white/5"
          )}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn(isViewed ? "text-yellow-400" : "text-foreground/40")} aria-hidden="true">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
              <path d="M4 22h16"/>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
            </svg>
          </div>

          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className={cn("text-sm font-mono", isViewed ? theme.textClass : "text-foreground/40")}>05</span>
            <span className={cn(
              "text-[10px] font-mono px-2 py-0.5 rounded border",
              isViewed ? theme.badgeClass : "bg-white/5 text-foreground/40 border-white/10"
            )}>
              {isViewed ? theme.badgeViewed : theme.badge}
            </span>
          </div>

          <h2 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-balance",
            isViewed ? "text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-amber-500" : ""
          )}>
            {dict.event.sections.deliverables.title}
          </h2>
          
          <p className="font-mono text-foreground/50 text-sm mb-10">
            {">"} {dict.event.sections.deliverables.subtitle}
          </p>

          {/* Content card */}
          <Card level={3} className={cn(
            "p-8 max-w-xl mx-auto relative transition-all text-left",
            isViewed && "border-yellow-500/30"
          )}>
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/30" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/30" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/30" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/30" />
            
            <p className="text-foreground/70 leading-relaxed text-pretty mb-6">
              {dict.event.sections.deliverables.content}
            </p>
            
            {/* Checklist */}
            <div className="space-y-3 mb-6">
              {dict.event.sections.deliverables.items.map((item, i) => (
                <div key={`deliverable-${item.substring(0, 20)}-${i}`} className="flex items-start gap-3">
                  <div className="size-5 rounded border border-yellow-500/30 bg-yellow-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-yellow-400 text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-foreground/70 text-sm flex-1">{item}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-mono text-foreground/50 text-pretty">
                {dict.event.sections.deliverables.note}
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Decorative */}
      <div className={cn(
        "absolute top-8 left-8 text-[150px] font-black pointer-events-none select-none leading-none",
        isViewed ? "text-yellow-500/10" : "text-white/5"
      )}>
        05
      </div>
    </section>
  )
}

// Large Judge Card for grid
function LargeJudgeCard({ judge, index }: { judge: Judge; index: number }) {
  const hasImage = judge.image && judge.image.length > 0
  const hasSocial = judge.x || judge.linkedin
  const isPlaceholder = judge.name === "TBD" || judge.name === "Por confirmar"

  return (
    <div className={cn(
      "flex flex-col items-center p-6 rounded-2xl border transition-all text-center",
      isPlaceholder 
        ? "border-white/5 bg-white/2" 
        : "border-green-500/20 bg-green-500/5 hover:border-green-500/40"
    )}>
      {/* Avatar */}
      <div className={cn(
        "size-20 md:size-24 rounded-2xl mb-4 flex items-center justify-center overflow-hidden",
        isPlaceholder ? "bg-white/5" : "bg-green-500/20"
      )}>
        {hasImage ? (
          <img 
            src={judge.image} 
            alt={judge.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className={cn(
            "text-3xl font-bold",
            isPlaceholder ? "text-foreground/15" : "text-green-400"
          )}>
            {isPlaceholder ? "?" : judge.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-2">
        <span className={cn(
          "text-[10px] font-mono",
          isPlaceholder ? "text-foreground/20" : "text-green-400/60"
        )}>
          0{index + 1}
        </span>
        {isPlaceholder && (
          <span className="text-[9px] font-mono bg-white/5 text-foreground/30 px-1.5 py-0.5 rounded">
            PENDING
          </span>
        )}
      </div>

      {/* Name */}
      <h4 className={cn(
        "font-bold text-lg mb-1",
        isPlaceholder ? "text-foreground/30" : "text-foreground"
      )}>
        {judge.name}
      </h4>

      {/* Title */}
      <p className={cn(
        "text-xs font-mono mb-3",
        isPlaceholder ? "text-foreground/15" : "text-foreground/50"
      )}>
        {judge.title}
      </p>

      {/* Bio */}
      {!isPlaceholder && judge.bio && (
        <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
          {judge.bio}
        </p>
      )}

      {/* Social links */}
      {hasSocial && !isPlaceholder && (
        <div className="flex items-center gap-3 mt-auto">
          {judge.x && (
            <a
              href={judge.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-green-400 transition-colors"
              aria-label={`${judge.name} on X`}
            >
              <XIcon />
            </a>
          )}
          {judge.linkedin && (
            <a
              href={judge.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-green-400 transition-colors"
              aria-label={`${judge.name} on LinkedIn`}
            >
              <LinkedInIcon />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

// JUDGES SECTION - Prominent grid
function JudgesSection({ 
  dict, 
  sectionRef 
}: { 
  dict: Dictionary
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const theme = sectionThemes.judges
  const { actions } = useXp()
  const isViewed = actions.includes("event_section_judges")
  const judges = dict.event.sections.judges.list || []
  const confirmedCount = judges.filter((j: Judge) => j.name !== "TBD" && j.name !== "Por confirmar").length

  return (
    <section 
      ref={sectionRef}
      data-section="judges"
      className="min-h-dvh flex items-center relative overflow-hidden py-12"
    >
      {/* Background */}
      <div className={cn("absolute inset-0 transition-opacity", isViewed ? "opacity-100" : "opacity-0", theme.bgClass)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className={cn("text-sm font-mono", isViewed ? theme.textClass : "text-foreground/40")}>06</span>
              <span className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border",
                isViewed ? theme.badgeClass : "bg-white/5 text-foreground/40 border-white/10"
              )}>
                {isViewed ? theme.badgeViewed : theme.badge}
              </span>
              <span className={cn(
                "text-[10px] font-mono",
                confirmedCount > 0 ? "text-green-400" : "text-foreground/30"
              )}>
                {confirmedCount}/{judges.length} {dict.event.ui?.confirmed || "confirmed"}
              </span>
            </div>
            <h2 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-balance",
              isViewed && theme.textClass
            )}>
              {dict.event.sections.judges.title}
            </h2>
            <p className="font-mono text-foreground/50 text-sm max-w-xl mx-auto">
              {">"} {dict.event.sections.judges.subtitle}
            </p>
          </div>

          {/* Judges grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {judges.map((judge: Judge, idx: number) => (
              <LargeJudgeCard key={`judge-${judge.name}-${idx}`} judge={judge} index={idx} />
            ))}
          </div>

          {/* Description */}
          <p className="text-center text-foreground/50 text-sm max-w-2xl mx-auto text-pretty">
            {dict.event.sections.judges.content}
          </p>
        </div>
      </div>
      
      {/* Decorative */}
      <div className={cn(
        "absolute top-8 right-8 text-[150px] font-black pointer-events-none select-none leading-none",
        isViewed ? "text-green-500/10" : "text-white/5"
      )}>
        06
      </div>
    </section>
  )
}

// FINALE SECTION
function FinaleSection({ 
  dict, 
  sectionRef 
}: { 
  dict: Dictionary
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const theme = sectionThemes.finale
  const { actions } = useXp()
  const isViewed = actions.includes("event_section_finale")

  return (
    <section 
      ref={sectionRef}
      data-section="finale"
      className="min-h-dvh flex items-center relative overflow-hidden py-12"
    >
      {/* Background */}
      <div className={cn("absolute inset-0 transition-opacity", isViewed ? "opacity-100" : "opacity-0", theme.bgClass)} />
      
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Success icon */}
          <div className={cn(
            "mb-8 inline-flex items-center justify-center size-24 rounded-2xl transition-all",
            isViewed ? "bg-rose-500/20" : "bg-white/5"
          )}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(isViewed ? theme.textClass : "text-foreground/40")} aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>

          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className={cn("text-sm font-mono", isViewed ? theme.textClass : "text-foreground/40")}>07</span>
            <span className={cn(
              "text-[10px] font-mono px-2 py-0.5 rounded border",
              isViewed ? theme.badgeClass : "bg-white/5 text-foreground/40 border-white/10"
            )}>
              {isViewed ? theme.badgeViewed : theme.badge}
            </span>
          </div>

          <h2 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 text-balance",
            isViewed && theme.textClass
          )}>
            {dict.event.sections.finale.title}
          </h2>

          {/* Message card */}
          <Card level={3} className={cn(
            "p-8 relative transition-all",
            isViewed && theme.borderClass
          )}>
            <p className="text-foreground/80 text-lg leading-relaxed mb-6 text-pretty">
              {dict.event.sections.finale.message}
            </p>
            
            <div className="pt-6 border-t border-white/10">
              <p className={cn("text-2xl font-black uppercase tracking-tight", isViewed && theme.textClass)}>
                {dict.event.sections.finale.cta}
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Decorative */}
      <div className={cn(
        "absolute bottom-8 left-8 text-[150px] font-black pointer-events-none select-none leading-none",
        isViewed ? "text-rose-500/10" : "text-white/5"
      )}>
        07
      </div>
    </section>
  )
}

// Password Gate
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
    <div className="min-h-dvh flex items-center justify-center px-4 py-12">
      <Card level={3} className="max-w-md w-full text-center">
        <div className="mb-6">
          <LockIcon />
        </div>
        
        <h1 className="text-2xl font-bold uppercase tracking-tight mb-2 text-balance">
          {dict.event.password_title}
        </h1>
        <p className="text-foreground/60 font-mono text-sm mb-8 text-pretty">
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

// Main Event Content with scroll-snap
function EventContent({ dict }: { dict: Dictionary }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const welcomeRef = React.useRef<HTMLElement>(null)
  const challengeRef = React.useRef<HTMLElement>(null)
  const logisticsRef = React.useRef<HTMLElement>(null)
  const agendaRef = React.useRef<HTMLElement>(null)
  const deliverablesRef = React.useRef<HTMLElement>(null)
  const judgesRef = React.useRef<HTMLElement>(null)
  const finaleRef = React.useRef<HTMLElement>(null)
  
  const [currentSection, setCurrentSection] = React.useState(0)
  const { completeAction, actions, unlockBadge } = useXp()
  const { spawnFloater } = useXpFloater()

  const sectionRefs = [welcomeRef, challengeRef, logisticsRef, agendaRef, deliverablesRef, judgesRef, finaleRef]
  const sectionIds: SectionId[] = ["welcome", "challenge", "logistics", "agenda", "deliverables", "judges", "finale"]

  const sections = sectionIds.map(id => ({
    id,
    title: dict.event.sections[id].title,
  }))

  const viewedCount = sectionIds.filter(id => actions.includes(`event_section_${id}`)).length
  const allViewed = viewedCount === sectionIds.length

  // Intersection Observer for scroll-based XP
  React.useEffect(() => {
    const observers: IntersectionObserver[] = []
    const refs = [welcomeRef, challengeRef, logisticsRef, agendaRef, deliverablesRef, judgesRef, finaleRef]

    for (let index = 0; index < refs.length; index++) {
      const ref = refs[index]
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry?.isIntersecting) {
            setCurrentSection(index + 1) // +1 because hero is 0
            
            const sectionId = sectionIds[index]
            const theme = sectionThemes[sectionId]
            const completed = completeAction(`event_section_${sectionId}`, { xp: theme.xp })
            
            if (completed) {
              const rect = entry.boundingClientRect
              spawnFloater(
                rect.left + rect.width / 2,
                rect.top + 100,
                `+${theme.xp}xp // ${theme.floaterMsg}`,
                theme.textClass
              )
            }
          }
        },
        { threshold: 0.5 }
      )

      if (ref.current) {
        observer.observe(ref.current)
      }
      observers.push(observer)
    }

    // Hero section observer
    const heroObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCurrentSection(0)
        }
      },
      { threshold: 0.5 }
    )

    const heroSection = containerRef.current?.querySelector('section:first-child')
    if (heroSection) {
      heroObserver.observe(heroSection)
    }

    return () => {
      for (const obs of observers) {
        obs.disconnect()
      }
      heroObserver.disconnect()
    }
  }, [completeAction, spawnFloater])

  // Unlock badge when all viewed
  React.useEffect(() => {
    if (allViewed) {
      unlockBadge("INTEL_COMPLETE")
    }
  }, [allViewed, unlockBadge])

  const scrollToSection = (index: number) => {
    const container = containerRef.current
    if (!container) return

    if (index === 0) {
      container.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const ref = sectionRefs[index - 1]
      ref.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollHint = () => {
    welcomeRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-dvh bg-background text-foreground font-sans selection:bg-accent/30"
    >
      <NavDots 
        sections={sections} 
        currentSection={currentSection} 
        onNavigate={scrollToSection} 
      />

      <HeroSection 
        dict={dict} 
        viewedCount={viewedCount} 
        totalSections={sectionIds.length}
        onScrollHint={handleScrollHint}
      />

      <WelcomeSection dict={dict} sectionRef={welcomeRef} />
      <ChallengeSection dict={dict} sectionRef={challengeRef} />
      <LogisticsSection dict={dict} sectionRef={logisticsRef} />
      <AgendaSection dict={dict} sectionRef={agendaRef} />
      <DeliverablesSection dict={dict} sectionRef={deliverablesRef} />
      <JudgesSection dict={dict} sectionRef={judgesRef} />
      <FinaleSection dict={dict} sectionRef={finaleRef} />
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
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-foreground/40 font-mono text-sm animate-pulse">
          {`// ${dict.event.ui?.checking || "Checking access..."}`}
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return <PasswordGate dict={dict} onUnlock={() => setHasAccess(true)} />
  }

  return <EventContent dict={dict} />
}
