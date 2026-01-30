# ShowcaseSnapshot Output Contract

## Purpose
Defines the structure and fields for `ShowcaseSnapshot` model that stores scraped data from team SaaS URLs using Firecrawl.

## Firecrawl /scrape Request Formats

We request the following formats from Firecrawl `/scrape` endpoint:
- `markdown` - Clean markdown representation of the page content (for searchable text and summary generation)
- `screenshot` - Visual screenshot of the rendered page (for showcase card display)
- `links` - Extracted links from the page (optional, for navigation)

Additionally, we capture:
- `metadata` - Page metadata including Open Graph tags, title, description (from Firecrawl's response)

## ShowcaseSnapshot Fields

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `teamNumber` | `Int` | Unique identifier for the team (primary key) |
| `sourceUrl` | `String` | The original SaaS URL that was scraped |
| `lastFetchedAt` | `DateTime?` | Timestamp of last successful scrape attempt |

### Optional Fields (Content)

| Field | Type | Description |
|-------|------|-------------|
| `title` | `String?` | Page title (from metadata or HTML title tag) |
| `description` | `String?` | Page description (from OG description or meta description) |
| `ogJson` | `Json?` | Complete Open Graph metadata as JSON object |
| `markdown` | `String?` | Clean markdown content from Firecrawl |
| `summary` | `String?` | Generated summary (from Firecrawl summary format or LLM fallback) |
| `screenshotUrl` | `String?` | URL to screenshot (Firecrawl-hosted or Supabase Storage URL) |
| `links` | `Json?` | Array of extracted links (structure TBD based on Firecrawl response) |

### Error Handling Fields

| Field | Type | Description |
|-------|------|-------------|
| `fetchError` | `String?` | Error code/message if scrape failed (e.g., "timeout", "blocked", "invalid_url", "non_200") |

## Field Sources

### From Firecrawl Response

- `metadata.title` → `title`
- `metadata.description` → `description`
- `metadata` (full object) → `ogJson`
- `markdown` → `markdown`
- `screenshot` → `screenshotUrl` (URL or uploaded to storage)
- `links` → `links` (normalized array)

### Generated/Computed

- `summary` - Generated via Firecrawl `summary` format (preferred) or internal LLM fallback
- `fetchError` - Set when scrape fails (see error mapping)

## Data Flow

1. Admin triggers ingestion for `Deliverable.saasUrl`
2. URL validated and passed to Firecrawl `/scrape`
3. Firecrawl returns: `{ metadata, markdown, screenshot, links }`
4. Optional: Generate `summary` via Firecrawl summary format
5. Store as `ShowcaseSnapshot` keyed by `teamNumber`
6. Public `/showcase` route reads from `ShowcaseSnapshot` (never scrapes on view)

## Fallback Behavior

- If scrape fails: Store `fetchError` code, keep `sourceUrl` and `teamNumber`
- UI shows: Team number, source URL, error badge
- Retry: Admin can trigger re-scrape via ingestion job
