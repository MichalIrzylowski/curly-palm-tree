# TASK-01 — Create Services collection with schema and localization

| Field | Value |
|-------|-------|
| Type | collection |
| PRD ref | §3.1, §2.1 T1–T3, T7 |
| Depends on | — |
| Status | [ ] Todo |

## Context

Create a new Payload CMS collection `services` with full bilingual (PL/EN) support. The collection includes service name, description, category relationship, icon upload, pricing text, featured flag, and display order. This is the core data model for the services feature; all downstream tasks depend on it.

## Steps

1. Create `src/collections/Services/index.ts` (directory-based, custom admin UI).

2. Define the collection config with these fields:
   - **name** (text, localized: PL+EN, required): Service name
   - **slug** (text, slug auto-generated from name, required): For future detail pages
   - **description** (richText, localized: PL+EN, required): Patient-facing explanation
   - **category** (relationship to `categories`, required): Single category reference
   - **icon** (media, optional): Icon or image for service card
   - **priceText** (text, localized: PL+EN, optional): e.g. "From 150 PLN", "Ask for pricing"
   - **featured** (checkbox, optional): Boolean flag for homepage highlights
   - **displayOrder** (number, optional): Manual sort order within category (default: 0)

3. Set **slug auto-generation:** When name changes, automatically update slug (use `beforeValidate` hook if needed).

4. Set **access control:**
   - **Read:** Public (`anyone()`)
   - **Create/Update/Delete:** Authenticated admins only (check `user.roles` includes 'admin')

5. Verify localization is enabled for `pl` and `en` in `src/payload.config.ts` (should already be enabled from earlier work).

6. Register the collection in `src/payload.config.ts` under `collections: [ ... ]` array (add import + push to array).

7. Run `pnpm generate:types` to regenerate `src/payload-types.ts`.

8. Run `pnpm exec tsc --noEmit` to verify no TypeScript errors.

## Files

- **Create:** `src/collections/Services/index.ts`
- **Modify:** `src/payload.config.ts` (register collection)

## Done when

- [ ] `src/collections/Services/index.ts` exists with all 7 fields and access rules
- [ ] Collection is registered in `src/payload.config.ts`
- [ ] `pnpm generate:types` completes without errors
- [ ] `pnpm exec tsc --noEmit` returns no errors
- [ ] Payload admin dashboard shows Services collection in sidebar
- [ ] Can manually create a test service with PL + EN content without errors
