import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"
import { NextResponse, after } from "next/server"
import { ingestTeamShowcase } from "@/lib/showcase/ingestion"

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
    const {
      teamNumber,
      saasUrl,
      productName,
      oneLiner,
      targetUsers,
      problem,
      category,
      stage,
    } = body as {
      teamNumber: number
      saasUrl: string
      productName?: string | null
      oneLiner?: string | null
      targetUsers?: string | null
      problem?: string | null
      category?: string | null
      stage?: string | null
    }

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
        productName: productName?.trim() || null,
        oneLiner: oneLiner?.trim() || null,
        targetUsers: targetUsers?.trim() || null,
        problem: problem?.trim() || null,
        category: category?.trim() || null,
        stage: stage?.trim() || null,
      },
      update: {
        saasUrl: saasUrl || null,
        productName: productName?.trim() || null,
        oneLiner: oneLiner?.trim() || null,
        targetUsers: targetUsers?.trim() || null,
        problem: problem?.trim() || null,
        category: category?.trim() || null,
        stage: stage?.trim() || null,
      },
    })

    // Trigger showcase ingestion when SaaS URL is new/updated OR showcase is missing/failed
    let shouldTriggerShowcaseIngestion = false
    if (deliverable.saasUrl) {
      const existingSnapshot = await prisma.showcaseSnapshot.findUnique({
        where: { teamNumber },
        select: { fetchError: true },
      })
      shouldTriggerShowcaseIngestion =
        existing?.saasUrl !== deliverable.saasUrl ||
        !existingSnapshot ||
        existingSnapshot.fetchError !== null
    }

    if (shouldTriggerShowcaseIngestion && deliverable.saasUrl) {
      // Schedule showcase ingestion to run after response is sent
      after(async () => {
        try {
          await ingestTeamShowcase(teamNumber, deliverable.saasUrl, { logProgress: true })
        } catch (error) {
          console.error(
            `[Showcase Ingestion] Failed for team ${teamNumber}:`,
            error instanceof Error ? error.message : error
          )
        }
      })
    }

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
