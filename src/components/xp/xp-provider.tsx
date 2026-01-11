"use client"

import * as React from "react"
import { BADGES, LEVEL_THRESHOLDS } from "@/lib/xp"

interface XpState {
  xp: number
  badges: string[]
  shards: string[]
  actions: string[]
}

interface XpContextType extends XpState {
  addXp: (amount: number) => void
  unlockBadge: (badgeId: string) => void
  collectShard: (shardId: string) => void
  completeAction: (actionId: string, rewards: { xp?: number, badgeId?: string }) => boolean
  resetProgress: () => void
  // Level up state
  currentLevel: number
  justLeveledUp: boolean
  acknowledgeLevelUp: () => void
}

const XpContext = React.createContext<XpContextType | undefined>(undefined)

const STORAGE_KEY = "cursor_hackathon_xp_v1"

export function XpProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<XpState>({
    xp: 0,
    badges: [],
    shards: [],
    actions: [],
  })
  const [loaded, setLoaded] = React.useState(false)
  const [justLeveledUp, setJustLeveledUp] = React.useState(false)
  
  // Track previous level to detect level ups
  const prevLevelRef = React.useRef(0)

  // Load from storage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Ensure actions array exists for backward compatibility
        if (!parsed.actions) parsed.actions = []
        setState(parsed)
        // Initialize prevLevel so we don't trigger level up on load
        const level = LEVEL_THRESHOLDS.findIndex(threshold => parsed.xp < threshold)
        prevLevelRef.current = level === -1 ? LEVEL_THRESHOLDS.length : level
      }
    } catch (e) {
      console.error("Failed to load XP", e)
    }
    setLoaded(true)
  }, [])

  // Save to storage
  React.useEffect(() => {
    if (!loaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, loaded])

  // Calculate current level
  const currentLevel = React.useMemo(() => {
    const level = LEVEL_THRESHOLDS.findIndex(threshold => state.xp < threshold)
    return level === -1 ? LEVEL_THRESHOLDS.length : level
  }, [state.xp])

  // Check for level up
  React.useEffect(() => {
    if (!loaded) return
    
    if (currentLevel > prevLevelRef.current && prevLevelRef.current !== 0) {
      setJustLeveledUp(true)
    }
    prevLevelRef.current = currentLevel
  }, [currentLevel, loaded])

  const addXp = React.useCallback((amount: number) => {
    setState((prev) => ({ ...prev, xp: prev.xp + amount }))
  }, [])

  const unlockBadge = React.useCallback((badgeId: string) => {
    if (!BADGES[badgeId]) return
    setState((prev) => {
      if (prev.badges.includes(badgeId)) return prev
      return { ...prev, badges: [...prev.badges, badgeId] }
    })
  }, [])

  const collectShard = React.useCallback((shardId: string) => {
    setState((prev) => {
      if (prev.shards.includes(shardId)) return prev
      return { ...prev, shards: [...prev.shards, shardId] }
    })
  }, [])

  const completeAction = React.useCallback((actionId: string, rewards: { xp?: number, badgeId?: string }) => {
    let completed = false
    setState((prev) => {
      if (prev.actions.includes(actionId)) return prev
      
      completed = true
      const updates = {
        ...prev,
        actions: [...prev.actions, actionId]
      }
      
      if (rewards.xp) {
        updates.xp += rewards.xp
      }
      
      if (rewards.badgeId && !prev.badges.includes(rewards.badgeId) && BADGES[rewards.badgeId]) {
        updates.badges = [...prev.badges, rewards.badgeId]
      }
      
      return updates
    })
    return completed
  }, [])

  const resetProgress = React.useCallback(() => {
    setState({ xp: 0, badges: [], shards: [], actions: [] })
    prevLevelRef.current = 0
    // Force reload to clear any local component state
    window.location.reload()
  }, [])

  const acknowledgeLevelUp = React.useCallback(() => {
    setJustLeveledUp(false)
  }, [])

  return (
    <XpContext.Provider value={{ 
      ...state, 
      addXp, 
      unlockBadge, 
      collectShard,
      completeAction,
      resetProgress,
      currentLevel,
      justLeveledUp,
      acknowledgeLevelUp
    }}>
      {children}
    </XpContext.Provider>
  )
}

export function useXp() {
  const context = React.useContext(XpContext)
  if (!context) {
    throw new Error("useXp must be used within XpProvider")
  }
  return context
}
