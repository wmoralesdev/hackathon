export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  xpRequired?: number
  condition?: string
}

export const BADGES: Record<string, Badge> = {
  WARMUP_READY: {
    id: "WARMUP_READY",
    name: "Warm-up Ready",
    description: "Checked out the training session",
    icon: "🔥",
  },
  TEAM_BUILDER: {
    id: "TEAM_BUILDER",
    name: "Team Builder",
    description: "Learned about team formation",
    icon: "🤝",
  },
  DEMO_DAY: {
    id: "DEMO_DAY",
    name: "Demo Day",
    description: "Reviewed the judging criteria",
    icon: "🏆",
  },
  SCAVENGER: {
    id: "SCAVENGER",
    name: "Cursor Hunter",
    description: "Found all hidden shards",
    icon: "💎",
  },
  PROMPT_ENGINEER: {
    id: "PROMPT_ENGINEER",
    name: "Prompt Engineer",
    description: "Used the Command Palette",
    icon: "⌨️",
  },
  DEBUGGER: {
    id: "DEBUGGER",
    name: "Bug Fixer",
    description: "Fixed the glitch",
    icon: "🐛",
  },
  SHIPPED_IT: {
    id: "SHIPPED_IT",
    name: "Shipped It",
    description: "Deployed to production",
    icon: "🚢",
  },
  REGISTERED: {
    id: "REGISTERED",
    name: "Registered",
    description: "Clicked the registration button",
    icon: "🚀",
  }
}

export const XP_VALUES = {
  VIEW_SECTION: 20,
  INTERACT_CARD: 30,
  COLLECT_SHARD: 50,
  REGISTER_CLICK: 100,
  COMPLETE_ALL: 500,
}

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000]

export type XPAction = keyof typeof XP_VALUES
