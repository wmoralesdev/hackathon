"use client"

import type { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

export function Prep({ dict }: { dict: Dictionary }) {
  const { completeAction, actions, unlockBadge } = useXp()
  const { spawnFloater } = useXpFloater()

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
      spawnFloater(e.clientX, e.clientY, `+30xp // PREP_DONE`, "text-green-400")
      
      // Check if all items are now complete for bonus XP
      const willBeAllComplete = dict.prep.items.every((_, i) => 
        i === index ? true : isChecked(i)
      )
      
      if (willBeAllComplete) {
        setTimeout(() => {
          unlockBadge("PREFLIGHT")
          spawnFloater(window.innerWidth / 2, window.innerHeight / 2, "BADGE UNLOCKED: PREFLIGHT COMPLETE", "text-green-400")
        }, 800)
      }
    }
  }

  return (
    <section id="prep" className="container mx-auto px-4 py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(245,78,0,0.05)_0%,transparent_60%)] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">Pre-flight</span>{" "}
            <span className="text-accent">Checklist</span>
          </h2>
          <p className="text-foreground/60 font-mono text-sm">
            &gt; {dict.prep.title.toUpperCase()}
          </p>
          
          {/* Progress Counter & Badge */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className={cn(
              "text-xs font-mono transition-colors",
              allComplete ? "text-green-400" : "text-foreground/40"
            )}>
              {checkedCount} / {totalItems} READY
            </span>
            {allComplete && (
              <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 animate-pulse">
                SYSTEMS READY
              </span>
            )}
          </div>

          {/* Progress Bar */}
          <div className="max-w-xs mx-auto mt-4">
            <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
              <div 
                className={cn(
                  "h-full transition-all duration-500 ease-out",
                  allComplete 
                    ? "bg-linear-to-r from-green-500 to-green-400" 
                    : "bg-linear-to-r from-accent to-orange-400"
                )}
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>
        </div>

        <Card level={2} className="p-2">
          <fieldset className="space-y-3 border-0">
            {dict.prep.items.map((item, index) => {
              const checked = isChecked(index)
              const itemNumber = String(index + 1).padStart(2, '0')
              
              return (
                <button
                  key={item}
                  type="button"
                  onClick={(e) => handleCheck(index, e)}
                  aria-pressed={checked}
                  className={cn(
                    "group relative flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer w-full text-left",
                    checked 
                      ? "border-green-500/30 bg-green-500/5" 
                      : "border-white/5 hover:border-accent/30 hover:bg-accent/5"
                  )}
                >
                  {/* Corner Markers */}
                  <div className={cn(
                    "absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors",
                    checked ? "border-green-500/50" : "border-white/10 group-hover:border-accent/50"
                  )} />
                  <div className={cn(
                    "absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors",
                    checked ? "border-green-500/50" : "border-white/10 group-hover:border-accent/50"
                  )} />
                  <div className={cn(
                    "absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors",
                    checked ? "border-green-500/50" : "border-white/10 group-hover:border-accent/50"
                  )} />
                  <div className={cn(
                    "absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors",
                    checked ? "border-green-500/50" : "border-white/10 group-hover:border-accent/50"
                  )} />

                  {/* Item Number */}
                  <span className={cn(
                    "font-mono text-xs transition-colors",
                    checked ? "text-green-500" : "text-foreground/20 group-hover:text-accent"
                  )}>
                    [{itemNumber}]
                  </span>

                  {/* Checkbox with HUD styling */}
                  <div
                    className={cn(
                      "relative w-6 h-6 flex items-center justify-center transition-all",
                      checked 
                        ? "text-green-500" 
                        : "text-white/20 group-hover:text-accent"
                    )}
                  >
                    {/* Checkbox corners */}
                    <div className={cn(
                      "absolute inset-0 transition-colors",
                      checked ? "border-green-500" : "border-white/20 group-hover:border-accent"
                    )}>
                      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-inherit" />
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-inherit" />
                      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-inherit" />
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-inherit" />
                    </div>
                    
                    {/* Check icon */}
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
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    
                    {/* Glow effect when checked */}
                    {checked && (
                      <div className="absolute inset-0 bg-green-500/20 blur-sm rounded -z-10" />
                    )}
                  </div>

                  {/* Item text */}
                  <span className={cn(
                    "font-mono text-sm transition-all flex-1",
                    checked ? "line-through text-foreground/40" : "text-foreground/80 group-hover:text-foreground"
                  )}>
                    {item}
                  </span>

                  {/* Status indicator */}
                  {checked && (
                    <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">
                      DONE
                    </span>
                  )}
                </button>
              )
            })}
          </fieldset>
        </Card>
      </div>
    </section>
  )
}
