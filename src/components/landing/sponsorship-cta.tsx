"use client"

import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

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

  return (
    <section id="sponsorship-cta" className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Sponsorship */}
        <Card 
          level={1} 
          interactive={!isCompleted("sponsorship")}
          onClick={(e) => handleInteract("sponsorship", "SPONSOR_INTEREST", e)}
          className={cn(
            "p-6 flex flex-col justify-end min-h-[160px] transition-all",
            isCompleted("sponsorship") && "bg-accent/5 border-accent/30"
          )}
        >
          <div className="flex justify-between items-start">
             <span className="text-xs font-mono text-accent uppercase tracking-wider mb-2">{dict.cta_grid.sponsorship.title}</span>
             {isCompleted("sponsorship") && <span className="text-[10px] text-accent">✓</span>}
          </div>
          <p className="text-lg font-medium leading-tight">{dict.cta_grid.sponsorship.desc}</p>
        </Card>

        {/* Bounties */}
        <Card 
          level={1} 
          interactive={!isCompleted("bounties")}
          onClick={(e) => handleInteract("bounties", "BOUNTY_HUNTER", e)}
          className={cn(
            "p-6 flex flex-col justify-end min-h-[160px] transition-all",
             isCompleted("bounties") && "bg-accent/5 border-accent/30"
          )}
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-accent uppercase tracking-wider mb-2">{dict.cta_grid.bounties.title}</span>
            {isCompleted("bounties") && <span className="text-[10px] text-accent">✓</span>}
          </div>
          <p className="text-lg font-medium leading-tight">{dict.cta_grid.bounties.desc}</p>
        </Card>

        {/* Judge */}
        <Card 
          level={1} 
          interactive={!isCompleted("judge")}
          onClick={(e) => handleInteract("judge", "JUDGE_DUTY", e)}
          className={cn(
            "p-6 flex flex-col justify-end min-h-[160px] transition-all",
             isCompleted("judge") && "bg-accent/5 border-accent/30"
          )}
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-accent uppercase tracking-wider mb-2">{dict.cta_grid.judge.title}</span>
            {isCompleted("judge") && <span className="text-[10px] text-accent">✓</span>}
          </div>
          <p className="text-lg font-medium leading-tight">{dict.cta_grid.judge.desc}</p>
        </Card>

        {/* Training */}
        <Card 
          level={1} 
          interactive={!isCompleted("training")}
          onClick={(e) => handleInteract("training", "TRAINING_MODULE", e)}
          className={cn(
            "p-6 flex flex-col justify-end min-h-[160px] transition-all",
             isCompleted("training") && "bg-accent/5 border-accent/30"
          )}
        >
           <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-accent uppercase tracking-wider mb-2">{dict.cta_grid.training.title}</span>
            {isCompleted("training") && <span className="text-[10px] text-accent">✓</span>}
           </div>
          <p className="text-lg font-medium leading-tight">{dict.cta_grid.training.desc}</p>
        </Card>

      </div>
    </section>
  )
}
