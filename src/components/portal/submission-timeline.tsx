"use client"

import * as React from "react"
import { Card } from "@/ui/card"
import type { Dictionary } from "@/i18n/utils"

interface DeliverableSubmission {
  id: string
  action: string
  value: string
  submittedAt: Date | string
  submittedBy: {
    participantName: string
  }
}

interface SocialPost {
  id: string
  url: string
  platform: "x" | "linkedin"
  submittedAt: Date | string
  submittedBy: { participantName: string }
  removedAt?: Date | string | null
  removedBy?: { participantName: string } | null
}

interface SubmissionTimelineProps {
  deliverableSubmissions?: DeliverableSubmission[]
  socialPosts?: SocialPost[]
  dict: Dictionary
}

export function SubmissionTimeline({
  deliverableSubmissions = [],
  socialPosts = [],
  dict,
}: SubmissionTimelineProps) {
  const items = React.useMemo(() => {
    type Item =
      | { kind: "deliverable"; at: Date; who: string; action: string; value: string; id: string }
      | {
          kind: "post"
          at: Date
          who: string
          action: "post_added" | "post_removed"
          value: string
          platform: "x" | "linkedin"
          id: string
        }

    const deliverableItems: Item[] = deliverableSubmissions
      .map((s) => ({
        kind: "deliverable" as const,
        at: new Date(s.submittedAt),
        who: s.submittedBy.participantName,
        action: s.action,
        value: s.value,
        id: s.id,
      }))
      .filter((x) => Number.isFinite(x.at.getTime()))

    const postItems: Item[] = socialPosts.flatMap((p) => {
      const addedAt = new Date(p.submittedAt)
      const added: Item | null = Number.isFinite(addedAt.getTime())
        ? {
            kind: "post",
            at: addedAt,
            who: p.submittedBy.participantName,
            action: "post_added",
            value: p.url,
            platform: p.platform,
            id: `${p.id}:added`,
          }
        : null

      const removedAt = p.removedAt ? new Date(p.removedAt) : null
      const removed: Item | null =
        removedAt && Number.isFinite(removedAt.getTime()) && p.removedBy?.participantName
          ? {
              kind: "post",
              at: removedAt,
              who: p.removedBy.participantName,
              action: "post_removed",
              value: p.url,
              platform: p.platform,
              id: `${p.id}:removed`,
            }
          : null

      return [added, removed].filter(Boolean) as Item[]
    })

    return [...deliverableItems, ...postItems].sort((a, b) => b.at.getTime() - a.at.getTime())
  }, [deliverableSubmissions, socialPosts])

  const formatTimeAgo = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date
    const now = new Date()
    const diffMs = now.getTime() - dateObj.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return dict.portal?.deliverables?.just_now || "just now"
    if (diffMins < 60) return `${diffMins} ${dict.portal?.deliverables?.minutes_ago || "min ago"}`
    if (diffHours < 24) return `${diffHours} ${dict.portal?.deliverables?.hours_ago || "hours ago"}`
    return `${diffDays} ${dict.portal?.deliverables?.days_ago || "days ago"}`
  }

  const getActionLabel = (action: string, value: string) => {
    switch (action) {
      case "saas_created":
        return dict.portal?.timeline?.saas_created?.replace("{url}", value) || `Submitted SaaS URL: ${value}`
      case "saas_updated":
        return dict.portal?.timeline?.saas_updated?.replace("{url}", value) || `Updated SaaS URL to ${value}`
      case "post_added":
        return dict.portal?.timeline?.post_added?.replace("{url}", value) || `Added social post: ${value}`
      case "post_removed":
        return dict.portal?.timeline?.post_removed?.replace("{url}", value) || `Removed social post: ${value}`
      default:
        return `${action}: ${value}`
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <Card level={2} className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-mono text-foreground/60 mb-1 uppercase tracking-wider">
            {dict.portal?.timeline?.title || "Submission Timeline"}
          </h3>
          <p className="text-foreground/50 text-sm">
            {dict.portal?.timeline?.subtitle || "History of all team submissions"}
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 bg-white/5 border border-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/90">
                  <span className="font-semibold">{item.who}</span>{" "}
                  {getActionLabel(item.action, item.value)}
                </p>
                <p className="text-xs text-foreground/40 font-mono mt-1">
                  {formatTimeAgo(item.at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
