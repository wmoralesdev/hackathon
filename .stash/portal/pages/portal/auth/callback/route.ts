import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const lang = requestUrl.pathname.split("/")[1] as "en" | "es"

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Check if user has a profile
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
    })

    if (!profile) {
      // Redirect to onboarding
      return NextResponse.redirect(
        new URL(`/${lang}/portal/onboarding`, requestUrl.origin)
      )
    }
  }

  // Redirect to portal
  return NextResponse.redirect(
    new URL(`/${lang}/portal`, requestUrl.origin)
  )
}
