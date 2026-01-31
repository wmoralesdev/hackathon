"use client"

import * as React from "react"
import Script from "next/script"
import Image from "next/image"
import { Card } from "@/ui/card"
import { Button } from "@/ui/button"
import { Badge } from "@/ui/badge"
import { createClient } from "@/lib/supabase/client"
import type { Dictionary } from "@/i18n/utils"
import { PortalSectionHeader } from "./portal-section-header"

type SocialPlatform = "x" | "linkedin"

export type SocialPost = {
  id: string
  teamNumber: number
  url: string
  platform: SocialPlatform
  submittedAt: string | Date
  submittedBy: { participantName: string }
  oembedJson?: unknown | null
  ogJson?: unknown | null
  fetchError?: string | null
}

interface SocialPostsSectionProps {
  teamNumber: number
  initialPosts?: SocialPost[]
  dict: Dictionary
}

function getOEmbedHtml(post: SocialPost): string | null {
  const html = (post?.oembedJson as { html?: unknown } | null | undefined)?.html
  return typeof html === "string" && html.trim() ? html : null
}

function getOg(post: SocialPost): {
  title?: string
  description?: string
  image?: string
  siteName?: string
} | null {
  const og = post?.ogJson as Record<string, unknown> | null | undefined
  if (!og) return null
  return {
    title: typeof og["og:title"] === "string" ? (og["og:title"] as string) : undefined,
    description: typeof og["og:description"] === "string" ? (og["og:description"] as string) : undefined,
    image: typeof og["og:image"] === "string" ? (og["og:image"] as string) : undefined,
    siteName: typeof og["og:site_name"] === "string" ? (og["og:site_name"] as string) : undefined,
  }
}

export function SocialPostsSection({
  teamNumber,
  initialPosts = [],
  dict,
}: SocialPostsSectionProps) {
  const [posts, setPosts] = React.useState<SocialPost[]>(initialPosts)
  const [newUrl, setNewUrl] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const refresh = React.useCallback(async () => {
    const res = await fetch(`/api/portal/social-posts/team/${teamNumber}`)
    if (!res.ok) return
    const data = await res.json()
    if (Array.isArray(data.posts)) setPosts(data.posts)
  }, [teamNumber])

  // Realtime sync
  React.useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel(`social_posts:${teamNumber}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "social_posts", filter: `team_number=eq.${teamNumber}` },
        () => {
          void refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [teamNumber, refresh])

  // Re-run widget parsing after posts change
  React.useEffect(() => {
    if (typeof window === "undefined") return
    type EmbedWindow = Window & {
      twttr?: { widgets?: { load?: () => void } }
      IN?: { parse?: () => void }
    }
    const w = window as EmbedWindow
    w.twttr?.widgets?.load?.()
    w.IN?.parse?.()
  })

  const normalizeError = (code: string) => {
    switch (code) {
      case "invalid_url":
        return dict.portal?.social_posts?.errors?.invalid_url || "Please enter a valid URL"
      case "unsupported_domain":
        return (
          dict.portal?.social_posts?.errors?.unsupported_domain ||
          "Only X (x.com/twitter.com) and LinkedIn posts are supported"
        )
      default:
        return dict.portal?.social_posts?.errors?.unknown || "Something went wrong"
    }
  }

  const onAdd = async () => {
    setError(null)
    setSuccess(false)
    const url = newUrl.trim()
    if (!url) return

    setLoading(true)
    try {
      const res = await fetch("/api/portal/social-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamNumber, url }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "unknown")
      }

      setNewUrl("")
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
      await refresh()
    } catch (e) {
      const code = e instanceof Error ? e.message : "unknown"
      setError(normalizeError(code))
    } finally {
      setLoading(false)
    }
  }

  const onRemove = async (id: string) => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`/api/portal/social-posts/${id}`, { method: "DELETE" })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(typeof data?.error === "string" ? data.error : "unknown")
      }
      await refresh()
    } catch (e) {
      const code = e instanceof Error ? e.message : "unknown"
      setError(normalizeError(code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card level={2}>
      {/* X + LinkedIn scripts for embeds */}
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
      <Script src="https://platform.linkedin.com/in.js" strategy="lazyOnload" />

      <div className="space-y-6">
        <PortalSectionHeader
          title={dict.portal?.social_posts?.title || "Social Posts"}
          subtitle={dict.portal?.social_posts?.subtitle || "Add your X or LinkedIn posts (team-shared). We'll generate a preview automatically."}
        />

        <div className="flex gap-2">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder={dict.portal?.social_posts?.placeholder || "Paste an X or LinkedIn post URL..."}
            className="flex-1 px-4 py-3 bg-background/50 border border-white/10 rounded font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-foreground/20"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                void onAdd()
              }
            }}
          />
          <Button type="button" variant="secondary" onClick={() => void onAdd()} disabled={loading || !newUrl.trim()}>
            {dict.portal?.social_posts?.add || "Add"}
          </Button>
        </div>

        {error && (
          <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded bg-green-500/10 border border-green-500/30 text-green-400 text-sm animate-in fade-in slide-in-from-top-2">
            {dict.portal?.social_posts?.added || "Added!"}
          </div>
        )}

        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-sm text-foreground/50 italic px-2">
              {dict.portal?.social_posts?.empty || "No posts yet. Add your first one above."}
            </p>
          ) : (
            posts.map((post) => {
              const embedHtml = getOEmbedHtml(post)
              const og = getOg(post)
              return (
                <div 
                  key={post.id} 
                  className="p-4 bg-white/5 border border-white/10 rounded hover:border-accent/30 hover:bg-white/10 transition-all duration-200 space-y-3 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-[10px] border-white/10">
                          {post.platform === "x" ? "X" : "LINKEDIN"}
                        </Badge>
                        {post.fetchError ? (
                          <span className="text-xs text-yellow-400">
                            {dict.portal?.social_posts?.metadata_failed || "Preview limited"}
                          </span>
                        ) : null}
                      </div>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-accent hover:underline break-all"
                      >
                        {post.url}
                      </a>
                      <p className="text-xs text-foreground/40 mt-1">
                        {dict.portal?.social_posts?.shared_note || "Shared with your whole team"} ·{" "}
                        {dict.portal?.social_posts?.added_by?.replace("{name}", post.submittedBy.participantName) ||
                          `Added by ${post.submittedBy.participantName}`}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => void onRemove(post.id)}
                      disabled={loading}
                    >
                      {dict.portal?.social_posts?.remove || "Remove"}
                    </Button>
                  </div>

                  {embedHtml ? (
                    <div
                      className="bg-background/40 border border-white/10 rounded-lg p-3 overflow-x-auto"
                      // Provider-controlled HTML; input is restricted to X/LinkedIn.
                      // biome-ignore lint: trusted oEmbed HTML from allowed providers
                      dangerouslySetInnerHTML={{ __html: embedHtml }}
                    />
                  ) : og ? (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-background/40 border border-white/10 rounded p-3 hover:border-white/20 transition-colors"
                    >
                      <div className="flex gap-3">
                        {og.image ? (
                          <Image
                            src={og.image}
                            alt=""
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover border border-white/10 rounded-sm"
                          />
                        ) : null}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {og.title || dict.portal?.social_posts?.og_fallback_title || "LinkedIn post"}
                          </p>
                          {og.description ? (
                            <p className="text-xs text-foreground/60 line-clamp-2 mt-1">{og.description}</p>
                          ) : null}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <p className="text-sm text-foreground/50">
                      {dict.portal?.social_posts?.no_preview || "Preview unavailable. Open the link to view."}
                    </p>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </Card>
  )
}
