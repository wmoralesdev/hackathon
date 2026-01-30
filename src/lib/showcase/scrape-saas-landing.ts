/**
 * Main function to scrape a SaaS landing page and return normalized data.
 * 
 * This is the primary entry point for showcase scraping. It:
 * 1. Validates the URL
 * 2. Calls Firecrawl to scrape the page
 * 3. Returns normalized data ready for ShowcaseSnapshot storage
 */

import { validateShowcaseUrl, type ShowcaseUrlError } from "./url-validation"
import { getFirecrawlClient, type FirecrawlScrapeError } from "./firecrawl-client"
import type { ShowcaseScrapeResult } from "./firecrawl-client"

export interface ScrapeSaasLandingResult {
  success: true
  data: ShowcaseScrapeResult
}

export interface ScrapeSaasLandingError {
  success: false
  errorCode: string
  errorMessage: string
}

export type ScrapeSaasLandingResponse = ScrapeSaasLandingResult | ScrapeSaasLandingError

/**
 * Scrapes a SaaS landing page URL using Firecrawl.
 * 
 * @param url - The SaaS URL to scrape (will be validated)
 * @returns Scrape result or error information
 */
export async function scrapeSaasLanding(
  url: string
): Promise<ScrapeSaasLandingResponse> {
  // Step 1: Validate URL
  let validatedUrl: URL
  try {
    validatedUrl = validateShowcaseUrl(url)
  } catch (error) {
    const errorCode =
      error instanceof Error ? (error.message as ShowcaseUrlError) : "invalid_url"
    return {
      success: false,
      errorCode,
      errorMessage: `Invalid URL: ${error instanceof Error ? error.message : String(error)}`,
    }
  }

  // Step 2: Scrape with Firecrawl
  const client = getFirecrawlClient()
  try {
    const result = await client.scrape(validatedUrl.toString(), [
      "markdown",
      "screenshot",
      "links",
    ])

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    if (error instanceof FirecrawlScrapeError) {
      return {
        success: false,
        errorCode: error.code,
        errorMessage: error.message,
      }
    }

    return {
      success: false,
      errorCode: "unknown",
      errorMessage:
        error instanceof Error ? error.message : "Unknown error during scrape",
    }
  }
}

/**
 * Maps scrape error codes to stable fetchError strings for storage.
 */
export function mapScrapeErrorToFetchError(
  errorCode: string
): string {
  const errorMap: Record<string, string> = {
    timeout: "timeout",
    blocked: "blocked",
    invalid_url: "invalid_url",
    non_200: "non_200",
    rate_limited: "rate_limited",
    api_error: "api_error",
    unknown: "unknown",
  }

  return errorMap[errorCode] || "unknown"
}
