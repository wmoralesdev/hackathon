import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import {
  assertAllowedSocialUrl,
  canonicalizeSocialUrl,
  fetchSocialMetadata,
  parsePlatform,
} from "@/lib/social/metadata"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profile = await prisma.profile.findUnique({ where: { id: user.id } })
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    const body = await request.json()
    const { teamNumber, url } = body as { teamNumber: number; url: string }

    if (profile.teamNumber !== teamNumber) {
      return NextResponse.json({ error: "Team number mismatch" }, { status: 403 })
    }

    let parsed: URL
    try {
      parsed = assertAllowedSocialUrl(url)
    } catch (e) {
      const code = e instanceof Error ? e.message : "invalid_url"
      return NextResponse.json({ error: code }, { status: 400 })
    }

    const platform = parsePlatform(parsed)
    const canonicalUrl = canonicalizeSocialUrl(parsed)

    // Fetch metadata (best-effort; still allow saving URL with fetchError)
    let oembedJson: unknown = null
    let ogJson: unknown = null
    let fetchError: string | null = null
    let lastFetchedAt: Date | null = null

    try {
      const meta = await fetchSocialMetadata(canonicalUrl, platform)
      lastFetchedAt = new Date()
      if (meta.source === "oembed") {
        oembedJson = meta.raw
      } else {
        ogJson = meta.raw
      }
    } catch (err) {
      fetchError = err instanceof Error ? err.message : "metadata_failed"
    }

    const socialPost = await prisma.socialPost.upsert({
      where: {
        teamNumber_url: { teamNumber, url: canonicalUrl },
      },
      create: {
        teamNumber,
        url: canonicalUrl,
        platform,
        submittedById: user.id,
        submittedAt: new Date(),
        removedAt: null,
        removedById: null,
        oembedJson: oembedJson ?? undefined,
        ogJson: ogJson ?? undefined,
        lastFetchedAt,
        fetchError,
      },
      update: {
        // If it was previously removed, restore it.
        removedAt: null,
        removedById: null,
        // Refresh metadata when re-added.
        oembedJson: oembedJson ?? undefined,
        ogJson: ogJson ?? undefined,
        lastFetchedAt: lastFetchedAt ?? undefined,
        fetchError,
        submittedById: user.id,
        submittedAt: new Date(),
      },
      include: {
        submittedBy: { select: { participantName: true } },
      },
    })

    return NextResponse.json({ socialPost })
  } catch (error) {
    console.error("Social post create error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

