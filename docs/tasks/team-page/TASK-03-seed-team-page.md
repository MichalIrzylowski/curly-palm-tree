# TASK-03 — Seed team page in CMS

| Field | Value |
|-------|-------|
| Type | seed |
| PRD ref | T-01, T-08 |
| Depends on | TASK-02 |
| Status | [ ] Todo |

> **OQ-1 (resolved):** Page title and SEO metadata are managed through the `Pages` collection `meta` fields — no hardcoded strings needed.

## Context

Creates the `/team` page in the `Pages` collection via the Payload Local API seed script. The page uses the `teamGrid` block as its only layout block. SEO metadata (T-08) is set via the `meta` fields on the page document in both `pl` and `en` locales.

## Steps

1. Open the existing seed file. Check `src/endpoints/seed.ts` or `src/seed/` — locate whichever file seeds the `pages` collection and extend it. If no pages seed exists, add a new section.

2. Guard against duplicate seeding — check if a page with `slug: 'team'` already exists before inserting:
   ```ts
   const existing = await payload.find({
     collection: 'pages',
     where: { slug: { equals: 'team' } },
     limit: 1,
   })
   if (existing.docs.length > 0) return // already seeded
   ```

3. Create the page for the `pl` locale first (default locale):
   ```ts
   await payload.create({
     collection: 'pages',
     locale: 'pl',
     data: {
       slug: 'team',
       layout: [
         {
           blockType: 'teamGrid',
         },
       ],
       meta: {
         title: 'Nasz Zespół',
         description: 'Poznaj zespół weterynarzy Lecznicy Weterynaryjnej w Sopocie.',
       },
     },
   })
   ```
   Use the clinic name and description from `docs/BRAND.md` for the meta copy.

4. Update the same page with `en` locale meta:
   ```ts
   const teamPage = await payload.find({
     collection: 'pages',
     where: { slug: { equals: 'team' } },
     limit: 1,
   })

   await payload.update({
     collection: 'pages',
     id: teamPage.docs[0].id,
     locale: 'en',
     data: {
       meta: {
         title: 'Our Team',
         description: 'Meet the veterinary team at our clinic in Sopot.',
       },
     },
   })
   ```

5. Run the seed (check the seed script's invocation method — typically via the Payload admin `/api/seed` endpoint or a direct script call documented in the project).

6. Verify in the Payload admin that the `team` page appears in the Pages collection with the `teamGrid` block and meta fields populated in both locales.

## Files

- **Modify:** `src/endpoints/seed.ts` (or equivalent seed file — check which file seeds pages)

## Done when

- [ ] Seed runs without errors
- [ ] A page with `slug: 'team'` appears in the Pages collection in Payload admin
- [ ] The page has one `teamGrid` block in its layout
- [ ] `meta.title` and `meta.description` are populated in both `pl` and `en` locales
- [ ] Visiting the page URL (via the existing `[slug]` route) renders the team grid
