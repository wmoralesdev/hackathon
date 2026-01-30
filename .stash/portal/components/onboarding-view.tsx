"use client"

import { Card } from "@/ui/card"
import { ParticipantSelect } from "./participant-select"
import type { Dictionary } from "@/i18n/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface OnboardingViewProps {
  dict: Dictionary
  content: string
}

export function OnboardingView({ dict, content }: OnboardingViewProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleSelect = async (data: { name: string; teamNumber: number; isLead: boolean }) => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        const lang = window.location.pathname.split("/")[1] || "en"
        router.push(`/${lang}/portal/auth`)
        return
      }

      // Create profile via API route
      const response = await fetch("/api/portal/create-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          participantName: data.name,
          teamNumber: data.teamNumber,
          isLead: data.isLead,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create profile")
      }

      // Redirect to portal (preserve language)
      const lang = window.location.pathname.split("/")[1]
      router.push(`/${lang}/portal`)
      router.refresh()
    } catch (error) {
      console.error("Onboarding error:", error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4 py-12">
      <Card level={3} className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
            {dict.portal?.onboarding?.title || "Enter Your Name"}
          </h1>
          <p className="text-foreground/60 font-mono text-sm">
            {dict.portal?.onboarding?.subtitle || "We'll match you with your team"}
          </p>
        </div>

        <ParticipantSelect
          content={content}
          onSelect={handleSelect}
          dict={dict}
          loading={loading}
        />
      </Card>
    </div>
  )
}
