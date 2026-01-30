import { getDictionary } from "@/i18n/utils"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/landing/footer"
import { ShowcaseGrid } from "@/components/showcase/showcase-grid"
import { prisma } from "@/lib/prisma"

export default async function ShowcasePage({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Get all deliverables with SaaS URLs
  const deliverables = await prisma.deliverable.findMany({
    where: {
      saasUrl: { not: null },
    },
    select: {
      teamNumber: true,
      saasUrl: true,
    },
    orderBy: {
      teamNumber: "asc",
    },
  })

  // Get all showcase snapshots for these teams
  const snapshots = await prisma.showcaseSnapshot.findMany({
    where: {
      teamNumber: { in: deliverables.map((d) => d.teamNumber) },
    },
    select: {
      teamNumber: true,
      sourceUrl: true,
      title: true,
      description: true,
      summary: true,
      markdown: true,
      screenshotUrl: true,
      ogJson: true,
      links: true,
      fetchError: true,
    },
  })

  // Create a map for quick lookup
  const snapshotMap = new Map(
    snapshots.map((s) => [s.teamNumber, s])
  )

  // Combine deliverables with their snapshots
  const snapshotsWithData = deliverables.map((deliverable) => ({
    teamNumber: deliverable.teamNumber,
    sourceUrl: deliverable.saasUrl,
    snapshot: snapshotMap.get(deliverable.teamNumber) || null,
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
