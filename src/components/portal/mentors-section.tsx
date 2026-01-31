"use client"

import { Card } from "@/ui/card"
import { Badge } from "@/ui/badge"
import type { Dictionary } from "@/i18n/utils"
import { PortalSectionHeader } from "./portal-section-header"
import { getMentors, type Mentor } from "@/lib/people/mentors"

interface MentorsSectionProps {
  dict: Dictionary
}

export function MentorsSection({ dict }: MentorsSectionProps) {
  // Use unified mentors helper (portal mentors are source-of-truth)
  const mentorsFromHelper = getMentors(dict)
  const mentors: Mentor[] = mentorsFromHelper.length > 0
    ? mentorsFromHelper
    : (dict.portal?.mentors?.list || []).map((m, idx) => ({
        id: `mentor-${idx}`,
        name: m.name,
        title: m.title,
        bio: m.bio,
      }))

  return (
    <Card level={2}>
      <div className="space-y-4">
        <PortalSectionHeader
          title={dict.portal?.mentors?.title || "Mentors"}
          subtitle={dict.portal?.mentors?.subtitle || "Available to help you"}
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.id || mentor.name}
              className="group relative overflow-hidden bg-black/20 border border-white/10 hover:border-accent/50 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black/50">
                {mentor.image ? (
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <span className="text-4xl font-black text-white/20">
                      {mentor.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                {/* Gradient Overlay - Higher opacity for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 pb-6">
                  {/* Badges */}
                  {mentor.mentorTypes && mentor.mentorTypes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {mentor.mentorTypes.map((type) => (
                        <Badge 
                          key={type} 
                          variant="outline" 
                          className="text-[10px] h-5 px-2 bg-black/70 backdrop-blur-sm border-white/30 text-white group-hover:border-accent/50 group-hover:text-accent transition-colors"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <h4 className="font-bold uppercase text-xl leading-tight mb-2 text-white group-hover:text-accent transition-colors">
                    {mentor.name}
                  </h4>
                  
                  <p className="font-mono text-sm text-white/80 leading-relaxed">
                    {mentor.title}
                  </p>
                </div>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-accent transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-accent transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-accent transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-accent transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
