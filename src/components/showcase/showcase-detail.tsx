"use client"

import type { Dictionary } from "@/i18n/utils"
import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import Link from "next/link"
import type { ShowcaseSnapshot } from "./showcase-card"
import { ShowcaseSocialPosts, type SocialPost } from "./showcase-social-posts"

interface ShowcaseDetailProps {
  snapshot: ShowcaseSnapshot | null
  teamNumber: number
  sourceUrl: string | null
  deliverable?: {
    productName?: string | null
    oneLiner?: string | null
    targetUsers?: string | null
    problem?: string | null
    category?: string | null
    stage?: string | null
  }
  socialPosts?: SocialPost[]
  lastFetchedAt: Date | null
  dict: Dictionary
  lang: string
  isAdmin?: boolean
}

export function ShowcaseDetail({
  snapshot,
  teamNumber,
  sourceUrl,
  deliverable,
  socialPosts = [],
  lastFetchedAt,
  dict,
  lang,
  isAdmin = false,
}: ShowcaseDetailProps) {
  const hasError = snapshot?.fetchError != null
  const imageUrl: string | null = snapshot?.screenshotUrl || null
  const title: string = deliverable?.productName || `${dict.showcase.detail.team} ${teamNumber}`
  const description: string | null = deliverable?.oneLiner || null

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pt-6">
        <Link
          href={`/${lang}/showcase`}
          className="inline-flex items-center text-sm font-mono text-muted-foreground hover:text-accent transition-colors group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          {dict.showcase.detail.back}
        </Link>
      </div>

      <div className="relative mt-6">
        <div className="container mx-auto px-4">
          <div className="relative w-full">
            {typeof imageUrl === "string" ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-muted group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
                
                <div className="absolute bottom-0 left-0 w-full lg:w-2/3 p-6 md:p-10 space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="default" className="text-xs font-mono px-3 py-1">
                      {dict.showcase.detail.team} {teamNumber}
                    </Badge>
                    {deliverable?.stage && (
                      <Badge variant="outline" className="text-xs font-mono bg-black/50 backdrop-blur-sm border-white/30">
                        {deliverable.stage}
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
                    {title}
                  </h1>
                  {description && (
                    <p className="text-base md:text-lg leading-relaxed text-white/90 max-w-2xl drop-shadow-md line-clamp-2">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="aspect-video w-full flex flex-col items-center justify-center bg-gradient-to-br from-card-02 to-card-04 rounded-lg border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="relative z-10 text-center space-y-4 p-8">
                  <Badge variant="outline" className="mb-4 mx-auto">
                    {dict.showcase.detail.team} {teamNumber}
                  </Badge>
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                    {title}
                  </h1>
                  {description && (
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="hidden lg:block absolute top-6 right-6 w-64 z-20">
              <Card level={1} className="p-5 space-y-4 bg-background/95 backdrop-blur-md border-white/10 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <Badge variant="outline" className="text-xs font-mono py-1 px-2 border-white/30">
                    {dict.showcase.detail.team} {teamNumber}
                  </Badge>
                  {hasError && (
                    <Badge variant="destructive" className="animate-pulse text-[10px]">
                      {dict.showcase.error.unknown}
                    </Badge>
                  )}
                </div>

                {sourceUrl && (
                  <Button 
                    asChild 
                    variant="primary" 
                    className="w-full h-11 text-sm font-bold tracking-wider shadow-[0_0_20px_rgba(245,78,0,0.4)] hover:shadow-[0_0_30px_rgba(245,78,0,0.6)] transition-all"
                  >
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dict.showcase.detail.visit_site}
                      <span className="ml-2">→</span>
                    </a>
                  </Button>
                )}

                {lastFetchedAt && (
                  <div className="pt-2 border-t border-white/5">
                    <div className="flex flex-col gap-0.5 text-center">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-mono">
                        {dict.showcase.detail.last_fetched?.split(':')[0] || "Last updated"}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {new Date(lastFetchedAt).toLocaleDateString(lang === "es" ? "es-SV" : "en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                )}

                {hasError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded p-3 space-y-2">
                    <p className="text-xs text-destructive font-medium leading-relaxed">
                      {dict.showcase.error[snapshot?.fetchError as keyof typeof dict.showcase.error] ||
                        dict.showcase.error.unknown}
                    </p>
                    
                    {isAdmin && (
                      <form
                        action={`/api/portal/showcase/ingest/${teamNumber}`}
                        method="POST"
                      >
                        <Button type="submit" variant="outline" size="sm" className="w-full text-xs h-8">
                          {dict.showcase.detail.retry}
                        </Button>
                      </form>
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>

        <div className="lg:hidden container mx-auto px-4 mt-6">
          <Card level={1} className="p-5 space-y-4 border-white/10">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <Badge variant="outline" className="text-xs font-mono py-1 px-2 border-white/30">
                {dict.showcase.detail.team} {teamNumber}
              </Badge>
              {hasError && (
                <Badge variant="destructive" className="animate-pulse text-[10px]">
                  {dict.showcase.error.unknown}
                </Badge>
              )}
            </div>

            {sourceUrl && (
              <Button 
                asChild 
                variant="primary" 
                className="w-full h-11 text-sm font-bold tracking-wider"
              >
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dict.showcase.detail.visit_site}
                  <span className="ml-2">→</span>
                </a>
              </Button>
            )}

            {lastFetchedAt && (
              <div className="text-center">
                <span className="text-xs font-mono text-muted-foreground">
                  {dict.showcase.detail.last_fetched?.split(':')[0]}: {new Date(lastFetchedAt).toLocaleDateString(lang === "es" ? "es-SV" : "en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-10">
        {description && (
          <div className="max-w-4xl">
            <p className="text-lg leading-7 text-muted-foreground">
              {description}
            </p>
          </div>
        )}

        {deliverable && (
          <Card level={2} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {deliverable.problem && (
                <div className="space-y-3">
                  <h3 className="text-sm font-mono font-bold uppercase text-accent/70 tracking-widest border-b border-white/5 pb-2">
                    {dict.showcase.detail.problem}
                  </h3>
                  <p className="text-base text-foreground leading-relaxed">
                    {deliverable.problem}
                  </p>
                </div>
              )}
              
              {deliverable.targetUsers && (
                <div className="space-y-3">
                  <h3 className="text-sm font-mono font-bold uppercase text-accent/70 tracking-widest border-b border-white/5 pb-2">
                    {dict.showcase.detail.target_users}
                  </h3>
                  <p className="text-base text-foreground leading-relaxed">
                    {deliverable.targetUsers}
                  </p>
                </div>
              )}

              {deliverable.category && (
                <div className="space-y-3">
                  <h3 className="text-sm font-mono font-bold uppercase text-accent/70 tracking-widest border-b border-white/5 pb-2">
                    {dict.showcase.detail.category}
                  </h3>
                  <p className="text-base text-foreground leading-relaxed">
                    {deliverable.category}
                  </p>
                </div>
              )}

              {deliverable.stage && (
                <div className="space-y-3">
                  <h3 className="text-sm font-mono font-bold uppercase text-accent/70 tracking-widest border-b border-white/5 pb-2">
                    {dict.showcase.detail.stage}
                  </h3>
                  <div className="pt-1">
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {deliverable.stage}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {socialPosts.length > 0 && (
          <ShowcaseSocialPosts posts={socialPosts} dict={dict} />
        )}

        {hasError && !imageUrl && (
          <div className="bg-destructive/10 border border-destructive/20 rounded p-6 space-y-4">
            <p className="text-sm text-destructive font-medium">
              {dict.showcase.error[snapshot?.fetchError as keyof typeof dict.showcase.error] ||
                dict.showcase.error.unknown}
            </p>
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline block"
              >
                {sourceUrl}
              </a>
            )}
            {isAdmin && (
              <form
                action={`/api/portal/showcase/ingest/${teamNumber}`}
                method="POST"
              >
                <Button type="submit" variant="outline" size="sm">
                  {dict.showcase.detail.retry}
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
