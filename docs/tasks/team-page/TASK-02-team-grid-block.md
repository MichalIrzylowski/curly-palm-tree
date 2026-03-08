# TASK-02 — TeamGrid block

| Field | Value |
|-------|-------|
| Type | block |
| PRD ref | T-01, T-09 |
| Depends on | TASK-01 |
| Status | [ ] Todo |

> **OQ-2 (non-blocking):** No Figma spec for grid layout. Implement 1-col mobile / 2-col tablet / 3-col desktop as default. Adjust once design is confirmed.

## Context

A layout builder block that fetches all team members from the `team` collection and renders them in a responsive grid using `<TeamMemberCard>`. Added to the `/team` page via the Payload admin. Handles the empty state (T-09).

No block-level config fields are needed — the block has no editor-configurable options; data is always sourced from the `team` collection.

> **Schema note:** The `team` collection has no `versions` / draft support — all records are treated as published. The query fetches all documents without a status filter.

## Steps

1. Create `src/blocks/TeamGrid/config.ts`:
   ```ts
   import type { Block } from 'payload'

   export const TeamGridBlock: Block = {
     slug: 'teamGrid',
     labels: {
       singular: 'Team Grid',
       plural: 'Team Grids',
     },
     fields: [],
   }
   ```

2. Create `src/blocks/TeamGrid/Component.tsx` as a React Server Component (no `'use client'`):
   ```ts
   import configPromise from '@payload-config'
   import { getPayload } from 'payload'
   import { TeamMemberCard } from '@/components/TeamMemberCard'
   ```

3. Add `locale` prop to the component — passed from `RenderBlocks` if locale is available in context, otherwise default to `'pl'`. Check how `RenderBlocks.tsx` currently passes props to other blocks and match the pattern.

4. Fetch team members inside the component:
   ```ts
   const payload = await getPayload({ config: configPromise })
   const { docs } = await payload.find({
     collection: 'team',
     sort: 'order',
     locale,
     depth: 1,
     limit: 100,
     pagination: false,
   })
   ```
   - `sort: 'order'` — ascending (lower number first).
   - `depth: 1` — resolves the `photo` upload field to a full `Media` object.
   - `locale` — returns localized field values (role, bio, specialisations) for the active locale.

5. Handle empty state (T-09 — Should): if `docs.length === 0`, return a single paragraph with a Polish-default string (e.g. `Brak członków zespołu.`). Do not render a grid wrapper with zero children.

6. Render the grid:
   ```tsx
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
     {docs.map((member) => (
       <TeamMemberCard key={member.id} member={member} />
     ))}
   </div>
   ```

7. Register the block config in the `pages` collection layout field. Open `src/collections/Pages/index.ts`, find the `layout` field's `blocks` array, and add `TeamGridBlock`:
   ```ts
   import { TeamGridBlock } from '@/blocks/TeamGrid/config'
   // ...
   blocks: [...existingBlocks, TeamGridBlock],
   ```

8. Register the component in `src/blocks/RenderBlocks.tsx` — add `teamGrid` to the block dispatch map:
   ```ts
   import { TeamGridBlock as TeamGridComponent } from './TeamGrid/Component'
   // in the blockComponents map:
   teamGrid: TeamGridComponent,
   ```

9. Run `pnpm generate:importmap` (block component is used in the admin's block picker UI).

10. Run `pnpm exec tsc --noEmit` and resolve all type errors.

## Files

- **Create:** `src/blocks/TeamGrid/config.ts`
- **Create:** `src/blocks/TeamGrid/Component.tsx`
- **Modify:** `src/collections/Pages/index.ts` — add `TeamGridBlock` to the `layout.blocks` array
- **Modify:** `src/blocks/RenderBlocks.tsx` — register `teamGrid` component

## Done when

- [ ] `pnpm exec tsc --noEmit` passes with no errors
- [ ] `pnpm generate:importmap` runs without errors
- [ ] `teamGrid` block appears as an option when adding a block to a page in Payload admin
- [ ] Adding the block to a page and visiting that page renders the team grid
- [ ] Empty `team` collection renders the fallback message (not a broken grid)
