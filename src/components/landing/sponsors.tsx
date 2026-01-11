"use client"

import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"

const sponsorUrls: Record<string, string> = {
  cursor: "https://cursor.com",
  vudy: "https://vudy.me",
  ai_collective: "https://aicollective.com",
  startupgrind: "https://www.startupgrind.com",
}

export function Sponsors({ dict }: { dict: Dictionary }) {
  const { completeAction } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleInspect = (name: string, e: React.MouseEvent) => {
    const completed = completeAction(`sponsor_${name.toLowerCase()}`, { xp: 15 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+15xp // INSPECT_${name.toUpperCase()}`, "text-yellow-400")
    }
  }

  const handleSponsorClick = (name: string, e: React.MouseEvent) => {
    handleInspect(name, e)
    const url = sponsorUrls[name]
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <section id="sponsors" className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        
        {/* Host */}
        <div>
          <h2 className="mb-6 text-sm font-mono text-accent uppercase tracking-wider">{dict.sponsors.host}</h2>
          <Card 
            level={2} 
            interactive 
            onClick={(e) => handleSponsorClick("cursor", e)}
            className="flex h-32 items-center justify-center p-8 bg-card-01/50 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sponsors/cursor.webp" alt="Cursor" className="max-h-20 max-w-full object-contain" />
          </Card>
        </div>

        {/* Sponsors */}
        <div>
          <h2 className="mb-6 text-sm font-mono text-accent uppercase tracking-wider">{dict.sponsors.gold}</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card 
              level={1} 
              interactive
              onClick={(e) => handleSponsorClick("vudy", e)}
              className="flex h-32 items-center justify-center p-4 bg-card-01/50 hover:bg-card-02 transition-colors cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sponsors/vudy.webp" alt="Vudy" className="max-h-20 max-w-full object-contain" />
            </Card>
            <Card 
              level={1} 
              interactive
              onClick={(e) => handleSponsorClick("ai_collective", e)}
              className="flex h-32 items-center justify-center p-4 bg-card-01/50 hover:bg-card-02 transition-colors cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sponsors/aicollective.webp" alt="The AI Collective" className="max-h-20 max-w-full object-contain" />
            </Card>
            <Card 
              level={1} 
              interactive
              onClick={(e) => handleSponsorClick("startupgrind", e)}
              className="flex h-32 items-center justify-center p-4 bg-card-01/50 hover:bg-card-02 transition-colors cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sponsors/startupgrind.webp" alt="StartupGrind" className="max-h-20 max-w-full object-contain" />
            </Card>
            <a
              href="mailto:hello@wmorales.dev?subject=Cursor%20Hackathon%20San%20Salvador%20-%20Sponsorship"
              onClick={(e) => {
                handleInspect("you", e)
              }}
              className="relative flex flex-col h-32 items-center justify-center p-4 rounded-lg border-2 border-dashed border-accent/30 bg-accent/5 hover:bg-accent/10 hover:border-accent/50 cursor-pointer transition-all group overflow-hidden"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/50" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/50" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/50" />
              
              <div className="flex items-center gap-2 mb-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-accent group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <span className="font-mono text-sm font-bold text-accent uppercase tracking-wider">Your Logo Here</span>
              <span className="font-mono text-[10px] text-foreground/40 group-hover:text-foreground/60 transition-colors mt-1">Become a sponsor</span>
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
