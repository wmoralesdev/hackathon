import { getDictionary } from "@/i18n/utils"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/landing/footer"
import { ShowcaseAdminView } from "@/components/showcase/showcase-admin-view"
import { checkAdminAuth } from "@/lib/showcase/admin-auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function ShowcaseAdminPage({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Check admin auth
  const adminAuth = await checkAdminAuth();

  if (!adminAuth) {
    redirect(`/${lang}/portal/auth`);
    return;
  }

  if (!adminAuth.isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
        <Nav dict={dict} />
        <main className="flex flex-col">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="mb-4 text-3xl font-bold">Access Denied</h1>
              <p className="text-muted-foreground">
                You do not have permission to access this page.
              </p>
            </div>
          </div>
        </main>
        <Footer dict={dict} />
      </div>
    );
  }

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

  // Get all showcase snapshots
  const snapshots = await prisma.showcaseSnapshot.findMany({
    where: {
      teamNumber: { in: deliverables.map((d) => d.teamNumber) },
    },
    select: {
      teamNumber: true,
      sourceUrl: true,
      fetchError: true,
      lastFetchedAt: true,
    },
  })

  // Create a map for quick lookup
  const snapshotMap = new Map(
    snapshots.map((s) => [s.teamNumber, s])
  )

  // Combine deliverables with their snapshots
  const data = deliverables.map((deliverable) => ({
    teamNumber: deliverable.teamNumber,
    sourceUrl: deliverable.saasUrl,
    snapshot: snapshotMap.get(deliverable.teamNumber) || null,
  }))

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Nav dict={dict} />
      <main className="flex flex-col">
        <ShowcaseAdminView data={data} dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} />
    </div>
  )
}
