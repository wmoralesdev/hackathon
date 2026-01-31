import { getDictionary } from "@/i18n/utils"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/landing/footer"
import { PortalView } from "@/components/portal/portal-view"
import { PortalBackdrop } from "@/components/portal/portal-backdrop"
import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function PortalPage({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Check auth
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${lang}/portal/auth`)
    return
  }

  // Get profile
  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
  })

  if (!profile) {
    redirect(`/${lang}/portal/onboarding`)
    return
  }

  // Get deliverable if exists with submissions
  const deliverable = await prisma.deliverable.findUnique({
    where: { teamNumber: profile.teamNumber } as { teamNumber: number },
    include: {
      submissions: {
        orderBy: { submittedAt: "desc" },
        take: 20,
        include: {
          submittedBy: {
            select: {
              participantName: true,
            },
          },
        },
      },
    },
  })

  const socialPosts = await prisma.socialPost.findMany({
    where: { teamNumber: profile.teamNumber },
    orderBy: { submittedAt: "desc" },
    include: {
      submittedBy: { select: { participantName: true } },
      removedBy: { select: { participantName: true } },
    },
  })

  return (
    <PortalBackdrop className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Nav dict={dict} />
      <main className="flex flex-col">
        <PortalView
          dict={dict}
          profile={{
            participantName: profile.participantName,
            teamNumber: profile.teamNumber,
          }}
          deliverable={deliverable ? {
            saasUrl: deliverable.saasUrl,
            productName: deliverable.productName,
            oneLiner: deliverable.oneLiner,
            targetUsers: deliverable.targetUsers,
            problem: deliverable.problem,
            category: deliverable.category,
            stage: deliverable.stage,
            updatedAt: deliverable.updatedAt ?? undefined,
            submissions: deliverable.submissions.map(s => ({
              id: s.id,
              action: s.action,
              value: s.value,
              submittedAt: s.submittedAt,
              submittedBy: s.submittedBy,
            })),
          } : undefined}
          socialPosts={socialPosts}
        />
      </main>
      <Footer dict={dict} />
    </PortalBackdrop>
  )
}
