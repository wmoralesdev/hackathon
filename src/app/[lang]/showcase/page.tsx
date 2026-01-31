import { getDictionary } from "@/i18n/utils"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/landing/footer"
import { ShowcaseGrid } from "@/components/showcase/showcase-grid"
import type { ShowcaseSnapshot } from "@/components/showcase/showcase-card"
import { prisma } from "@/lib/prisma"

export default async function ShowcasePage({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Get all deliverables with SaaS URLs (including showcase fields)
  const deliverables = await prisma.deliverable.findMany({
    where: {
      saasUrl: { not: null },
    },
    select: {
      teamNumber: true,
      saasUrl: true,
      productName: true,
      oneLiner: true,
      targetUsers: true,
      problem: true,
      category: true,
      stage: true,
    },
    orderBy: {
      teamNumber: "asc",
    },
  })

  // Get all showcase snapshots for these teams (only screenshot URL)
  const snapshots = await prisma.showcaseSnapshot.findMany({
    where: {
      teamNumber: { in: deliverables.map((d) => d.teamNumber) },
    },
    select: {
      teamNumber: true,
      sourceUrl: true,
      screenshotUrl: true,
      fetchError: true,
    },
  })

  // Convert Prisma JsonValue to ShowcaseSnapshot type
  const convertedSnapshots: ShowcaseSnapshot[] = snapshots.map((s) => ({
    teamNumber: s.teamNumber,
    sourceUrl: s.sourceUrl,
    screenshotUrl: s.screenshotUrl,
    fetchError: s.fetchError,
  }))

  // Create a map for quick lookup
  const snapshotMap = new Map(
    convertedSnapshots.map((s) => [s.teamNumber, s])
  )

  // Get social posts for all teams (non-removed only)
  const socialPosts = await prisma.socialPost.findMany({
    where: {
      teamNumber: { in: deliverables.map((d) => d.teamNumber) },
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

  // Group posts by team
  const postsByTeam = new Map<number, typeof socialPosts>()
  for (const post of socialPosts) {
    const existing = postsByTeam.get(post.teamNumber) || []
    postsByTeam.set(post.teamNumber, [...existing, post])
  }

  // Combine deliverables with their snapshots and posts
  const snapshotsWithData = deliverables.map((deliverable) => ({
    teamNumber: deliverable.teamNumber,
    sourceUrl: deliverable.saasUrl,
    deliverable: {
      productName: deliverable.productName,
      oneLiner: deliverable.oneLiner,
      targetUsers: deliverable.targetUsers,
      problem: deliverable.problem,
      category: deliverable.category,
      stage: deliverable.stage,
    },
    snapshot: snapshotMap.get(deliverable.teamNumber) || null,
    socialPosts: postsByTeam.get(deliverable.teamNumber) || [],
  }))

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Nav dict={dict} />
      <main className="flex flex-col">
        <ShowcaseGrid snapshots={snapshotsWithData} dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} />
    </div>
  )
}
