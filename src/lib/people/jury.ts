import type { Dictionary } from "@/i18n/utils"

export interface JuryMember {
  id: string
  name: string
  title: string
  description?: string
  image?: string
  x?: string
  linkedin?: string
  isSurpriseGuest?: boolean
}

// Static data that doesn't need localization (images, social links)
const juryMemberStaticData: Record<string, Partial<JuryMember>> = {
  "walter-morales": {
    image: "/org/walter.jpeg",
    x: "https://x.com/wmoralesdev"
  },
  "francis-sanchinelli": {
    image: "/org/francis.webp",
    x: "https://x.com/fsanchinelli"
  },
  "carol-monroe": {
    image: "/org/carol.webp",
    x: "https://x.com/CarolMonroe"
  },
  "jose-bustamante": {
    image: "/org/jose.jpeg",
    linkedin: "https://www.linkedin.com/in/jose-andres-bustamante-32b891206/"
  },
  "andrea-de-leon": {
    image: "/org/andrea.jpeg",
    linkedin: "https://www.linkedin.com/in/andrea-de-leon-251374130/"
  },
  "andre-mendez": {
    image: "/org/andre.jpeg",
    linkedin: "https://www.linkedin.com/in/andremendezb/"
  },
  "eleanor-menchu": {
    image: "/org/eleanor.jpeg",
    linkedin: "https://www.linkedin.com/in/eleanormm2/?locale=es_ES"
  },
  "carlos-arnecke": {
    image: "/org/carlos.png",
    linkedin: "https://www.linkedin.com/in/arnecke/"
  },
  "nelson-zepeda": {
    image: "/org/nelson.jpeg",
    linkedin: "https://www.linkedin.com/in/nelsonzepeda733/"
  },
  "surprise-guest": {
    isSurpriseGuest: true
  },
}

/**
 * Get jury members from dictionary with static assets merged
 * This is the source-of-truth for jury data used across landing and evento
 */
export function getJuryMembers(dict: Dictionary): JuryMember[] {
  return (dict.jury?.members || []).map((member) => ({
    ...member,
    ...juryMemberStaticData[member.id],
  })) as JuryMember[]
}
