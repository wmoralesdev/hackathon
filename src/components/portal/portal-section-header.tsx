"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PortalSectionHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  className?: string
}

export function PortalSectionHeader({ title, subtitle, action, className }: PortalSectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)}>
      <div className="space-y-1">
        <h3 className="text-sm font-bold font-mono text-accent/80 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1 h-4 bg-accent/40 block" />
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-foreground/50 pl-3">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}
