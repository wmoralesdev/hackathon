"use client"

import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

export function Prizes({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleClick = (e: React.MouseEvent) => {
    const completed = completeAction("prizes_section", { xp: 30 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, "+30xp // LOOT_REVEALED", "text-yellow-400")
    }
  }

  const isScanned = actions.includes("prizes_section")

  return (
    <section id="prizes" className="container mx-auto px-4 py-12">
      <Card 
        level={3} 
        interactive={!isScanned}
        onClick={handleClick}
        className={cn(
          "relative p-8 text-center max-w-3xl mx-auto overflow-hidden transition-all",
          isScanned && "border-yellow-500/30"
        )}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-yellow-500/10 to-accent/10 -z-10" />
        
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.prizes.title}</span>
          {isScanned && (
            <span className="text-[10px] font-mono text-yellow-500 bg-yellow-500/10 px-1 rounded">LOOT BOX OPENED</span>
          )}
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-yellow-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-accent">
          {dict.prizes.title}
        </h3>
        <p className="text-foreground/60 font-mono text-sm leading-relaxed max-w-xl mx-auto">
          {dict.prizes.text}
        </p>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/30" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/30" />
      </Card>
    </section>
  )
}
