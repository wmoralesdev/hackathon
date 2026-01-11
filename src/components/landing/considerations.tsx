"use client"

import type { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

const icons = [
  // Clock - Be punctual
  <svg key="clock" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>,
  // Laptop - Bring charged
  <svg key="laptop" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
  </svg>,
  // Wifi - Hotspot
  <svg key="wifi" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h.01" />
    <path d="M2 8.82a15 15 0 0 1 20 0" />
    <path d="M5 12.859a10 10 0 0 1 14 0" />
    <path d="M8.5 16.429a5 5 0 0 1 7 0" />
  </svg>,
  // Users - WhatsApp
  <svg key="users" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
]

export function Considerations({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleClick = (index: number, e: React.MouseEvent) => {
    const completed = completeAction(`consideration_${index}`, { xp: 10 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, "+10xp // NOTED", "text-orange-400")
    }
  }

  const isAcknowledged = (index: number) => actions.includes(`consideration_${index}`)
  const allAcknowledged = dict.considerations.items.every((_, i) => isAcknowledged(i))

  return (
    <section id="considerations" className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500" aria-hidden="true">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <h2 className="text-sm font-mono text-accent uppercase tracking-wider">{dict.considerations.title}</h2>
          </div>
          {allAcknowledged && (
            <span className="text-[10px] font-mono text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
              ALL ACKNOWLEDGED
            </span>
          )}
        </div>

        {/* Grid of considerations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dict.considerations.items.map((item, index) => {
            const acknowledged = isAcknowledged(index)
            
            return (
              <Card
                key={item}
                level={2}
                interactive={!acknowledged}
                onClick={(e) => handleClick(index, e)}
                className={cn(
                  "p-4 transition-all cursor-pointer group",
                  acknowledged && "border-orange-500/30 bg-orange-500/5"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg shrink-0 transition-colors",
                    acknowledged 
                      ? "bg-orange-500/20 text-orange-500" 
                      : "bg-white/5 text-foreground/40 group-hover:bg-orange-500/10 group-hover:text-orange-500"
                  )}>
                    {icons[index] || icons[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "font-mono text-xs leading-relaxed transition-colors",
                      acknowledged ? "text-foreground/50" : "text-foreground/70 group-hover:text-foreground"
                    )}>
                      {item}
                    </p>
                  </div>
                </div>
                {acknowledged && (
                  <div className="mt-3 pt-3 border-t border-orange-500/20">
                    <span className="text-[9px] font-mono text-orange-500">✓ ACKNOWLEDGED</span>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
