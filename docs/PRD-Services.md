# PRD — Services Catalog

**Feature:** Servicess listing, categorization, and discovery
**Status:** Specification (ready for M2 — frontend pages)
**Priority:** Must (v1)
**Target user:** Pet owners browsing available services; clinic admins managing the service catalog

---

## 1. Overview

A **Services** collection allows the clinic to present a complete list of veterinary services (prevention, surgery, diagnostics, dentistry, etc.) with descriptions and optional pricing guidance. Services appear on a dedicated `/services` page, grouped by category, and can be referenced on the homepage via a highlight block.

**User outcome:** Pet owners understand what the clinic offers and can make informed decisions about booking; admins can add, update, and categorize services without code.

---

## 2. Scope

### 2.1 Must-haves

| # | Deliverable | Type | Notes |
|---|-------------|------|-------|
| 1 | `Services` collection (Payload) | Schema | New collection with fields for name, description, category, icon, price text |
| 2 | Bilingual content | Localization | All fields (name, description, priceText) support PL + EN |
| 3 | Category relationship | Schema | Reference to existing `Categories` collection; allows grouping and filtering |
| 4 | Admin content entry | UI | Editor can add/edit/delete services; drag-to-reorder within category |
| 5 | `/services` page | Route | Displays all services grouped by category (card grid layout) |
| 6 | Services block (homepage) | Block | Reusable layout block for homepage highlights (3–4 featured services) |
| 7 | Icon/image support | Schema | Optional image/icon field (Media upload) per service |

### 2.2 Should-haves

| # | Deliverable | Priority | Notes |
|---|-------------|----------|-------|
| 1 | Price range text | Should | Optional field: "Ask for pricing", "From 250 PLN", etc. (editor-entered, not calculated) |
| 2 | Search/filter on services page | Should | Filter services by category, search by name |
| 3 | Featured flag | Should | Mark services as "featured" for homepage block display |

### 2.3 Could-haves (deferred to v2)

- Service availability (time slots, scheduling integration)
- Service dependencies ("requires X diagnostic before Y treatment")
- Staff specialization link (which vet offers which service)
- Service testimonials / case studies

### 2.4 Out of scope

- Online booking or appointment confirmation
- Service packages or bundles
- Pricing calculation (always editor-input text)
- Service-level access control (all services public)

---

## 3. Deliverables

### 3.1 Payload Collection: `Services`

**Slug:** `services`
**Singular label:** Service
**Plural label:** Services
**Database:** PostgreSQL (managed by Payload)

**Fields:**

| Field | Type | Localized? | Required? | Notes |
|-------|------|-----------|-----------|-------|
| `name` | Text | ✅ PL + EN | ✅ Yes | Service name (e.g., "Routine vaccination", "Dental cleaning") |
| `slug` | Text (slug) | ❌ No | ✅ Yes (auto) | Auto-generated from name (used in routes if detail page added later) |
| `description` | Rich Text | ✅ PL + EN | ✅ Yes | 1–3 sentence explanation of what service includes, patient-facing language |
| `category` | Relationship | ❌ No | ✅ Yes | Reference to `Categories` collection (e.g., "Prevention", "Surgery", "Diagnostics") |
| `icon` | Media | ❌ No | ❌ No | Optional image/SVG icon (48×48 or larger); displayed on cards |
| `priceText` | Text | ✅ PL + EN | ❌ No | e.g., "From 150 PLN", "Ask for pricing", "Included in membership" |
| `featured` | Checkbox | ❌ No | ❌ No | Flag for homepage block (shows only featured = true in hero highlights) |
| `displayOrder` | Number | ❌ No | ❌ No | Manual sort order within category (admin UI: drag-to-reorder) |

**Access:**
- **Read:** Public (anyone)
- **Create/Update/Delete:** Authenticated admins only

---

### 3.2 Admin UI (Payload Dashboard)

**List view:**
- Table: Name (with search), Category, Featured flag, Published status
- Actions: Edit, Preview (if detail page exists), Delete
- Bulk actions: Mark featured, change category, set publish status
- Sort: By category, by order, by name

**Edit form:**
- Tabbed interface: General (name, slug, category), Bilingual content (PL description, EN description), Optional (icon, pricing, featured flag)
- Category dropdown (auto-populated from Categories)
- Icon uploader (drag-and-drop or click-to-browse)
- Drag-to-reorder handle (reorder within category visually on list view)
- Publish/Draft toggle (scheduled publishing not needed for v1)

**Experience:** Editor can manage the full service catalog without technical support.

---

### 3.3 Frontend: `/services` Page

**Route:** `src/app/(frontend)/services/page.tsx`
**Purpose:** Comprehensive service directory.

**Layout:**
1. **Page header** — "Our Services" (bilingual), brief introductory text
2. **Category sections** — For each category in sorted order:
   - Category heading + description (if available)
   - Service cards in grid (2–3 columns on desktop, 1 on mobile)
3. **Search / filter bar** (optional/should-have):
   - Dropdown to filter by category
   - Text search across service names + descriptions

**Service Card:**
- Icon (if present) — centered above text, ~64px
- Service name — bold, localized
- Description — 1–3 lines, grey text, localized
- Price text (if present) — subtle, italic, localized
- Hover effect: Slight shadow or background color shift (subtle, not distracting)

**Responsive:**
- Desktop (1440px+): 3 columns per category
- Tablet (768px–1024px): 2 columns
- Mobile (375px–767px): 1 column, full width

---

### 3.4 Homepage Block: `ServicesHighlight`

**Purpose:** Showcase 3–4 featured services on the homepage.

**Block config:**
- Reusable layout block using the Pages layout builder
- Auto-displays services where `featured = true`, ordered by `displayOrder`
- Falls back gracefully if no featured services (shows first 3 by order)
- "View all services" CTA link to `/services`

**Block output:**
- Same card design as services page
- 3–4 cards in a row (responsive as per services page)
- Subtle section header: "What we offer" or similar (hardcoded or configurable text)

---

### 3.5 Categories

**Existing collection:** `Categories` (already in Payload schema)
**Usage for services:** Services reference categories; no changes to Categories collection needed.

**Expected categories** (editors should create these in CMS):
- Prevention & Vaccinations
- Internal Medicine
- Surgery
- Dentistry
- Diagnostics (X-ray, ultrasound, laboratory)
- Dermatology
- Small Animals (rabbits, hamsters, guinea pigs, etc.)

**Note:** Categories must exist *before* creating services (foreign key constraint). Admins create categories first, then assign services.

---

## 4. Localization

**Locales:** Polish (default, `pl`) + English (`en`)

**Localized fields:**
- `name` — Service name in both languages
- `description` — Patient-facing description in both languages
- `priceText` — Optional pricing guidance in both languages

**Admin entry:** Payload's dual-tab interface (PL | EN) for each field.

**Frontend:** Uses `useLocale()` hook to display correct language version. If a language locale is missing, fall back to Polish.

---

## 5. Data Entry Workflow

1. **Admin logs into Payload** → navigates to Services
2. **Creates a new service:**
   - Selects category (or creates if missing)
   - Enters Polish name, description, optional price text
   - Uploads icon (optional)
   - Switches to EN tab, enters English equivalents
   - Marks as featured (optional)
   - Publishes
3. **Service appears immediately** on `/services` and homepage block (if featured)

---

## 6. Acceptance Criteria

**When this feature is complete, the following must be true:**

- ✅ Services collection exists in Payload with all required fields (name, description, category, icon, priceText, featured, displayOrder)
- ✅ All service fields support bilingual PL/EN content
- ✅ Admin can create, edit, delete, and reorder services from the Payload dashboard without code
- ✅ Admin can assign services to categories via a dropdown selector
- ✅ `/services` page displays all services grouped by category in a responsive grid
- ✅ Services card includes icon (if present), name, description, and price text (all bilingual)
- ✅ Homepage features a `ServicesHighlight` block showing 3–4 featured services with a CTA link
- ✅ Services page and homepage block are fully responsive (375px–1440px)
- ✅ No console warnings or TypeScript errors related to Services schema
- ✅ Lighthouse performance score ≥ 90 on mobile for both services page and homepage with highlight block

---

## 7. Open Questions

| # | Question | Notes |
|---|----------|-------|
| 1 | Should service detail pages exist (e.g., `/services/[slug]`)? | Currently not planned for v1; would show full description + related services |
| 2 | Should price text be mandatory or optional? | Currently optional to allow "Ask for pricing" pattern |
| 3 | Should services be filterable by multiple categories or one-to-one? | Currently one-to-one (one category per service); multi-category deferred |
| 4 | Icon: Required, optional, or fallback to placeholder? | Currently optional; no placeholder fallback for v1 |

---

## 8. Dependencies

- ✅ **Categories** collection (existing in Payload, used for grouping)
- ✅ **Media** collection (existing, used for icon uploads)
- ✅ **Localization** (Payload `localization` config, PL + EN enabled)
- ⚠️ **Pages** collection + layout builder (for homepage block; should be working before integrating Services block)

---

## 9. Success Metrics

| Metric | Target |
|--------|--------|
| Services discoverable on site | 100% of services visible on `/services` page |
| Editor time to add new service | < 2 minutes (create, fill fields, publish) |
| Homepage highlight block loads correctly | No broken images/icons; prices render correctly bilingual |
| Mobile usability | Fully responsive; readable on 375px viewport |
| Accessibility | WCAG 2.1 AA; service cards keyboard-navigable, alt text on icons |

---

## 10. Version History

| Version | Date | Status | Notes |
|---------|------|--------|-------|
| 1.0 | 2026-03-08 | Specification | Initial PRD; ready for M2 (frontend pages) |

---

## 11. Appendix: Suggested Categories (Sample Data)

**For initial content entry:**

```
1. Prevention & Vaccinations
   - Routine vaccination (puppies, kittens, adults)
   - Microchipping
   - Flea/tick prevention
   - Parasite prevention

2. Internal Medicine
   - General health check-ups
   - Digestive issues
   - Allergies & dermatology
   - Chronic disease management

3. Surgery
   - Spaying / neutering
   - Soft tissue surgery
   - Orthopedic surgery
   - Emergency surgery

4. Dentistry
   - Dental cleaning
   - Tooth extraction
   - Dental disease treatment

5. Diagnostics
   - X-ray imaging
   - Ultrasound
   - Laboratory tests (blood, urine, fecal)
   - ECG / heart monitoring

6. Dermatology
   - Skin condition diagnosis & treatment
   - Ear infections
   - Allergy testing

7. Small Animals
   - Rabbits, guinea pigs, hamsters, ferrets
   - Exotic pet care
```

(Editors can adjust or add more as needed via Payload.)
