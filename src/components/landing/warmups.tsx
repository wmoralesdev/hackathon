"use client"

import * as React from "react"
import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

export function Warmups({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleDayClick = (index: number, e: React.MouseEvent) => {
    const id = `warmup_day_${index}`
    const completed = completeAction(id, { xp: 20 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+20xp // WARMUP_${index + 1}`, "text-blue-400")
    }
  }

  const isCompleted = (index: number) => actions.includes(`warmup_day_${index}`)

  return (
    <section id="warmups" className="container mx-auto px-4 py-24 relative">
      {/* Background accent */}
      <div className="absolute left-0 top-0 w-1/3 h-full border-r border-white/5 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none -z-10 hidden lg:block" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
            <span className="text-accent">{dict.warmups.title}</span>
          </h2>
          <p className="text-xl text-foreground/60 font-mono">
            {dict.warmups.subtitle}
          </p>
          <p className="text-sm text-foreground/40 font-mono mt-4 max-w-xl mx-auto">
            &gt; {dict.warmups.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dict.warmups.days.map((day, index) => (
          <Card
            key={day}
            level={1}
            interactive={!isCompleted(index)}
            onClick={(e) => handleDayClick(index, e)}
            className={cn(
              "p-6 flex flex-col items-center justify-center min-h-[140px] text-center transition-all",
              "animate-in fade-in slide-in-from-bottom-4 duration-700",
              isCompleted(index) && "border-blue-500/30 bg-blue-500/5"
            )}
            style={{ animationDelay: `${100 + index * 50}ms` }}
          >
            <div className="flex justify-between items-start w-full mb-4">
              <span className="text-xs font-mono text-accent uppercase tracking-wider">Session {index + 1}</span>
              {isCompleted(index) && (
                <span className="text-[10px] font-mono text-blue-500 bg-blue-500/10 px-1 rounded">SYNCED</span>
              )}
            </div>
            <div className="text-xl font-bold text-foreground mb-2">{day}</div>
            <p className="text-xs font-mono text-foreground/40">30 min</p>
          </Card>
        ))}
        </div>

        <p className="text-center text-sm font-mono text-foreground/40 mt-8">
          {dict.warmups.coming_soon}
        </p>
      </div>
    </section>
  )
}
