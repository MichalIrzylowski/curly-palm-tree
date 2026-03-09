# TASK-02 — Create ServiceCard component for reuse

| Field | Value |
|-------|-------|
| Type | component |
| PRD ref | §3.3, §3.4 (card design) |
| Depends on | TASK-01 (Services collection + types) |
| Status | [ ] Todo |

## Context

Create a reusable `ServiceCard` React component that renders a single service with icon, name, description, and price text. This component is used by both the `/services` page and the `ServicesHighlight` block, ensuring consistent styling and behavior.

## Steps

1. Create `src/components/ServiceCard.tsx`.

2. Define component signature:
   ```typescript
   interface ServiceCardProps {
     service: Service;
     locale?: 'pl' | 'en';
   }
   ```
   Use the `Service` type from `src/payload-types.ts` (auto-generated from TASK-01).

3. Render the card with:
   - **Icon:** Centered above text, ~64px. If `service.icon` exists, render `<Image>` from `next/image`. If missing, render an empty placeholder div (no fallback icon for v1).
   - **Name:** Service `name` (use `locale` param or `useLocale()` hook to select PL/EN version). Bold, ~18px font size.
   - **Description:** Service `description` as rich text (may contain `<p>`, `<strong>`, etc.). Grey text (~500 color), 1–3 lines (line-clamp if needed).
   - **Price text:** If `priceText` exists, render in italic, subtle grey (grey-400), below description.

4. Apply hover effect: Subtle box shadow or background color shift (use Tailwind `hover:shadow-md` or similar).

5. Use Tailwind CSS for styling. Target card dimensions: ~300px width, responsive on mobile.

6. Mark component as `'use client'` if using React hooks for interactivity; otherwise default to Server Component.

7. Run `pnpm exec tsc --noEmit` to verify types.

## Files

- **Create:** `src/components/ServiceCard.tsx`

## Done when

- [ ] Component accepts `Service` type from `payload-types.ts` without `any` types
- [ ] Icon renders correctly (or shows placeholder if missing)
- [ ] Name, description, price text all display with correct localization
- [ ] Hover effect is visible and subtle
- [ ] `pnpm exec tsc --noEmit` returns no errors
- [ ] Component can be imported and rendered in a Next.js page without runtime errors
