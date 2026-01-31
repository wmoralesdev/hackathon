/**
 * Summary generation for showcase snapshots.
 * 
 * Prefers Firecrawl's summary format, with fallback to internal LLM if needed.
 */

import type { ShowcaseScrapeResult } from "./firecrawl-client"

/**
 * Generates a summary for scraped content.
 * 
 * Currently returns null as ShowcaseScrapeResult only includes URL and screenshot.
 * All other content comes from team-provided fields.
 * 
 * @param _scrapeResult - The scraped content to summarize
 * @returns Summary string or null if unable to generate
 */
export async function generateSummary(
  _scrapeResult: ShowcaseScrapeResult
): Promise<string | null> {
  return null
}

async function generateLLMSummary(
  _scrapeResult: ShowcaseScrapeResult
): Promise<string | null> {
  return null
}
