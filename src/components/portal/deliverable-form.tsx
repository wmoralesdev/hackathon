"use client"

import * as React from "react"
import { Card } from "@/ui/card"
import { Button } from "@/ui/button"
import { Badge } from "@/ui/badge"
import { createClient } from "@/lib/supabase/client"
import type { Dictionary } from "@/i18n/utils"
import { PortalSectionHeader } from "./portal-section-header"
import {
  useDeliverableForm,
  type DeliverableFieldKey,
  type DeliverableRealtimePayload,
  type ExistingDeliverable,
} from "./hooks/use-deliverable-form"

interface DeliverableFormProps {
  teamNumber: number
  existingDeliverable?: ExistingDeliverable & {
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
  const {
    fields,
    loading,
    error,
    success,
    isSynced,
    lastUpdated,
    setField,
    setStatus,
    applyRealtimeUpdate,
    applySubmittedDeliverable,
  } = useDeliverableForm(existingDeliverable)
  const { saasUrl, productName, oneLiner, targetUsers, problem, category, stage } = fields

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
          setStatus({ isSynced: true })
          if (payload.new) {
            applyRealtimeUpdate(payload.new as DeliverableRealtimePayload)
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setStatus({ isSynced: true })
        } else if (status === "CHANNEL_ERROR") {
          setStatus({ isSynced: false })
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [applyRealtimeUpdate, setStatus, teamNumber])

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
    setStatus({ error: null, success: false })

    if (!saasUrl.trim()) {
      setStatus({ error: dict.portal?.deliverables?.saas_required || "SaaS URL is required" })
      return
    }

    if (!isValidUrl(saasUrl)) {
      setStatus({ error: dict.portal?.deliverables?.invalid_urls || "Please enter valid URLs" })
      return
    }

    // Validate required showcase fields
    if (!productName.trim()) {
      setStatus({ error: dict.portal?.deliverables?.product_name_required || "Product name is required" })
      return
    }

    if (!oneLiner.trim()) {
      setStatus({ error: dict.portal?.deliverables?.one_liner_required || "One-liner description is required" })
      return
    }

    setStatus({ loading: true })

    try {
      const response = await fetch("/api/portal/submit-deliverable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamNumber,
          saasUrl,
          productName: productName.trim() || null,
          oneLiner: oneLiner.trim() || null,
          targetUsers: targetUsers.trim() || null,
          problem: problem.trim() || null,
          category: category.trim() || null,
          stage: stage.trim() || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit deliverables")
      }

      const data = await response.json()
      setStatus({ success: true, lastUpdated: new Date() })
      setTimeout(() => setStatus({ success: false }), 3000)

      // Update local state with response
      if (data.deliverable) {
        applySubmittedDeliverable(data.deliverable)
      }
    } catch (err) {
      setStatus({ error: err instanceof Error ? err.message : "An error occurred" })
    } finally {
      setStatus({ loading: false })
    }
  }

  const hasSubmitted = !!saasUrl
  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setField(event.target.name as DeliverableFieldKey, event.target.value)
    },
    [setField]
  )

  return (
    <Card level={2}>
      <div className="space-y-6">
        <PortalSectionHeader
          title={dict.portal?.deliverables?.title || "Deliverables"}
          subtitle={dict.portal?.deliverables?.subtitle || "Submit your SaaS landing page and social media post URLs"}
          action={
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isSynced ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-yellow-500"}`} />
              <span className="text-xs text-foreground/50 font-mono hidden sm:inline-block">
                {isSynced
                  ? dict.portal?.deliverables?.synced || "Synced"
                  : dict.portal?.deliverables?.syncing || "Syncing..."}
              </span>
            </div>
          }
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SaaS URL Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="saas-url" className="block text-sm font-mono text-foreground/70">
                <span>{dict.portal?.deliverables?.saas_url || "SaaS Landing Page URL"}</span> *
              </label>
              {saasUrl && (
                <Badge variant="secondary" className="text-xs border-green-500/30 text-green-400 bg-green-500/10">
                  <span className="mr-1">✓</span>
                  {dict.portal?.deliverables?.submitted || "Submitted"}
                </Badge>
              )}
            </div>
            <input
              id="saas-url"
              name="saasUrl"
              type="url"
              value={saasUrl}
              onChange={handleInputChange}
              placeholder={dict.portal?.deliverables?.saas_placeholder || "https://your-saas-site.com"}
              className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-foreground/20"
              required
              aria-required="true"
            />
            {lastUpdated && saasUrl && (
              <p className="text-xs text-foreground/40 mt-1 font-mono">
                {dict.portal?.deliverables?.last_updated || "Last updated"} {formatTimeAgo(lastUpdated)}
              </p>
            )}
          </div>

          {/* Product Name */}
          <div>
            <label htmlFor="product-name" className="block text-sm font-mono text-foreground/70 mb-2">
              <span>{dict.portal?.deliverables?.product_name || "Product Name"}</span> *
            </label>
            <input
              id="product-name"
              name="productName"
              type="text"
              value={productName}
              onChange={handleInputChange}
              placeholder={dict.portal?.deliverables?.product_name_placeholder || "e.g. Polar"}
              className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-foreground/20"
              required
              aria-required="true"
            />
          </div>

          {/* One-liner */}
          <div>
            <label htmlFor="one-liner" className="block text-sm font-mono text-foreground/70 mb-2">
              <span>{dict.portal?.deliverables?.one_liner || "One-liner Description"}</span> *
            </label>
            <textarea
              id="one-liner"
              name="oneLiner"
              value={oneLiner}
              onChange={handleInputChange}
              placeholder={dict.portal?.deliverables?.one_liner_placeholder || "A brief 1-2 sentence description of your product"}
              rows={2}
              className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-foreground/20 resize-none"
              required
              aria-required="true"
            />
          </div>

          {/* Target Users */}
          <div>
            <label htmlFor="target-users" className="block text-sm font-mono text-foreground/70 mb-2">
              <span>{dict.portal?.deliverables?.target_users || "Target Users / Customer Segment"}</span>
            </label>
            <input
              id="target-users"
              name="targetUsers"
              type="text"
              value={targetUsers}
              onChange={handleInputChange}
              placeholder={dict.portal?.deliverables?.target_users_placeholder || "e.g. Developers, Small businesses, Students"}
              className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-foreground/20"
            />
          </div>

          {/* Problem */}
          <div>
            <label htmlFor="problem" className="block text-sm font-mono text-foreground/70 mb-2">
              <span>{dict.portal?.deliverables?.problem || "Problem It Solves"}</span>
            </label>
            <textarea
              id="problem"
              name="problem"
              value={problem}
              onChange={handleInputChange}
              placeholder={dict.portal?.deliverables?.problem_placeholder || "What problem does your product solve?"}
              rows={2}
              className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-foreground/20 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-mono text-foreground/70 mb-2">
              <span>{dict.portal?.deliverables?.category || "Category"}</span>
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={category}
              onChange={handleInputChange}
              placeholder={dict.portal?.deliverables?.category_placeholder || "e.g. Fintech, DevTools, Education"}
              className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-foreground/20"
            />
          </div>

          {/* Stage */}
          <div>
            <label htmlFor="stage" className="block text-sm font-mono text-foreground/70 mb-2">
              <span>{dict.portal?.deliverables?.stage || "Stage"}</span>
            </label>
            <input
              id="stage"
              name="stage"
              type="text"
              value={stage}
              onChange={handleInputChange}
              placeholder={dict.portal?.deliverables?.stage_placeholder || "e.g. Idea, MVP, Beta, Launched"}
              className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-foreground/20"
            />
          </div>

          {error && (
            <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 rounded bg-green-500/10 border border-green-500/30 text-green-400 text-sm animate-in fade-in slide-in-from-top-2">
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
