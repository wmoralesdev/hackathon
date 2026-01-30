"use client"

import { Card } from "@/ui/card"
import type { Dictionary } from "@/i18n/utils"

interface Mentor {
  name: string
  title: string
  image?: string
  bio?: string
}

interface MentorsSectionProps {
  dict: Dictionary
}

export function MentorsSection({ dict }: MentorsSectionProps) {
  const mentors: Mentor[] = dict.portal?.mentors?.list || [
    {
      name: "Mentor from Vudy",
      title: "Vudy Team",
      bio: "Available to help with video and content creation",
    },
    {
      name: "Mentor from AI Collective",
      title: "AI Collective",
      bio: "Expert in AI and machine learning",
    },
    {
      name: "Cursor Community Mentor",
      title: "Cursor Expert",
      bio: "Helping you master Cursor features",
    },
  ]

  return (
    <Card level={2} className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-mono text-foreground/60 mb-1 uppercase tracking-wider">
            {dict.portal?.mentors?.title || "Mentors"}
          </h3>
          <p className="text-foreground/50 text-sm">
            {dict.portal?.mentors?.subtitle || "Available to help you"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="p-4 bg-white/5 border border-white/10"
            >
              {mentor.image ? (
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="size-16 mb-3 object-cover"
                />
              ) : (
                <div className="size-16 mb-3 bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-2xl font-bold">
                    {mentor.name.charAt(0)}
                  </span>
                </div>
              )}
              <h4 className="font-bold mb-1">{mentor.name}</h4>
              <p className="text-xs font-mono text-foreground/50 mb-2">
                {mentor.title}
              </p>
              {mentor.bio && (
                <p className="text-sm text-foreground/60">{mentor.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
