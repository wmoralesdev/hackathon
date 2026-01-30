# QA Fixtures and Verification Checklist

## Test URLs

Use these representative URLs to test different scenarios:

### Static HTML Site
- **URL**: `https://example.com`
- **Expected**: Should scrape successfully, return markdown, screenshot, and metadata
- **Use case**: Basic HTML site without JavaScript

### SPA (Single Page Application)
- **URL**: `https://react.dev` or `https://nextjs.org`
- **Expected**: Should handle JavaScript rendering, return content and screenshot
- **Use case**: Modern React/Next.js sites

### Blocked Site
- **URL**: `https://httpstat.us/403` (simulates 403)
- **Expected**: Should return `fetchError: "blocked"` or `"non_200"`
- **Use case**: Sites that block scraping or return errors

### Slow Site
- **URL**: `https://httpstat.us/200?sleep=5000` (5 second delay)
- **Expected**: May timeout depending on timeout settings, or succeed
- **Use case**: Slow-loading sites

### Invalid URL
- **URL**: `not-a-url` or `ftp://example.com`
- **Expected**: Should return `fetchError: "invalid_url"`
- **Use case**: Malformed URLs

### Private IP (SSRF Protection)
- **URL**: `http://127.0.0.1` or `http://192.168.1.1`
- **Expected**: Should return `fetchError: "private_ip"`
- **Use case**: SSRF protection testing

## Manual Verification Checklist

### Pre-Deployment

- [ ] **Environment Variables**
  - [ ] `FIRECRAWL_API_KEY` is set
  - [ ] `ADMIN_EMAILS` is configured (optional)
  - [ ] Database connection is working

- [ ] **Database Migration**
  - [ ] Migration has been applied
  - [ ] `ShowcaseSnapshot` table exists
  - [ ] Prisma client is regenerated

- [ ] **URL Validation**
  - [ ] Private IPs are blocked
  - [ ] Non-http/https protocols are rejected
  - [ ] Invalid URLs are handled gracefully

### Ingestion Testing

- [ ] **Single Team Ingestion**
  - [ ] POST `/api/portal/showcase/ingest/[teamNumber]` works
  - [ ] Admin authorization is enforced
  - [ ] Successful scrape stores data correctly
  - [ ] Failed scrape stores error correctly

- [ ] **Bulk Ingestion**
  - [ ] POST `/api/portal/showcase/ingest` works
  - [ ] Concurrency control works (check logs)
  - [ ] `retryFailedOnly` mode skips successful snapshots
  - [ ] Stats are returned correctly

- [ ] **Error Handling**
  - [ ] Timeout errors are stored
  - [ ] Blocked site errors are stored
  - [ ] Invalid URL errors are stored
  - [ ] Unknown errors are handled

### UI Testing

- [ ] **Showcase Grid** (`/[lang]/showcase`)
  - [ ] Displays all teams with snapshots
  - [ ] Shows placeholder for missing snapshots
  - [ ] Shows error badge for failed snapshots
  - [ ] Responsive layout (mobile/tablet/desktop)
  - [ ] Empty state displays when no teams

- [ ] **Showcase Detail** (`/[lang]/showcase/[teamNumber]`)
  - [ ] Displays full snapshot content
  - [ ] Shows screenshot/OG image
  - [ ] Renders markdown content
  - [ ] Shows links section
  - [ ] Error state displays correctly
  - [ ] Empty state displays correctly
  - [ ] Back button works
  - [ ] Admin retry button works (if admin)

- [ ] **Internationalization**
  - [ ] English strings display correctly
  - [ ] Spanish strings display correctly
  - [ ] Language switching works

### Performance Testing

- [ ] **Concurrency**
  - [ ] Default concurrency (3) doesn't overwhelm Firecrawl
  - [ ] Can handle 50 teams without issues
  - [ ] Timeouts are respected

- [ ] **Database Queries**
  - [ ] Grid page loads quickly
  - [ ] Detail page loads quickly
  - [ ] No N+1 query issues

### Security Testing

- [ ] **Authorization**
  - [ ] Non-admin users cannot access ingestion routes
  - [ ] Public routes are accessible without auth
  - [ ] Admin routes require authentication

- [ ] **SSRF Protection**
  - [ ] Private IPs are blocked
  - [ ] Localhost is blocked
  - [ ] DNS rebinding is mitigated (via Firecrawl)

### Edge Cases

- [ ] **Missing Data**
  - [ ] Team with no `saasUrl` doesn't appear in grid
  - [ ] Team with `saasUrl` but no snapshot shows placeholder
  - [ ] Team with error shows error state

- [ ] **Data Updates**
  - [ ] Re-scraping updates existing snapshot
  - [ ] Changing `saasUrl` triggers new scrape
  - [ ] `lastFetchedAt` updates correctly

## Production Readiness

- [ ] **Monitoring**
  - [ ] Ingestion logs are visible
  - [ ] Error rates are tracked
  - [ ] Firecrawl API usage is monitored

- [ ] **Documentation**
  - [ ] Migration runbook is documented
  - [ ] Admin routes are documented
  - [ ] Environment variables are documented

- [ ] **Backup Plan**
  - [ ] Know how to re-scrape all teams
  - [ ] Know how to fix individual failures
  - [ ] Have Firecrawl API key backup
