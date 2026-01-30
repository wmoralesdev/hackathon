---
name: Hackathon project scraping + showcase
overview: Use Firecrawl Cloud to scrape each team’s submitted SaaS URL (single page) and store a durable “showcase snapshot” (title/description/OG, screenshot, markdown, optional JSON summary). With ~50 teams, cost is effectively $0 on Firecrawl’s Free tier (1 credit/page; 500 credits one-time).
todos:
  - id: P0-scope-output-contract
    content: "[P0] Define `ShowcaseSnapshot` output contract (required fields + optional fields) and which Firecrawl /scrape formats to request. Parallelizable: yes."
    status: completed
  - id: P0-threat-model-url-guardrails
    content: "[P0] Define URL validation + SSRF protections (http/https only, block private IPs, DNS rebinding guard, size limits/timeouts) and ingestion authorization model. Parallelizable: yes."
    status: completed
  - id: P0-ui-wireframe-showcase
    content: "[P0] Define `/showcase` IA: grid + detail, empty/error states, and what’s shown when snapshot is missing. Parallelizable: yes."
    status: pending
  - id: P1-prisma-showcase-snapshot-model
    content: "[P1] Add Prisma model `ShowcaseSnapshot` keyed by `teamNumber` with fields for sourceUrl, metadata/OG, markdown, summary, screenshotUrl, links, lastFetchedAt, fetchError. Parallelizable: no (blocks P2/P3)."
    status: completed
  - id: P1-migration-runbook
    content: "[P1] Create migration + add a short runbook for applying it (local/staging/prod). Parallelizable: no (depends on P1-prisma-showcase-snapshot-model)."
    status: completed
  - id: P1-screenshot-storage-decision
    content: "[P1] Decide screenshot storage: keep Firecrawl-hosted URL vs upload to Supabase Storage; document tradeoffs and pick one. Parallelizable: yes (can start now; finalize before P4)."
    status: completed
  - id: P2-firecrawl-env-and-config
    content: "[P2] Add Firecrawl env wiring (API key, base URL, timeouts) and a typed config loader. Parallelizable: yes."
    status: completed
  - id: P2-firecrawl-client-wrapper
    content: "[P2] Implement Firecrawl client wrapper with retries/backoff and strict response normalization. Parallelizable: yes."
    status: completed
  - id: P2-scrape-saas-landing
    content: "[P2] Implement `scrapeSaasLanding(url)` using Firecrawl /scrape with formats: markdown, screenshot, links (+ capture metadata/OG). Parallelizable: yes."
    status: completed
  - id: P2-summary-step
    content: "[P2] Add a summary step (prefer Firecrawl `summary` format; fallback to internal LLM later) and store into `ShowcaseSnapshot.summary`. Parallelizable: yes."
    status: completed
  - id: P2-error-mapping
    content: "[P2] Map scrape failures into stable `fetchError` codes/messages + retry rules (blocked, timeout, invalid URL, non-200). Parallelizable: yes."
    status: completed
  - id: P3-admin-ingest-all
    content: "[P3] Add admin-only ingestion route/job to scrape all `Deliverable.saasUrl` entries and upsert `ShowcaseSnapshot` (idempotent, resumable). Parallelizable: no (depends on P1 + P2)."
    status: completed
  - id: P3-ingest-single-team
    content: "[P3] Add a single-team refresh endpoint/action (manual repair tool). Parallelizable: yes (after P3-admin-ingest-all)."
    status: completed
  - id: P3-ingest-ops-controls
    content: "[P3] Add ops controls: concurrency cap, per-team timeout, logging, and a “retry failed only” mode. Parallelizable: yes (with P3-admin-ingest-all)."
    status: pending
  - id: P4-public-showcase-routes
    content: "[P4] Build public `/showcase` grid and per-team detail route(s) reading `ShowcaseSnapshot`; include fallback UI when missing/errored. Parallelizable: yes (once P1 schema is stable)."
    status: pending
  - id: P4-showcase-card-component
    content: "[P4] Implement showcase card component (screenshot/OG image, title, summary, links) with responsive + accessible UI. Parallelizable: yes."
    status: pending
  - id: P4-i18n-copy
    content: "[P4] Add EN/ES i18n strings for showcase copy (labels, empty state, error state). Parallelizable: yes."
    status: pending
  - id: P5-qa-fixtures-and-checklist
    content: "[P5] Create QA fixtures: representative URLs (static, SPA, blocked, slow) + a manual verification checklist. Parallelizable: yes."
    status: completed
  - id: P5-admin-observability
    content: "[P5] Add admin-facing observability: lastFetchedAt, fetchError visibility, and “retry” buttons for failed snapshots. Parallelizable: yes."
    status: completed
isProject: false
---

## Goals

- Build a reliable way to **gather context** from each team’s submitted `saasUrl` and display it on a public `/showcase` route.
- Handle unknown tech stacks (Next/React/anything) by delegating rendering/extraction to **Firecrawl**.

## Why Firecrawl (and cost)

- **Capability fit**: Firecrawl `/scrape` handles JS-rendered SPAs, proxies, caching, and returns **clean markdown + metadata**. It can also return **screenshots**, **links**, and **structured JSON**.\n+- **Cost**: `/scrape` is **1 credit per page** and the Free plan includes **500 one-time credits**. With **~50 teams × 1 landing page**, you’ll use **~50 credits**, so the scrape cost is effectively **$0**.\n+- **Scope discipline**: Avoid `/extract` for this use case (dynamic pricing). Stick to `/scrape` with explicit formats.

## Implementation approach (Firecrawl-first)

## Phases (handoff-friendly)

### P0 — Design + guardrails (parallelizable)

- Output contract for what the showcase needs from a scrape.
- URL validation/SSRF protections and ingestion authorization.
- UI wireframe for `/showcase` (grid + detail + empty/error states).

### P1 — Data model + storage (mixed)

- Add `ShowcaseSnapshot` model and ship migration (sequential; blocks ingestion work).
- Decide screenshot storage strategy (can be worked in parallel but should be finalized before UI).

### P2 — Firecrawl integration (parallelizable)

- Firecrawl config + client wrapper + `scrapeSaasLanding(url)` implementation.
- Optional summary step and stable error mapping.

### P3 — Ingestion pipeline (mostly sequential)

- Admin ingestion route/job to backfill + refresh snapshots (idempotent, resumable).
- Add ops controls (concurrency, retries, logging).

### P4 — Public showcase UI (parallelizable once P1 is stable)

- `/showcase` grid + per-team detail route(s) driven entirely from stored snapshots.
- Card component, empty/error states, and i18n copy.

### P5 — QA + ops polish (parallelizable)

- QA fixtures + checklist; admin observability and retry tooling.

### Scrape + store a snapshot per team

- For each `Deliverable.saasUrl`, call Firecrawl `/scrape` and request formats:\n+  - `markdown` (for summary + searchable text)\n+  - `screenshot` (for showcase card)\n+  - `links` (optional: “key links”)\n+  - (Include page metadata/OG fields from Firecrawl’s returned `metadata` block)\n+- Persist the result as a `ShowcaseSnapshot` so the public showcase route never scrapes on view.\n+- Optional: run a second pass to produce a short `summary` (either via Firecrawl’s `summary` format or your existing LLM), then store it.\n+\n+### Fallback policy (minimal)\n+\n+- If Firecrawl fails (rate-limited, blocked site, invalid URL), store `fetchError` and render the showcase card with whatever you already have (team number + source URL) plus an error badge.\n+- Re-try ingestion later via the same job.

## Where this fits in your repo

- You already capture the SaaS URL via `Deliverable.saasUrl` in Prisma (`prisma/schema.prisma`) and submit it via `[src/app/api/portal/submit-deliverable/route.ts](src/app/api/portal/submit-deliverable/route.ts)`.
- Add a new persisted model (e.g. `ShowcaseSnapshot`) keyed by `teamNumber` to store:
  - `sourceUrl`, `title`, `description`, `ogJson`, `markdown`, `summary`, `screenshotUrl` (or stored blob), `lastFetchedAt`, `fetchError`
  - (You already do something similar for social posts in `SocialPost.ogJson`, `fetchError`, `lastFetchedAt`.)

## Data flow (high level)

```mermaid
sequenceDiagram
  participant User
  participant SubmitAPI as SubmitDeliverableAPI
  participant DB as Postgres_Prisma
  participant Ingest as ShowcaseIngestJob
  participant Scraper as ScraperProvider
  participant Showcase as PublicShowcaseRoute

  User->>SubmitAPI: POST saasUrl
  SubmitAPI->>DB: upsert Deliverable(teamNumber, saasUrl)
  Ingest->>DB: find Deliverables with saasUrl
  Ingest->>Scraper: scrape(url)
  Scraper-->>Ingest: metadata+markdown+screenshot
  Ingest->>DB: upsert ShowcaseSnapshot(teamNumber, ...)
  Showcase->>DB: read ShowcaseSnapshot
  Showcase-->>User: render cards/details
```



## Operational details

- **Run mode**: scrape on-demand (admin button / cron) not on every request.
- **Timeouts**: keep tight defaults and mark failures in `fetchError`.
- **Caching/refresh**: store snapshot; optionally refresh if older than N hours.
- **Security**: block internal IP ranges and non-http(s) URLs when fetching.

## Decision guidance

- **Default**: Firecrawl Cloud. For this hackathon scope (50 single-page scrapes), it’s the simplest path and effectively **$0**.

