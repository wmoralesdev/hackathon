import { getDictionary } from "@/i18n/utils"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/landing/footer"
import { ShowcaseDetail } from "@/components/showcase/showcase-detail"
import type { ShowcaseSnapshot } from "@/components/showcase/showcase-card"
import { prisma } from "@/lib/prisma"
import { checkAdminAuth } from "@/lib/showcase/admin-auth"
import { notFound } from "next/navigation"

export default async function ShowcaseDetailPage({
  params,
}: {
  params: Promise<{ lang: "en" | "es"; teamNumber: string }>;
}) {
  const { lang, teamNumber } = await params;
  const dict = await getDictionary(lang);
  const teamNum = parseInt(teamNumber, 10);

  if (isNaN(teamNum)) {
    notFound();
  }

  // Get deliverable for this team (including showcase fields)
  const deliverable = await prisma.deliverable.findUnique({
    where: { teamNumber: teamNum },
    select: {
      saasUrl: true,
      productName: true,
      oneLiner: true,
      targetUsers: true,
      problem: true,
      category: true,
      stage: true,
    },
  })

  // Get social posts for this team (non-removed only)
  const socialPosts = await prisma.socialPost.findMany({
    where: {
      teamNumber: teamNum,
      removedAt: null,
    },
    select: {
      id: true,
      teamNumber: true,
      url: true,
      platform: true,
      submittedAt: true,
      oembedJson: true,
      ogJson: true,
      fetchError: true,
    },
    orderBy: { submittedAt: "desc" },
  })

  // Get showcase snapshot if exists (only screenshot URL)
  const snapshotRaw = await prisma.showcaseSnapshot.findUnique({
    where: { teamNumber: teamNum },
    select: {
      teamNumber: true,
      sourceUrl: true,
      screenshotUrl: true,
      fetchError: true,
      lastFetchedAt: true,
    },
  })

  // Convert Prisma JsonValue to ShowcaseSnapshot type
  const snapshot: ShowcaseSnapshot | null = snapshotRaw
    ? {
        teamNumber: snapshotRaw.teamNumber,
        sourceUrl: snapshotRaw.sourceUrl,
        screenshotUrl: snapshotRaw.screenshotUrl,
        fetchError: snapshotRaw.fetchError,
      }
    : null

  // Check if user is admin (for retry button)
  const adminAuth = await checkAdminAuth()
  const isAdmin = adminAuth?.isAdmin ?? false

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Nav dict={dict} />
      <main className="flex flex-col">
        <ShowcaseDetail
          snapshot={snapshot}
          teamNumber={teamNum}
          sourceUrl={deliverable?.saasUrl || null}
          deliverable={deliverable ? {
            productName: deliverable.productName,
            oneLiner: deliverable.oneLiner,
            targetUsers: deliverable.targetUsers,
            problem: deliverable.problem,
            category: deliverable.category,
            stage: deliverable.stage,
          } : undefined}
          socialPosts={socialPosts.map((post) => ({
            id: post.id,
            teamNumber: post.teamNumber,
            url: post.url,
            platform: post.platform,
            submittedAt: post.submittedAt,
            oembedJson: post.oembedJson,
            ogJson: post.ogJson,
            fetchError: post.fetchError,
          }))}
          lastFetchedAt={snapshotRaw?.lastFetchedAt || null}
          dict={dict}
          lang={lang}
          isAdmin={isAdmin}
        />
      </main>
      <Footer dict={dict} />
    </div>
  )
}
