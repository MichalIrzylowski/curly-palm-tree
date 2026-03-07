# PRD — Homepage (Section 3.1)
## Lecznica Weterynaryjna

| Field | Value |
|-------|-------|
| **Author** | Product / Engineering |
| **Date** | 2026-03-04 |
| **Status** | Draft |
| **Version** | 1.0 |
| **Parent PRD** | `docs/PRD.md` §3.1 |
| **Milestone** | M2 — Pages |

---

## 1. Executive Summary

The homepage is the primary entry point for pet owners seeking veterinary care in Sopot and the Tricity area. It must orient visitors within seconds, surface the most critical information (opening hours, phone number, location), build trust through team and equipment highlights, and guide users towards a direct contact action.

The page is built on the existing Payload CMS 3.x + Next.js 15 stack using the layout-builder pattern (`Pages` collection). All content is bilingual (Polish default, English) and managed by non-technical editors without developer involvement.

This PRD covers the six homepage sections: **Hero**, **Quick-info bar**, **Services highlights**, **Meet the team teaser**, **Why us**, and **Blog teaser**.

---

## 2. Problem Statement

Pet owners searching for a veterinary clinic online face a high-anxiety decision: they need to trust a clinic fast and confirm it can help their specific animal. The current state has no public website, so users must rely on Google Maps snippets or phone calls to get basic info — leading to wasted calls for the clinic and friction for the owner.

**If we don't ship the homepage:**
- New patients cannot discover or evaluate the clinic online.
- Staff continue fielding routine phone enquiries for hours, directions, and services.
- The clinic appears less professional than competitors with polished web presences.

---

## 3. Goals and Success Metrics

**Primary goal:** Give every first-time visitor enough information within 10 seconds to decide to contact the clinic.

**Secondary goals:**
- Reduce routine phone enquiries for opening hours and directions.
- Build perceived trust through team bios and equipment highlights.
- Provide a content-managed page that editors can update independently.

| Metric | Baseline | Target | Method |
|--------|----------|--------|--------|
| Lighthouse mobile score | — | ≥ 90 | Lighthouse CI |
| Bounce rate (homepage) | — | < 55% | Analytics |
| CTA click-through (phone/contact) | — | > 8% of sessions | Analytics events |
| Time to interactive | — | < 3 s on 3G | Lighthouse |

---

## 4. Target Users

**Primary — Local pet owner (PL):** Lives in Sopot or Tricity, has a dog or cat, searches in Polish, needs quick confirmation of hours and services before calling.

**Secondary — Tourist / expat (EN):** Visiting or relocating, searches in English, needs the same info but reassurance that the clinic serves non-Polish speakers.

**Out of scope:** Veterinary professionals, wholesale buyers, recruitment applicants.

---

## 5. User Stories

| ID | Story |
|----|-------|
| US-01 | As a pet owner, I want to see the clinic's opening hours on the homepage so I can call at the right time without navigating away. |
| US-02 | As a first-time visitor, I want a clear CTA to contact or book so I don't have to search for the phone number. |
| US-03 | As an anxious owner, I want to see the team's faces and credentials so I trust the clinic before I bring my pet in. |
| US-04 | As a mobile user, I want critical info (hours, phone) always accessible without scrolling so I can act immediately. |
| US-05 | As an English-speaking expat, I want to switch the page to English so I understand the full offer. |
| US-06 | As an editor, I want to update the hero tagline and service highlights in Payload without touching code. |

**Edge cases:**
- User visits outside opening hours → "Closed now" badge visible; CTA remains prominent.
- User has JavaScript disabled → Static HTML fallback; hours table renders but "Open now" badge is hidden via `<noscript>`.

---

## 6. Requirements

### 6.1 Section: Hero

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| H-01 | Display clinic name (*Lecznica Weterynaryjna*) as the primary `h1`. | Must | h1 present, text matches CMS value in active locale. |
| H-02 | Display the brand tagline below the heading (PL: *Dbamy o Twoje zwierzę — profesjonalnie i z troską.* / EN: *Expert care, every visit.*) | Must | Tagline visible in both locales; sourced from Payload field. |
| H-03 | Show a primary CTA button "Umów wizytę / Book a visit" linking to `/contact`. | Must | Button renders, navigates to `/contact`. |
| H-04 | Show a secondary CTA (phone number as `tel:` link) beside or below the primary CTA. | Must | Phone number is clickable on mobile; sourced from `Contact` global. |
| H-05 | Display a hero visual — either a full-bleed background photo (clinic exterior / animal) or an inline illustrated scene (people + animals, flat/semi-realistic style). | Should | Visual has descriptive `alt` text; uses `next/image` with priority loading. |
| H-06 | Hero content is editable via the layout builder (`HeroBlock`) in Payload. | Must | Editor can change heading, tagline, CTA label, and image without code changes. |

### 6.2 Section: Quick-info Bar

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| Q-01 | Display today's opening hours (day name + open/close times or "Closed"). | Must | Correct day is highlighted; data sourced from `OpeningHours` global. |
| Q-02 | Show a real-time "Open now" or "Closed" badge based on current local time (Europe/Warsaw). | Must | Badge updates client-side; `<noscript>` hides badge gracefully. |
| Q-03 | Display the clinic phone number with a `tel:` link. | Must | Tappable on mobile, sourced from `Contact` global. |
| Q-04 | Display the short address (street + city). | Must | Sourced from `Contact` global. |
| Q-05 | Bar is sticky on mobile viewport (bottom of screen). | Should | Bar remains visible while scrolling; does not obscure interactive content. |
| Q-06 | Bar is visible on desktop as a horizontal strip between Hero and the next section. | Must | Renders as expected at 1280px+ viewport. |

### 6.3 Section: Services Highlights

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| S-01 | Display 3–4 service cards, each with: name, short description, and icon. | Must | Cards match CMS-selected services; localized in active locale. |
| S-02 | Each card links to `/services` (or the specific service anchor). | Must | Link navigates correctly. |
| S-03 | A "View all services" link at the section bottom navigates to `/services`. | Must | Link present and functional. |
| S-04 | Editor can select which services appear in this section via a `ServicesHighlightsBlock` in Payload. | Must | Block accepts a `services` relationship field (multi-select, max 4). |
| S-05 | Section heading editable in both locales. | Must | Editor changes heading; both PL and EN saved independently. |

### 6.4 Section: Meet the Team Teaser

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| T-01 | Display a horizontal photo strip of team members (photo + name + role). | Must | Photos render with correct `alt` text; data from `Team` collection. |
| T-02 | Strip shows up to 4 team members on desktop; scrollable on mobile. | Should | No layout breakage on 375px viewport. |
| T-03 | "Meet the team" CTA links to `/team`. | Must | Navigation correct. |
| T-04 | Section heading editable in both locales. | Must | Both locales independently editable in Payload. |
| T-05 | Editor can override the default (all active team members) to pin specific members via `TeamTeaserBlock`. | Could | Optional `pinnedMembers` relationship field in block. |

### 6.5 Section: Why Us

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| W-01 | Display exactly 3 value proposition items, each with: icon, heading, and short description (≤ 30 words). | Must | All 3 items visible; no overflow. |
| W-02 | Default value props: (1) Modern diagnostic equipment, (2) Experienced specialist team, (3) Dog, cat & small pet care. | Must | Defaults pre-populated in seed; editable in CMS. |
| W-03 | Icons use Lucide line icons (24px, `--secondary` teal colour). | Should | Icons render; fallback to emoji if Lucide not yet installed. |
| W-04 | All text editable per locale via `WhyUsBlock` in Payload. | Must | Both PL and EN fields independently editable. |

### 6.6 Section: Blog Teaser

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| B-01 | Section is **hidden by default** until at least 1 published post exists. | Must | No empty section visible in production before blog goes live. |
| B-02 | When active, display the latest 3 published posts (title, excerpt, date, cover image). | Should | Posts ordered by `publishedAt` descending; broken images don't break layout. |
| B-03 | Each post card links to `/blog/[slug]`. | Should | Navigation resolves correctly. |
| B-04 | "Read the blog" CTA links to `/blog`. | Should | Navigation correct. |
| B-05 | Block can be toggled off by editor without code changes. | Must | `BlogTeaserBlock` has a visible `enabled` toggle field. |

---

## 7. Design & UX Considerations

**Colour palette:** Navy `#1B3A5C` (headings, CTA backgrounds), Teal `#4A9B8E` (badges, icons), Bright Teal `#2EC4B6` (hover/focus), Cool White `#F8FAFB` (page background). See `docs/BRAND.md` for full token reference.

**Typography:** Plus Jakarta Sans for all headings; Inter for body. `h1` at 3.5rem desktop / 2.25rem mobile.

**Shape:** 8px base border radius; 12px for content cards.

**Section order (top to bottom):**
1. Hero
2. Quick-info bar
3. Services highlights
4. Meet the team teaser
5. Why us
6. Blog teaser (hidden until v2)

**Accessibility:**
- All interactive elements keyboard-navigable and focus-visible.
- Colour contrast meets WCAG 2.1 AA (Navy on white ≥ 4.5:1, white on Navy ≈ 9.3:1).
- Hero image has descriptive `alt` text; decorative images use `alt=""`.
- "Open now" / "Closed" badge not conveyed by colour alone — add text label.
- Sticky bar on mobile must not obscure other focusable elements (add `padding-bottom` to body).

**Responsive breakpoints:** 375px (mobile) → 768px (tablet) → 1280px (desktop).

---

## 8. Technical Considerations

### 8.1 Architecture

- **Route:** `src/app/(frontend)/page.tsx` (existing homepage route).
- **Data fetching:** Server Component using `getPayload()` to fetch `Pages` (slug: `home`), `OpeningHours` global, `Contact` global, `Team` collection (limit 4), and `Services` collection (filtered to highlighted items).
- **Rendering:** Static generation (`generateStaticParams` / `revalidate`) with ISR — revalidate on Payload `afterChange` hook via `revalidatePath('/')`.

### 8.2 New Blocks Required

| Block name | File path | Payload fields |
|------------|-----------|----------------|
| `HeroBlock` | `src/blocks/Hero/` | `heading` (text, localized), `tagline` (text, localized), `ctaLabel` (text, localized), `backgroundImage` (upload relationship) |
| `QuickInfoBlock` | `src/blocks/QuickInfo/` | No CMS fields — reads from globals at render time |
| `ServicesHighlightsBlock` | `src/blocks/ServicesHighlights/` | `heading` (text, localized), `services` (relationship → Services, hasMany, max 4) |
| `TeamTeaserBlock` | `src/blocks/TeamTeaser/` | `heading` (text, localized), `pinnedMembers` (relationship → Team, hasMany, optional) |
| `WhyUsBlock` | `src/blocks/WhyUs/` | `items` (array, max 3): `{ icon: text, heading: text (localized), description: text (localized) }` |
| `BlogTeaserBlock` | `src/blocks/BlogTeaser/` | `enabled` (checkbox), `heading` (text, localized) |

All blocks registered in `src/payload.config.ts` under the `Pages` collection layout builder.

### 8.3 "Open Now" Logic

Client component (`'use client'`) receives `openingHours` data as a prop. Uses `new Date()` in `Europe/Warsaw` timezone (`Intl.DateTimeFormat`) to determine current day and time, then compares against `openTime`/`closeTime` strings (format `HH:MM`). Renders badge accordingly. Wrap in `<Suspense>` to prevent hydration mismatch.

### 8.4 Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| `OpeningHours` global | ✅ Exists (M1) | Required by Quick-info bar |
| `Contact` global | ✅ Exists (M1) | Phone number, address |
| `Team` collection | ✅ Exists (M1) | Team teaser |
| `Services` collection | ✅ Exists (M1) | Services highlights |
| `lucide-react` | ⚠️ Check | May need `pnpm add lucide-react` |
| `next/image` | ✅ Available | Hero image optimisation |

### 8.5 Performance

- Hero `<Image>` uses `priority` prop (LCP element).
- Service and team images use lazy loading.
- No third-party scripts on homepage (no Google Maps, no analytics blocking render).
- Target: Lighthouse mobile performance ≥ 90.

### 8.6 i18n

- All user-facing text uses localized Payload fields (`pl` default, `en` fallback).
- Locale passed via Next.js `params.locale` to Payload queries (`locale: params.locale`).
- `hreflang` alternate links set in `<head>` via `generateMetadata`.

---

## 9. Scope

### In scope
- All six homepage sections as described in §6.
- Six new layout-builder blocks in Payload.
- Server-side data fetching and ISR revalidation.
- Client-side "Open now" badge.
- Bilingual (PL/EN) content fields.
- Accessibility pass (keyboard nav, contrast, alt text).

### Out of scope
- Blog teaser rendering actual posts (hidden until v2 blog activation).
- Online appointment booking widget.
- Live chat or chatbot.
- Google Maps embed (covered in Contact page PRD).
- Dark mode.
- Any page other than `/` (homepage).

---

## 10. Rollout Plan

1. **Development** — Build blocks and page using seed/placeholder content.
2. **Editor review** — Clinic staff populate real content in Payload (`/admin`).
3. **QA** — Accessibility audit, responsive testing (375px → 1440px), Lighthouse run.
4. **Staging deploy** — Internal review on Vercel preview URL.
5. **Production** — Enable as part of M5 Launch milestone.

No feature flag needed — homepage replaces the existing placeholder page.

---

## 11. Open Questions

| # | Question | Owner | Target |
|---|----------|-------|--------|
| OQ-01 | Hero background image: clinic exterior shot or animal photo? Final asset needed from clinic. | Clinic / Designer | Before M3 content entry |
| OQ-02 | Which 3–4 services should appear in the highlights section by default? | Clinic | M3 |
| OQ-03 | Exact phone number(s) to display — is there a secondary emergency number? | Clinic | M1 data entry |
| OQ-04 | Should the sticky quick-info bar on mobile slide up from bottom or remain as a top strip? | Designer | Before development |
| OQ-05 | `lucide-react` not confirmed installed — check `package.json` and add if missing. | Engineering | Start of M2 |

---

## 12. Appendix

### Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-04 | Engineering | Initial draft |

### Related Documents

- `docs/PRD.md` — Parent product requirements
- `docs/BRAND.md` — Colour palette, typography, voice & tone
- `src/payload.config.ts` — Payload collections and globals configuration
- `src/blocks/RenderBlocks.tsx` — Block dispatcher (add new blocks here)
