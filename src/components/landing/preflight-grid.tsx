"use client"

import type { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

export function PreflightGrid({ dict }: { dict: Dictionary }) {
  const { completeAction, actions, unlockBadge } = useXp()
  const { spawnFloater } = useXpFloater()

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
      spawnFloater(e.clientX, e.clientY, `+30xp // PREP_DONE`, "text-green-400")
      
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

  // Mentors logic
  const handleMentorsClick = (e: React.MouseEvent) => {
    const completed = completeAction("mentors_section", { xp: 25 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, "+25xp // MENTOR_INTEL", "text-purple-400")
    }
  }
  const isMentorsScanned = actions.includes("mentors_section")

  // Prizes logic
  const handlePrizesClick = (e: React.MouseEvent) => {
    const completed = completeAction("prizes_section", { xp: 30 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, "+30xp // LOOT_REVEALED", "text-yellow-400")
    }
  }
  const isPrizesScanned = actions.includes("prizes_section")

  return (
    <section id="prep" className="container mx-auto px-4 py-16 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(245,78,0,0.05)_0%,transparent_60%)] -z-10" />

      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">Pre-flight</span>{" "}
          <span className="text-accent">Checklist</span>
        </h2>
        <p className="text-foreground/60 font-mono text-sm">
          &gt; {dict.prep.title.toUpperCase()}
        </p>
      </div>

      {/* Three Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
        
        {/* Column 1: Checklist Items */}
        <Card level={2} className="p-2 flex flex-col">
          <div className="p-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">System Check</span>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-xs font-mono transition-colors",
                allComplete ? "text-green-400" : "text-foreground/40"
              )}>
                {checkedCount}/{totalItems}
              </span>
              {allComplete && (
                <span className="text-[9px] font-mono text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">
                  READY
                </span>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="px-3 py-2">
            <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
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

          <fieldset className="space-y-2 border-0 p-2 flex-1">
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
                    "group relative flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer w-full text-left",
                    checked 
                      ? "border-green-500/30 bg-green-500/5" 
                      : "border-white/5 hover:border-accent/30 hover:bg-accent/5"
                  )}
                >
                  {/* Item Number */}
                  <span className={cn(
                    "font-mono text-[10px] transition-colors",
                    checked ? "text-green-500" : "text-foreground/20 group-hover:text-accent"
                  )}>
                    [{itemNumber}]
                  </span>

                  {/* Checkbox with HUD styling */}
                  <div
                    className={cn(
                      "relative w-4 h-4 flex items-center justify-center transition-all shrink-0",
                      checked ? "text-green-500" : "text-white/20 group-hover:text-accent"
                    )}
                  >
                    <div className={cn(
                      "absolute inset-0 transition-colors",
                      checked ? "border-green-500" : "border-white/20 group-hover:border-accent"
                    )}>
                      <div className="absolute top-0 left-0 w-1 h-1 border-t-2 border-l-2 border-inherit" />
                      <div className="absolute top-0 right-0 w-1 h-1 border-t-2 border-r-2 border-inherit" />
                      <div className="absolute bottom-0 left-0 w-1 h-1 border-b-2 border-l-2 border-inherit" />
                      <div className="absolute bottom-0 right-0 w-1 h-1 border-b-2 border-r-2 border-inherit" />
                    </div>
                    
                    {checked && (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="10" 
                        height="10" 
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
                  </div>

                  {/* Item text */}
                  <span className={cn(
                    "font-mono text-xs transition-all flex-1",
                    checked ? "line-through text-foreground/40" : "text-foreground/70 group-hover:text-foreground"
                  )}>
                    {item}
                  </span>
                </button>
              )
            })}
          </fieldset>
        </Card>

        {/* Column 2: Mentors */}
        <Card 
          level={2} 
          interactive={!isMentorsScanned}
          onClick={handleMentorsClick}
          className={cn(
            "p-0 text-center transition-all flex flex-col",
            isMentorsScanned && "border-purple-500/30 bg-purple-500/5"
          )}
        >
          <div className="p-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.mentors.title}</span>
            {isMentorsScanned && (
              <span className="text-[9px] font-mono text-purple-500 bg-purple-500/10 px-1.5 py-0.5 rounded">ACQUIRED</span>
            )}
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-lg font-bold uppercase tracking-tight mb-3">{dict.mentors.title}</h3>
            <p className="text-foreground/60 font-mono text-xs leading-relaxed">
              {dict.mentors.text}
            </p>
          </div>
        </Card>

        {/* Column 3: Prizes */}
        <Card 
          level={3} 
          interactive={!isPrizesScanned}
          onClick={handlePrizesClick}
          className={cn(
            "relative p-0 text-center overflow-hidden transition-all flex flex-col",
            isPrizesScanned && "border-yellow-500/30"
          )}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-linear-to-r from-accent/10 via-yellow-500/10 to-accent/10 -z-10" />
          
          <div className="p-3 border-b border-white/5 flex items-center justify-between relative z-10">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.prizes.title}</span>
            {isPrizesScanned && (
              <span className="text-[9px] font-mono text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded">OPENED</span>
            )}
          </div>
          
          <div className="p-6 relative z-10 flex-1 flex flex-col">
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-yellow-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-lg font-bold uppercase tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-accent">
              {dict.prizes.title}
            </h3>
            <p className="text-foreground/60 font-mono text-xs leading-relaxed flex-1">
              {dict.prizes.text}
            </p>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-yellow-500/30" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-yellow-500/30" />
        </Card>
      </div>
    </section>
  )
}
