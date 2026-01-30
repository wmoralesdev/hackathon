"use client"

import { type ReactNode } from "react"
import { Dictionary } from "@/i18n/utils"
import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import Link from "next/link"
import type { ShowcaseSnapshot } from "./showcase-card"

interface ShowcaseDetailProps {
  snapshot: ShowcaseSnapshot | null
  teamNumber: number
  sourceUrl: string | null
  lastFetchedAt: Date | null
  dict: Dictionary
  lang: string
  isAdmin?: boolean
}

export function ShowcaseDetail({
  snapshot,
  teamNumber,
  sourceUrl,
  lastFetchedAt,
  dict,
  lang,
  isAdmin = false,
}: ShowcaseDetailProps) {
  const hasError = snapshot?.fetchError !== null && snapshot?.fetchError !== undefined
  const hasContent = snapshot && !hasError

  // Get image URL
  let imageUrl: string | null = null
  if (snapshot?.screenshotUrl) {
    imageUrl = snapshot.screenshotUrl
  } else if (snapshot?.ogJson) {
    const ogJson = snapshot.ogJson as Record<string, unknown>
    if (typeof ogJson === "object" && ogJson !== null && "og:image" in ogJson && typeof ogJson["og:image"] === "string") {
      imageUrl = ogJson["og:image"]
    }
  }

  // Get title
  let title: string = `${dict.showcase.detail.team} ${teamNumber}`
  if (snapshot?.title) {
    title = snapshot.title
  } else if (snapshot?.ogJson) {
    const ogJson = snapshot.ogJson as Record<string, unknown>
    if (typeof ogJson === "object" && ogJson !== null && "og:title" in ogJson && typeof ogJson["og:title"] === "string") {
      title = ogJson["og:title"]
    }
  }

  // Get description/summary
  let description: string | null = snapshot?.summary || snapshot?.description || null
  if (!description && snapshot?.ogJson) {
    const ogJson = snapshot.ogJson as Record<string, unknown>
    if (typeof ogJson === "object" && ogJson !== null && "og:description" in ogJson && typeof ogJson["og:description"] === "string") {
      description = ogJson["og:description"]
    }
  }

  // Format last fetched date
  const lastFetchedText = lastFetchedAt
    ? `${dict.showcase.detail.last_fetched}: ${new Date(lastFetchedAt).toLocaleDateString(lang === "es" ? "es-SV" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`
    : null

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <Link
        href={`/${lang}/showcase`}
        className="mb-6 inline-flex items-center text-sm text-accent hover:underline"
      >
        ← {dict.showcase.detail.back}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="outline" className="text-lg">
            {dict.showcase.detail.team} {teamNumber}
          </Badge>
          {hasError && (
            <Badge variant="destructive">
              {snapshot?.fetchError || dict.showcase.error.unknown}
            </Badge>
          )}
        </div>

        <h1 className="mb-4 text-4xl font-bold">
          {hasContent ? title : dict.showcase.detail.not_available}
        </h1>

        {lastFetchedText && (
          <p className="text-sm text-muted-foreground">{lastFetchedText}</p>
        )}
      </div>

      {/* Image */}
      {(() => {
        if (typeof imageUrl === "string" && imageUrl.length > 0) {
          return (
            <div className="mb-8 aspect-video w-full overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          )
        }
        return null
      })() as ReactNode}

      {/* Description */}
      {hasContent && description && (
        <div className="mb-8">
          <p className="text-lg leading-relaxed">{description}</p>
        </div>
      )}

      {/* Markdown content */}
      {hasContent && snapshot?.markdown && (
        <div className="mb-8">
          <div
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: snapshot.markdown
                .replace(/\n/g, "<br />")
                .replace(/### (.*)/g, "<h3>$1</h3>")
                .replace(/## (.*)/g, "<h2>$1</h2>")
                .replace(/# (.*)/g, "<h1>$1</h1>")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>"),
            }}
          />
        </div>
      )}

      {/* Links */}
      {hasContent && snapshot?.links && Array.isArray(snapshot.links) && snapshot.links.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">{dict.showcase.detail.links}</h2>
          <ul className="space-y-2">
            {snapshot.links.map((link: { href: string; text?: string }, idx: number) => (
              <li key={idx}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {link.text || link.href}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Source URL */}
      {sourceUrl && (
        <div className="mb-8">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {sourceUrl}
          </a>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="border border-destructive bg-destructive/10 p-4">
          <p className="mb-2 font-semibold text-destructive">
            {dict.showcase.error[snapshot?.fetchError as keyof typeof dict.showcase.error] ||
              dict.showcase.error.unknown}
          </p>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              {sourceUrl}
            </a>
          )}
          {isAdmin && (
            <form
              action={`/api/portal/showcase/ingest/${teamNumber}`}
              method="POST"
              className="mt-4"
            >
              <Button type="submit" variant="outline" size="sm">
                {dict.showcase.detail.retry}
              </Button>
            </form>
          )}
        </div>
      )}

      {/* Empty state */}
      {!hasContent && !hasError && (
        <div className="border bg-muted p-8 text-center">
          <p className="mb-4 text-muted-foreground">
            {dict.showcase.detail.not_available}
          </p>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {sourceUrl}
            </a>
          )}
        </div>
      )}
    </div>
  )
}
