import { getDictionary } from "@/i18n/utils"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/landing/hero"
import { GridSection } from "@/components/landing/grid"
import { Warmups } from "@/components/landing/warmups"
import { Agenda } from "@/components/landing/agenda"
import { Criteria } from "@/components/landing/criteria"
import { Prep } from "@/components/landing/prep"
import { Mentors } from "@/components/landing/mentors"
import { Prizes } from "@/components/landing/prizes"
import { SponsorshipCTA } from "@/components/landing/sponsorship-cta"
import { Sponsors } from "@/components/landing/sponsors"
import { Considerations } from "@/components/landing/considerations"
import { Organizers } from "@/components/landing/organizers"
import { Register } from "@/components/landing/register"
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
        <Warmups dict={dict} />
        <Agenda dict={dict} />
        <Criteria dict={dict} />
        <Prep dict={dict} />
        <Mentors dict={dict} />
        <Prizes dict={dict} />
        <SponsorshipCTA dict={dict} />
        <Sponsors dict={dict} />
        <Considerations dict={dict} />
        <Organizers dict={dict} />
        <Register dict={dict} />
      </main>
      <Footer dict={dict} />
    </div>
  );
}
