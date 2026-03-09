# TASK-03 — Create ServicesHighlight block for homepage

| Field | Value |
|-------|-------|
| Type | block |
| PRD ref | §3.4, §2.1 T6 |
| Depends on | TASK-01 (Services collection), TASK-02 (ServiceCard component) |
| Status | [ ] Todo |

## Context

Create a reusable layout block `ServicesHighlight` for the homepage that displays 3–4 featured services as cards. The block queries the Services collection for documents where `featured = true`, sorts by `displayOrder`, and renders them using the `ServiceCard` component. Falls back gracefully if no featured services exist.

## Steps

1. Create `src/blocks/ServicesHighlight/config.ts`.

2. Define the block config:
   - **slug:** `'services-highlight'`
   - **label:** `'Services Highlight'`
   - **fields:** No editor-configurable fields required (auto-fetches featured services). Optionally add a `title` text field for section heading (default: "What we offer").

3. Create `src/blocks/ServicesHighlight/Component.tsx` as an async Server Component.

4. Inside `Component.tsx`:
   - Import `getPayload` from Payload Local API
   - Query Services collection: `find({ where: { featured: { equals: true } }, sort: '-displayOrder', limit: 4 })`
   - Get current locale from `params` or `useLocale()` hook
   - Map results to `ServiceCard` components in a responsive grid (3–4 cards on desktop, 1–2 on tablet, 1 on mobile)
   - Add a "View all services" link to `/services` at the end

5. Handle missing featured services gracefully:
   - If no featured services, query first 3 services by `displayOrder` and display them (fallback behavior)
   - If no services exist at all, render a placeholder message (optional)

6. Apply responsive grid styling:
   - Desktop (≥1024px): 3–4 columns
   - Tablet (768px–1023px): 2 columns
   - Mobile (<768px): 1 column, full width

7. Register the block in the `layout` field of the `pages` collection (`src/collections/Pages/index.ts`):
   - Add import: `import { ServiceHighlightBlock } from '../../blocks/ServicesHighlight/config'`
   - Add to `blocks` array in the layout field

8. Register the component in `src/blocks/RenderBlocks.tsx`:
   - Add case for `'services-highlight'` that renders `<ServicesHighlightComponent />`

9. Run `pnpm generate:importmap` (if using admin components).

10. Run `pnpm exec tsc --noEmit`.

## Files

- **Create:** `src/blocks/ServicesHighlight/config.ts`, `src/blocks/ServicesHighlight/Component.tsx`
- **Modify:** `src/collections/Pages/index.ts` (register block), `src/blocks/RenderBlocks.tsx` (add dispatch)

## Done when

- [ ] Block config and component files exist
- [ ] Block is registered in Pages collection layout field
- [ ] Block is registered in RenderBlocks dispatch
- [ ] Query correctly fetches featured services (or falls back to first 3)
- [ ] ServiceCard component renders for each service
- [ ] Grid is responsive (3 columns desktop, 2 tablet, 1 mobile)
- [ ] "View all services" link points to `/services`
- [ ] `pnpm exec tsc --noEmit` returns no errors
- [ ] Block can be added to a page and renders without errors
