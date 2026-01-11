"use client"

import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"

export function Sponsors({ dict }: { dict: Dictionary }) {
  const { completeAction } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleInspect = (name: string, e: React.MouseEvent) => {
    const completed = completeAction(`sponsor_${name.toLowerCase()}`, { xp: 15 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+15xp // INSPECT_${name.toUpperCase()}`, "text-yellow-400")
    }
  }

  return (
    <section id="sponsors" className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        
        {/* Host */}
        <div>
          <h2 className="mb-6 text-sm font-mono text-accent uppercase tracking-wider">{dict.sponsors.host}</h2>
          <Card 
            level={2} 
            interactive 
            onClick={(e) => handleInspect("cursor", e)}
            className="flex h-32 items-center justify-center p-8 bg-card-01/50"
          >
            <div className="flex items-center gap-2 text-3xl font-bold tracking-tight">
              <div className="size-8 bg-foreground text-background flex items-center justify-center rounded-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M21.79 13.91 12 22 2.21 13.91 12 6.09l9.79 7.82ZM12 0 2.21 7.82 12 15.64l9.79-7.82L12 0Z" /></svg>
              </div>
              CURSOR
            </div>
          </Card>
        </div>

        {/* Sponsors */}
        <div>
          <h2 className="mb-6 text-sm font-mono text-accent uppercase tracking-wider">{dict.sponsors.gold}</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card 
              level={1} 
              interactive
              onClick={(e) => handleInspect("vudy", e)}
              className="flex h-32 items-center justify-center p-4 bg-card-01/50 hover:bg-card-02 transition-colors"
            >
              <span className="font-bold text-xl">Vudy</span>
            </Card>
            <Card 
              level={1} 
              interactive
              onClick={(e) => handleInspect("ai_collective", e)}
              className="flex h-32 items-center justify-center p-4 bg-card-01/50 hover:bg-card-02 transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">The AI</div>
                <div className="text-xs uppercase tracking-widest">Collective</div>
              </div>
            </Card>
            <Card 
              level={1} 
              interactive
              onClick={(e) => handleInspect("startupgrind", e)}
              className="flex h-32 items-center justify-center p-4 bg-card-01/50 hover:bg-card-02 transition-colors"
            >
              <span className="font-bold text-lg text-red-500">startupgrind</span>
            </Card>
             <Card 
              level={1} 
              interactive
              onClick={(e) => handleInspect("you", e)}
              className="flex h-32 items-center justify-center p-4 bg-card-01/50 border-dashed border-2 border-white/10 hover:border-accent/50 hover:text-accent cursor-pointer transition-colors group"
             >
              <span className="font-medium group-hover:scale-110 transition-transform">YOU?</span>
            </Card>
          </div>
        </div>

      </div>
    </section>
  )
}
