import { getDictionary } from "@/i18n/utils"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/landing/hero"
import { GridSection } from "@/components/landing/grid"
import { HackathonTheme } from "@/components/landing/hackathon-theme"
import { Jury } from "@/components/landing/jury"
import { Warmups } from "@/components/landing/warmups"
import { Agenda } from "@/components/landing/agenda"
import { PreflightGrid } from "@/components/landing/preflight-grid"
import { Sponsors } from "@/components/landing/sponsors"
import { Considerations } from "@/components/landing/considerations"
import { Organizers } from "@/components/landing/organizers"
import { Footer } from "@/components/landing/footer"

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Nav dict={dict} />
      <main className="flex flex-col">
        <Hero dict={dict} />
        <GridSection dict={dict} />
        <Sponsors dict={dict} />
        <HackathonTheme dict={dict} />
        <Jury dict={dict} />
        <Agenda dict={dict} />
        <PreflightGrid dict={dict} />
        <Organizers dict={dict} />
        <Warmups dict={dict} />
        <Considerations dict={dict} />
      </main>
      <Footer dict={dict} />
    </div>
  );
}
