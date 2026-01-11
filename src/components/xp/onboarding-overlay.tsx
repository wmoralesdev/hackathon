"use client"

import * as React from "react"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"

export function OnboardingOverlay() {
  const [show, setShow] = React.useState(false)
  const [step, setStep] = React.useState(0)

  React.useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("cursor_hackathon_onboarding_v1")
    if (!hasSeenOnboarding) {
      // Small delay to let page load first
      setTimeout(() => setShow(true), 1000)
    }
  }, [])

  const handleComplete = () => {
    localStorage.setItem("cursor_hackathon_onboarding_v1", "true")
    setShow(false)
  }

  if (!show) return null

  const steps = [
    {
      title: "INITIALIZING ENVIRONMENT...",
      content: (
        <div className="space-y-4">
          <p>Welcome to the Cursor Hackathon platform.</p>
          <p>This is not just a landing page. It&apos;s a <span className="text-accent font-bold">Builder Simulation</span>.</p>
        </div>
      )
    },
    {
      title: "EARN XP & LEVEL UP",
      content: (
        <div className="space-y-4">
          <p>Interact with elements to earn XP and unlock badges.</p>
          <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80 font-mono">
            <li>Debug glitchy text</li>
            <li>Commit timeline items</li>
            <li>Deploy components</li>
            <li>Use <span className="bg-white/10 px-1 rounded">Cmd+K</span> for secrets</li>
          </ul>
        </div>
      )
    },
    {
      title: "SYSTEM READY",
      content: (
        <div className="space-y-4">
          <p>Your session has begun. Explore, build, and ship.</p>
          <p className="text-xs text-foreground/50 font-mono">
            WARNING: Konami code is deprecated. Use real shortcuts.
          </p>
        </div>
      )
    }
  ]

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl">
      <Card level={2} className="w-full max-w-md p-8 border-accent/20 shadow-[0_0_50px_rgba(245,78,0,0.2)] animate-in zoom-in-95 duration-300">
        <div className="font-mono text-xs text-accent mb-4 border-b border-accent/20 pb-2 flex justify-between">
           <span>BOOT_SEQUENCE_V1.0</span>
           <span>STEP {step + 1}/{steps.length}</span>
        </div>

        <h2 className="text-2xl font-bold mb-4 font-mono">{steps[step].title}</h2>
        
        <div className="min-h-[120px] mb-8 text-foreground/80 leading-relaxed">
          {steps[step].content}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-1">
             {steps.map((s, i) => (
                <div key={s.title} className={`h-1 w-8 rounded-full transition-colors ${i <= step ? 'bg-accent' : 'bg-white/10'}`} />
             ))}
          </div>
          
          <Button 
            onClick={() => {
              if (step < steps.length - 1) {
                setStep(s => s + 1)
              } else {
                handleComplete()
              }
            }}
            className="font-mono"
          >
            {step < steps.length - 1 ? "NEXT >" : "ENTER SIMULATION"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
