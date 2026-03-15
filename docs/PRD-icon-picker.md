# PRD: Icon Picker — Custom Admin Field Component

- **Feature:** Icon Picker
- **Date:** 2026-03-14
- **Status:** Draft
- **Priority:** Should

---

## 1. Problem

Icon fields in the admin panel are plain `text` inputs. Editors must know exact Lucide icon names by heart (e.g., `"heart-pulse"`, `"paw-print"`) to populate them. This creates friction, leads to typos, and produces broken icons on the frontend.

Affected locations today:

- `services` collection — `icon` field
- `WhyUsBlock` — `items[].icon` field

Any future block or collection that needs an icon will have the same problem unless a shared solution is in place.

---

## 2. Goal

Replace raw text icon inputs with a visual icon picker component in the Payload admin panel. Editors browse or search Lucide icons, click to select, and the string value is saved as before — no change to the data shape or frontend rendering.

---

## 3. Scope

### 3.1 In scope

- A custom Payload field component (`IconPickerField`) that replaces the plain text input for icon fields.
- Visual grid of icons with rendered SVG previews.
- Search/filter by icon name within the picker.
- Selected icon displayed visually next to its name in the closed/collapsed state.
- The stored value remains a plain Lucide icon name string (no schema migration needed).
- Applied to: `Services.icon`, `WhyUsBlock.items[].icon`.

### 3.2 Out of scope

- Supporting icon libraries other than Lucide React.
- Uploading custom SVG icons.
- Per-collection icon allowlists (full Lucide set available everywhere, for now).
- Color/size selection within the picker (the frontend controls those).

---

## 4. Deliverables

**Must**
- `IconPickerField` custom admin component replacing plain text inputs
- Icon grid with rendered SVG previews
- Search/filter by icon name within the picker
- Selected icon shown visually in collapsed/saved state
- Applied to `Services.icon`
- Applied to `WhyUsBlock.items[].icon`

**Should**
- Clear/reset selection (set field to empty)
- Keyboard navigation through the icon grid

**Could**
- A curated shortlist of veterinary-relevant icons shown first

---

## 5. User Stories

**As a content editor,** I want to see icons visually so I can pick the right one without memorizing names.

**As a content editor,** I want to search by keyword (e.g., "heart", "paw") so I can find relevant icons quickly.

**As a content editor,** I want to see the currently selected icon rendered next to its name so I can confirm my selection at a glance.

**As a developer,** I want a single reusable component I can drop into any Payload field config so new icon fields don't regress.

---

## 6. Acceptance Criteria

All Must-haves are met when:

- Opening an icon field in the admin renders the custom picker, not a text input.
- The picker renders a grid of Lucide icon SVGs with their names below.
- Typing in a search box filters the grid in real time.
- Clicking an icon closes the picker, updates the field value to that icon's name string, and shows the icon rendered inline.
- Saving the document persists the icon name string identically to how the plain text field did — no data migration required.
- The `Services` collection and `WhyUsBlock` block both use the picker.

---

## 7. Constraints

- Must use `lucide-react` (already installed) as the icon source — no new icon library dependency.
- The stored value must remain a plain string to keep the frontend rendering unchanged.
- The component must be registered in Payload's import map (`pnpm generate:importmap`) to appear in the admin bundle.
- The picker should handle Lucide's full icon set (~1400 icons) without blocking the UI — lazy rendering or windowing is acceptable if needed.

---

## 8. Open Questions

- `[OPEN QUESTION]` Should a curated shortlist of ~20 veterinary-relevant icons be shown as a "Suggested" section, or is full search sufficient?
- `[OPEN QUESTION]` Should the picker open inline (expanding the field row) or as a modal/popover?

---

## 9. Version History

- 0.1 — 2026-03-14 — Initial draft
