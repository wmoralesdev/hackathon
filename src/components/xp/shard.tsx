"use client"

import * as React from "react"
import { useXp } from "@/components/xp/xp-provider"
import { XP_VALUES } from "@/lib/xp"
import { cn } from "@/lib/utils"

export function Shard({ id, className }: { id: string; className?: string }) {
  const { collectShard, shards, addXp, unlockBadge } = useXp()
  const isCollected = shards.includes(id)
  const [isCollecting, setIsCollecting] = React.useState(false)

  React.useEffect(() => {
    if (shards.length >= 3) {
      unlockBadge("SCAVENGER")
    }
  }, [shards, unlockBadge])

  const handleCollect = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isCollected || isCollecting) return

    setIsCollecting(true)
    // Small delay for animation?
    setTimeout(() => {
      collectShard(id)
      addXp(XP_VALUES.COLLECT_SHARD)
    }, 500)
  }

  if (isCollected) return null

  return (
    <button
      onClick={handleCollect}
      className={cn(
        "absolute z-20 flex size-8 items-center justify-center transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-accent rounded-full",
        isCollecting ? "animate-ping opacity-0" : "animate-bounce duration-[3000ms]",
        className
      )}
      aria-label="Collect Cursor Shard"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 text-accent drop-shadow-[0_0_8px_rgba(245,78,0,0.8)]"
      >
        <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.41L18.59 12 12 18.59 5.41 12 12 5.41z" />
      </svg>
    </button>
  )
}
