"use client"

import * as React from "react"
import { Card } from "@/ui/card"
import { Button } from "@/ui/button"
import { Badge } from "@/ui/badge"
import { createClient } from "@/lib/supabase/client"
import type { Dictionary } from "@/i18n/utils"

interface DeliverableFormProps {
  teamNumber: number
  existingDeliverable?: {
    saasUrl?: string | null
    updatedAt?: Date | string
    submissions?: Array<{
      id: string
      action: string
      value: string
      submittedAt: Date | string
      submittedBy: {
        participantName: string
      }
    }>
  }
  dict: Dictionary
}

export function DeliverableForm({
  teamNumber,
  existingDeliverable,
  dict,
}: DeliverableFormProps) {
  const [saasUrl, setSaasUrl] = React.useState(existingDeliverable?.saasUrl || "")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)
  const [isSynced, setIsSynced] = React.useState(true)
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(
    existingDeliverable?.updatedAt ? new Date(existingDeliverable.updatedAt) : null
  )

  // Supabase Realtime subscription for team sync
  React.useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel(`deliverables:${teamNumber}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "deliverables",
          filter: `team_number=eq.${teamNumber}`,
        },
        (payload) => {
          setIsSynced(true)
          if (payload.new) {
            const newData = payload.new as {
              saas_url?: string | null
              updated_at?: string
            }
            setSaasUrl(newData.saas_url || "")
            if (newData.updated_at) {
              setLastUpdated(new Date(newData.updated_at))
            }
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setIsSynced(true)
        } else if (status === "CHANNEL_ERROR") {
          setIsSynced(false)
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [teamNumber])

  const isValidUrl = (url: string) => {
    if (!url.trim()) return false
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const formatTimeAgo = (date: Date | null) => {
    if (!date) return ""
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return dict.portal?.deliverables?.just_now || "just now"
    if (diffMins < 60) return `${diffMins} ${dict.portal?.deliverables?.minutes_ago || "min ago"}`
    if (diffHours < 24) return `${diffHours} ${dict.portal?.deliverables?.hours_ago || "hours ago"}`
    return `${diffDays} ${dict.portal?.deliverables?.days_ago || "days ago"}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!saasUrl.trim()) {
      setError(dict.portal?.deliverables?.saas_required || "SaaS URL is required")
      return
    }

    if (!isValidUrl(saasUrl)) {
      setError(dict.portal?.deliverables?.invalid_urls || "Please enter valid URLs")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/portal/submit-deliverable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamNumber,
          saasUrl,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit deliverables")
      }

      const data = await response.json()
      setSuccess(true)
      setLastUpdated(new Date())
      setTimeout(() => setSuccess(false), 3000)

      // Update local state with response
      if (data.deliverable) {
        setSaasUrl(data.deliverable.saasUrl || "")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const hasSubmitted = !!saasUrl

  return (
    <Card level={2} className="p-6">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-mono text-foreground/60 mb-1 uppercase tracking-wider">
              {dict.portal?.deliverables?.title || "Deliverables"}
            </h3>
            <p className="text-foreground/50 text-sm">
              {dict.portal?.deliverables?.subtitle || "Submit your SaaS landing page and social media post URLs"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSynced ? "bg-green-500" : "bg-yellow-500"}`} />
            <span className="text-xs text-foreground/50 font-mono">
              {isSynced
                ? dict.portal?.deliverables?.synced || "Synced"
                : dict.portal?.deliverables?.syncing || "Syncing..."}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SaaS URL Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="saas-url" className="block text-sm font-mono text-foreground/70">
                <span>{dict.portal?.deliverables?.saas_url || "SaaS Landing Page URL"}</span> *
              </label>
              {saasUrl && (
                <Badge variant="secondary" className="text-xs">
                  <span className="mr-1">✓</span>
                  {dict.portal?.deliverables?.submitted || "Submitted"}
                </Badge>
              )}
            </div>
            <input
              id="saas-url"
              type="url"
              value={saasUrl}
              onChange={(e) => setSaasUrl(e.target.value)}
              placeholder={dict.portal?.deliverables?.saas_placeholder || "https://your-saas-site.com"}
              className="w-full px-4 py-3 bg-background/50 border border-white/10 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
              required
              aria-required="true"
            />
            {lastUpdated && saasUrl && (
              <p className="text-xs text-foreground/40 mt-1 font-mono">
                {dict.portal?.deliverables?.last_updated || "Last updated"} {formatTimeAgo(lastUpdated)}
              </p>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
              {dict.portal?.deliverables?.submitted || "Submitted!"}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? dict.portal?.deliverables?.submitting || "Submitting..."
              : hasSubmitted
              ? dict.portal?.deliverables?.update || "Update Deliverables"
              : dict.portal?.deliverables?.submit || "Submit Deliverables"}
          </Button>
        </form>
      </div>
    </Card>
  )
}
