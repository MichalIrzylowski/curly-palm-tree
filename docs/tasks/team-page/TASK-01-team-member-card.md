# TASK-01 — TeamMemberCard component

| Field | Value |
|-------|-------|
| Type | component |
| PRD ref | T-02, T-03, T-04, T-05, T-06, T-07 |
| Depends on | — |
| Status | [ ] Todo |

> **OQ-2 (non-blocking):** No Figma spec yet. Implement a reasonable card layout — vertical stack: photo top, name, role, bio, specialisation pills, languages. Adjust once design is confirmed.

## Context

A server component that renders a single team member card. Implements all card-level PRD deliverables: photo (T-02), name (T-03), localized role (T-04), localized rich text bio (T-05), localized specialisation tags as pills (T-06 — Should), and optional languages line (T-07 — Could).

## Steps

1. Create `src/components/TeamMemberCard/index.tsx` as a React Server Component (no `'use client'`).

2. Import types:
   ```ts
   import type { Team } from '@/payload-types'
   import Image from 'next/image'
   import { RichText } from '@/components/RichText'
   ```

3. Define props: `{ member: Team }`. Do not accept `locale` as a prop — locale-aware field values are resolved by Payload at query time and arrive already localized in the `member` object.

4. Render the photo using Next.js `<Image>`:
   - Source: `(member.photo as Media).url` — `photo` is an upload field (`relationTo: 'media'`), resolved to a `Media` object at `depth: 1`.
   - Import `Media` type from `@/payload-types`.
   - Use `alt={member.name}`.
   - Set explicit `width` and `height` or use `fill` with a sized wrapper — do not omit dimensions.

5. Render `member.name` (plain text, not localized).

6. Render `member.role` (localized `text` field — value already resolved for the requested locale).

7. Render `member.bio` using `<RichText>` component:
   ```tsx
   {member.bio && <RichText data={member.bio} />}
   ```
   Wrap in a conditional — `bio` is not required on the collection.

8. Render `member.specialisations` as pill/tag elements (Should — T-06):
   - `specialisations` is a localized `array` field; each item has a `tag: string` property.
   - Only render if `member.specialisations && member.specialisations.length > 0`.
   - Map over `member.specialisations` and render each `item.tag` in a `<span>` styled as a pill.

9. Render `member.languages` only if populated (Could — T-07):
   - `languages` is a non-localized `array` field; each item has a `language: string` property.
   - Only render the languages section if `member.languages && member.languages.length > 0`.
   - Do not render a placeholder label when empty.

10. Run `pnpm exec tsc --noEmit` and resolve all type errors before marking done.

## Files

- **Create:** `src/components/TeamMemberCard/index.tsx`

## Done when

- [ ] Component renders without TypeScript errors (`pnpm exec tsc --noEmit` passes)
- [ ] Photo renders via `<Image>` with explicit dimensions or `fill`
- [ ] Name and role are visible in the rendered output
- [ ] Bio renders as rich text (not raw JSON)
- [ ] Specialisations section is absent when `specialisations` is empty or undefined
- [ ] Languages section is absent when `languages` is empty or undefined
- [ ] `[ ] optional` — smoke-tested with a mock `Team` object to verify conditional rendering
