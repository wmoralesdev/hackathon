import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ teamNumber: string }> }
) {
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

    const { teamNumber } = await params
    const teamNum = parseInt(teamNumber, 10)
    if (!Number.isFinite(teamNum)) {
      return NextResponse.json({ error: "Invalid team number" }, { status: 400 })
    }

    if (profile.teamNumber !== teamNum) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const posts = await prisma.socialPost.findMany({
      where: {
        teamNumber: teamNum,
        removedAt: null,
      },
      orderBy: { submittedAt: "desc" },
      include: {
        submittedBy: { select: { participantName: true } },
      },
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Social posts list error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

