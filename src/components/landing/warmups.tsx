"use client"

import type { MouseEvent } from "react"
import type { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"
import { MessageCircleQuestion, Brain, Zap, Rocket, Check, Clock } from "lucide-react"

export function Warmups({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleDayClick = (index: number, e: MouseEvent) => {
    const id = `warmup_day_${index}`
    const completed = completeAction(id, { xp: 20 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+20xp // WARMUP_${index + 1}`, "text-blue-400")
    }
  }

  const isCompleted = (index: number) => actions.includes(`warmup_day_${index}`)

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return MessageCircleQuestion
      case 1: return Brain
      case 2: return Zap
      case 3: return Rocket
      default: return MessageCircleQuestion
    }
  }

  return (
    <section id="warmups" className="container mx-auto px-4 py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-0 top-0 w-1/3 h-full border-r border-white/5 bg-linear-to-r from-accent/5 to-transparent pointer-events-none -z-10 hidden lg:block" />
      
      {/* Connecting line for desktop */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/20 to-transparent -z-10 hidden lg:block transform -translate-y-12" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4">
            <span className="text-accent">{dict.warmups.title_part1}</span> {dict.warmups.title_part2}
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-white/10 bg-white/5 backdrop-blur-sm">
            <Clock className="w-4 h-4 text-accent" />
            <p className="text-lg text-foreground/80 font-mono">
              {dict.warmups.subtitle}
            </p>
          </div>
          <p className="text-sm text-foreground/40 font-mono mt-6 max-w-xl mx-auto">
            &gt; {dict.warmups.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {dict.warmups.days.map((day, index) => {
          const dayData = typeof day === "string" ? { date: day, title: "" } : day
          const Icon = getIcon(index)
          const completed = isCompleted(index)
          
          return (
            <Card
              key={dayData.date}
              level={1}
              interactive={!completed}
              onClick={(e) => handleDayClick(index, e)}
              className={cn(
                "group relative flex flex-col min-h-[220px] transition-all duration-500",
                "animate-in fade-in slide-in-from-bottom-8",
                completed && "border-blue-500/50 bg-blue-500/5 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
              )}
              style={{ animationDelay: `${100 + index * 100}ms` }}
            >
              {/* Status Indicator */}
              <div className="absolute top-4 right-4 z-20">
                {completed ? (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Check className="w-3 h-3" />
                    <span className="text-[10px] font-mono font-bold tracking-wider">SYNCED</span>
                  </div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-accent transition-colors" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="mb-6">
                  <div className={cn(
                    "w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300",
                    completed ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-foreground/60 group-hover:text-accent group-hover:bg-accent/10 group-hover:scale-110"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-accent/80 uppercase tracking-wider">
                      Session 0{index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-white transition-colors">
                      {dayData.date}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  {dayData.title && (
                    <p className="text-sm font-medium text-foreground/80 leading-snug min-h-10">
                      {dayData.title}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs font-mono text-foreground/40">
                    <Clock className="w-3 h-3" />
                    <span>30 min</span>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
        </div>

        <p className="text-center text-xs font-mono text-foreground/30 mt-12 animate-pulse">
          _ {dict.warmups.coming_soon} _
        </p>
      </div>
    </section>
  )
}
