"use client"

import * as React from "react"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import type { Dictionary } from "@/i18n/utils"
import { cn } from "@/lib/utils"
import { getMentors, type Mentor } from "@/lib/people/mentors"
import { getJuryMembers, type JuryMember } from "@/lib/people/jury"
import { Badge } from "@/ui/badge"
import { Check, Clock, CalendarDays, Rocket, AlertCircle, Lightbulb, Target } from "lucide-react"

// Section theme configuration for 9 sections
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
  mentors: {
    color: "purple",
    bgClass: "bg-purple-500/5",
    borderClass: "border-purple-500/30",
    textClass: "text-purple-400",
    badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    xp: 20,
    badge: "SUPPORT",
    badgeViewed: "MENTORS_READY",
    floaterMsg: "SUPPORT_AVAILABLE",
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
  credits: {
    color: "amber",
    bgClass: "bg-amber-500/5",
    borderClass: "border-amber-500/30",
    textClass: "text-amber-400",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    xp: 15,
    badge: "CREDITS",
    badgeViewed: "CREDITS_READY",
    floaterMsg: "CREDITS_UNLOCKED",
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

// CHALLENGE SECTION - Using theme data from landing site
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
        <div className="max-w-6xl mx-auto">
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
              "text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-balance",
              isViewed && theme.textClass
            )}>
              {dict.theme?.title || dict.event.sections.challenge.title}
            </h2>
            <p className="font-mono text-foreground/50 text-sm">
              {">"} {dict.theme?.subtitle || "El Tema de la Hackatón"}
            </p>
          </div>

          <Card level={2} className={cn(
            "p-6 md:p-10 transition-all relative",
            isViewed && theme.borderClass
          )}>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Column: Main Content */}
              <div className="flex-1">
                {/* Icon & Description */}
                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-8">
                  <div className={cn(
                    "p-4 md:p-5 bg-white/5 transition-all shrink-0",
                    isViewed ? "text-violet-400" : "text-foreground/60"
                  )}>
                    <Rocket className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div>
                    <p className="text-foreground/70 font-mono text-sm md:text-base leading-relaxed text-pretty">
                      {dict.theme?.description || dict.event.sections.challenge.content}
                    </p>
                  </div>
                </div>

                {/* Examples Grid */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-4 h-4 text-violet-400" />
                    <p className="text-xs font-mono text-violet-400/80 uppercase tracking-wider">
                      {dict.theme?.examples_title || "¿Qué podrías construir?"}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {(dict.theme?.examples || dict.event.sections.challenge.examples || []).map((example) => (
                      <div
                        key={example}
                        className="px-4 py-3 md:px-5 md:py-4 border border-white/5 bg-white/5 font-mono text-xs text-foreground/70 transition-colors hover:border-white/10 hover:bg-white/10 flex items-start gap-2 md:gap-3"
                      >
                        <span className="text-violet-400 shrink-0 mt-0.5">&gt;</span>
                        <span className="leading-relaxed">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evaluation Criteria */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-violet-400" />
                    <p className="text-xs font-mono text-violet-400/80 uppercase tracking-wider">
                      {dict.theme?.evaluation_title || "Qué Evaluarán los Jurados"}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {(dict.theme?.evaluation_criteria || []).map((criterion) => (
                      <div
                        key={criterion.category}
                        className="px-4 py-3 md:px-5 md:py-4 border border-white/5 bg-white/5 transition-colors hover:border-white/10 hover:bg-white/10"
                      >
                        <div className="mb-2">
                          <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
                            {criterion.category}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-foreground/70 leading-relaxed">
                          {criterion.question}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Important Rule */}
              <div className="lg:w-80 shrink-0 mt-4 lg:mt-0">
                <div className={cn(
                  "h-full border p-6 relative overflow-hidden flex flex-col justify-center transition-colors",
                  isViewed ? "border-violet-500/40 bg-violet-500/5" : "border-white/10 bg-white/5 hover:border-violet-500/30"
                )}>
                  <div className="absolute -top-6 -right-6 p-3 opacity-[0.07] rotate-12 transition-transform hover:rotate-0 duration-500">
                    <AlertCircle className="w-40 h-40 text-violet-500" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-violet-500/10 text-violet-400">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-bold text-violet-400 uppercase tracking-tight">
                        {dict.theme?.rule_title || "Regla Importante"}
                      </p>
                    </div>
                    <p className="text-sm font-mono text-foreground/80 leading-relaxed">
                      {dict.theme?.rule_text || "Todos los proyectos deben comenzar desde cero el 31 de enero. No se permite código pre-existente ni proyectos ya iniciados."}
                    </p>
                  </div>
                </div>
              </div>
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
              <h3 className="text-xl font-bold uppercase mb-4">
                {dict.event.sections.logistics.comfort?.development_window || "Development Window"}
              </h3>
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
              <h3 className="text-xl font-bold uppercase mb-4">
                {dict.event.sections.logistics.comfort?.support_resources || "Support & Resources"}
              </h3>
              <p className="text-foreground/70 text-sm mb-4 text-pretty">
                {dict.event.sections.logistics.support}
              </p>
              <p className="text-foreground/60 text-xs font-mono">
                {dict.event.sections.logistics.swag}
              </p>
            </Card>
          </div>

          {/* Food & Comfort - Prominent Section */}
          <Card level={2} className={cn("p-8 md:p-10 mt-8 transition-all relative overflow-hidden", isViewed && theme.borderClass)}>
            {/* Background accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-accent via-orange-400 to-accent" />
            
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-2 bg-accent" />
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  {dict.event.sections.logistics.comfort?.title || "Comfort & Food"}
                </h3>
              </div>
              <p className="text-sm font-mono text-foreground/50 ml-5">
                {">"} {dict.event.sections.logistics.comfort?.subtitle || "We've got you covered"}
              </p>
            </div>

            {/* Food Items Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Coffee */}
              <div className="bg-accent/10 border border-accent/20 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                      <line x1="6" x2="6" y1="1" y2="4"/>
                      <line x1="10" x2="10" y1="1" y2="4"/>
                      <line x1="14" x2="14" y1="1" y2="4"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold uppercase">{dict.event.sections.logistics.comfort?.coffee_label || "Coffee"}</h4>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {dict.event.sections.logistics.comfort?.coffee}
                </p>
              </div>

              {/* Food */}
              <div className="bg-accent/10 border border-accent/20 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                      <path d="M7 2v20"/>
                      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3v0Z"/>
                      <path d="M21 15v7"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold uppercase">{dict.event.sections.logistics.comfort?.meals_label || "Meals"}</h4>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {dict.event.sections.logistics.comfort?.food}
                </p>
              </div>

              {/* Water */}
              <div className="bg-accent/10 border border-accent/20 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
                      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
                      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold uppercase">{dict.event.sections.logistics.comfort?.water_label || "Water"}</h4>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {dict.event.sections.logistics.comfort?.water}
                </p>
              </div>
            </div>

            {/* WiFi Section */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-start gap-4">
                <div className="size-12 bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
                    <path d="M12 20h.01"/>
                    <path d="M8.5 12.859a5 5 0 0 1 7 0"/>
                    <path d="M5 8.859a10 10 0 0 1 5.5-2.239"/>
                    <path d="M19 8.859a10 10 0 0 0-2.007-1.523"/>
                    <path d="M2 15.859a15 15 0 0 1 4.764-4.648"/>
                    <path d="M22 15.859a15 15 0 0 0-3.064-3.99"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold uppercase mb-2">
                    {dict.event.sections.logistics.comfort?.wifi_title || "Wi‑Fi"}
                  </h4>
                  <p className="text-sm text-foreground/70 mb-2">
                    <span className="font-mono font-bold text-accent">{dict.event.sections.logistics.comfort?.wifi?.network}</span>
                  </p>
                  <p className="text-xs text-foreground/60 font-mono leading-relaxed">
                    {dict.event.sections.logistics.comfort?.wifi?.note}
                  </p>
                </div>
              </div>
            </div>
          </Card>

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

// MENTORS SECTION
function MentorsSection({ 
  dict, 
  sectionRef 
}: { 
  dict: Dictionary
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const theme = sectionThemes.mentors
  const { actions } = useXp()
  const isViewed = actions.includes("event_section_mentors")
  const mentors = getMentors(dict)

  return (
    <section 
      ref={sectionRef}
      data-section="mentors"
      className="min-h-dvh flex items-center relative overflow-hidden py-12"
    >
      {/* Background */}
      <div className={cn("absolute inset-0 transition-opacity", isViewed ? "opacity-100" : "opacity-0", theme.bgClass)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
              {dict.event.sections.mentors?.title || "Mentores"}
            </h2>
            <p className="font-mono text-foreground/50 text-sm">
              {">"} {dict.event.sections.mentors?.subtitle || "Disponibles para ayudarte"}
            </p>
          </div>

          {/* How to ask */}
          <Card level={2} className={cn(
            "p-6 mb-8 text-center transition-all",
            isViewed && theme.borderClass
          )}>
            <p className="text-foreground/80 text-sm md:text-base leading-relaxed text-pretty">
              {dict.event.sections.mentors?.how_to_ask || dict.event.sections.mentors?.content}
            </p>
          </Card>

          {/* Mentors grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor.id || mentor.name}
                className="group relative overflow-hidden bg-black/20 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black/50">
                  {mentor.image ? (
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <span className="text-4xl font-black text-white/20">
                        {mentor.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 pb-6">
                    {/* Badges */}
                    {mentor.mentorTypes && mentor.mentorTypes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {mentor.mentorTypes.map((type) => (
                          <Badge 
                            key={type} 
                            variant="outline" 
                            className="text-[10px] h-5 px-2 bg-black/70 backdrop-blur-sm border-white/30 text-white group-hover:border-purple-500/50 group-hover:text-purple-400 transition-colors"
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <h4 className="font-bold uppercase text-xl leading-tight mb-2 text-white group-hover:text-purple-400 transition-colors">
                      {mentor.name}
                    </h4>
                    
                    <p className="font-mono text-sm text-white/80 leading-relaxed">
                      {mentor.title}
                    </p>
                  </div>
                </div>
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-purple-500 transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-purple-500 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-purple-500 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-purple-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative */}
      <div className={cn(
        "absolute bottom-8 left-8 text-[150px] font-black pointer-events-none select-none leading-none",
        isViewed ? "text-purple-500/10" : "text-white/5"
      )}>
        04
      </div>
    </section>
  )
}

// AGENDA SECTION - Horizontal Timeline (matching landing site)
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

  const items = (dict.event?.sections?.agenda?.items || []).map((item: { time: string; title: string; description: string }, index: number) => ({
    id: String(index + 1),
    time: item.time,
    title: item.title,
    description: item.description,
  }))

  return (
    <section 
      ref={sectionRef}
      data-section="agenda"
      className="min-h-dvh flex items-center relative overflow-hidden py-12"
    >
      {/* Background */}
      <div className={cn("absolute inset-0 transition-opacity", isViewed ? "opacity-100" : "opacity-0", theme.bgClass)} />
      
      <div className="container mx-auto px-4 py-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent -z-10 hidden md:block" />
        
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 relative z-10">
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
              isViewed && theme.textClass
            )}>
              {dict.event.sections.agenda.title}
            </h2>
            
            <div className="inline-flex items-center gap-2 px-4 py-1 border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
              <CalendarDays className="w-4 h-4 text-accent" />
              <p className="text-lg text-foreground/80 font-mono">
                {dict.hero?.date || "Sábado 31 de enero de 2026"}
              </p>
            </div>

            <p className="font-mono text-foreground/50 text-sm">
              {">"} {dict.event.sections.agenda.subtitle}
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative overflow-x-auto pb-12 -mx-4 px-4 md:overflow-visible md:pb-0">
            <div className="flex flex-col md:flex-row md:justify-between relative min-w-[300px] md:min-w-0">
              {items.map((item, index) => {
                const isCommitted = actions.includes(`agenda_commit_${item.id}`)
                const isEven = index % 2 === 0
                
                return (
                  <div 
                    key={item.id} 
                    className={cn(
                      "group relative flex md:flex-col items-start md:items-center gap-6 md:gap-0 md:flex-1 min-w-[280px] md:min-w-0 p-4 md:p-0 border-l border-white/10 md:border-l-0",
                      // Desktop alternating layout
                      "md:first:items-start md:last:items-end",
                      isEven ? "md:pt-12" : "md:pb-12 md:-mt-12"
                    )}
                  >
                    {/* Connector Dot (Desktop) */}
                    <div className={cn(
                      "hidden md:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 border-2 transition-all duration-500 z-10",
                      isEven ? "top-0 -translate-y-1.5" : "bottom-0 translate-y-1.5",
                      isCommitted || isViewed
                        ? "bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                        : "bg-background border-white/20 group-hover:border-blue-400 group-hover:scale-125"
                    )} />

                    {/* Content Card */}
                    <div 
                      className={cn(
                        "relative w-full md:w-auto p-5 border transition-all duration-300",
                        "bg-background/50 backdrop-blur-sm hover:bg-white/5",
                        isCommitted || isViewed
                          ? "border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.05)]" 
                          : "border-white/5 hover:border-blue-400/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)]",
                        // Arrow indicator for desktop
                        "md:before:absolute md:before:left-1/2 md:before:-translate-x-1/2 md:before:border-8 md:before:border-transparent",
                        isEven 
                          ? "md:before:bottom-full md:before:border-b-white/5 md:hover:before:border-b-blue-400/30" 
                          : "md:before:top-full md:before:border-t-white/5 md:hover:before:border-t-blue-400/30"
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className={cn("w-3 h-3", isCommitted || isViewed ? "text-blue-400" : "text-accent")} />
                          <span className={cn(
                            "font-mono font-bold text-sm",
                            isCommitted || isViewed ? "text-blue-400" : "text-foreground"
                          )}>
                            {item.time}
                          </span>
                        </div>
                        {(isCommitted || isViewed) && <Check className="w-3 h-3 text-blue-400" />}
                      </div>

                      <h3 className={cn(
                        "font-bold uppercase tracking-tight mb-2 transition-colors",
                        isCommitted || isViewed ? "text-blue-100" : "text-foreground group-hover:text-blue-400"
                      )}>
                        {item.title}
                      </h3>

                      <p className="text-xs font-mono text-foreground/50 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative */}
      <div className={cn(
        "absolute bottom-8 left-8 text-[150px] font-black pointer-events-none select-none leading-none",
        isViewed ? "text-blue-500/10" : "text-white/5"
      )}>
        05
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
            <span className={cn("text-sm font-mono", isViewed ? theme.textClass : "text-foreground/40")}>06</span>
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
        06
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
      "flex flex-col items-center p-8 border transition-all text-center h-full",
      isPlaceholder 
        ? "border-white/5 bg-white/2" 
        : "border-green-500/20 bg-green-500/5 hover:border-green-500/40"
    )}>
      {/* Avatar */}
      <div className={cn(
        "size-28 md:size-32 mb-6 flex items-center justify-center overflow-hidden",
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
            "text-5xl font-bold",
            isPlaceholder ? "text-foreground/15" : "text-green-400"
          )}>
            {isPlaceholder ? "?" : judge.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-3">
        <span className={cn(
          "text-xs font-mono",
          isPlaceholder ? "text-foreground/20" : "text-green-400/60"
        )}>
          0{index + 1}
        </span>
        {isPlaceholder && (
          <span className="text-[10px] font-mono bg-white/5 text-foreground/30 px-2 py-1">
            PENDING
          </span>
        )}
      </div>

      {/* Name */}
      <h4 className={cn(
        "font-bold text-xl md:text-2xl mb-2 leading-tight",
        isPlaceholder ? "text-foreground/30" : "text-foreground"
      )}>
        {judge.name}
      </h4>

      {/* Title */}
      <p className={cn(
        "text-sm font-mono mb-6 leading-relaxed",
        isPlaceholder ? "text-foreground/15" : "text-foreground/50"
      )}>
        {judge.title}
      </p>

      {/* Social links */}
      {hasSocial && !isPlaceholder && (
        <div className="flex items-center gap-4 mt-auto pt-2">
          {judge.x && (
            <a
              href={judge.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-green-400 transition-colors"
              aria-label={`${judge.name} on X`}
            >
              <XIcon className="size-6" />
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
              <LinkedInIcon className="size-6" />
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
  const juryMembers = getJuryMembers(dict)

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
              <span className={cn("text-sm font-mono", isViewed ? theme.textClass : "text-foreground/40")}>07</span>
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
              {dict.event.sections.judges.title}
            </h2>
            <p className="font-mono text-foreground/50 text-sm max-w-xl mx-auto">
              {">"} {dict.event.sections.judges.subtitle}
            </p>
          </div>

          {/* Room Assignments */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card level={2} className={cn("p-6 transition-all", isViewed && theme.borderClass)}>
              <div className="text-2xl font-black text-green-400 mb-3">D34</div>
              <p className="text-sm text-foreground/70 font-mono">
                {dict.event.sections.judges.room_assignments?.d34}
              </p>
            </Card>
            <Card level={2} className={cn("p-6 transition-all", isViewed && theme.borderClass)}>
              <div className="text-2xl font-black text-green-400 mb-3">D35</div>
              <p className="text-sm text-foreground/70 font-mono">
                {dict.event.sections.judges.room_assignments?.d35}
              </p>
            </Card>
            <Card level={2} className={cn("p-6 transition-all", isViewed && theme.borderClass)}>
              <div className="text-2xl font-black text-green-400 mb-3">D37</div>
              <p className="text-sm text-foreground/70 font-mono">
                {dict.event.sections.judges.room_assignments?.d37}
              </p>
            </Card>
          </div>

          {/* Process Info - Expanded and Prominent */}
          <Card level={2} className={cn("p-8 md:p-10 mb-8 transition-all relative overflow-hidden", isViewed && theme.borderClass)}>
            {/* Background accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-500 via-green-400 to-green-500" />
            
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-2 bg-green-400" />
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  {dict.event.sections.judges.process?.title || "Proceso de Evaluación"}
                </h3>
              </div>
              <p className="text-sm font-mono text-foreground/50 ml-5">
                {">"} {dict.event.sections.judges.process?.subtitle || "Cómo se seleccionan los ganadores"}
              </p>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-6 mb-8">
              {/* Step 1 */}
              <div className="relative pl-8 border-l-2 border-green-500/30">
                <div className="absolute -left-[9px] top-0 size-4 bg-green-500 border-2 border-background" />
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="min-w-[120px]">
                    <div className="text-lg font-black text-green-400 font-mono">{dict.event.sections.judges.process?.step1?.time}</div>
                    <div className="text-xs font-mono text-foreground/40 uppercase">Code Freeze</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold uppercase mb-2">{dict.event.sections.judges.process?.step1?.title}</h4>
                    <p className="text-sm text-foreground/70 leading-relaxed">{dict.event.sections.judges.process?.step1?.description}</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative pl-8 border-l-2 border-green-500/30">
                <div className="absolute -left-[9px] top-0 size-4 bg-green-500 border-2 border-background" />
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="min-w-[120px]">
                    <div className="text-lg font-black text-green-400 font-mono">{dict.event.sections.judges.process?.step2?.time}</div>
                    <div className="text-xs font-mono text-foreground/40 uppercase">Presentaciones</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold uppercase mb-2">{dict.event.sections.judges.process?.step2?.title}</h4>
                    <p className="text-sm text-foreground/70 leading-relaxed">{dict.event.sections.judges.process?.step2?.description}</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative pl-8 border-l-2 border-green-500/30">
                <div className="absolute -left-[9px] top-0 size-4 bg-green-500 border-2 border-background" />
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="min-w-[120px]">
                    <div className="text-lg font-black text-green-400 font-mono">{dict.event.sections.judges.process?.step3?.time}</div>
                    <div className="text-xs font-mono text-foreground/40 uppercase">Selección</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold uppercase mb-2">{dict.event.sections.judges.process?.step3?.title}</h4>
                    <p className="text-sm text-foreground/70 leading-relaxed mb-3">{dict.event.sections.judges.process?.step3?.description}</p>
                    <div className="bg-green-500/10 border border-green-500/20 p-3 inline-block">
                      <p className="text-xs font-mono text-green-300 font-bold">
                        ✓ {dict.event.sections.judges.process?.finalists_note}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative pl-8 border-l-2 border-green-500/50">
                <div className="absolute -left-[9px] top-0 size-5 bg-green-400 border-2 border-background" />
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="min-w-[120px]">
                    <div className="text-lg font-black text-green-400 font-mono">{dict.event.sections.judges.process?.step4?.time}</div>
                    <div className="text-xs font-mono text-foreground/40 uppercase">Final</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold uppercase mb-2">{dict.event.sections.judges.process?.step4?.title}</h4>
                    <p className="text-sm text-foreground/70 leading-relaxed">{dict.event.sections.judges.process?.step4?.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Evaluation Criteria */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                <span className="size-1.5 bg-green-400" />
                {dict.event.sections.judges.process?.criteria?.title}
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-bold mt-0.5">•</span>
                  <span className="text-sm text-foreground/70">{dict.event.sections.judges.process?.criteria?.innovation}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-bold mt-0.5">•</span>
                  <span className="text-sm text-foreground/70">{dict.event.sections.judges.process?.criteria?.presentation}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-bold mt-0.5">•</span>
                  <span className="text-sm text-foreground/70">{dict.event.sections.judges.process?.criteria?.cursor}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-bold mt-0.5">•</span>
                  <span className="text-sm text-foreground/70">{dict.event.sections.judges.process?.criteria?.execution}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-bold mt-0.5">•</span>
                  <span className="text-sm text-foreground/70">{dict.event.sections.judges.process?.criteria?.value}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Judges grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {juryMembers
              .filter((member) => !member.isSurpriseGuest)
              .map((member, idx) => (
                <LargeJudgeCard 
                  key={`judge-${member.id}-${idx}`} 
                  judge={{
                    name: member.name,
                    title: member.title,
                    bio: "",
                    image: member.image || "",
                    x: member.x || "",
                    linkedin: member.linkedin || "",
                  }} 
                  index={idx} 
                />
              ))}
          </div>

          {/* Prizes */}
          <Card level={2} className={cn("p-8 transition-all relative overflow-hidden", isViewed && theme.borderClass)}>
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-3">
              <span className="text-green-400">$$$</span>
              {dict.prizes.title}
            </h3>

            <div className="grid gap-6">
              {/* Podium Prizes - 2nd, 1st, 3rd */}
              <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-4 mb-4">
                {/* 2nd Place - Left, Medium Height */}
                <div className="w-full md:flex-1 md:max-w-[200px] bg-white/5 border border-white/10 p-6 text-center relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col md:h-[200px] h-auto min-h-[180px]">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-xs font-mono text-white/60 mb-2 uppercase tracking-widest">2nd Place</div>
                  <div className="text-2xl font-bold text-white/90 mb-2">{dict.event.sections.judges.prizes?.second}</div>
                  <div className="text-[10px] text-white/40 font-mono mt-auto">Runner Up</div>
                </div>

                {/* 1st Place - Center, Tallest */}
                <div className="w-full md:flex-1 md:max-w-[240px] bg-green-500/10 border border-green-500/20 p-8 text-center relative overflow-hidden group hover:border-green-500/40 transition-colors flex flex-col md:h-[280px] h-auto min-h-[240px]">
                  <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-xs font-mono text-green-400 mb-2 uppercase tracking-widest">1st Place</div>
                  <div className="text-4xl font-black text-white mb-2">{dict.event.sections.judges.prizes?.first}</div>
                  <div className="text-[10px] text-white/40 font-mono mt-auto">Grand Prize</div>
                </div>

                {/* 3rd Place - Right, Shortest */}
                <div className="w-full md:flex-1 md:max-w-[200px] bg-white/5 border border-white/10 p-6 text-center relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col md:h-[160px] h-auto min-h-[140px]">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-xs font-mono text-white/60 mb-2 uppercase tracking-widest">3rd Place</div>
                  <div className="text-2xl font-bold text-white/90 mb-2">{dict.event.sections.judges.prizes?.third}</div>
                  <div className="text-[10px] text-white/40 font-mono mt-auto">Runner Up</div>
                </div>
              </div>

              {/* Tracks & Credits */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 flex flex-col justify-center">
                  <div className="text-xs font-mono text-white/40 mb-2 uppercase">Special Tracks</div>
                  <p className="text-sm font-medium text-white/80">
                    {dict.event.sections.judges.prizes?.tracks}
                  </p>
                </div>

                <div className="bg-linear-to-br from-green-500/20 to-green-600/20 border border-green-500/30 p-4 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400" aria-hidden="true"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <div className="text-xs font-mono text-green-300 mb-2 uppercase flex items-center gap-2">
                    <span className="size-1.5 bg-green-400 animate-pulse" />
                    Bonus for Everyone
                  </div>
                  <p className="text-sm font-bold text-white">
                    {dict.event.sections.judges.prizes?.credits}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Description */}
          <p className="text-center text-foreground/50 text-sm mt-8 max-w-2xl mx-auto text-pretty">
            {dict.event.sections.judges.content}
          </p>
        </div>
      </div>
      
      {/* Decorative */}
      <div className={cn(
        "absolute top-8 right-8 text-[150px] font-black pointer-events-none select-none leading-none",
        isViewed ? "text-green-500/10" : "text-white/5"
      )}>
        07
      </div>
    </section>
  )
}

// CREDITS SECTION
function CreditsSection({ 
  dict, 
  sectionRef 
}: { 
  dict: Dictionary
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const theme = sectionThemes.credits
  const { actions } = useXp()
  const isViewed = actions.includes("event_section_credits")

  return (
    <section 
      ref={sectionRef}
      data-section="credits"
      className="min-h-dvh flex items-center relative overflow-hidden py-12"
    >
      {/* Background */}
      <div className={cn("absolute inset-0 transition-opacity", isViewed ? "opacity-100" : "opacity-0", theme.bgClass)} />
      
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* QR Icon */}
          <div className={cn(
            "mb-8 inline-flex items-center justify-center size-24 rounded-2xl transition-all",
            isViewed ? "bg-amber-500/20" : "bg-white/5"
          )}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn(isViewed ? theme.textClass : "text-foreground/40")} aria-hidden="true">
              <rect width="5" height="5" x="3" y="3" rx="1"/>
              <rect width="5" height="5" x="16" y="3" rx="1"/>
              <rect width="5" height="5" x="3" y="16" rx="1"/>
              <path d="M21 16h-3"/>
              <path d="M21 21h-3"/>
              <path d="M12 7v3"/>
              <path d="M7 7h3"/>
              <path d="M7 12h3"/>
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
            "text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-balance",
            isViewed && theme.textClass
          )}>
            {dict.event.sections.credits?.title || "Créditos de Cursor"}
          </h2>
          
          <p className="font-mono text-foreground/50 text-sm mb-10">
            {">"} {dict.event.sections.credits?.subtitle || "Redención por QR"}
          </p>

          {/* Content card */}
          <Card level={3} className={cn(
            "p-8 relative transition-all text-left",
            isViewed && "border-amber-500/30"
          )}>
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-500/30" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-500/30" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-500/30" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-500/30" />
            
            <p className="text-foreground/70 leading-relaxed text-pretty mb-8">
              {dict.event.sections.credits?.content}
            </p>
            
            {/* Instructions */}
            <div className="space-y-6 mb-6 text-left">
              {/* Step 1 */}
              <div>
                <h4 className="text-amber-400 font-bold uppercase mb-2 text-sm">
                  {dict.event.sections.credits?.instructions?.step1?.title}
                </h4>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {dict.event.sections.credits?.instructions?.step1?.text}
                </p>
              </div>

              {/* Step 2 */}
              <div>
                <h4 className="text-amber-400 font-bold uppercase mb-2 text-sm">
                  {dict.event.sections.credits?.instructions?.step2?.title}
                </h4>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {dict.event.sections.credits?.instructions?.step2?.text}
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <h4 className="text-amber-400 font-bold uppercase mb-2 text-sm">
                  {dict.event.sections.credits?.instructions?.step3?.title}
                </h4>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {dict.event.sections.credits?.instructions?.step3?.text}
                </p>
              </div>

              {/* Step 4 */}
              <div>
                <h4 className="text-amber-400 font-bold uppercase mb-2 text-sm">
                  {dict.event.sections.credits?.instructions?.step4?.title}
                </h4>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {dict.event.sections.credits?.instructions?.step4?.text}
                </p>
              </div>

              {/* Step 5 */}
              <div>
                <h4 className="text-amber-400 font-bold uppercase mb-2 text-sm">
                  {dict.event.sections.credits?.instructions?.step5?.title}
                </h4>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {dict.event.sections.credits?.instructions?.step5?.text}
                </p>
              </div>
            </div>

            {/* Important Notes */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded">
                <p className="text-xs font-mono text-amber-400 font-bold mb-2">
                  {dict.event.sections.credits?.instructions?.important_notes?.label || "IMPORTANT"}:
                </p>
                <p className="text-xs text-foreground/70 leading-relaxed mb-2">
                  {dict.event.sections.credits?.instructions?.important_notes?.team_plan}
                </p>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  {dict.event.sections.credits?.instructions?.important_notes?.features}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Decorative */}
      <div className={cn(
        "absolute top-8 left-8 text-[150px] font-black pointer-events-none select-none leading-none",
        isViewed ? "text-amber-500/10" : "text-white/5"
      )}>
        08
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
            <span className={cn("text-sm font-mono", isViewed ? theme.textClass : "text-foreground/40")}>09</span>
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
        09
      </div>
    </section>
  )
}

// Main Event Content with scroll-snap
function EventContent({ dict }: { dict: Dictionary }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const welcomeRef = React.useRef<HTMLElement>(null)
  const challengeRef = React.useRef<HTMLElement>(null)
  const logisticsRef = React.useRef<HTMLElement>(null)
  const mentorsRef = React.useRef<HTMLElement>(null)
  const agendaRef = React.useRef<HTMLElement>(null)
  const deliverablesRef = React.useRef<HTMLElement>(null)
  const judgesRef = React.useRef<HTMLElement>(null)
  const creditsRef = React.useRef<HTMLElement>(null)
  const finaleRef = React.useRef<HTMLElement>(null)
  
  const [currentSection, setCurrentSection] = React.useState(0)
  const { completeAction, actions, unlockBadge } = useXp()
  const { spawnFloater } = useXpFloater()

  const sectionRefs = [welcomeRef, challengeRef, logisticsRef, mentorsRef, agendaRef, deliverablesRef, judgesRef, creditsRef, finaleRef]
  const sectionIds: SectionId[] = ["welcome", "challenge", "logistics", "mentors", "agenda", "deliverables", "judges", "credits", "finale"]

  const sections = sectionIds.map(id => ({
    id,
    title: dict.event.sections[id].title,
  }))

  const viewedCount = sectionIds.filter(id => actions.includes(`event_section_${id}`)).length
  const allViewed = viewedCount === sectionIds.length

  // Intersection Observer for scroll-based XP
  React.useEffect(() => {
    const observers: IntersectionObserver[] = []
    const refs = [welcomeRef, challengeRef, logisticsRef, mentorsRef, agendaRef, deliverablesRef, judgesRef, creditsRef, finaleRef]

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
      <MentorsSection dict={dict} sectionRef={mentorsRef} />
      <AgendaSection dict={dict} sectionRef={agendaRef} />
      <DeliverablesSection dict={dict} sectionRef={deliverablesRef} />
      <JudgesSection dict={dict} sectionRef={judgesRef} />
      <CreditsSection dict={dict} sectionRef={creditsRef} />
      <FinaleSection dict={dict} sectionRef={finaleRef} />
    </div>
  )
}

export function EventView({ dict }: { dict: Dictionary }) {
  return <EventContent dict={dict} />
}
