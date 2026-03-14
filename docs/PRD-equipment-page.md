# PRD — Equipment Showcase Page

**Feature:** Equipment showcase — gallery/feature list presenting the clinic's diagnostic tools
**Status:** Specification (ready for M2 — frontend pages)
**Priority:** Should (v1)
**Target user:** Pet owners evaluating the clinic's capabilities; clinic admins managing equipment entries

---

## 1. Overview

The **Equipment** collection allows the clinic to present its modern diagnostic and treatment tools (X-ray, ultrasound, dental unit, etc.) on a dedicated `/equipment` page. The goal is to build trust with prospective clients by showing that the clinic uses professional-grade, up-to-date equipment — described in accessible, patient-facing language.

**User outcome:** Pet owners gain confidence in the clinic's capabilities before booking; admins can add, update, and reorder equipment entries without writing code.

---

## 2. Scope

### 2.1 Must-haves

| # | Deliverable | Type | Notes |
|---|-------------|------|-------|
| 1 | `Equipment` collection (Payload) | Schema | Already implemented: `name`, `photo`, `description`, `order` |
| 2 | Bilingual content | Localization | `name` and `description` localized PL + EN (already in schema) |
| 3 | Admin content entry | UI | Editor can add/edit/delete equipment; manual `order` field for sorting |
| 4 | `/equipment` page | Route | Displays all equipment in a responsive gallery/feature-list layout |
| 5 | Equipment card | Component | Shows photo, name, description — patient-facing language, no technical jargon |

### 2.2 Should-haves

| # | Deliverable | Priority | Notes |
|---|-------------|----------|-------|
| 1 | Equipment highlight block (homepage) | Should | Reusable layout block for "Why us" section on homepage; shows 3–4 items |
| 2 | Lightbox/image zoom | Should | Click photo to enlarge; especially useful on desktop |
| 3 | Smooth page load (image lazy-loading) | Should | Photos can be large; use `next/image` with lazy loading |

### 2.3 Could-haves (deferred to v2)

- Equipment categories or type grouping (e.g., "Diagnostics", "Surgery", "Dental")
- Equipment detail page with additional specs or video embed
- Linked services (which services use this equipment)

### 2.4 Out of scope

- Technical specifications or supplier details (internal use only, not public)
- Equipment booking or scheduling
- Equipment inventory management

---

## 3. Deliverables

### 3.1 Payload Collection: `Equipment`

**Slug:** `equipment`
**Status:** ✅ Schema already implemented in `src/collections/Equipment/index.ts`

**Fields (existing):**

| Field | Type | Localized? | Required? | Notes |
|-------|------|-----------|-----------|-------|
| `name` | Text | ✅ PL + EN | ✅ Yes | Equipment name (e.g., "Digital X-ray", "Dental ultrasound unit") |
| `photo` | Upload (Media) | ❌ No | ✅ Yes | High-quality photo of the equipment; shown on card |
| `description` | Rich Text | ✅ PL + EN | ❌ No | Patient-facing explanation: what it does, why it matters |
| `order` | Number | ❌ No | ❌ No | Display order (lower = first); sidebar position in admin |

**Access:**
- **Read:** Public (anyone)
- **Create/Update/Delete:** Authenticated admins only

**No schema changes required.** The collection is ready for content entry and frontend integration.

---

### 3.2 Admin UI (Payload Dashboard)

The existing admin config supports:
- List view columns: `name`, `order`
- `useAsTitle: 'name'` — meaningful titles in list view

**Expected admin workflow:**
1. Admin navigates to Equipment in Payload dashboard
2. Creates entry: uploads photo, enters Polish name + description, switches to EN tab, enters English equivalents
3. Sets `order` (e.g., 10, 20, 30) for display sequence
4. Publishes — item appears on `/equipment` immediately

**No additional admin UI changes needed for v1.**

---

### 3.3 Frontend: `/equipment` Page

**Route:** `src/app/(frontend)/equipment/page.tsx`
**Purpose:** Showcase the clinic's diagnostic and treatment tools to build trust.

**Layout:**
1. **Page header** — "Our Equipment" / "Nasze Wyposażenie" (bilingual), 1–2 sentence intro about the clinic's commitment to modern technology
2. **Equipment grid** — All entries from the `equipment` collection, sorted ascending by `order`

**Equipment Card:**
- Photo — full-width card top, aspect ratio 16:9 or 4:3, `next/image` with `alt` from `name`
- Equipment name — bold heading
- Description — patient-facing rich text body (2–4 sentences); if missing, card renders without description block

**Grid layout (responsive):**
- Desktop (1440px+): 3 columns
- Tablet (768px–1024px): 2 columns
- Mobile (375px–767px): 1 column, full width

**Empty state:** If no equipment entries exist, page renders a placeholder message (Polish default: "Informacje o sprzęcie wkrótce.").

---

### 3.4 Homepage Block: `EquipmentHighlight` (Should-have)

**Purpose:** Surface 3–4 equipment items in the homepage "Why us" / "Modern equipment" section.

**Block config:**
- Reusable layout block for the Pages layout builder
- Auto-fetches first 3–4 equipment entries by `order` ascending
- "See all equipment" CTA link to `/equipment`

**Block output:**
- Same card design as equipment page (photo, name, short description excerpt)
- 3–4 cards in a row, responsive
- Optional section heading (configurable in block fields or hardcoded: "Nowoczesny sprzęt" / "Modern Equipment")

---

## 4. Localization

**Locales:** Polish (default, `pl`) + English (`en`)

**Localized fields:**
- `name` — Equipment name in both languages
- `description` — Patient-facing description in both languages

**Frontend:** Reads locale from Payload's localization config. Falls back to Polish if English translation is missing.

---

## 5. Acceptance Criteria

**When this feature is complete, the following must be true:**

- ✅ `Equipment` collection exists in Payload with all required fields (already done)
- ✅ Admin can create, edit, delete, and reorder equipment entries from the Payload dashboard
- ✅ All equipment fields support bilingual PL/EN content
- ✅ `/equipment` page exists and displays all equipment sorted by `order` in a responsive grid
- ✅ Equipment cards display photo (with alt text), name, and description (if present)
- ✅ Page is fully responsive (375px–1440px viewport)
- ✅ Photos use `next/image` with lazy loading and correct `alt` attributes
- ✅ Page renders an empty-state message when no equipment entries exist
- ✅ No console warnings or TypeScript errors in the equipment page
- ✅ Lighthouse performance score ≥ 90 on mobile

---

## 6. Open Questions

| # | Question | Notes |
|---|----------|-------|
| 1 | Should the homepage "Why us" section use a dedicated `EquipmentHighlight` block or be hardcoded? | Currently specified as a Should-have layout block; can simplify to hardcoded if homepage is tight on scope |
| 2 | Should equipment have category grouping (e.g., Diagnostics, Surgery)? | Deferred to v2; no category field in current schema |
| 3 | Is a lightbox/image zoom required for v1? | Currently a Should-have; can defer to v2 without blocking launch |
| 4 | Should `description` be required? | Currently optional — cards render without it. Consider requiring for consistency |

---

## 7. Dependencies

- ✅ **Equipment** collection (already implemented in `src/collections/Equipment/index.ts`)
- ✅ **Media** collection (existing, used for photo uploads)
- ✅ **Localization** (Payload `localization` config, PL + EN enabled)
- ⚠️ **Pages** collection + layout builder (for `EquipmentHighlight` homepage block; should be working before integrating the block)
- ⚠️ **`next/image`** — must be configured with correct domain/remote patterns for Payload media

---

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| Equipment visible on site | All published equipment entries visible on `/equipment` |
| Editor time to add new item | < 2 minutes (upload photo, fill fields, publish) |
| Mobile usability | Fully readable on 375px viewport; no horizontal scroll |
| Accessibility | WCAG 2.1 AA; photos have alt text, cards keyboard-navigable |
| Performance | Images lazy-loaded; LCP within target on mobile |

---

## 9. Version History

| Version | Date | Status | Notes |
|---------|------|--------|-------|
| 1.0 | 2026-03-09 | Specification | Initial PRD; schema already done (M1), frontend pending (M2) |
