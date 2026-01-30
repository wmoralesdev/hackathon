"use client"

import * as React from "react"
import { useXp } from "./xp-provider"
import { BADGES, LEVEL_THRESHOLDS } from "@/lib/xp"
import { Modal } from "@/ui/modal"

export function XpWidget() {
  const { xp, badges, resetProgress } = useXp()
  const [isOpen, setIsOpen] = React.useState(false)
  const [showResetConfirm, setShowResetConfirm] = React.useState(false)
  
  // Calculate level
  const level = LEVEL_THRESHOLDS.findIndex(threshold => xp < threshold) 
  const currentLevel = level === -1 ? LEVEL_THRESHOLDS.length : level
  const nextThreshold = LEVEL_THRESHOLDS[currentLevel] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  const prevThreshold = LEVEL_THRESHOLDS[currentLevel - 1] || 0
  const progress = Math.min(100, Math.max(0, ((xp - prevThreshold) / (nextThreshold - prevThreshold)) * 100))

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-8 duration-1000 flex items-end gap-2">
        {/* Reset Button (Floating) */}
        <div className="relative">
          {showResetConfirm && (
             <div className="absolute bottom-full right-0 mb-2 p-2 bg-black/90 border border-red-500/50 flex flex-col gap-2 min-w-[150px] animate-in slide-in-from-bottom-2 fade-in">
               <div className="text-[10px] text-red-500 font-mono font-bold uppercase text-center">Confirm Reset?</div>
               <div className="flex gap-2">
                 <button 
                   type="button"
                   onClick={() => setShowResetConfirm(false)}
                   className="flex-1 bg-white/10 hover:bg-white/20 text-xs py-1 rounded font-mono"
                 >
                   NO
                 </button>
                 <button 
                   type="button"
                   onClick={() => {
                     resetProgress()
                     setShowResetConfirm(false)
                   }}
                   className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1 rounded font-mono"
                 >
                   YES
                 </button>
               </div>
             </div>
          )}
          
          <button
             type="button"
             onClick={() => setShowResetConfirm(!showResetConfirm)}
             className="h-8 w-8 bg-black/80 backdrop-blur-md border border-white/10 hover:border-red-500/50 flex items-center justify-center text-white/40 hover:text-red-500 transition-colors rounded-sm"
             aria-label="Reset Progress"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><title>Reset</title><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
        </div>

        {/* XP Widget */}
        <button 
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-4 bg-black/80 backdrop-blur-md border border-white/10 p-2 pr-6 clip-path-polygon hover:border-accent/50 transition-all hover:scale-[1.02]"
          style={{
            clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
          }}
        >
          {/* Level Hexagon */}
          <div className="relative flex items-center justify-center w-12 h-12 bg-card-02 clip-path-hexagon">
             <div className="absolute inset-0 bg-accent/20 animate-pulse" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
             <span className="relative z-10 font-bold text-xl font-mono text-white">{currentLevel}</span>
             {/* Hexagon Border */}
             <div className="absolute inset-0 border-2 border-accent opacity-50" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
          </div>

          <div className="flex flex-col items-start min-w-[140px]">
            <div className="flex w-full justify-between items-end mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/60 group-hover:text-accent">Builder XP</span>
              <span className="font-mono font-bold text-accent">{Math.floor(xp)} <span className="text-[10px] text-foreground/40">/ {nextThreshold}</span></span>
            </div>
            
            {/* Custom HP Bar */}
            <div className="h-2 w-full bg-black/50 border border-white/10 relative overflow-hidden">
               {/* Grid texture on bar bg */}
               <div className="absolute inset-0 bg-size-[4px_100%] bg-[linear-gradient(90deg,transparent_2px,rgba(0,0,0,0.8)_2px)]" />
               
               {/* Fill */}
               <div 
                 className="h-full bg-linear-to-r from-accent to-orange-500 transition-all duration-500 ease-out"
                 style={{ width: `${progress}%` }}
               />
               
               {/* Shine effect */}
               <div className="absolute top-0 bottom-0 w-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
          </div>
          
          {/* Corner Decor */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="BUILDER STATUS"
        className="backdrop:bg-black/80 border border-accent/20"
      >
        <div className="space-y-8 font-mono">
          <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 opacity-20 text-xs">ID: BUILDER-{currentLevel}</div>
            <div className="text-5xl font-black text-white/90">{Math.floor(xp)}</div>
            <div>
              <div className="text-xs uppercase text-accent mb-1">Current Rank</div>
              <div className="text-xl font-bold">LEVEL {currentLevel} BUILDER</div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-sm uppercase tracking-widest border-b border-white/10 pb-2 flex justify-between items-center">
              <span>Achievements</span>
              <span className="text-xs text-foreground/40">{badges.length} / {Object.keys(BADGES).length} UNLOCKED</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(BADGES).map((badge) => {
                const isUnlocked = badges.includes(badge.id)
                return (
                  <div 
                    key={badge.id} 
                    className={`relative group p-3 border transition-all ${isUnlocked ? 'bg-accent/10 border-accent/50' : 'bg-black/40 border-white/5 opacity-50 grayscale'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <div className="font-bold text-xs uppercase mb-1">{badge.name}</div>
                        <div className="text-[10px] text-foreground/50 leading-tight">{badge.description}</div>
                      </div>
                    </div>
                    {isUnlocked && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_5px_rgba(245,78,0,0.8)]" />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
