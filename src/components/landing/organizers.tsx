"use client"

import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { Badge } from "@/ui/badge"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"

export function Organizers({ dict }: { dict: Dictionary }) {
  // dict will be used when organizers data is added to i18n dictionary
  void dict
  const { completeAction } = useXp()
  const { spawnFloater } = useXpFloater()
  
  // Mock organizers data (since we don't have it in dictionary yet, hardcoding structure for now)
  const organizers = [
    {
      name: "Walter Morales",
      role: "Lead Organizer",
      lang: "TypeScript",
      level: 99,
      image: "https://github.com/wmoralesdev.png" // Fallback or placeholder
    },
    // Add more if needed
  ]

  const handleInspect = (name: string, e: React.MouseEvent) => {
    // Also unlock TEAM_BUILDER badge on first interaction
    const completed = completeAction(`organizer_${name.toLowerCase()}`, { xp: 50, badgeId: "TEAM_BUILDER" })
    
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+50xp // CONNECT_WITH_${name.toUpperCase().split(' ')[0]}`, "text-purple-400")
    }
  }

  return (
    <section id="organizers" className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight uppercase mb-4">
          <span className="text-accent">System</span> Architects
        </h2>
        <p className="text-foreground/60 font-mono">
          &gt; MEET THE TEAM BEHIND THE EVENT
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {organizers.map((org) => (
          <Card 
            key={org.name} 
            level={2} 
            interactive
            onClick={(e) => handleInspect(org.name, e)}
            className="group p-6 flex flex-col items-center text-center hover:border-accent/50 transition-colors cursor-pointer"
          >
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-accent transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={org.image} alt={org.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-0.5 rounded-full border border-accent/30 text-[10px] font-mono text-accent">
                LVL.{org.level}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-1">{org.name}</h3>
            <p className="text-sm text-foreground/60 mb-4">{org.role}</p>
            
            <div className="flex gap-2">
              <Badge variant="secondary" className="font-mono text-[10px]">{org.lang}</Badge>
              <Badge variant="secondary" className="font-mono text-[10px]">VIM_USER</Badge>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
