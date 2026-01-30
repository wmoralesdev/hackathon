/**
 * Firecrawl configuration and environment variable loader.
 * 
 * Firecrawl Cloud API documentation:
 * https://docs.firecrawl.dev/api-reference/scrape
 */

export interface FirecrawlConfig {
  apiKey: string
  baseUrl: string
  timeout: number
  maxRetries: number
  retryDelay: number
}

/**
 * Loads Firecrawl configuration from environment variables.
 * 
 * Required env vars:
 * - FIRECRAWL_API_KEY: Your Firecrawl API key
 * 
 * Optional env vars:
 * - FIRECRAWL_BASE_URL: API base URL (default: https://api.firecrawl.dev)
 * - FIRECRAWL_TIMEOUT: Request timeout in ms (default: 30000)
 * - FIRECRAWL_MAX_RETRIES: Max retry attempts (default: 3)
 * - FIRECRAWL_RETRY_DELAY: Delay between retries in ms (default: 1000)
 */
export function getFirecrawlConfig(): FirecrawlConfig {
  const apiKey = process.env.FIRECRAWL_API_KEY
  if (!apiKey) {
    throw new Error(
      "FIRECRAWL_API_KEY environment variable is required. " +
      "Get your API key from https://firecrawl.dev"
    )
  }

  return {
    apiKey,
    baseUrl: process.env.FIRECRAWL_BASE_URL || "https://api.firecrawl.dev",
    timeout: parseInt(process.env.FIRECRAWL_TIMEOUT || "30000", 10),
    maxRetries: parseInt(process.env.FIRECRAWL_MAX_RETRIES || "3", 10),
    retryDelay: parseInt(process.env.FIRECRAWL_RETRY_DELAY || "1000", 10),
  }
}

/**
 * Validates Firecrawl configuration.
 */
export function validateFirecrawlConfig(config: FirecrawlConfig): void {
  if (!config.apiKey || config.apiKey.trim() === "") {
    throw new Error("Firecrawl API key is required")
  }
  if (config.timeout <= 0) {
    throw new Error("Firecrawl timeout must be positive")
  }
  if (config.maxRetries < 0) {
    throw new Error("Firecrawl max retries must be non-negative")
  }
  if (config.retryDelay < 0) {
    throw new Error("Firecrawl retry delay must be non-negative")
  }
}
