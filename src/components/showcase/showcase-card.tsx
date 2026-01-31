"use client"

import type { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { Badge } from "@/ui/badge"
import Link from "next/link"

export interface ShowcaseSnapshot {
  teamNumber: number
  sourceUrl: string
  screenshotUrl?: string | null
  fetchError?: string | null
}

interface ShowcaseCardProps {
  snapshot: ShowcaseSnapshot | null
  teamNumber: number
  sourceUrl?: string | null
  deliverable?: {
    productName?: string | null
    oneLiner?: string | null
    targetUsers?: string | null
    problem?: string | null
    category?: string | null
    stage?: string | null
  }
  socialPosts?: Array<{
    id: string
    platform: "x" | "linkedin"
    url: string
  }>
  dict: Dictionary
  lang: string
}

export function ShowcaseCard({
  snapshot,
  teamNumber,
  sourceUrl,
  deliverable,
  socialPosts = [],
  dict,
  lang,
}: ShowcaseCardProps) {
  // Fix boolean typing - ensure these are actual booleans, not truthy values
  const hasError = snapshot?.fetchError != null
  const hasContent = snapshot != null && !hasError

  // Get image URL (screenshot only)
  const imageUrl = snapshot?.screenshotUrl || null

  // Get title from deliverable, fallback to team number
  const title = deliverable?.productName || `${dict.showcase.card.team} ${teamNumber}`

  // Get description from deliverable one-liner
  const description = deliverable?.oneLiner || null

  return (
    <Card level={2} className="overflow-hidden">
      <Link
        href={`/${lang}/showcase/${teamNumber}`}
        className="block h-full transition-opacity hover:opacity-80"
      >
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={title || ""}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-muted-foreground text-4xl">#{teamNumber}</div>
            </div>
          )}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Badge variant="destructive">
                {dict.showcase.card.error}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline">{dict.showcase.card.team} {teamNumber}</Badge>
            {hasError && (
              <Badge variant="destructive" className="text-xs">
                {snapshot?.fetchError}
              </Badge>
            )}
          </div>

          <h3 className="mb-2 line-clamp-2 font-semibold">
            {hasContent ? title : dict.showcase.card.not_available}
          </h3>

          {hasContent && description && (
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {description}
            </p>
          )}

          {!hasContent && sourceUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                window.open(sourceUrl, "_blank", "noopener,noreferrer")
              }}
              className="mt-2 text-sm text-accent hover:underline text-left"
            >
              {sourceUrl}
            </button>
          )}

          {socialPosts.length > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">
                {dict.showcase.detail.social_posts}:
              </span>
              {socialPosts.slice(0, 2).map((post) => (
                <button
                  key={post.id}
                  type="button"
                  className="inline-flex items-center border border-white/20 bg-white/5 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    window.open(post.url, "_blank", "noopener,noreferrer")
                  }}
                >
                  {post.platform === "x" ? "X" : "LI"}
                </button>
              ))}
              {socialPosts.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{socialPosts.length - 2}
                </span>
              )}
            </div>
          )}

          <div className="mt-4 text-sm text-accent">
            {dict.showcase.card.view_details} →
          </div>
        </div>
      </Link>
    </Card>
  )
}
