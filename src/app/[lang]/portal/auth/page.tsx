import { getDictionary } from "@/i18n/utils"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/landing/footer"
import { AuthLoginView } from "@/components/portal/auth-login-view"
import { PortalBackdrop } from "@/components/portal/portal-backdrop"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthPage({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(`/${lang}/portal`)
  }

  return (
    <PortalBackdrop className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Nav dict={dict} />
      <main className="flex flex-col">
        <AuthLoginView dict={dict} />
      </main>
      <Footer dict={dict} />
    </PortalBackdrop>
  )
}
