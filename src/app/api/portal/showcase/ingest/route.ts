import { NextRequest, NextResponse } from "next/server"
import { checkAdminAuth } from "@/lib/showcase/admin-auth"
import { ingestAllShowcases } from "@/lib/showcase/ingestion"

export async function POST(request: NextRequest) {
  try {
    // Check admin auth
    const adminAuth = await checkAdminAuth()

    if (!adminAuth || !adminAuth.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json().catch(() => ({}))
    const { concurrency = 3, retryFailedOnly = false } = body

    // Start ingestion (this is async, but we'll wait for initial stats)
    const stats = await ingestAllShowcases({
      concurrency,
      retryFailedOnly,
      logProgress: true,
    })

    return NextResponse.json({
      success: true,
      stats: {
        total: stats.total,
        successful: stats.successful,
        failed: stats.failed,
        skipped: stats.skipped,
        duration: stats.duration,
      },
    })
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
