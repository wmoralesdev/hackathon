"use client"

import type { Dictionary } from "@/i18n/utils"
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
      tags: ["Software Engineer", "Cursor Ambassador"],
      level: 99,
      image: "https://github.com/wmoralesdev.png",
      x: "https://x.com/wmoralesdev"
    },
    {
      name: "Francis Sanchinelli",
      role: "Organizer",
      tags: ["Founder of U3Tech", "President of ABGT"],
      level: 99,
      image: "/org/francis.webp",
      x: "https://x.com/fsanchinelli"
    },
    {
      name: "Carol Monroe",
      role: "Organizer",
      tags: ["Creative Builder", "Supabase AI Builder Supporter"],
      level: 99,
      image: "/org/carol.webp",
      x: "https://x.com/CarolMonroe"
    },
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
      <div className="max-w-7xl mx-auto">
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
            className="group p-6 flex flex-col items-center text-center hover:border-accent/50 transition-colors cursor-pointer overflow-hidden"
          >
            <div className="relative mb-8 w-full flex justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-accent transition-colors relative z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={org.image} alt={org.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-0.5 rounded-full border border-accent/30 text-[10px] font-mono text-accent z-20">
                LVL.{org.level}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-1 uppercase">{org.name}</h3>
            <p className="text-sm text-foreground/60 mb-4">{org.role}</p>
            
            <div className="flex gap-2 justify-center mb-4">
              {org.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-mono text-[10px]">{tag}</Badge>
              ))}
            </div>
            
            {/* X Profile Button */}
            <a
              href={org.x}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/50 transition-all group/x w-full justify-center"
            >
              <svg 
                viewBox="0 0 24 24" 
                width="16" 
                height="16" 
                fill="currentColor"
                className="shrink-0 text-foreground/60 group-hover/x:text-accent transition-colors"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="font-mono text-sm font-medium text-foreground/70 group-hover/x:text-accent transition-colors">
                @{org.x.split('/').pop()}
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="opacity-0 -translate-x-1 group-hover/x:opacity-100 group-hover/x:translate-x-0 transition-all text-accent"
                aria-hidden="true"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
          </Card>
        ))}
        </div>
      </div>
    </section>
  )
}
