/**
 * Showcase ingestion utilities for scraping and storing showcase snapshots.
 */

import { prisma } from "@/lib/prisma"
import { scrapeSaasLanding, mapScrapeErrorToFetchError } from "./scrape-saas-landing"

export interface IngestionOptions {
  concurrency?: number
  perTeamTimeout?: number
  retryFailedOnly?: boolean
  logProgress?: boolean
}

export interface IngestionResult {
  teamNumber: number
  success: boolean
  error?: string
  duration: number
}

export interface IngestionStats {
  total: number
  successful: number
  failed: number
  skipped: number
  duration: number
  results: IngestionResult[]
}

/**
 * Ingests showcase snapshot for a single team.
 */
export async function ingestTeamShowcase(
  teamNumber: number,
  saasUrl: string | null,
  options: IngestionOptions = {}
): Promise<IngestionResult> {
  const startTime = Date.now()
  const { logProgress = false } = options

  if (!saasUrl) {
    if (logProgress) {
      console.log(`[Ingestion] Team ${teamNumber}: Skipped (no SaaS URL)`)
    }
    return {
      teamNumber,
      success: false,
      error: "no_saas_url",
      duration: Date.now() - startTime,
    }
  }

  if (logProgress) {
    console.log(`[Ingestion] Team ${teamNumber}: Starting ingestion for ${saasUrl}`)
  }

  try {
    // Scrape the URL
    const scrapeResult = await scrapeSaasLanding(saasUrl)

    if (!scrapeResult.success) {
      // Store error
      await prisma.showcaseSnapshot.upsert({
        where: { teamNumber },
        create: {
          teamNumber,
          sourceUrl: saasUrl,
          fetchError: mapScrapeErrorToFetchError(scrapeResult.errorCode),
        },
        update: {
          sourceUrl: saasUrl,
          fetchError: mapScrapeErrorToFetchError(scrapeResult.errorCode),
          lastFetchedAt: new Date(),
        },
      })

      const duration = Date.now() - startTime
      if (logProgress) {
        console.log(
          `[Ingestion] Team ${teamNumber}: Failed (${scrapeResult.errorCode}) in ${duration}ms`
        )
      }

      return {
        teamNumber,
        success: false,
        error: scrapeResult.errorCode,
        duration,
      }
    }

    // Store successful snapshot (only URL and screenshot)
    await prisma.showcaseSnapshot.upsert({
      where: { teamNumber },
      create: {
        teamNumber,
        sourceUrl: scrapeResult.data.url,
        screenshotUrl: scrapeResult.data.screenshotUrl || null,
        lastFetchedAt: new Date(),
        fetchError: null,
      },
      update: {
        sourceUrl: scrapeResult.data.url,
        screenshotUrl: scrapeResult.data.screenshotUrl || null,
        lastFetchedAt: new Date(),
        fetchError: null,
      },
    })

    const duration = Date.now() - startTime
    if (logProgress) {
      console.log(`[Ingestion] Team ${teamNumber}: Success in ${duration}ms`)
    }

    return {
      teamNumber,
      success: true,
      duration,
    }
  } catch (error) {
    // Store error
    await prisma.showcaseSnapshot.upsert({
      where: { teamNumber },
      create: {
        teamNumber,
        sourceUrl: saasUrl,
        fetchError: "unknown",
      },
      update: {
        sourceUrl: saasUrl,
        fetchError: "unknown",
        lastFetchedAt: new Date(),
      },
    })

    const duration = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : "unknown"
    if (logProgress) {
      console.error(
        `[Ingestion] Team ${teamNumber}: Error (${errorMessage}) in ${duration}ms`,
        error
      )
    }

    return {
      teamNumber,
      success: false,
      error: errorMessage,
      duration,
    }
  }
}

/**
 * Processes teams in parallel with concurrency control.
 */
async function processTeamsInParallel<T>(
  items: T[],
  concurrency: number,
  processor: (item: T) => Promise<IngestionResult>
): Promise<IngestionResult[]> {
  const results: IngestionResult[] = []
  const executing: Promise<void>[] = []

  for (const item of items) {
    const promise = processor(item).then((result) => {
      results.push(result)
    })

    executing.push(promise)

    if (executing.length >= concurrency) {
      await Promise.race(executing)
      executing.splice(
        executing.findIndex((p) => p === promise),
        1
      )
    }
  }

  await Promise.all(executing)
  return results
}

/**
 * Ingests showcase snapshots for all teams with SaaS URLs.
 */
export async function ingestAllShowcases(
  options: IngestionOptions = {}
): Promise<IngestionStats> {
  const startTime = Date.now()
  const {
    concurrency = 3,
    retryFailedOnly = false,
    logProgress = false,
  } = options

  // Get all deliverables with SaaS URLs
  const deliverables = await prisma.deliverable.findMany({
    where: {
      saasUrl: { not: null },
    },
    select: {
      teamNumber: true,
      saasUrl: true,
    },
  })

  // If retryFailedOnly, filter to teams with errors or no snapshot
  let teamsToProcess = deliverables

  if (retryFailedOnly) {
    const snapshots = await prisma.showcaseSnapshot.findMany({
      where: {
        teamNumber: { in: deliverables.map((d) => d.teamNumber) },
      },
      select: {
        teamNumber: true,
        fetchError: true,
      },
    })

    const snapshotMap = new Map(
      snapshots.map((s) => [s.teamNumber, s.fetchError])
    )

    teamsToProcess = deliverables.filter((d) => {
      const error = snapshotMap.get(d.teamNumber)
      return error !== null || !snapshotMap.has(d.teamNumber)
    })
  }

  if (logProgress) {
    console.log(
      `[Ingestion] Processing ${teamsToProcess.length} teams (concurrency: ${concurrency})`
    )
  }

  // Process teams in parallel
  const results = await processTeamsInParallel(
    teamsToProcess,
    concurrency,
    async (deliverable) => {
      if (logProgress) {
        console.log(`[Ingestion] Processing team ${deliverable.teamNumber}`)
      }

      return ingestTeamShowcase(
        deliverable.teamNumber,
        deliverable.saasUrl,
        options
      )
    }
  )

  const successful = results.filter((r) => r.success).length
  const failed = results.filter((r) => !r.success).length
  const skipped = deliverables.length - teamsToProcess.length

  return {
    total: teamsToProcess.length,
    successful,
    failed,
    skipped,
    duration: Date.now() - startTime,
    results,
  }
}
