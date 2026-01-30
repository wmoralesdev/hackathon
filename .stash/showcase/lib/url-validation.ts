/**
 * URL validation and SSRF protection for showcase SaaS URLs.
 * 
 * Unlike social posts (whitelist approach), showcase URLs can be any public URL.
 * We protect against SSRF by blocking private IP ranges and enforcing http/https only.
 */

/**
 * Private IP ranges that should be blocked to prevent SSRF attacks.
 * Includes RFC 1918 private networks, loopback, link-local, and reserved ranges.
 */
const PRIVATE_IP_RANGES = [
  // RFC 1918 - Private networks
  { start: "10.0.0.0", end: "10.255.255.255" },
  { start: "172.16.0.0", end: "172.31.255.255" },
  { start: "192.168.0.0", end: "192.168.255.255" },
  // Loopback
  { start: "127.0.0.0", end: "127.255.255.255" },
  // Link-local
  { start: "169.254.0.0", end: "169.254.255.255" },
  // Reserved
  { start: "0.0.0.0", end: "0.255.255.255" },
]

/**
 * Maximum URL length to prevent DoS attacks.
 */
const MAX_URL_LENGTH = 2048

/**
 * Maximum response size (in bytes) for scraped content.
 */
const MAX_RESPONSE_SIZE = 10 * 1024 * 1024 // 10MB

/**
 * Request timeout (in milliseconds).
 */
const REQUEST_TIMEOUT = 30000 // 30 seconds

/**
 * Converts an IP address string to a number for range comparison.
 */
function ipToNumber(ip: string): number {
  const parts = ip.split(".").map(Number)
  return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]
}

/**
 * Checks if an IP address falls within a private IP range.
 */
function isPrivateIP(ip: string): boolean {
  const ipNum = ipToNumber(ip)
  return PRIVATE_IP_RANGES.some((range) => {
    const start = ipToNumber(range.start)
    const end = ipToNumber(range.end)
    return ipNum >= start && ipNum <= end
  })
}

/**
 * Resolves hostname to IP address (for DNS rebinding protection).
 * In production, this should use a DNS resolver that respects DNS rebinding protections.
 */
async function resolveHostname(hostname: string): Promise<string | null> {
  try {
    // Note: In Node.js runtime, you'd use dns.promises.resolve4()
    // For edge runtime, you may need to use a DNS service or skip this check
    // For now, we'll return null and rely on other protections
    return null
  } catch {
    return null
  }
}

/**
 * Validates a URL for showcase scraping with SSRF protections.
 * 
 * @param input - The URL string to validate
 * @returns Validated URL object
 * @throws Error with code: "invalid_url" | "unsupported_protocol" | "private_ip" | "url_too_long"
 */
export function validateShowcaseUrl(input: string): URL {
  // Length check
  if (input.length > MAX_URL_LENGTH) {
    throw new Error("url_too_long")
  }

  // Parse URL
  let url: URL
  try {
    url = new URL(input)
  } catch {
    throw new Error("invalid_url")
  }

  // Protocol check - only http/https allowed
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("unsupported_protocol")
  }

  // Hostname validation
  const hostname = url.hostname.toLowerCase()

  // Block localhost and local domains
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".localhost")
  ) {
    throw new Error("private_ip")
  }

  // Check for IP addresses (IPv4)
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (ipv4Regex.test(hostname)) {
    if (isPrivateIP(hostname)) {
      throw new Error("private_ip")
    }
  }

  // Note: DNS rebinding protection would require resolving hostname to IP
  // and checking against private ranges. This is complex in edge runtime.
  // For now, we rely on:
  // 1. Protocol restriction (http/https only)
  // 2. Hostname pattern matching
  // 3. Firecrawl's own protections (it runs server-side)

  return url
}

/**
 * Configuration for showcase scraping requests.
 */
export const showcaseScrapeConfig = {
  maxUrlLength: MAX_URL_LENGTH,
  maxResponseSize: MAX_RESPONSE_SIZE,
  requestTimeout: REQUEST_TIMEOUT,
} as const

/**
 * Error codes returned by validateShowcaseUrl.
 */
export type ShowcaseUrlError =
  | "invalid_url"
  | "unsupported_protocol"
  | "private_ip"
  | "url_too_long"
