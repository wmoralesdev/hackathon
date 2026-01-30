# Showcase UI Wireframe & Information Architecture

## Route Structure

### Public Routes

- `/[lang]/showcase` - Grid view of all team showcases
- `/[lang]/showcase/[teamNumber]` - Detail view for a specific team

## Grid View (`/[lang]/showcase`)

### Layout
- Responsive grid layout (1 column mobile, 2-3 columns tablet, 3-4 columns desktop)
- Cards arranged by team number (ascending)

### Showcase Card Component

Each card displays:

**When snapshot exists:**
- Screenshot/OG image (top, aspect ratio ~16:9)
- Team number badge
- Title (from `title` or `ogJson.og:title`)
- Description/summary (truncated, ~2-3 lines)
- "View Details" link/button
- Optional: Key links (if available)

**When snapshot missing:**
- Placeholder image/icon
- Team number badge
- "Team {teamNumber}" as title
- "Showcase not available" message
- Link to source URL (if available from `Deliverable.saasUrl`)

**When snapshot has error:**
- Error badge/icon
- Team number badge
- "Team {teamNumber}" as title
- Error message (from `fetchError`)
- "Retry" button (admin only)
- Link to source URL

### Empty State
- When no teams have showcases yet
- Message: "No showcases available yet"
- Illustration/icon

### Filtering/Sorting (Future)
- Filter by team number range
- Search by title/description
- Sort by team number, last updated

## Detail View (`/[lang]/showcase/[teamNumber]`)

### Layout
- Full-width layout
- Back button to grid
- Team number prominently displayed

### Content Sections

**Header:**
- Large screenshot/OG image (full width, max height ~600px)
- Team number badge
- Title
- Description/summary (full text)

**Content:**
- Markdown content (if available, rendered as HTML)
- Links section (if available)
- Metadata section (OG tags, last fetched timestamp)

**Error State:**
- Error message
- Source URL link
- "Retry" button (admin only)

**Missing State:**
- "Showcase not available" message
- Source URL link (if available)

### Footer
- "Back to Showcase" link
- Share buttons (optional)

## Responsive Design

- Mobile: Single column, stacked layout
- Tablet: 2 columns grid, detail view optimized
- Desktop: 3-4 columns grid, full detail view

## Accessibility

- Semantic HTML (article, header, main)
- Alt text for images
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators

## i18n Strings Needed

### Grid View
- `showcase.title` - "Showcase"
- `showcase.empty_state` - "No showcases available yet"
- `showcase.card.view_details` - "View Details"
- `showcase.card.not_available` - "Showcase not available"
- `showcase.card.error` - "Error loading showcase"

### Detail View
- `showcase.detail.back` - "Back to Showcase"
- `showcase.detail.team` - "Team {teamNumber}"
- `showcase.detail.last_fetched` - "Last updated: {date}"
- `showcase.detail.links` - "Links"
- `showcase.detail.metadata` - "Metadata"
- `showcase.detail.retry` - "Retry" (admin)
- `showcase.detail.not_available` - "Showcase not available for this team"

### Error States
- `showcase.error.timeout` - "Request timed out"
- `showcase.error.blocked` - "Site blocked scraping"
- `showcase.error.invalid_url` - "Invalid URL"
- `showcase.error.non_200` - "Site returned error"
- `showcase.error.unknown` - "Unknown error occurred"

## Admin Features (Future)

- Retry button for failed snapshots
- Manual refresh trigger
- Observability: lastFetchedAt, fetchError visibility
- Bulk refresh all teams
