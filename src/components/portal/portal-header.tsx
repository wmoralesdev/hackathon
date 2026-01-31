"use client"

import * as React from "react"
import { Badge } from "@/ui/badge"
import { cn } from "@/lib/utils"

interface PortalHeaderProps {
  title: string
  description?: string
  badge?: string
  children?: React.ReactNode
  className?: string
}

export function PortalHeader({ title, description, badge, children, className }: PortalHeaderProps) {
  return (
    <div className={cn("relative mb-8 md:mb-12", className)}>
      {/* Decorative line */}
      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-transparent opacity-20 hidden lg:block" />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          {badge && (
            <Badge variant="outline" className="border-accent/20 text-accent/80 animate-in fade-in slide-in-from-left-2 duration-500">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 animate-pulse" />
              {badge}
            </Badge>
          )}
          
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-lg text-foreground/60 font-mono max-w-xl">
                {description}
              </p>
            )}
          </div>
        </div>

        {children && (
          <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
            {children}
          </div>
        )}
      </div>
      
      {/* Bottom border with accent */}
      <div className="mt-8 h-px w-full bg-gradient-to-r from-accent/30 via-white/5 to-transparent" />
    </div>
  )
}
