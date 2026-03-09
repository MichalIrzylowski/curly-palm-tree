# TASK-04 — Seed sample services data

| Field | Value |
|-------|-------|
| Type | seed |
| PRD ref | §3.1, §11 (sample data) |
| Depends on | TASK-01 (Services collection exists), TASK-03 (block functional, optional) |
| Status | [ ] Todo |

## Context

Create a seed script that populates the Services collection with initial sample data (7 categories with ~3 services each). This enables testing the collection, block, and page without manual data entry. Guard against duplicate seeding.

## Steps

1. Create or extend `src/endpoints/seed.ts` to add a `seedServices()` function.

2. Inside the function:
   - First, check if services already exist: `const existing = await payload.find({ collection: 'services', limit: 1 })`
   - If `existing.docs.length > 0`, log "Services already seeded, skipping" and return (guard against duplicates)

3. Query existing Categories collection to get IDs:
   ```typescript
   const categories = await payload.find({ collection: 'categories', limit: 100 });
   ```
   Build a map of category slug → ID for reference.

4. Define sample service data (in PL + EN):
   ```
   Prevention & Vaccinations:
   - Routine vaccination (puppies, kittens, adults)
   - Microchipping
   - Flea/tick prevention

   Internal Medicine:
   - General health check-ups
   - Digestive issues
   - Allergies & dermatology

   Surgery:
   - Spaying / neutering
   - Soft tissue surgery
   - Orthopedic surgery

   Dentistry:
   - Dental cleaning
   - Tooth extraction
   - Dental disease treatment

   Diagnostics:
   - X-ray imaging
   - Ultrasound
   - Laboratory tests

   Dermatology:
   - Skin condition diagnosis & treatment
   - Ear infections
   - Allergy testing

   Small Animals:
   - Rabbits, guinea pigs, hamsters
   - Exotic pet care
   - Ferrets
   ```

5. For each service, create a document with:
   - **name** (PL + EN versions)
   - **description** (PL + EN, 2–3 sentence patient-facing text)
   - **category** (reference ID from step 3)
   - **priceText** (optional, e.g. "From 150 PLN" for some, null for others)
   - **featured** (set to true for 3–4 services to showcase in homepage block; others false)
   - **displayOrder** (0, 1, 2, ... within category; used for sorting)

6. Use Payload Local API to create documents:
   ```typescript
   await payload.create({
     collection: 'services',
     data: { name: { pl: '...', en: '...' }, ... }
   })
   ```

7. Log success: "Seeded N services" with count.

8. If Categories don't exist yet, log a warning: "Categories collection is empty; create categories first before seeding services."

9. Add the seed function to the main seed endpoint flow (ensure it's called after categories are seeded or exist).

## Files

- **Create or Modify:** `src/endpoints/seed.ts` (add `seedServices()` function and call in main flow)

## Done when

- [ ] `seedServices()` function exists in seed endpoint
- [ ] Duplicate guard prevents re-seeding if services already exist
- [ ] Sample data covers all 7 categories with 3–4 services each
- [ ] All service fields (name, description, category, priceText, featured, displayOrder) are populated
- [ ] Bilingual content (PL + EN) is provided for all localized fields
- [ ] Featured services (3–4) are marked for homepage block testing
- [ ] `pnpm payload seed` (or equivalent) runs without errors
- [ ] Services appear in Payload admin dashboard after seeding
- [ ] Verify: Services display correctly in `/services` page and `ServicesHighlight` block
