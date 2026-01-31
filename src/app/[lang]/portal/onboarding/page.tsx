import { getDictionary } from "@/i18n/utils"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/landing/footer"
import { OnboardingView } from "@/components/portal/onboarding-view"
import { PortalBackdrop } from "@/components/portal/portal-backdrop"

export const dynamic = "force-dynamic"

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <PortalBackdrop className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Nav dict={dict} />
      <main className="flex flex-col">
        <OnboardingView dict={dict} />
      </main>
      <Footer dict={dict} />
    </PortalBackdrop>
  )
}
