"use client"

import { Dictionary } from "@/i18n/utils"
import { ShowcaseCard } from "./showcase-card"
import type { ShowcaseSnapshot } from "./showcase-card"

interface ShowcaseGridProps {
  snapshots: Array<{
    teamNumber: number
    snapshot: ShowcaseSnapshot | null
    sourceUrl: string | null
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
  }>
  dict: Dictionary
  lang: string
}

export function ShowcaseGrid({ snapshots, dict, lang }: ShowcaseGridProps) {
  if (snapshots.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">{dict.showcase.title}</h2>
          <p className="text-muted-foreground">{dict.showcase.empty_state}</p>
        </div>
      </div>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-8 text-2xl font-bold">{dict.showcase.title}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {snapshots.map(({ teamNumber, snapshot, sourceUrl, deliverable, socialPosts }) => (
          <ShowcaseCard
            key={teamNumber}
            snapshot={snapshot}
            teamNumber={teamNumber}
            sourceUrl={sourceUrl}
            deliverable={deliverable}
            socialPosts={socialPosts}
            dict={dict}
            lang={lang}
          />
        ))}
      </div>
    </section>
  )
}
