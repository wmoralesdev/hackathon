"use client"

import * as React from "react"
import type { Dictionary } from "@/i18n/utils"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"
import { Check, Clock, CalendarDays } from "lucide-react"
import { SectionTitle } from "./section-title"

export function Agenda({ dict }: { dict: Dictionary }) {
  const { completeAction, actions, unlockBadge } = useXp()
  const { spawnFloater } = useXpFloater()
  
  const items = (dict.event?.sections?.agenda?.items || []).map((item: { time: string; title: string; description: string }, index: number) => ({
    id: String(index + 1),
    time: item.time,
    title: item.title,
    description: item.description,
  }))

  const committedCount = items.filter(item => actions.includes(`agenda_commit_${item.id}`)).length

  React.useEffect(() => {
    if (committedCount === items.length) {
      unlockBadge("WARMUP_READY")
    }
  }, [committedCount, items.length, unlockBadge])

  const generateHash = React.useCallback(() => {
    return crypto.randomUUID().substring(0, 6)
  }, [])

  const handleCommit = React.useCallback((id: string, e: React.MouseEvent) => {
    const actionId = `agenda_commit_${id}`
    const completed = completeAction(actionId, { xp: 25 })
    
    if (completed) {
      const hash = generateHash()
      spawnFloater(e.clientX, e.clientY, `git commit ${hash} (+25xp)`, "text-green-400", "animate-float-up-slow")
    }
  }, [completeAction, spawnFloater, generateHash])

  return (
    <section id="mission-timeline" className="container mx-auto px-4 py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent -z-10 hidden md:block" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 relative z-10">
          <div className="mb-4">
            <SectionTitle href="#mission-timeline">
              <span className="text-accent">{dict.agenda.timeline_title_part1}</span> {dict.agenda.timeline_title_part2}
            </SectionTitle>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
             <CalendarDays className="w-4 h-4 text-accent" />
             <p className="text-lg text-foreground/80 font-mono">
               {dict.hero.date}
             </p>
          </div>

          <div className="flex justify-center items-center gap-4 text-xs font-mono text-foreground/40">
            <div>
              {committedCount} / {items.length} {dict.agenda.commits_synced}
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="text-orange-400/80">
              &gt; {dict.agenda.schedule_note}
            </div>
          </div>
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
                    isCommitted 
                      ? "bg-green-500 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                      : "bg-background border-white/20 group-hover:border-accent group-hover:scale-125"
                  )} />

                  {/* Content Card */}
                  <div 
                    role="button"
                    tabIndex={0}
                    onClick={(e) => handleCommit(item.id, e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleCommit(item.id, e as unknown as React.MouseEvent)
                      }
                    }}
                    className={cn(
                      "relative w-full md:w-auto p-5 border transition-all duration-300 cursor-pointer",
                      "bg-background/50 backdrop-blur-sm hover:bg-white/5",
                      isCommitted 
                        ? "border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.05)]" 
                        : "border-white/5 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(245,78,0,0.05)]",
                      // Arrow indicator for desktop
                      "md:before:absolute md:before:left-1/2 md:before:-translate-x-1/2 md:before:border-8 md:before:border-transparent",
                      isEven 
                        ? "md:before:bottom-full md:before:border-b-white/5 md:hover:before:border-b-accent/30" 
                        : "md:before:top-full md:before:border-t-white/5 md:hover:before:border-t-accent/30"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className={cn("w-3 h-3", isCommitted ? "text-green-400" : "text-accent")} />
                        <span className={cn(
                          "font-mono font-bold text-sm",
                          isCommitted ? "text-green-400" : "text-foreground"
                        )}>
                          {item.time}
                        </span>
                      </div>
                      {isCommitted && <Check className="w-3 h-3 text-green-400" />}
                    </div>

                    <h3 className={cn(
                      "font-bold uppercase tracking-tight mb-2 transition-colors",
                      isCommitted ? "text-green-100" : "text-foreground group-hover:text-accent"
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
    </section>
  )
}
