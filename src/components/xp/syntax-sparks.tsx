"use client"

import * as React from "react"

interface Spark {
  id: number
  x: number
  y: number
  symbol: string
  color: string
}

const SYMBOLS = ["{ }", "</>", "++", "&&", ";", "=>", "[]", "#", "$"]
const COLORS = ["text-accent", "text-blue-500", "text-green-500", "text-yellow-500", "text-purple-500"]

export function SyntaxSparks() {
  const [sparks, setSparks] = React.useState<Spark[]>([])
  const lastClickTimeRef = React.useRef(0)
  const comboRef = React.useRef(0)

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Calculate Combo / APM
      const now = Date.now()
      if (now - lastClickTimeRef.current < 500) {
        comboRef.current++
      } else {
        comboRef.current = 1
      }
      lastClickTimeRef.current = now

      // Spawn spark
      const id = now
      const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      
      setSparks(prev => [...prev, { id, x: e.clientX, y: e.clientY, symbol, color }])

      // Cleanup
      setTimeout(() => {
        setSparks(prev => prev.filter(s => s.id !== id))
      }, 1000)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {sparks.map(spark => (
        <div
          key={spark.id}
          className={`absolute font-mono font-bold text-sm select-none animate-spark ${spark.color}`}
          style={{ 
            left: spark.x, 
            top: spark.y,
            textShadow: '0 0 10px currentColor'
          }}
        >
          {spark.symbol}
        </div>
      ))}
    </div>
  )
}
