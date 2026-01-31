"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function PortalBackdrop({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative min-h-screen w-full overflow-x-hidden", className)}>
      {/* Fixed Background Layers */}
      <div className="fixed inset-0 -z-50 bg-background" />
      
      {/* Cyber Grid - subtle animation */}
      <div className="fixed inset-0 -z-40 bg-[linear-gradient(rgba(245,78,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,78,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Ambient Glow */}
      <div className="fixed top-[-20%] left-[20%] w-[60%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-30 mix-blend-screen" />

      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  )
}
