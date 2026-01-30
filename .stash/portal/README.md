# Portal Feature

This directory contains the portal feature implementation for the hackathon participant portal.

## Structure

```
.stash/portal/
├── components/     # React components for portal UI
├── pages/         # Next.js page components
├── api/          # API route handlers
└── README.md     # This file
```

## Components

All portal-related React components:
- `auth-button.tsx` - Authentication button component
- `auth-login-view.tsx` - Login view component
- `countdown-timer.tsx` - Countdown timer for freeze time
- `deliverable-form.tsx` - Form for submitting deliverables
- `faq-section.tsx` - FAQ section component
- `mentors-section.tsx` - Mentors section component
- `onboarding-view.tsx` - Onboarding flow component
- `participant-select.tsx` - Participant selection component
- `portal-view.tsx` - Main portal view component
- `social-posts-section.tsx` - Social posts management component
- `submission-timeline.tsx` - Timeline of submissions component
- `team-card.tsx` - Team information card component
- `tips-section.tsx` - Tips section component

## Pages

Portal pages located in `src/app/[lang]/portal/`:
- `page.tsx` - Main portal page
- `auth/page.tsx` - Authentication page
- `auth/callback/route.ts` - OAuth callback handler
- `onboarding/page.tsx` - Onboarding page

## API Routes

API routes located in `src/app/api/portal/`:
- `create-profile/route.ts` - Create user profile
- `deliverables/[teamNumber]/route.ts` - Get deliverables by team
- `submit-deliverable/route.ts` - Submit deliverable
- `social-posts/route.ts` - Social posts CRUD
- `social-posts/[id]/route.ts` - Individual social post operations
- `social-posts/team/[teamNumber]/route.ts` - Get social posts by team

## Related Files

- i18n translations: `src/i18n/en.ts` and `src/i18n/es.ts` (portal section)
- Database schema: `prisma/schema.prisma` (Profile, Deliverable, DeliverableSubmission, SocialPost models)

## Notes

- Portal requires authentication via Supabase
- Uses Prisma for database operations
- Supports multi-language (en/es) via i18n
- Integrates with XP system for gamification
