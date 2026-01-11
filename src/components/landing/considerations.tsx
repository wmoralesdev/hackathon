"use client"

import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

export function Considerations({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleClick = (e: React.MouseEvent) => {
    const completed = completeAction("considerations_section", { xp: 20 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, "+20xp // RULES_READ", "text-orange-400")
    }
  }

  const isScanned = actions.includes("considerations_section")

  return (
    <section id="considerations" className="container mx-auto px-4 py-12">
      <Card 
        level={1} 
        interactive={!isScanned}
        onClick={handleClick}
        className={cn(
          "p-8 max-w-3xl mx-auto border-l-4 border-l-orange-500/50 transition-all",
          isScanned && "border-orange-500/30 bg-orange-500/5"
        )}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-orange-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.considerations.title}</span>
          </div>
          {isScanned && (
            <span className="text-[10px] font-mono text-orange-500 bg-orange-500/10 px-1 rounded">ACKNOWLEDGED</span>
          )}
        </div>
        
        <ul className="space-y-3">
          {dict.considerations.items.map((item, index) => (
            <li 
              key={index}
              className="flex items-start gap-3 text-foreground/70 font-mono text-sm"
            >
              <span className="text-orange-500 mt-0.5">&gt;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}
