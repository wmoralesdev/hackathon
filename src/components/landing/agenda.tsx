"use client"

import * as React from "react"
import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

export function Agenda({ dict }: { dict: Dictionary }) {
  const { completeAction, actions, unlockBadge } = useXp()
  const { spawnFloater } = useXpFloater()
  
  const items = [
    { id: "1", time: "10:00 AM", title: dict.agenda.reception, description: "Check-in & Gear Up" },
    { id: "2", time: "10:30 AM", title: dict.agenda.welcome, description: "Mission Briefing" },
    { id: "3", time: "11:00 AM", title: dict.agenda.keynotes, description: "System Calibration" },
    { id: "4", time: "11:30 AM", title: dict.agenda.lunch, description: "Refuel & Team Up" },
    { id: "5", time: "12:30 PM", title: dict.agenda.start, description: "Hacking Begins" },
    { id: "6", time: "03:00 PM", title: dict.agenda.checkin, description: "Status Report" },
    { id: "7", time: "04:00 PM", title: dict.agenda.demos, description: "Mission Debrief" },
    { id: "8", time: "04:30 PM", title: dict.agenda.deliberation, description: "Jury Session" },
    { id: "9", time: "05:00 PM", title: dict.agenda.awards, description: "Achievements Unlocked" },
  ]

  const committedCount = items.filter(item => actions.includes(`agenda_commit_${item.id}`)).length

  React.useEffect(() => {
    if (committedCount === items.length) {
      unlockBadge("WARMUP_READY") // Reusing badge for "All Commits"
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
    <section id="agenda" className="container mx-auto px-4 py-24 relative">
       {/* Background Grid Accent */}
       <div className="absolute right-0 top-0 w-1/3 h-full border-l border-white/5 bg-gradient-to-l from-white/5 to-transparent pointer-events-none -z-10 hidden lg:block" />

      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <div className="sticky top-24">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">
              <span className="text-accent">Mission</span><br/>Timeline
            </h2>
            <p className="text-foreground/60 font-mono text-sm leading-relaxed mb-8">
              &gt; SYNCHRONIZE WATCHES<br/>
              &gt; FOLLOW PROTOCOLS<br/>
              &gt; EXECUTE
            </p>
            <div className="h-1 w-20 bg-accent mb-8" />
            <div className="text-xs font-mono text-foreground/40">
              {committedCount} / {items.length} COMMITS SYNCED
            </div>
          </div>
        </div>

        <div className="md:w-2/3 relative">
          {/* Vertical Line */}
          <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          
          <div className="space-y-8">
            {items.map((item) => {
              const isCommitted = actions.includes(`agenda_commit_${item.id}`)
              return (
                <div key={item.id} className="relative pl-12 group">
                  {/* Interaction Hint */}
                  {!isCommitted && (
                    <div className="absolute left-[-140px] top-4 text-[10px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden lg:block">
                      {`// CLICK TO COMMIT ->`}
                    </div>
                  )}

                  {/* Connector Node */}
                  <div 
                    className={cn(
                      "absolute left-0 top-1.5 w-[21px] h-[21px] bg-background border rounded-full flex items-center justify-center transition-all z-10",
                      isCommitted ? "border-green-500 bg-green-500/20" : "border-accent/30 group-hover:border-accent group-hover:scale-110"
                    )}
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full transition-opacity",
                       isCommitted ? "bg-green-500" : "bg-accent opacity-50 group-hover:opacity-100 animate-pulse"
                    )} />
                  </div>

                  <Card 
                    level={2} 
                    interactive={!isCommitted}
                    onClick={(e) => handleCommit(item.id, e)}
                    className={cn(
                      "relative p-6 border-l-4 transition-all",
                      isCommitted 
                        ? "border-l-green-500 opacity-80 hover:opacity-100" 
                        : "border-l-transparent hover:border-l-accent group-hover:translate-x-2"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
                      <span className={cn("font-mono font-bold text-lg", isCommitted ? "text-green-500 line-through decoration-white/20" : "text-accent")}>
                        {item.time}
                      </span>
                      <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                        {item.title}
                        {isCommitted && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-mono">COMMITTED</span>}
                      </h3>
                    </div>
                    <p className="text-sm font-mono text-foreground/50 border-t border-white/5 pt-2 mt-2">
                      {`// ${item.description}`}
                    </p>
                    
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 p-2 opacity-20">
                      <div className="w-2 h-2 border-t border-r border-white" />
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
