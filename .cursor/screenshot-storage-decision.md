# Screenshot Storage Decision

## Options Considered

### Option 1: Firecrawl-Hosted URLs
**Approach**: Store the screenshot URL returned by Firecrawl directly.

**Pros:**
- Zero implementation effort
- No storage costs
- No upload/download overhead
- Firecrawl handles CDN/caching

**Cons:**
- Dependency on Firecrawl's URL persistence (may expire?)
- Less control over availability
- Potential CORS issues if Firecrawl doesn't allow cross-origin
- External dependency for long-term storage

### Option 2: Supabase Storage
**Approach**: Download screenshot from Firecrawl and upload to Supabase Storage bucket.

**Pros:**
- Full control over storage lifecycle
- No external dependencies
- Consistent with other assets in the project
- Can implement custom CDN/caching
- Better for long-term archival

**Cons:**
- Implementation complexity (download → upload flow)
- Storage costs (though minimal for ~50 screenshots)
- Additional latency during ingestion
- Need to handle upload failures

## Decision: **Firecrawl-Hosted URLs** (Option 1)

### Rationale

1. **Scope**: This is a hackathon project with ~50 teams. Long-term archival is not a primary concern.
2. **Cost**: Firecrawl Free tier provides 500 credits. Using ~50 for screenshots leaves plenty of buffer.
3. **Simplicity**: Zero additional implementation - just store the URL from Firecrawl response.
4. **Firecrawl Reliability**: Firecrawl is a production service designed for this use case. Their URLs should be stable for the hackathon duration.
5. **Time to Market**: Faster implementation means faster delivery.

### Implementation

- Store `screenshotUrl` directly from Firecrawl response
- No download/upload step needed
- If Firecrawl URL expires or becomes unavailable, we can:
  - Re-scrape (idempotent operation)
  - Fallback to OG image if available
  - Show placeholder image

### Future Migration Path

If we need to migrate to Supabase Storage later:
1. Add a migration script to download from Firecrawl URLs and upload to Supabase
2. Update ingestion pipeline to upload during scrape
3. Update schema to track storage location

### Monitoring

- Track `fetchError` for screenshot-specific failures
- Monitor screenshot URL availability in production
- Add admin tool to re-scrape if URLs become stale

## Conclusion

For this hackathon scope, **Firecrawl-hosted URLs** provide the best balance of simplicity, cost, and reliability. We can always migrate to Supabase Storage later if needed.
