"use client"

import * as React from "react"
import { Card } from "@/ui/card"
import type { Dictionary } from "@/i18n/utils"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  freezeTime: Date
  dict: Dictionary
}

export function CountdownTimer({ freezeTime, dict }: CountdownTimerProps) {
  const [now, setNow] = React.useState(new Date())
  const [timeRemaining, setTimeRemaining] = React.useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  })

  React.useEffect(() => {
    const updateTime = () => {
      const current = new Date()
      setNow(current)
      
      const diff = freezeTime.getTime() - current.getTime()
      const total = Math.max(0, diff)
      
      const hours = Math.floor(total / (1000 * 60 * 60))
      const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((total % (1000 * 60)) / 1000)
      
      setTimeRemaining({ hours, minutes, seconds, total })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [freezeTime])

  const isFrozen = timeRemaining.total === 0
  const isUrgent = timeRemaining.total < 30 * 60 * 1000 // Less than 30 minutes
  const isWarning = timeRemaining.total < 2 * 60 * 60 * 1000 // Less than 2 hours

  const statusColor = isFrozen
    ? "text-red-400"
    : isUrgent
    ? "text-red-400"
    : isWarning
    ? "text-yellow-400"
    : "text-green-400"

  const bgColor = isFrozen
    ? "bg-red-500/10 border-red-500/30"
    : isUrgent
    ? "bg-red-500/10 border-red-500/30"
    : isWarning
    ? "bg-yellow-500/10 border-yellow-500/30"
    : "bg-green-500/10 border-green-500/30"

  return (
    <Card level={2} className={cn("p-6", bgColor)}>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-mono text-foreground/60 mb-1 uppercase tracking-wider">
            {dict.portal?.countdown?.title || "Time Until Freeze"}
          </h3>
          {isFrozen ? (
            <p className={cn("text-2xl font-black uppercase", statusColor)}>
              {dict.portal?.countdown?.frozen || "CODE FREEZE!"}
            </p>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className={cn("text-4xl font-black tabular-nums", statusColor)}>
                {String(timeRemaining.hours).padStart(2, "0")}:
                {String(timeRemaining.minutes).padStart(2, "0")}:
                {String(timeRemaining.seconds).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-foreground/50">
            <span>{dict.portal?.countdown?.current_time || "Current Time"}</span>
            <span className="tabular-nums">
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
