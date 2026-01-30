"use client"

import type { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function PreflightGrid({ dict }: { dict: Dictionary }) {
  const { completeAction, actions, unlockBadge } = useXp()
  const { spawnFloater } = useXpFloater()
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  // Checklist logic
  const isChecked = (index: number) => actions.includes(`prep_item_${index}`)
  const checkedCount = dict.prep.items.filter((_, i) => isChecked(i)).length
  const totalItems = dict.prep.items.length
  const allComplete = checkedCount === totalItems
  const progressPercent = (checkedCount / totalItems) * 100

  const handleCheck = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const id = `prep_item_${index}`
      const completed = completeAction(id, { xp: 30 })
      if (completed) {
        spawnFloater(e.clientX, e.clientY, `+30xp // ${dict.prep.prep_done}`, "text-green-400")
        
        const willBeAllComplete = dict.prep.items.every((_, i) => 
          i === index ? true : isChecked(i)
        )
        
        if (willBeAllComplete) {
          setTimeout(() => {
            unlockBadge("PREFLIGHT")
            spawnFloater(window.innerWidth / 2, window.innerHeight / 2, `Badge unlocked: ${dict.prep.preflight_complete}`, "text-green-400")
          }, 800)
        }
      }
  }

  const toggleExpand = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedItems(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <section id="prep" className="container mx-auto px-4 py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(245,78,0,0.05)_0%,transparent_60%)] -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">
          <span className="text-accent">{dict.prep.section_title_part1}</span> {dict.prep.section_title_part2}
        </h2>
        <p className="text-foreground/60 font-mono text-base md:text-lg">
          &gt; {dict.prep.title}
        </p>
      </div>

      {/* Single Centered Card */}
      <div className="max-w-4xl mx-auto">
        
        {/* System Check Card */}
        <Card level={2} className="flex flex-col">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-mono text-accent tracking-wider font-bold">{dict.prep.system_check}</span>
                <span className="text-xs text-foreground/40 font-mono">{dict.prep.system_check_subtitle}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "text-xl font-mono font-bold transition-colors",
                  allComplete ? "text-green-400" : "text-foreground/40"
                )}>
                  {checkedCount}/{totalItems}
                </span>
                {allComplete && (
                  <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-1 border border-green-500/20 animate-pulse">
                    {dict.prep.ready_for_launch}
                  </span>
                )}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-black/40 h-2 overflow-hidden border border-white/5">
              <div 
                className={cn(
                  "h-full transition-all duration-700 ease-out relative",
                  allComplete 
                    ? "bg-linear-to-r from-green-500 to-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)]" 
                    : "bg-linear-to-r from-accent to-orange-400"
                )}
                style={{ width: `${progressPercent}%` }} 
              >
                 {/* Shine effect */}
                 <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent w-1/2 -skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]" />
              </div>
            </div>

            <fieldset className="space-y-4">
              {dict.prep.items.map((item, index) => {
                const checked = isChecked(index)
                const expanded = expandedItems.has(index)
                const itemNumber = String(index + 1).padStart(2, '0')
                
                return (
                  <div
                    key={item.title}
                    className={cn(
                      "group relative border transition-all duration-300",
                      checked 
                        ? "border-green-500/30 bg-green-500/5" 
                        : "border-white/5 bg-white/5 hover:border-accent/40 hover:bg-accent/5 hover:shadow-[0_0_20px_rgba(245,78,0,0.05)]"
                    )}
                  >
                    {/* Main row */}
                    <div className="flex items-start gap-5 p-5">
                      {/* Item Number */}
                      <span className={cn(
                        "font-mono text-xs transition-colors shrink-0 mt-1.5 opacity-50",
                        checked ? "text-green-500" : "group-hover:text-accent"
                      )}>
                        {itemNumber}
                      </span>

                      {/* Checkbox with HUD styling */}
                      <button
                        type="button"
                        onClick={(e) => handleCheck(index, e)}
                        aria-pressed={checked}
                        className={cn(
                          "relative w-6 h-6 flex items-center justify-center transition-all shrink-0 mt-0.5",
                          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background",
                          checked ? "text-green-500 scale-110" : "text-white/20 hover:text-accent hover:scale-110"
                        )}
                        aria-label={`Mark "${item.title}" as complete`}
                      >
                        <div className={cn(
                          "absolute inset-0 transition-colors bg-black/20",
                          checked ? "border-green-500 bg-green-500/10" : "border-white/20 group-hover:border-accent"
                        )}>
                          {/* Corner accents */}
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-inherit opacity-50" />
                          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-inherit opacity-50" />
                          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-inherit opacity-50" />
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-inherit opacity-50" />
                        </div>
                        
                        {checked && (
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="14" 
                            height="14" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="animate-in zoom-in duration-200"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>

                      {/* Item content - Clickable for expansion */}
                      <button
                        type="button"
                        onClick={(e) => toggleExpand(index, e)}
                        className="flex-1 min-w-0 pt-0.5 text-left focus:outline-none group/content"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className={cn(
                            "font-sans text-lg font-medium transition-all leading-snug",
                            checked ? "line-through text-foreground/40" : "text-foreground group-hover:text-white"
                          )}>
                            {item.title}
                          </div>
                          
                          {/* Chevron */}
                          <div className={cn(
                            "transition-transform duration-300 text-foreground/20 group-hover/content:text-accent/50",
                            expanded && "rotate-180 text-accent"
                          )}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Expandable description */}
                        <div className={cn(
                          "grid transition-all duration-300 ease-in-out",
                          expanded ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                        )}>
                          <div className="overflow-hidden">
                            <div className={cn(
                              "font-mono text-sm leading-relaxed text-foreground/70 border-l-2 border-white/10 pl-4 py-1",
                              checked && "text-foreground/40"
                            )}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )
              })}
            </fieldset>
          </div>
        </Card>
      </div>
    </section>
  )
}
