/**
 * Summary generation for showcase snapshots.
 * 
 * Prefers Firecrawl's summary format, with fallback to internal LLM if needed.
 */

import { getFirecrawlClient, type FirecrawlScrapeError } from "./firecrawl-client"
import type { ShowcaseScrapeResult } from "./firecrawl-client"

/**
 * Generates a summary for scraped content.
 * 
 * Strategy:
 * 1. Try Firecrawl summary format (if available in future API versions)
 * 2. Fallback: Extract from markdown (first paragraph or first 200 chars)
 * 3. Future: Use internal LLM for better summaries
 * 
 * @param scrapeResult - The scraped content to summarize
 * @returns Summary string or null if unable to generate
 */
export async function generateSummary(
  scrapeResult: ShowcaseScrapeResult
): Promise<string | null> {
  // For now, extract summary from description or markdown
  // Firecrawl summary format may be available in future API versions
  
  if (scrapeResult.description) {
    // Use description if available (already a summary)
    return scrapeResult.description.length > 500
      ? scrapeResult.description.substring(0, 500) + "..."
      : scrapeResult.description
  }

  if (scrapeResult.markdown) {
    // Extract first paragraph or first 200 chars from markdown
    const lines = scrapeResult.markdown.split("\n").filter((line) => line.trim())
    const firstParagraph = lines[0]?.trim()
    
    if (firstParagraph && firstParagraph.length > 0) {
      return firstParagraph.length > 500
        ? firstParagraph.substring(0, 500) + "..."
        : firstParagraph
    }
  }

  // Future: Use LLM to generate summary
  // const llmSummary = await generateLLMSummary(scrapeResult)
  // return llmSummary

  return null
}

/**
 * Future: Generate summary using internal LLM.
 * This can be implemented when LLM integration is available.
 */
async function generateLLMSummary(
  scrapeResult: ShowcaseScrapeResult
): Promise<string | null> {
  // TODO: Implement LLM-based summary generation
  // This would use OpenAI, Anthropic, or similar service
  // to generate a concise summary from markdown/content
  return null
}
