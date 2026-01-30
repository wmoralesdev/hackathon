import { NextRequest, NextResponse } from "next/server"
import { checkAdminAuth } from "@/lib/showcase/admin-auth"
import { ingestTeamShowcase } from "@/lib/showcase/ingestion"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ teamNumber: string }> }
) {
  try {
    // Check admin auth
    const adminAuth = await checkAdminAuth()

    if (!adminAuth || !adminAuth.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { teamNumber } = await params
    const teamNum = parseInt(teamNumber, 10)

    if (isNaN(teamNum)) {
      return NextResponse.json(
        { error: "Invalid team number" },
        { status: 400 }
      )
    }

    // Get deliverable for this team
    const deliverable = await prisma.deliverable.findUnique({
      where: { teamNumber: teamNum },
      select: {
        saasUrl: true,
      },
    })

    if (!deliverable) {
      return NextResponse.json(
        { error: "Team not found" },
        { status: 404 }
      )
    }

    // Ingest showcase for this team
    const result = await ingestTeamShowcase(teamNum, deliverable.saasUrl, {
      logProgress: true,
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        teamNumber: result.teamNumber,
        duration: result.duration,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          teamNumber: result.teamNumber,
          error: result.error,
          duration: result.duration,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("[Showcase Ingestion] Error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
