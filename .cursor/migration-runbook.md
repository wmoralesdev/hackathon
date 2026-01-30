# Migration Runbook: ShowcaseSnapshot Model

## Overview
This migration adds the `ShowcaseSnapshot` model to store scraped showcase data from team SaaS URLs.

## Migration Steps

### 1. Generate Migration (Local Development)

```bash
# Ensure you're in the project root
cd /path/to/hackathon

# Generate migration
npx prisma migrate dev --name add_showcase_snapshot

# This will:
# - Create migration SQL in prisma/migrations/
# - Apply migration to local database
# - Regenerate Prisma Client
```

### 2. Review Migration SQL

Before applying to staging/prod, review the generated SQL in:
```
prisma/migrations/[timestamp]_add_showcase_snapshot/migration.sql
```

Expected SQL should create:
- `showcase_snapshots` table
- Index on `team_number`
- Unique constraint on `team_number`

### 3. Apply to Staging

```bash
# Set DATABASE_URL to staging database
export DATABASE_URL="postgresql://..."

# Apply migration
npx prisma migrate deploy

# Verify
npx prisma studio  # Or query database directly
```

### 4. Apply to Production

```bash
# Set DATABASE_URL to production database
export DATABASE_URL="postgresql://..."

# Apply migration (this is a no-op if already applied)
npx prisma migrate deploy

# Verify
npx prisma studio  # Or query database directly
```

## Rollback (If Needed)

If you need to rollback:

```bash
# Create a new migration to drop the table
npx prisma migrate dev --name remove_showcase_snapshot

# Or manually drop table (NOT RECOMMENDED in production)
# DROP TABLE IF EXISTS showcase_snapshots;
```

## Verification

After migration, verify:

1. Table exists:
   ```sql
   SELECT * FROM showcase_snapshots LIMIT 1;
   ```

2. Prisma Client regenerated:
   ```typescript
   import { prisma } from "@/lib/prisma"
   // Should have prisma.showcaseSnapshot available
   ```

3. Schema is in sync:
   ```bash
   npx prisma validate
   ```

## Notes

- Migration is **non-destructive** (only adds new table)
- No data migration needed (empty table initially)
- Safe to run multiple times (idempotent via `migrate deploy`)
