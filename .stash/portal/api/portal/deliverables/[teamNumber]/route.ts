import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
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

    const { teamNumber } = await params
    const teamNum = parseInt(teamNumber, 10)

    if (isNaN(teamNum)) {
      return NextResponse.json({ error: "Invalid team number" }, { status: 400 })
    }

    // Verify user is on this team
    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
    })

    if (!profile || profile.teamNumber !== teamNum) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get deliverable with submissions
    const deliverable = await prisma.deliverable.findUnique({
      where: { teamNumber: teamNum },
      include: {
        submissions: {
          orderBy: { submittedAt: "desc" },
          take: 50,
          include: {
            submittedBy: {
              select: {
                participantName: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ deliverable })
  } catch (error) {
    console.error("Get deliverables error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
