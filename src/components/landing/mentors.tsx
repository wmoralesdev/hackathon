"use client"

import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

export function Mentors({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleClick = (e: React.MouseEvent) => {
    const completed = completeAction("mentors_section", { xp: 25 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, "+25xp // MENTOR_INTEL", "text-purple-400")
    }
  }

  const isScanned = actions.includes("mentors_section")

  return (
    <section id="mentors" className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <Card 
          level={2} 
          interactive={!isScanned}
          onClick={handleClick}
          className={cn(
            "p-8 text-center max-w-3xl mx-auto transition-all",
            isScanned && "border-purple-500/30 bg-purple-500/5"
          )}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.mentors.title}</span>
            {isScanned && (
              <span className="text-[10px] font-mono text-purple-500 bg-purple-500/10 px-1 rounded">INTEL ACQUIRED</span>
            )}
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-accent/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{dict.mentors.title}</h3>
          <p className="text-foreground/60 font-mono text-sm leading-relaxed max-w-xl mx-auto">
            {dict.mentors.text}
          </p>
        </Card>
      </div>
    </section>
  )
}
