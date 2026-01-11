"use client"

import * as React from "react"
import { useXp } from "./xp-provider"
import { useXpFloater } from "./xp-floater"
import { Modal } from "@/ui/modal"

export function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const { unlockBadge, addXp } = useXp()
  const { spawnFloater } = useXpFloater()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Fake processing
    setTimeout(() => {
      unlockBadge("PROMPT_ENGINEER")
      addXp(100)
      spawnFloater(window.innerWidth / 2, window.innerHeight / 2, "+100xp // PROMPT_ENGINEER")
      setIsOpen(false)
      setInput("")
    }, 500)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="> COMMAND PALETTE"
      className="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative">
          <span className="absolute left-4 top-3 text-accent font-mono">{">"}</span>
          <input
            type="text"
            className="w-full bg-black/50 border border-white/10 p-3 pl-8 font-mono text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="Type a command or ask AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mt-4 text-xs font-mono text-foreground/40">
          Try typing &quot;help&quot;, &quot;deploy&quot;, or just ask a question.
        </div>
      </form>
    </Modal>
  )
}
