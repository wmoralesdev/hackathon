export type SocialPlatform = "x" | "linkedin"

const ALLOWED_HOSTS = new Set([
  "x.com",
  "www.x.com",
  "twitter.com",
  "www.twitter.com",
  "mobile.twitter.com",
  "linkedin.com",
  "www.linkedin.com",
])

export function assertAllowedSocialUrl(input: string): URL {
  let url: URL
  try {
    url = new URL(input)
  } catch {
    throw new Error("invalid_url")
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("invalid_url")
  }

  if (!ALLOWED_HOSTS.has(url.hostname.toLowerCase())) {
    throw new Error("unsupported_domain")
  }

  return url
}

export function parsePlatform(url: URL): SocialPlatform {
  const host = url.hostname.toLowerCase()
  if (host.endsWith("x.com") || host.endsWith("twitter.com")) return "x"
  return "linkedin"
}

/**
 * Canonicalize to reduce duplicates:
 * - X: force host to x.com, drop query/hash
 * - LinkedIn: drop query/hash
 */
export function canonicalizeSocialUrl(url: URL): string {
  const u = new URL(url.toString())
  const host = u.hostname.toLowerCase()
  if (host.endsWith("twitter.com") || host.endsWith("x.com")) {
    u.hostname = "x.com"
  }
  u.search = ""
  u.hash = ""
  return u.toString()
}

export type NormalizedSocialMetadata = {
  platform: SocialPlatform
  provider: string
  title?: string
  authorName?: string
  thumbnailUrl?: string
  html?: string
  raw: unknown
  source: "oembed" | "og"
}

export async function fetchXoEmbed(
  canonicalUrl: string
): Promise<NormalizedSocialMetadata> {
  const endpoint = new URL("https://publish.twitter.com/oembed")
  endpoint.searchParams.set("url", canonicalUrl)
  endpoint.searchParams.set("omit_script", "1")
  endpoint.searchParams.set("dnt", "1")

  const res = await fetch(endpoint.toString(), {
    // Some providers behave better with a UA.
    headers: { "user-agent": "Mozilla/5.0" },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`oembed_failed:${res.status}`)
  }

  const json: unknown = await res.json()
  const data = isRecord(json) ? json : {}
  return {
    platform: "x",
    provider: typeof data.provider_name === "string" ? data.provider_name : "X",
    title: typeof data.title === "string" ? data.title : undefined,
    authorName: typeof data.author_name === "string" ? data.author_name : undefined,
    thumbnailUrl: typeof data.thumbnail_url === "string" ? data.thumbnail_url : undefined,
    html: typeof data.html === "string" ? data.html : undefined,
    raw: json,
    source: "oembed",
  }
}

async function tryLinkedInOEmbed(
  canonicalUrl: string
): Promise<NormalizedSocialMetadata | null> {
  // Not consistently documented/available, but try best-effort.
  const endpoint = new URL("https://www.linkedin.com/oembed")
  endpoint.searchParams.set("url", canonicalUrl)
  endpoint.searchParams.set("format", "json")

  const res = await fetch(endpoint.toString(), {
    headers: { "user-agent": "Mozilla/5.0" },
    cache: "no-store",
  })

  if (!res.ok) return null

  const json: unknown = await res.json()
  const data = isRecord(json) ? json : null
  if (!data) return null

  return {
    platform: "linkedin",
    provider: typeof data.provider_name === "string" ? data.provider_name : "LinkedIn",
    title: typeof data.title === "string" ? data.title : undefined,
    authorName: typeof data.author_name === "string" ? data.author_name : undefined,
    thumbnailUrl: typeof data.thumbnail_url === "string" ? data.thumbnail_url : undefined,
    html: typeof data.html === "string" ? data.html : undefined,
    raw: json,
    source: "oembed",
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function getMetaContent(html: string, key: string): string | undefined {
  // Supports: <meta property="og:title" content="..."> and swapped attr order.
  const patterns = [
    new RegExp(
      `<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${key}["'][^>]*>`,
      "i"
    ),
  ]

  for (const re of patterns) {
    const m = html.match(re)
    if (m?.[1]) return decodeHtmlEntities(m[1])
  }
  return undefined
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

export async function fetchLinkedInMetadata(
  canonicalUrl: string
): Promise<NormalizedSocialMetadata> {
  const oembed = await tryLinkedInOEmbed(canonicalUrl)
  if (oembed) return oembed

  const res = await fetch(canonicalUrl, {
    headers: {
      "user-agent": "Mozilla/5.0",
      accept: "text/html,application/xhtml+xml",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`og_failed:${res.status}`)
  }

  const html = await res.text()

  const ogTitle = getMetaContent(html, "og:title")
  const ogDescription = getMetaContent(html, "og:description")
  const ogImage = getMetaContent(html, "og:image")
  const ogSiteName = getMetaContent(html, "og:site_name")
  const ogUrl = getMetaContent(html, "og:url") || canonicalUrl

  const og = {
    "og:title": ogTitle,
    "og:description": ogDescription,
    "og:image": ogImage,
    "og:site_name": ogSiteName,
    "og:url": ogUrl,
  }

  return {
    platform: "linkedin",
    provider: ogSiteName || "LinkedIn",
    title: ogTitle,
    authorName: undefined,
    thumbnailUrl: ogImage,
    html: undefined,
    raw: og,
    source: "og",
  }
}

export async function fetchSocialMetadata(
  canonicalUrl: string,
  platform: SocialPlatform
): Promise<NormalizedSocialMetadata> {
  if (platform === "x") return await fetchXoEmbed(canonicalUrl)
  return await fetchLinkedInMetadata(canonicalUrl)
}

