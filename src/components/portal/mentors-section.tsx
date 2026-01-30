"use client"

import { Card } from "@/ui/card"
import { Badge } from "@/ui/badge"
import type { Dictionary } from "@/i18n/utils"

interface Mentor {
  id: string
  name: string
  title: string
  image?: string
  bio?: string
  description?: string
  mentorTypes?: string[]
}

// Map mentor IDs to their mentor types
const mentorTypesMap: Record<string, string[]> = {
  "walter-morales": ["Cursor"],
  "eleanor-menchu": ["Cursor", "Product"],
  "andre-mendez": ["Product"],
  "carol-monroe": ["Product"],
  "francis-sanchinelli": ["Vudy"],
  "andrea-de-leon": ["PAQ"],
  "nelson-zepeda": ["Backend", "Data"],
}

// Static data for jury members (images, social links)
const juryMemberStaticData: Record<string, Partial<Mentor>> = {
  "walter-morales": {
    image: "/org/walter.jpeg",
  },
  "francis-sanchinelli": {
    image: "/org/francis.webp",
  },
  "carol-monroe": {
    image: "/org/carol.webp",
  },
  "jose-bustamante": {
    image: "/org/jose.jpeg",
  },
  "andrea-de-leon": {
    image: "/org/andrea.jpeg",
  },
  "andre-mendez": {
    image: "/org/andre.jpeg",
  },
  "eleanor-menchu": {
    image: "/org/eleanor.jpeg",
  },
  "carlos-arnecke": {
    image: "/org/carlos.png",
  },
  "nelson-zepeda": {
    image: "/org/nelson.jpeg",
  },
  "surprise-guest": {
    // Skip surprise guest for mentors
  },
}

// Additional mentors not in jury
const additionalMentors: Mentor[] = [
  {
    id: "omar-alvarez",
    name: "Omar Alvarez",
    title: "CTO de Vudy",
    mentorTypes: ["Vudy"],
  },
  {
    id: "semi",
    name: "Semi",
    title: "Tech Lead de Vudy",
    mentorTypes: ["Vudy"],
  },
]

function getMentorsFromJury(dict: Dictionary): Mentor[] {
  const juryMembers = dict.jury?.members || []
  
  // Filter out surprise guest, Carlos, and Jose (not mentors), then map to mentor format
  const juryMentors = juryMembers
    .filter((member) => 
      member.id !== "surprise-guest" && 
      member.id !== "carlos-arnecke" && 
      member.id !== "jose-bustamante"
    )
    .map((member) => ({
      id: member.id,
      name: member.name,
      title: member.title,
      mentorTypes: mentorTypesMap[member.id] || [],
      ...juryMemberStaticData[member.id],
    })) as Mentor[]
  
  // Combine jury mentors with additional mentors
  return [...juryMentors, ...additionalMentors]
}

interface MentorsSectionProps {
  dict: Dictionary
}

export function MentorsSection({ dict }: MentorsSectionProps) {
  // Use jury members as mentors, with fallback to portal.mentors.list if jury data not available
  const mentors: Mentor[] = getMentorsFromJury(dict).length > 0
    ? getMentorsFromJury(dict)
    : dict.portal?.mentors?.list || []

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
          {mentors.map((mentor) => (
            <div
              key={mentor.id || mentor.name}
              className="p-4 bg-white/5 border border-white/10"
            >
              {mentor.image ? (
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="size-16 mb-3 object-cover rounded"
                />
              ) : (
                <div className="size-16 mb-3 bg-accent/20 flex items-center justify-center rounded">
                  <span className="text-accent text-2xl font-bold">
                    {mentor.name.charAt(0)}
                  </span>
                </div>
              )}
              <h4 className="font-bold mb-1">{mentor.name}</h4>
              <p className="text-xs font-mono text-foreground/50 mb-2">
                {mentor.title}
              </p>
              {mentor.mentorTypes && mentor.mentorTypes.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {mentor.mentorTypes.map((type) => (
                    <Badge key={type} variant="default" className="text-[10px]">
                      {type}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
