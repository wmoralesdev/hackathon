"use client"

import * as React from "react"
import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

export function Criteria({ dict }: { dict: Dictionary }) {
  const { completeAction, actions, unlockBadge } = useXp()
  const { spawnFloater } = useXpFloater()
  
  const stats = [
    {
      key: 'innovation',
      title: dict.criteria.innovation.title,
      desc: dict.criteria.innovation.desc,
      value: 90,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><path d="M9 21v1h6v-1"/></svg>
      ),
    },
    {
      key: 'presentation',
      title: dict.criteria.presentation.title,
      desc: dict.criteria.presentation.desc,
      value: 85,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17v5"/><path d="M9 10a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2"/><path d="M15 17h6"/><path d="M3 17h6"/><path d="M12 17a4 4 0 0 1-4-4V5a4 4 0 1 1 8 0v8a4 4 0 0 1-4 4z"/></svg>
      ),
    },
    {
      key: 'cursor',
      title: dict.criteria.cursor.title,
      desc: dict.criteria.cursor.desc,
      value: 100,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6"><path d="M21.79 13.91 12 22 2.21 13.91 12 6.09l9.79 7.82ZM12 0 2.21 7.82 12 15.64l9.79-7.82L12 0Z" /></svg>
      ),
    },
  ]

  const handleCalibrate = (key: string, value: number, e: React.MouseEvent) => {
    const id = `criteria_${key}`
    const completed = completeAction(id, { xp: 40 })
    
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+40xp // CALIBRATE_${key.toUpperCase()}`, "text-accent")
      
      // Check if all criteria are calibrated
      const allCalibrated = stats.every(s => 
        s.key === key ? true : actions.includes(`criteria_${s.key}`)
      )
      
      if (allCalibrated) {
        setTimeout(() => {
          unlockBadge("DEMO_DAY")
          spawnFloater(window.innerWidth / 2, window.innerHeight / 2, "BADGE UNLOCKED: DEMO DAY", "text-yellow-400")
        }, 800)
      }
    }
  }

  return (
    <section id="criteria" className="container mx-auto px-4 py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(245,78,0,0.05)_0%,transparent_60%)] -z-10" />

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Evaluation</span>{" "}
          <span className="text-accent">Matrix</span>
        </h2>
        <p className="text-foreground/60 font-mono text-sm max-w-2xl mx-auto">
          &gt; ANALYZING PROJECT PARAMETERS...<br/>
          &gt; OPTIMIZE FOR MAXIMUM SCORE
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {stats.map((stat, i) => {
          const isCalibrated = actions.includes(`criteria_${stat.key}`)
          
          return (
            <Card 
              key={stat.key} 
              level={2} 
              interactive={!isCalibrated}
              onClick={(e) => handleCalibrate(stat.key, stat.value, e)}
              className={cn(
                "group relative p-8 border-white/10 overflow-visible transition-all duration-500",
                !isCalibrated ? "hover:border-accent/50 hover:-translate-y-2 cursor-pointer" : "border-accent/30 bg-accent/5"
              )}
            >
              {/* Hover Glow */}
              {!isCalibrated && (
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              )}
              
              {isCalibrated && (
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">CALIBRATED</span>
                </div>
              )}

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className={cn(
                    "p-3 rounded-lg transition-colors duration-300",
                    isCalibrated ? "bg-accent text-white" : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                  )}>
                    {stat.icon}
                  </div>
                  <div className={cn(
                    "font-mono text-2xl font-bold transition-colors",
                    isCalibrated ? "text-accent" : "text-white/20 group-hover:text-accent"
                  )}>
                    0{i + 1}
                  </div>
                </div>

                <h3 className={cn(
                  "text-2xl font-bold uppercase tracking-tight mb-3 transition-colors",
                  isCalibrated ? "text-accent" : "group-hover:text-accent"
                )}>
                  {stat.title}
                </h3>
                
                <p className="text-foreground/60 text-sm leading-relaxed mb-8 flex-grow">
                  {stat.desc}
                </p>

                {/* Stat Bar */}
                <div className="space-y-2">
                  <div className={cn(
                    "flex justify-between text-xs font-mono font-bold uppercase transition-colors",
                    isCalibrated ? "text-accent" : "text-foreground/40 group-hover:text-accent/80"
                  )}>
                    <span>Power Level</span>
                    <span>{stat.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={cn(
                        "h-full bg-gradient-to-r from-accent to-orange-400 transition-all duration-1000 ease-out",
                        isCalibrated ? "w-full" : "w-0 group-hover:w-full"
                      )}
                      style={{ width: isCalibrated ? `${stat.value}%` : undefined }} 
                    />
                  </div>
                </div>
              </div>

              {/* Corner Markers */}
              <div className={cn("absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors", isCalibrated ? "border-accent" : "border-white/20 group-hover:border-accent")} />
              <div className={cn("absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors", isCalibrated ? "border-accent" : "border-white/20 group-hover:border-accent")} />
            </Card>
          )
        })}
      </div>
    </section>
  )
}
