# PRD — Team Page

| Field | Value |
|-------|-------|
| Feature | Team Page (`/team`) |
| Date | 2026-03-08 |
| Status | Draft |
| Priority | Must |
| Milestone | M2 — Pages |

---

## 1. Overview

A dedicated public page at `/team` that introduces the clinic's staff to prospective pet owners. The page contains only team member cards — no other content. Its purpose is to build trust by showing the faces, roles, and expertise of the clinic team.

---

## 2. Scope

### In scope
- Public page at `/team`
- Listing of all team members sourced from the `Team` collection
- Bilingual content (Polish default, English via locale toggle)

### Out of scope
- Individual team member profile pages (single `/team/[slug]`) — not needed
- Filtering or search by specialisation
- Any content other than team members (no hero, no intro copy block, no CTA sections)

---

## 3. Deliverables

| ID | Item | Type | Deliverable | MoSCoW |
|----|------|------|-------------|--------|
| T-01 | Team member grid | Page section | All published team members displayed as cards, ordered by the `order` field (ascending) | Must |
| T-02 | Member photo | Card element | Profile photo displayed for each member | Must |
| T-03 | Member name | Card element | Full name displayed for each member | Must |
| T-04 | Member role | Card element | Role / title displayed, localized (PL/EN) | Must |
| T-05 | Member bio | Card element | Short biography displayed, localized rich text | Must |
| T-06 | Specialisation tags | Card element | List of specialisation tags displayed per member, localized | Should |
| T-07 | Languages spoken | Card element | Languages spoken displayed per member (optional — only shown if present) | Could |
| T-08 | Page SEO metadata | Meta | Unique `<title>` and `<meta description>` in PL and EN | Must |
| T-09 | No member state | Edge case | If the collection is empty, the page shows a graceful fallback (no empty grid) | Should |

---

## 4. Page Structure

The page consists of a single section: the team member grid. There is no hero, no intro block, no sidebar, no CTA.

```
/team
└── Team member grid
    └── Card × N (one per published team member, sorted by order ASC)
```

---

## 5. Acceptance Criteria

**T-01 — Team member grid**
- All team members with a published status appear on the page
- Members are sorted by `order` field ascending; members with the same order appear in insertion order
- Members without a published status do not appear

**T-02 – T-07 — Card content**
- Each card shows: photo, name, role, bio
- Specialisation tags appear as distinct visual tags/pills if the field is populated
- Languages appear only if the field is populated (no "Languages: —" placeholder)
- Localized fields (role, bio, specialisations) render in the active locale

**T-08 — SEO metadata**
- The page has a unique `<title>` and `<meta description>` in both PL and EN
- `hreflang` alternate links are present (consistent with the rest of the site)

**T-09 — Empty state**
- If no team members are in the collection, the page renders without a broken/empty grid layout

---

## 6. Open Questions

| # | Question |
|---|----------|
| OQ-1 | [OPEN QUESTION] Should the page `<title>` / heading be managed in the CMS (via the `Pages` collection) or hardcoded as a Polish-default string? |
| OQ-2 | [OPEN QUESTION] Is there a design spec or Figma reference for card layout (single column on mobile, 2-col, 3-col on desktop)? |

---

## 7. Dependencies

- `Team` collection — already exists with all required fields
- `Media` collection — for team photos (already exists)
- Localization config — `pl` (default) + `en` (already configured)

---

## 8. Version History

| Version | Date | Notes |
|---------|------|-------|
| 0.1 | 2026-03-08 | Initial draft |
