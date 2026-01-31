import type { Dictionary } from "@/i18n/utils"

export interface Mentor {
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

// Map mentor IDs to shortened titles for display
const shortenedTitlesMap: Record<string, string> = {
  "walter-morales": "SOUTHWORKS | Cursor Ambassador SV",
  "francis-sanchinelli": "CEO, U3Tech & Vudy",
  "carol-monroe": "AI Builder",
  "andrea-de-leon": "COO, PAQ",
  "andre-mendez": "Insurtech Founder",
  "eleanor-menchu": "Cursor Ambassador GT",
  "nelson-zepeda": "CDO, Datasphere",
  "omar-alvarez": "CTO, Vudy",
  "jose-miguel": "Tech Lead, Vudy",
}

// Static data for mentors (images, social links)
const mentorStaticData: Record<string, Partial<Mentor>> = {
  "walter-morales": {
    image: "/org/walter.jpeg",
  },
  "francis-sanchinelli": {
    image: "/org/francis.webp",
  },
  "carol-monroe": {
    image: "/org/carol.webp",
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
  "nelson-zepeda": {
    image: "/org/nelson.jpeg",
  },
}

// Additional mentors not in jury
const additionalMentors: Mentor[] = [
  {
    id: "omar-alvarez",
    name: "Omar Alvarez",
    title: shortenedTitlesMap["omar-alvarez"] || "CTO de Vudy",
    mentorTypes: ["Vudy"],
  },
  {
    id: "jose-miguel",
    name: "Jose Miguel",
    title: shortenedTitlesMap["jose-miguel"] || "Tech Lead, Vudy",
    mentorTypes: ["Vudy"],
  },
]

/**
 * Get mentors from dictionary (portal mentors are source-of-truth)
 * Filters jury members to get mentors, excludes surprise guest, Carlos, and Jose Bustamante
 * Adds additional sponsor mentors (Omar, Jose Miguel)
 */
export function getMentors(dict: Dictionary): Mentor[] {
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
      title: shortenedTitlesMap[member.id] || member.title,
      mentorTypes: mentorTypesMap[member.id] || [],
      ...mentorStaticData[member.id],
    })) as Mentor[]
  
  // Combine jury mentors with additional mentors
  return [...juryMentors, ...additionalMentors]
}
