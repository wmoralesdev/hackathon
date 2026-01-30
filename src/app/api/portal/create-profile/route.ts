import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { userId, participantName, teamNumber, isLead } = body

    if (user.id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Check if profile already exists
    const existing = await prisma.profile.findUnique({
      where: { id: user.id },
    })

    if (existing) {
      return NextResponse.json({ error: "Profile already exists" }, { status: 400 })
    }

    // Create profile
    const profile = await prisma.profile.create({
      data: {
        id: user.id,
        participantName,
        teamNumber,
        isLead: Boolean(isLead),
      },
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Create profile error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
