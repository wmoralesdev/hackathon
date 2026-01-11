"use client"

import * as React from "react"

interface Floater {
  id: number
  x: number
  y: number
  text: string
  color: string
  animationClass: string
}

type XpFloaterContextType = {
  spawnFloater: (x: number, y: number, text: string, color?: string, animationClass?: string) => void
}

const XpFloaterContext = React.createContext<XpFloaterContextType | undefined>(undefined)

export function useXpFloater() {
  const context = React.useContext(XpFloaterContext)
  if (!context) {
    throw new Error("useXpFloater must be used within XpFloaterProvider")
  }
  return context
}

export function XpFloaterProvider({ children }: { children: React.ReactNode }) {
  const [floaters, setFloaters] = React.useState<Floater[]>([])

  const spawnFloater = React.useCallback((x: number, y: number, text: string, color = "text-green-400", animationClass = "animate-float-up") => {
    const id = Date.now() + Math.random()
    setFloaters(prev => [...prev, { id, x, y, text, color, animationClass }])

    // Increase timeout for slower animations
    const timeout = animationClass.includes("slow") ? 2500 : 1500

    setTimeout(() => {
      setFloaters(prev => prev.filter(f => f.id !== id))
    }, timeout)
  }, [])

  return (
    <XpFloaterContext.Provider value={{ spawnFloater }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
        {floaters.map(f => (
          <div
            key={f.id}
            className={`absolute font-mono font-bold text-sm select-none ${f.animationClass} ${f.color}`}
            style={{ 
              left: f.x, 
              top: f.y,
              textShadow: '0 0 5px rgba(0,0,0,0.5)'
            }}
          >
            {f.text}
          </div>
        ))}
      </div>
    </XpFloaterContext.Provider>
  )
}
