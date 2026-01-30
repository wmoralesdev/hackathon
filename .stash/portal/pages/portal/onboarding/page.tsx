import { getDictionary } from "@/i18n/utils"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/landing/footer"
import { OnboardingView } from "@/components/portal/onboarding-view"
import { readFile } from "fs/promises"
import { join } from "path"

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  // Read content.txt
  const contentPath = join(process.cwd(), "public", "content.txt")
  const content = await readFile(contentPath, "utf-8")

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Nav dict={dict} />
      <main className="flex flex-col">
        <OnboardingView dict={dict} content={content} />
      </main>
      <Footer dict={dict} />
    </div>
  )
}
