"use client"

import { Card } from "@/ui/card"
import type { Dictionary } from "@/i18n/utils"

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
    <Card level={2} className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-mono text-foreground/60 mb-1 uppercase tracking-wider">
            {dict.portal?.tips?.title || "Tips"}
          </h3>
          <p className="text-foreground/50 text-sm">
            {dict.portal?.tips?.subtitle || "Helpful advice for the hackathon"}
          </p>
        </div>

        <ul className="space-y-3 pt-4 border-t border-white/10">
          {tips.map((tip, index) => (
            <li key={`tip-${tip.substring(0, 20)}-${index}`} className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-accent text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-foreground/70 text-sm flex-1">{tip}</p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
