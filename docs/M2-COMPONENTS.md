# M2 — Component Specification

> Covers all frontend components needed for the five public pages.
> Does **not** describe implementation — only what each component is and what it displays.

---

## Shared / Reusable

These components appear on multiple pages.

| Component | What it is |
|-----------|-----------|
| `SectionWrapper` | Full-width section container with consistent vertical padding (80px desktop / 48px mobile) and a max-width 1280px inner column |
| `SectionHeading` | Section title (h2) + optional subtitle paragraph, centred or left-aligned |
| `OpeningHoursTable` | Table of all days with open/close times and an optional note. Highlights today's row. Shows an "Open now" or "Closed" badge based on current local time (client-side). Data comes from the `OpeningHours` global |
| `TagBadge` | Small pill/chip label for specialisation tags, category names, etc. |
| `PhoneLink` | Phone number rendered as a `tel:` anchor |
| `OpenNowBadge` | "Open now" (green) / "Closed" (grey) status indicator, computed client-side from current time |

---

## Layout

| Component | What it is |
|-----------|-----------|
| `SiteHeader` | Top navigation bar with logo, nav links (Home, Team, Services, Equipment, Contact), language switcher (PL/EN), and a "Call us" CTA button. Collapses to a hamburger menu on mobile. Built on the existing Payload `Header` global |
| `SiteFooter` | Bottom footer with logo, nav links, address, phone, and copyright line. Built on the existing Payload `Footer` global |

---

## Homepage (`/`)

| Component | What it is |
|-----------|-----------|
| `HeroSection` | Full-width hero with clinic name, tagline, a primary CTA ("Book a visit" → contact page), and a secondary CTA (phone number). Background image or gradient |
| `QuickInfoBar` | Sticky bar (on mobile) showing today's opening hours, phone number, and address. Three icon + text pairs in a row |
| `ServiceHighlights` | Row of 3–4 service cards linking to the full `/services` page. Each card: icon, service name, one-line description |
| `TeamTeaser` | Horizontal photo strip of team members. Each item: circular photo, name, role. Links to `/team` |
| `WhyUsSection` | Three value proposition blocks. Each: icon, short heading, one sentence of supporting copy. Example props: modern equipment, experienced team, personal approach |
| `BlogTeaser` | Latest 3 blog post cards (title, date, excerpt, thumbnail). Entire section is hidden when no published posts exist |

---

## Team page (`/team`)

| Component | What it is |
|-----------|-----------|
| `TeamGrid` | Responsive grid container that renders all `TeamMemberCard` components |
| `TeamMemberCard` | Card for one team member: photo, full name, title/role, short bio (rich text), specialisation `TagBadge` list |

---

## Services page (`/services`)

| Component | What it is |
|-----------|-----------|
| `ServicesCatalog` | Top-level layout that groups service cards by category |
| `ServiceCategoryGroup` | One category section: category heading + grid of `ServiceCard` components below it |
| `ServiceCard` | Card for one service: icon or illustration, name, short description, optional price text ("Ask for pricing" or a range) |

---

## Equipment page (`/equipment`)

| Component | What it is |
|-----------|-----------|
| `EquipmentGrid` | Responsive grid that renders all `EquipmentItem` components |
| `EquipmentItem` | Feature card: equipment photo, name, patient-facing description of what it's used for |

---

## Contact page (`/contact`)

| Component | What it is |
|-----------|-----------|
| `ContactDetails` | Block showing address, phone number(s), and email as a structured list with icons |
| `ClinicMap` | Interactive map centred on the clinic coordinates (54.4472595, 18.5504898) via OpenStreetMap embed. No API key required |
| `GetDirectionsButton` | Button that opens native maps via `geo:` URI with a Google Maps fallback URL |
| `DirectionsNotes` | Rich text block for parking / public transport instructions. Content from the `Contact` global |
| `ContactOpeningHours` | Reuses `OpeningHoursTable` with the data from the `OpeningHours` global |

---

## Summary count

| Category | Count |
|----------|-------|
| Shared / Reusable | 6 |
| Layout | 2 |
| Homepage | 6 |
| Team | 2 |
| Services | 3 |
| Equipment | 2 |
| Contact | 5 |
| **Total** | **26** |
