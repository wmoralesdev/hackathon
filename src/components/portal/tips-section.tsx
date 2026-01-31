"use client"

import { Card } from "@/ui/card"
import type { Dictionary } from "@/i18n/utils"
import { PortalSectionHeader } from "./portal-section-header"

interface TipsSectionProps {
  dict: Dictionary
}

export function TipsSection({ dict }: TipsSectionProps) {
  const tips = dict.portal?.tips?.items || [
    "Use Cursor's AI features to speed up development",
    "Focus on building a working MVP, not perfection",
    "Document your journey on social media",
    "Ask mentors for help when stuck",
    "Test your app early and often",
  ]

  return (
    <Card level={2}>
      <div className="space-y-4">
        <PortalSectionHeader
          title={dict.portal?.tips?.title || "Tips"}
          subtitle={dict.portal?.tips?.subtitle || "Helpful advice for the hackathon"}
        />

        <ul className="space-y-3 pt-2">
          {tips.map((tip, index) => (
            <li 
              key={`tip-${tip.substring(0, 20)}-${index}`} 
              className="flex items-start gap-3 p-3 rounded bg-white/5 border border-white/10 hover:border-accent/30 transition-colors"
            >
              <div className="size-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5 text-accent text-xs font-bold border border-accent/20">
                {index + 1}
              </div>
              <p className="text-foreground/80 text-sm flex-1 leading-relaxed">{tip}</p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
