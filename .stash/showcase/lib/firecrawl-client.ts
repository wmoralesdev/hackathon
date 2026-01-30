/**
 * Firecrawl API client wrapper with retries, backoff, and response normalization.
 * 
 * Uses Firecrawl Cloud /scrape endpoint to fetch page content, metadata, and screenshots.
 */

import { getFirecrawlConfig, validateFirecrawlConfig, type FirecrawlConfig } from "./firecrawl-config"
import { showcaseScrapeConfig } from "./url-validation"

/**
 * Firecrawl scrape request formats.
 */
export type FirecrawlScrapeFormats = "markdown" | "screenshot" | "links"

/**
 * Firecrawl API response structure (simplified).
 */
export interface FirecrawlScrapeResponse {
  success: boolean
  data?: {
    url: string
    markdown?: string
    screenshot?: string
    links?: Array<{
      href: string
      text?: string
      type?: string
    }>
    metadata?: {
      title?: string
      description?: string
      ogTitle?: string
      ogDescription?: string
      ogImage?: string
      ogUrl?: string
      ogSiteName?: string
      [key: string]: unknown
    }
  }
  error?: string
}

/**
 * Normalized showcase data extracted from Firecrawl response.
 */
export interface ShowcaseScrapeResult {
  url: string
  title?: string
  description?: string
  ogJson?: Record<string, unknown>
  markdown?: string
  screenshotUrl?: string
  links?: Array<{
    href: string
    text?: string
    type?: string
  }>
}

/**
 * Error codes for scrape failures.
 */
export type ScrapeErrorCode =
  | "timeout"
  | "blocked"
  | "invalid_url"
  | "non_200"
  | "rate_limited"
  | "api_error"
  | "unknown"

export class FirecrawlScrapeError extends Error {
  constructor(
    public code: ScrapeErrorCode,
    message: string,
    public originalError?: unknown
  ) {
    super(message)
    this.name = "FirecrawlScrapeError"
  }
}

/**
 * Sleep utility for retry delays.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Firecrawl API client with retry logic and error handling.
 */
export class FirecrawlClient {
  private config: FirecrawlConfig

  constructor(config?: FirecrawlConfig) {
    this.config = config || getFirecrawlConfig()
    validateFirecrawlConfig(this.config)
  }

  /**
   * Scrapes a URL using Firecrawl /scrape endpoint.
   * 
   * @param url - The URL to scrape (must be validated first)
   * @param formats - Formats to request from Firecrawl
   * @returns Normalized scrape result
   * @throws FirecrawlScrapeError on failure
   */
  async scrape(
    url: string,
    formats: FirecrawlScrapeFormats[] = ["markdown", "screenshot", "links"]
  ): Promise<ShowcaseScrapeResult> {
    let lastError: unknown

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const response = await this.scrapeOnce(url, formats)
        return this.normalizeResponse(response, url)
      } catch (error) {
        lastError = error

        // Don't retry on certain errors
        if (error instanceof FirecrawlScrapeError) {
          if (
            error.code === "invalid_url" ||
            error.code === "blocked" ||
            error.code === "non_200"
          ) {
            throw error
          }
        }

        // If this was the last attempt, throw
        if (attempt === this.config.maxRetries) {
          break
        }

        // Wait before retrying
        await sleep(this.config.retryDelay * (attempt + 1))
      }
    }

    // All retries exhausted
    throw new FirecrawlScrapeError(
      "unknown",
      `Failed to scrape ${url} after ${this.config.maxRetries + 1} attempts`,
      lastError
    )
  }

  /**
   * Single scrape attempt.
   */
  private async scrapeOnce(
    url: string,
    formats: FirecrawlScrapeFormats[]
  ): Promise<FirecrawlScrapeResponse> {
    const endpoint = `${this.config.baseUrl}/v1/scrape`

    const controller = new AbortController()
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.config.timeout
    )

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          url,
          formats,
          timeout: this.config.timeout,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        
        if (response.status === 401 || response.status === 403) {
          throw new FirecrawlScrapeError(
            "api_error",
            `Firecrawl API authentication failed: ${errorText}`
          )
        }
        
        if (response.status === 429) {
          throw new FirecrawlScrapeError(
            "rate_limited",
            "Firecrawl API rate limit exceeded"
          )
        }

        if (response.status >= 400 && response.status < 500) {
          throw new FirecrawlScrapeError(
            "blocked",
            `Firecrawl API error: ${response.status} ${errorText}`
          )
        }

        throw new FirecrawlScrapeError(
          "api_error",
          `Firecrawl API error: ${response.status} ${errorText}`
        )
      }

      const data: FirecrawlScrapeResponse = await response.json()

      if (!data.success) {
        throw new FirecrawlScrapeError(
          "api_error",
          data.error || "Firecrawl scrape failed"
        )
      }

      return data
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof FirecrawlScrapeError) {
        throw error
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new FirecrawlScrapeError(
          "timeout",
          `Scrape timeout after ${this.config.timeout}ms`
        )
      }

      throw new FirecrawlScrapeError(
        "unknown",
        `Unexpected error during scrape: ${error instanceof Error ? error.message : String(error)}`,
        error
      )
    }
  }

  /**
   * Normalizes Firecrawl response to ShowcaseScrapeResult format.
   */
  private normalizeResponse(
    response: FirecrawlScrapeResponse,
    originalUrl: string
  ): ShowcaseScrapeResult {
    if (!response.data) {
      throw new FirecrawlScrapeError(
        "api_error",
        "Firecrawl response missing data"
      )
    }

    const { data } = response
    const metadata = data.metadata || {}

    // Build OG JSON object
    const ogJson: Record<string, unknown> = {}
    if (metadata.ogTitle) ogJson["og:title"] = metadata.ogTitle
    if (metadata.ogDescription) ogJson["og:description"] = metadata.ogDescription
    if (metadata.ogImage) ogJson["og:image"] = metadata.ogImage
    if (metadata.ogUrl) ogJson["og:url"] = metadata.ogUrl
    if (metadata.ogSiteName) ogJson["og:site_name"] = metadata.ogSiteName

    // Include all metadata fields
    Object.assign(ogJson, metadata)

    return {
      url: data.url || originalUrl,
      title: metadata.title || metadata.ogTitle || undefined,
      description: metadata.description || metadata.ogDescription || undefined,
      ogJson: Object.keys(ogJson).length > 0 ? ogJson : undefined,
      markdown: data.markdown || undefined,
      screenshotUrl: data.screenshot || undefined,
      links: data.links || undefined,
    }
  }
}

/**
 * Default Firecrawl client instance.
 */
let defaultClient: FirecrawlClient | null = null

/**
 * Gets or creates the default Firecrawl client instance.
 */
export function getFirecrawlClient(): FirecrawlClient {
  if (!defaultClient) {
    defaultClient = new FirecrawlClient()
  }
  return defaultClient
}
