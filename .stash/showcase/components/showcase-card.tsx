"use client"

import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { Badge } from "@/ui/badge"
import Link from "next/link"

export interface ShowcaseSnapshot {
  teamNumber: number
  sourceUrl: string
  title?: string | null
  description?: string | null
  summary?: string | null
  markdown?: string | null
  screenshotUrl?: string | null
  ogJson?: Record<string, unknown> | null
  links?: unknown
  fetchError?: string | null
}

interface ShowcaseCardProps {
  snapshot: ShowcaseSnapshot | null
  teamNumber: number
  sourceUrl?: string | null
  dict: Dictionary
  lang: string
}

export function ShowcaseCard({
  snapshot,
  teamNumber,
  sourceUrl,
  dict,
  lang,
}: ShowcaseCardProps) {
  const hasError = snapshot?.fetchError !== null && snapshot?.fetchError !== undefined
  const hasContent = snapshot && !hasError

  // Get image URL (screenshot or OG image)
  const imageUrl =
    snapshot?.screenshotUrl ||
    (snapshot?.ogJson && typeof snapshot.ogJson["og:image"] === "string"
      ? snapshot.ogJson["og:image"]
      : null)

  // Get title
  const title =
    snapshot?.title ||
    (snapshot?.ogJson && typeof snapshot.ogJson["og:title"] === "string"
      ? snapshot.ogJson["og:title"]
      : null) ||
    `${dict.showcase.card.team} ${teamNumber}`

  // Get description/summary
  const description =
    snapshot?.summary ||
    snapshot?.description ||
    (snapshot?.ogJson && typeof snapshot.ogJson["og:description"] === "string"
      ? snapshot.ogJson["og:description"]
      : null)

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
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-accent hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {sourceUrl}
            </a>
          )}

          <div className="mt-4 text-sm text-accent">
            {dict.showcase.card.view_details} →
          </div>
        </div>
      </Link>
    </Card>
  )
}
