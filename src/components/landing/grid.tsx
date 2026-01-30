"use client"

import type { MouseEvent } from "react"
import type { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"
import { Calendar, Clock, MapPin, Check } from "lucide-react"

function ScannedBadge() {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 animate-in fade-in zoom-in duration-300">
      <Check className="w-3 h-3" />
      <span className="text-[10px] font-mono font-bold tracking-wider">SCANNED</span>
    </div>
  )
}

function ScanIndicator() {
  return (
    <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-accent transition-colors" />
  )
}

export function GridSection({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()
  
  const handleScan = (id: string, xp: number, label: string, e: MouseEvent) => {
    e.stopPropagation()
    
    const completed = completeAction(id, { xp })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+${xp}xp // ${label}`, "text-green-400")
    }
  }

  const isScanned = (id: string) => actions.includes(id)

  return (
    <section id="grid" className="container mx-auto px-4 py-12 relative">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Date */}
        <Card 
          level={1} 
          interactive={!isScanned("grid_date")}
          onClick={(e) => handleScan("grid_date", 25, "SCAN_DATE", e)}
          className={cn(
            "group relative p-6 flex flex-col justify-between overflow-hidden transition-all duration-500",
            isScanned("grid_date") && "border-green-500/50 bg-green-500/5 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
          )}
        >
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-2 text-accent/80">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">{dict.grid.when}</span>
            </div>
            {isScanned("grid_date") ? <ScannedBadge /> : <ScanIndicator />}
          </div>
          <div className="z-10 mt-4">
            <div className="text-4xl font-black tracking-tighter text-foreground mb-1">
              {dict.hero.date.split(",")[0]}
            </div>
            <div className="text-lg font-mono text-foreground/60">
              {dict.hero.date.split(",").slice(1).join(",").trim()}
            </div>
          </div>
          
          {/* Decorative background number */}
          <div className="absolute -right-4 -bottom-8 text-[100px] font-black text-white/5 select-none pointer-events-none">
            31
          </div>
        </Card>

        {/* Schedule */}
        <Card 
          level={1} 
          interactive={!isScanned("grid_schedule")}
          onClick={(e) => handleScan("grid_schedule", 25, "SCAN_TIME", e)}
          className={cn(
            "group relative p-6 flex flex-col justify-between overflow-hidden transition-all duration-500",
            isScanned("grid_schedule") && "border-green-500/50 bg-green-500/5 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
          )}
        >
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-2 text-accent/80">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">{dict.grid.duration}</span>
            </div>
            {isScanned("grid_schedule") ? <ScannedBadge /> : <ScanIndicator />}
          </div>
          <div className="z-10 mt-4">
            <div className="text-3xl font-black tracking-tighter text-foreground mb-1">
              {dict.hero.time}
            </div>
          </div>
          
          <Clock className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 pointer-events-none" />
        </Card>

        {/* Location */}
        <Card 
          level={1} 
          interactive={!isScanned("grid_location")}
          onClick={(e) => handleScan("grid_location", 25, "SCAN_LOC", e)}
          className={cn(
            "group relative p-6 flex flex-col justify-between overflow-hidden transition-all duration-500",
            isScanned("grid_location") && "border-green-500/50 bg-green-500/5 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
          )}
        >
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-2 text-accent/80">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">{dict.grid.location}</span>
            </div>
            {isScanned("grid_location") ? <ScannedBadge /> : <ScanIndicator />}
          </div>
          <div className="z-10 mt-4 flex flex-col gap-3">
            <div className="flex items-center justify-center mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sponsors/uca.svg"
                alt="UCA Logo"
                className="h-12 w-auto object-contain invert opacity-80"
              />
            </div>
            <div className="text-sm font-bold text-foreground leading-snug text-center">
              {dict.hero.location.split(" - ")[0]}
            </div>
            <div className="text-xs font-mono text-foreground/60 text-center border-t border-white/10 pt-2">
              {dict.hero.location.split(" - ")[1] || dict.hero.location.split("- ")[1]}
            </div>
          </div>
        </Card>

        </div>
      </div>
    </section>
  )
}
