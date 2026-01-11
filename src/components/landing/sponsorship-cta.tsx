"use client"

import type { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

const sponsorOptions = [
  {
    id: "sponsorship",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    label: "SPONSOR_INTEREST",
    color: "accent",
  },
  {
    id: "bounties",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: "BOUNTY_HUNTER",
    color: "purple-500",
  },
  {
    id: "judge",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
    label: "JUDGE_DUTY",
    color: "blue-500",
  },
  {
    id: "training",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    label: "TRAINING_MODULE",
    color: "green-500",
  },
]

export function SponsorshipCTA({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleInteract = (id: string, label: string, e: React.MouseEvent) => {
    const actionId = `cta_${id}`
    const completed = completeAction(actionId, { xp: 20 })
    
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+20xp // ${label}`, "text-blue-400")
    }
  }

  const isCompleted = (id: string) => actions.includes(`cta_${id}`)

  const ctaTexts: Record<string, { title: string; desc: string }> = {
    sponsorship: dict.cta_grid.sponsorship,
    bounties: dict.cta_grid.bounties,
    judge: dict.cta_grid.judge,
    training: dict.cta_grid.training,
  }

  return (
    <section id="sponsorship-cta" className="container mx-auto px-4 py-16 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(245,78,0,0.08)_0%,transparent_50%)] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.sponsorship_cta.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">{dict.sponsorship_cta.title_part1}</span>{" "}
            <span className="text-accent">{dict.sponsorship_cta.title_part2}</span>
          </h2>
          <p className="text-foreground/60 font-mono text-sm max-w-lg mx-auto">
            &gt; {dict.sponsorship_cta.description}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sponsorOptions.map((option) => {
            const completed = isCompleted(option.id)
            const text = ctaTexts[option.id]
            
            return (
              <Card 
                key={option.id}
                level={2} 
                interactive={!completed}
                onClick={(e) => handleInteract(option.id, option.label, e)}
                className={cn(
                  "p-5 flex flex-col min-h-[180px] transition-all group",
                  completed && "bg-accent/5 border-accent/30"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "p-2.5 rounded-lg transition-colors",
                    completed 
                      ? "bg-accent/20 text-accent" 
                      : "bg-white/5 text-foreground/40 group-hover:bg-accent/10 group-hover:text-accent"
                  )}>
                    {option.icon}
                  </div>
                  {completed && (
                    <span className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded">
                      NOTED
                    </span>
                  )}
                </div>
                
                <div className="mt-auto">
                  <h3 className={cn(
                    "text-sm font-bold uppercase tracking-tight mb-1.5 transition-colors",
                    completed ? "text-accent" : "group-hover:text-accent"
                  )}>
                    {text.title}
                  </h3>
                  <p className="text-foreground/50 font-mono text-xs leading-relaxed">
                    {text.desc}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
