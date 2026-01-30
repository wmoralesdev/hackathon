import { getDictionary } from "@/i18n/utils"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/landing/footer"
import { ShowcaseDetail } from "@/components/showcase/showcase-detail"
import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
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

  // Get deliverable for this team
  const deliverable = await prisma.deliverable.findUnique({
    where: { teamNumber: teamNum },
    select: {
      saasUrl: true,
    },
  })

  // Get showcase snapshot if exists
  const snapshot = await prisma.showcaseSnapshot.findUnique({
    where: { teamNumber: teamNum },
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
      lastFetchedAt: true,
    },
  })

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
          lastFetchedAt={snapshot?.lastFetchedAt || null}
          dict={dict}
          lang={lang}
          isAdmin={isAdmin}
        />
      </main>
      <Footer dict={dict} />
    </div>
  )
}
