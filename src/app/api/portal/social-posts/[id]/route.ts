import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params
    const existing = await prisma.socialPost.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (existing.teamNumber !== profile.teamNumber) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const updated = await prisma.socialPost.update({
      where: { id },
      data: {
        removedAt: new Date(),
        removedById: user.id,
      },
    })

    return NextResponse.json({ socialPost: updated })
  } catch (error) {
    console.error("Social post delete error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

