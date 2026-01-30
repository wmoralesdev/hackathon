"use client"

import { CountdownTimer } from "./countdown-timer"
import { TeamCard } from "./team-card"
import { DeliverableForm } from "./deliverable-form"
import { SocialPostsSection } from "./social-posts-section"
import { SubmissionTimeline } from "./submission-timeline"
import { TipsSection } from "./tips-section"
import { MentorsSection } from "./mentors-section"
import { FAQSection } from "./faq-section"
import { AuthButton } from "./auth-button"
import type { Dictionary } from "@/i18n/utils"

interface PortalViewProps {
  dict: Dictionary
  content: string
  profile: {
    participantName: string
    teamNumber: number
  }
  deliverable?: {
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
  } | null
  socialPosts?: Array<{
    id: string
    teamNumber: number
    url: string
    platform: "x" | "linkedin"
    submittedAt: Date | string
    submittedBy: { participantName: string }
    removedAt?: Date | string | null
    removedBy?: { participantName: string } | null
    oembedJson?: unknown | null
    ogJson?: unknown | null
    fetchError?: string | null
  }>
}

const FREEZE_TIME = new Date("2026-01-31T14:30:00")

export function PortalView({
  dict,
  content,
  profile,
  deliverable,
  socialPosts = [],
}: PortalViewProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
              {dict.portal?.title || "Participant Portal"}
            </h1>
            <p className="text-foreground/60 font-mono text-sm">
              {dict.portal?.welcome?.replace("{name}", profile.participantName) ||
                `Welcome, ${profile.participantName}`}
            </p>
          </div>
          <AuthButton dict={dict} />
        </div>

        {/* Top Row: Team + Countdown */}
        <div className="grid md:grid-cols-2 gap-6">
          <TeamCard
            teamNumber={profile.teamNumber}
            currentUserName={profile.participantName}
            content={content}
            dict={dict}
          />
          <CountdownTimer freezeTime={FREEZE_TIME} dict={dict} />
        </div>

        {/* Deliverables */}
        <DeliverableForm
          teamNumber={profile.teamNumber}
          existingDeliverable={deliverable || undefined}
          dict={dict}
        />

        <SocialPostsSection
          teamNumber={profile.teamNumber}
          initialPosts={socialPosts.filter((p) => !p.removedAt)}
          dict={dict}
        />

        {/* Submission Timeline */}
        {((deliverable?.submissions && deliverable.submissions.length > 0) ||
          (socialPosts && socialPosts.length > 0)) && (
          <SubmissionTimeline
            deliverableSubmissions={deliverable?.submissions || []}
            socialPosts={socialPosts}
            dict={dict}
          />
        )}

        {/* Tips */}
        <TipsSection dict={dict} />

        {/* Mentors */}
        <MentorsSection dict={dict} />

        {/* FAQ */}
        <FAQSection dict={dict} />
      </div>
    </div>
  )
}
