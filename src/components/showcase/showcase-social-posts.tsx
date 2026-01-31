"use client"

import * as React from "react"
import Script from "next/script"
import Image from "next/image"
import { Badge } from "@/ui/badge"
import { Card } from "@/ui/card"
import type { Dictionary } from "@/i18n/utils"

type SocialPlatform = "x" | "linkedin"

export type SocialPost = {
  id: string
  teamNumber: number
  url: string
  platform: SocialPlatform
  submittedAt: string | Date
  oembedJson?: unknown | null
  ogJson?: unknown | null
  fetchError?: string | null
}

interface ShowcaseSocialPostsProps {
  posts: SocialPost[]
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

export function ShowcaseSocialPosts({
  posts,
  dict,
}: ShowcaseSocialPostsProps) {
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

  if (posts.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      {/* X + LinkedIn scripts for embeds */}
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
      <Script src="https://platform.linkedin.com/in.js" strategy="lazyOnload" />

      <h2 className="mb-6 text-xl font-bold tracking-tight">
        {dict.showcase.detail.social_posts}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {posts.map((post) => {
          const embedHtml = getOEmbedHtml(post)
          const og = getOg(post)
          return (
            <Card
              key={post.id}
              level={1}
              className="p-4 space-y-4 hover:border-accent/30 transition-colors h-full flex flex-col"
            >
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary" className="text-[10px] border-white/10">
                  {post.platform === "x" ? "X" : "LINKEDIN"}
                </Badge>
                {post.fetchError && (
                  <span className="text-xs text-yellow-400">
                    {dict.portal?.social_posts?.metadata_failed || "Preview limited"}
                  </span>
                )}
              </div>

              <div className="flex-1 min-h-0">
                {embedHtml ? (
                  <div
                    className="bg-background/40 border border-white/10 rounded-lg p-3 overflow-hidden max-h-[400px] overflow-y-auto custom-scrollbar"
                    // Provider-controlled HTML; input is restricted to X/LinkedIn.
                    // biome-ignore lint: trusted oEmbed HTML from allowed providers
                    dangerouslySetInnerHTML={{ __html: embedHtml }}
                  />
                ) : og ? (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-background/40 border border-white/10 rounded p-3 hover:border-accent/30 transition-colors group h-full"
                  >
                    <div className="flex gap-3 items-start">
                      {og.image ? (
                        <Image
                          src={og.image}
                          alt=""
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover border border-white/10 rounded-sm group-hover:border-accent/30 transition-colors shrink-0"
                        />
                      ) : null}
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="text-sm font-semibold line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                          {og.title || dict.portal?.social_posts?.og_fallback_title || "LinkedIn post"}
                        </p>
                        {og.description ? (
                          <p className="text-xs text-foreground/60 line-clamp-3 leading-relaxed">{og.description}</p>
                        ) : null}
                        <div className="pt-1 text-[10px] text-foreground/40 font-mono">
                          {og.siteName || new URL(post.url).hostname}
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline font-mono break-all block p-4 bg-background/40 rounded border border-transparent hover:border-accent/20 h-full flex items-center justify-center text-center"
                  >
                    {post.url}
                  </a>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
