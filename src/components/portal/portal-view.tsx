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
import { PortalHeader } from "./portal-header"
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
    productName?: string | null
    oneLiner?: string | null
    targetUsers?: string | null
    problem?: string | null
    category?: string | null
    stage?: string | null
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

// Code freeze: January 31, 2026 at 2:30 PM El Salvador time (UTC-6)
const FREEZE_TIME = new Date("2026-01-31T14:30:00-06:00")

export function PortalView({
  dict,
  content,
  profile,
  deliverable,
  socialPosts = [],
}: PortalViewProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <PortalHeader
          title={dict.portal?.title || "Participant Portal"}
          description={
            dict.portal?.welcome?.replace("{name}", profile.participantName) ||
            `Welcome, ${profile.participantName}`
          }
          badge={`TEAM ${profile.teamNumber}`}
        >
          <AuthButton dict={dict} />
        </PortalHeader>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
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

            {((deliverable?.submissions && deliverable.submissions.length > 0) ||
              (socialPosts && socialPosts.length > 0)) && (
              <SubmissionTimeline
                deliverableSubmissions={deliverable?.submissions || []}
                socialPosts={socialPosts}
                dict={dict}
              />
            )}
            
            {/* Mentors moved to main column for better visibility on mobile/desktop */}
             <MentorsSection dict={dict} />
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">
              <CountdownTimer freezeTime={FREEZE_TIME} dict={dict} />
              
              <TeamCard
                teamNumber={profile.teamNumber}
                currentUserName={profile.participantName}
                content={content}
                dict={dict}
              />

              <TipsSection dict={dict} />
              <FAQSection dict={dict} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
