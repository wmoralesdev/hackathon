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

    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
    })

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    const body = await request.json()
    const { teamNumber, saasUrl } = body as { teamNumber: number; saasUrl: string }

    if (profile.teamNumber !== teamNumber) {
      return NextResponse.json({ error: "Team number mismatch" }, { status: 403 })
    }

    // Get existing deliverable to track changes
    const existing = await prisma.deliverable.findUnique({
      where: { teamNumber },
    })

    // Upsert deliverable
    const deliverable = await prisma.deliverable.upsert({
      where: {
        teamNumber: teamNumber,
      } as { teamNumber: number },
      create: {
        teamNumber,
        saasUrl: saasUrl || null,
      },
      update: {
        saasUrl: saasUrl || null,
      },
    })

    // Create submission records for changes
    const submissions = []

    // Track SaaS URL change
    if (existing?.saasUrl !== deliverable.saasUrl) {
      if (deliverable.saasUrl) {
        submissions.push({
          deliverableId: deliverable.id,
          submittedById: user.id,
          action: existing?.saasUrl ? "saas_updated" : "saas_created",
          value: deliverable.saasUrl,
        })
      }
    }

    // Create all submission records
    if (submissions.length > 0) {
      await prisma.deliverableSubmission.createMany({
        data: submissions,
      })
    }

    // Fetch deliverable with submissions for response
    const deliverableWithSubmissions = await prisma.deliverable.findUnique({
      where: { teamNumber },
      include: {
        submissions: {
          orderBy: { submittedAt: "desc" },
          take: 10,
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

    return NextResponse.json({ deliverable: deliverableWithSubmissions })
  } catch (error) {
    console.error("Submit deliverable error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
