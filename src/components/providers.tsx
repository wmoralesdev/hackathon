"use client"

import { XpProvider } from "@/components/xp/xp-provider"
import { XpWidget } from "@/components/xp/xp-widget"
import { XpFloaterProvider } from "@/components/xp/xp-floater"
import { SyntaxSparks } from "@/components/xp/syntax-sparks"
import { CommandPalette } from "@/components/xp/command-palette"
import { LevelUpOverlay } from "@/components/xp/level-up-overlay"
import { OnboardingOverlay } from "@/components/xp/onboarding-overlay"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <XpProvider>
      <XpFloaterProvider>
        <SyntaxSparks />
        <CommandPalette />
        <LevelUpOverlay />
        <OnboardingOverlay />
        {children}
        <XpWidget />
      </XpFloaterProvider>
    </XpProvider>
  )
}
