"use client"

import * as React from "react"
import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

export function Prep({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleCheck = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const id = `prep_item_${index}`
    const completed = completeAction(id, { xp: 30 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+30xp // PREP_DONE`, "text-green-400")
    }
  }

  const isChecked = (index: number) => actions.includes(`prep_item_${index}`)
  const checkedCount = dict.prep.items.filter((_, i) => isChecked(i)).length

  return (
    <section id="prep" className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Pre-flight</span>{" "}
            <span className="text-accent">Checklist</span>
          </h2>
          <p className="text-foreground/60 font-mono text-sm">
            &gt; {dict.prep.title.toUpperCase()}
          </p>
          <div className="text-xs font-mono text-foreground/40 mt-4">
            {checkedCount} / {dict.prep.items.length} READY
          </div>
        </div>

        <Card level={2} className="p-8">
          <ul className="space-y-4">
            {dict.prep.items.map((item, index) => (
              <li
                key={index}
                onClick={(e) => handleCheck(index, e)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg border border-white/5 transition-all cursor-pointer",
                  "hover:border-accent/30 hover:bg-accent/5",
                  isChecked(index) && "border-green-500/30 bg-green-500/5"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded border-2 flex items-center justify-center transition-all",
                    isChecked(index) 
                      ? "border-green-500 bg-green-500" 
                      : "border-white/20 hover:border-accent"
                  )}
                >
                  {isChecked(index) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className={cn(
                  "font-mono text-lg transition-all",
                  isChecked(index) && "line-through text-foreground/40"
                )}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
