"use client"

import * as React from "react"
import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { Badge } from "@/ui/badge"
import { Shard } from "@/components/xp/shard"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

export function GridSection({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()
  
  const handleScan = (id: string, xp: number, label: string, e: React.MouseEvent) => {
    // Prevent double triggering if clicking children like chips
    e.stopPropagation()
    
    const completed = completeAction(id, { xp })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+${xp}xp // ${label}`, "text-green-400")
    }
  }

  const handleChipToggle = (chip: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const id = `grid_chip_${chip.toLowerCase()}`
    const completed = completeAction(id, { xp: 15 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+15xp // ROLE_${chip.toUpperCase()}`, "text-accent")
    }
  }

  const isScanned = (id: string) => actions.includes(id)

  return (
    <section id="grid" className="container mx-auto px-4 py-12 relative">
      <Shard id="shard-1" className="top-0 right-10" />
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)]">
        
        {/* When */}
        <Card 
          level={1} 
          interactive 
          onClick={(e) => handleScan("grid_when", 25, "SCAN_DATE", e)}
          className={cn(
            "relative p-6 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 overflow-hidden",
            isScanned("grid_when") && "border-green-500/30"
          )}
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.grid.when}</span>
            {isScanned("grid_when") && <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-1 rounded">SCANNED</span>}
          </div>
          <div>
            <div className="text-4xl font-bold tracking-tighter text-foreground">31</div>
            <div className="text-xl text-foreground/80">January 2026</div>
          </div>
          <Shard id="shard-2" className="bottom-2 right-2" />
        </Card>

        {/* Builders */}
        <Card 
          level={1} 
          interactive 
          onClick={(e) => handleScan("grid_builders", 25, "SCAN_COUNT", e)}
          className={cn(
            "p-6 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150",
            isScanned("grid_builders") && "border-green-500/30"
          )}
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.grid.builders}</span>
            {isScanned("grid_builders") && <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-1 rounded">SCANNED</span>}
          </div>
          <div className="text-5xl font-bold tracking-tighter text-foreground">100</div>
        </Card>

        {/* Vision */}
        <Card 
          level={2} 
          interactive 
          onClick={(e) => handleScan("grid_vision", 50, "SCAN_VISION", e)}
          className={cn(
            "p-6 md:col-span-2 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200",
            isScanned("grid_vision") && "border-green-500/30"
          )}
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.grid.vision.title}</span>
            {isScanned("grid_vision") && <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-1 rounded">SCANNED</span>}
          </div>
          <div className="space-y-4 mt-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground">{dict.grid.vision.p1}</h3>
              <p className="text-sm text-foreground/60">{dict.grid.vision.p2}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60">{dict.grid.vision.p3}</p>
            </div>
          </div>
        </Card>

        {/* Duration */}
        <Card 
          level={1} 
          interactive 
          onClick={(e) => handleScan("grid_duration", 25, "SCAN_TIME", e)}
          className={cn(
            "p-6 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 duration-700 delay-250",
            isScanned("grid_duration") && "border-green-500/30"
          )}
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.grid.duration}</span>
            {isScanned("grid_duration") && <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-1 rounded">SCANNED</span>}
          </div>
          <div>
            <div className="text-5xl font-bold tracking-tighter text-foreground">7</div>
            <div className="text-xl text-foreground/80">Hrs*</div>
          </div>
        </Card>

        {/* Location */}
        <Card 
          level={1} 
          interactive 
          onClick={(e) => handleScan("grid_location", 25, "SCAN_LOC", e)}
          className={cn(
            "p-6 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300",
            isScanned("grid_location") && "border-green-500/30"
          )}
        >
           <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.grid.location}</span>
            {isScanned("grid_location") && <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-1 rounded">SCANNED</span>}
          </div>
          <div className="text-xl font-bold text-foreground max-w-[150px]">{dict.hero.location}</div>
        </Card>

        {/* Who can join */}
        <Card 
          level={3} 
          interactive 
          onClick={(e) => handleScan("grid_join", 50, "SCAN_ROLES", e)}
          className={cn(
            "relative p-6 md:col-span-2 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-350 overflow-hidden",
            isScanned("grid_join") && "border-green-500/30"
          )}
        >
          <Shard id="shard-3" className="top-4 right-4" />
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{dict.grid.join.title}</span>
            {isScanned("grid_join") && <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-1 rounded">SCANNED</span>}
          </div>
          <p className="text-2xl font-medium text-foreground leading-tight mb-2">
            {dict.grid.join.text}
          </p>
          <p className="text-sm text-foreground/60 mb-4">
            {dict.grid.no_code}
          </p>
          <div className="flex gap-2 flex-wrap">
            {["Builders", "Designers", "Marketers"].map((role) => (
              <Badge 
                key={role}
                variant={actions.includes(`grid_chip_${role.toLowerCase()}`) ? "default" : "secondary"}
                className={cn(
                  "cursor-pointer hover:bg-accent hover:text-white transition-colors",
                  actions.includes(`grid_chip_${role.toLowerCase()}`) && "bg-accent text-white"
                )}
                onClick={(e) => handleChipToggle(role, e)}
              >
                {role}
              </Badge>
            ))}
          </div>
        </Card>

      </div>
    </section>
  )
}
