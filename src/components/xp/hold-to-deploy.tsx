"use client"

import * as React from "react"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"

interface HoldToDeployButtonProps {
  onComplete: () => void
  children: React.ReactNode
  className?: string
}

export function HoldToDeployButton({ onComplete, children, className }: HoldToDeployButtonProps) {
  const [progress, setProgress] = React.useState(0)
  const [isHolding, setIsHolding] = React.useState(false)
  const [isDeployed, setIsDeployed] = React.useState(false)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)
  const { unlockBadge, addXp } = useXp()
  const { spawnFloater } = useXpFloater()

  const startHold = () => {
    if (isDeployed) return
    setIsHolding(true)
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          handleDeploy()
          return 100
        }
        return prev + 2 // Speed of deploy
      })
    }, 20)
  }

  const endHold = () => {
    if (isDeployed) return
    setIsHolding(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    setProgress(0)
  }

  const handleDeploy = () => {
    setIsDeployed(true)
    unlockBadge("SHIPPED_IT")
    addXp(200)
    spawnFloater(window.innerWidth / 2, window.innerHeight / 2, "🚀 DEPLOYED TO PROD +200xp", "text-purple-400")
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={endHold}
      onMouseLeave={endHold}
      onTouchStart={startHold}
      onTouchEnd={endHold}
      disabled={isDeployed}
      className={cn(
        "relative overflow-hidden group select-none",
        className
      )}
    >
      {/* Progress Fill */}
      <div 
        className="absolute inset-0 bg-accent/20 transition-all duration-0 ease-linear"
        style={{ width: `${progress}%` }}
      />
      
      <div className="relative z-10 flex items-center gap-2">
        {isDeployed ? "DEPLOYED!" : children}
        {isHolding && !isDeployed && (
          <span className="text-xs font-mono animate-pulse">{Math.floor(progress)}%</span>
        )}
      </div>

      {/* Helper Text */}
      {!isDeployed && (
        <div className="absolute -bottom-6 left-0 right-0 text-[10px] font-mono text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity">
          Hold to deploy
        </div>
      )}
    </button>
  )
}
