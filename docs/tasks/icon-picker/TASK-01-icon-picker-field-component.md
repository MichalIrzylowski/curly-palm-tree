# TASK-01 — Build `IconPickerField` admin component

> **[BLOCKED: OQ-2]** The layout of the picker (inline expand vs modal/popover) must be decided before building the component shell. The steps below assume **popover** as the default; adjust if the team picks inline.

| Field | Value |
|-------|-------|
| Type | component |
| PRD ref | Must: IconPickerField component, icon grid, search/filter, selected icon preview; Should: clear/reset, keyboard navigation |
| Depends on | — |
| Status | [ ] Todo |

## Context

Creates the `IconPickerField` custom Payload admin component. It replaces the plain text input for any `type: 'text'` field that opts in via `admin.components.Field`. The stored value remains an unmodified Lucide icon name string — only the editor experience changes.

## Steps

1. Create the directory `src/components/IconPickerField/`.

2. Create `src/components/IconPickerField/index.tsx`. Mark it `'use client'` — it needs `useState`, `useEffect`, and event handlers.

3. Import Payload's `useField` hook from `@payloadcms/ui` to read and write the field value:
   ```ts
   import { useField } from '@payloadcms/ui'
   ```

4. Build the icon catalogue. Lucide React exports every icon as a named React component. Import the entire namespace and filter to component-shaped exports:
   ```ts
   import * as LucideIcons from 'lucide-react'
   // Filter to icon components only (functions whose name starts with an uppercase letter)
   const allIcons = Object.entries(LucideIcons).filter(
     ([name, val]) => typeof val === 'function' && /^[A-Z]/.test(name)
   )
   ```
   Store as `{ name: string; Component: LucideIcon }[]` where `name` is the kebab-case slug (derive via `name.replace(/([A-Z])/g, (m, c, i) => (i ? '-' : '') + c.toLowerCase())`).

5. Implement the collapsed state. When no value is selected show a placeholder button ("Wybierz ikonę"). When a value is set, render the matching Lucide icon at 20 px + the icon name string side by side inside the button.

6. Implement the popover panel (or inline expansion — see OQ-2). The panel contains:
   - A text `<input>` for search (controlled, `autoFocus` when opened). Polish placeholder: `"Szukaj ikony…"`.
   - A scrollable grid of icon buttons. Each button renders the Lucide component at 24 px with the kebab-case name below in small text.
   - Filtering: derive the visible subset by `iconList.filter(i => i.name.includes(searchTerm))` on every render — no debounce needed for ~1 400 items at this scale.
   - A "Wyczyść" (clear) button that calls `setValue('')` and closes the panel (Should).
   - Clicking an icon button calls `setValue(icon.name)` and closes the panel.

7. Implement keyboard navigation (Should):
   - `ArrowRight` / `ArrowLeft` / `ArrowDown` / `ArrowUp` move focus through the grid.
   - `Enter` / `Space` on a focused grid item selects it.
   - `Escape` closes the panel without changing the value.

8. Export the component as a named export `IconPickerField` from `src/components/IconPickerField/index.tsx`.

9. Run `pnpm generate:importmap` so Payload bundles the component into the admin UI.

10. Run `pnpm exec tsc --noEmit` and fix any type errors.

## Files

- **Create:** `src/components/IconPickerField/index.tsx`

## Done when

- [ ] Opening any field that references `IconPickerField` in the Payload admin renders a button, not a text input.
- [ ] Clicking the button opens the icon picker panel.
- [ ] Typing in the search input filters the grid in real time.
- [ ] Clicking an icon closes the panel and the button now shows the rendered icon + its name.
- [ ] The "Wyczyść" button sets the field to empty and closes the panel.
- [ ] Arrow-key navigation moves focus through the grid; Enter/Space selects; Escape dismisses.
- [ ] `pnpm exec tsc --noEmit` exits with no errors.
