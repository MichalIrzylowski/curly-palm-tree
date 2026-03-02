# Product Requirements Document — Lecznica Weterynaryjna

> **Clinic name:** *Lecznica Weterynaryjna* (official Polish name; English label: *Veterinary Clinic*)
> **Address:** ul. 23 Marca 32E, 81-820 Sopot, Poland
> **Coordinates:** `54.4472595, 18.5504898`

---

## 1. Overview

A marketing and information website for a veterinary clinic, built on the existing **Payload CMS 3.x + Next.js 15** stack. The goal is to give pet owners everything they need to find the clinic, understand its offer, and trust its team — with zero friction.

**Target audience:** Pet owners (primarily dogs and cats, also small house animals: rabbits, hamsters, guinea pigs, etc.) in Sopot and the Tricity area (Gdańsk, Gdynia, Sopot).

**Primary goals:**
- Reduce phone enquiries for routine info (hours, location, services)
- Build trust through staff bios, equipment showcase, and professional design
- Establish a content marketing foundation via a blog

---

## 2. Scope

### In scope (v1)
| # | Feature | Priority |
|---|---------|----------|
| 1 | Homepage with hero, highlights | Must |
| 2 | Opening hours | Must |
| 3 | Staff / team page | Must |
| 4 | How to find us (map + directions) | Must |
| 5 | Services catalog | Must |
| 6 | Equipment showcase | Should |
| 7 | Contact section / page | Must |
| 8 | Blog (structure + first posts) | Future |

### Out of scope (v1)
- Online appointment booking *(planned for v2)*
- Patient portal / pet health records
- E-commerce (pet food, products)
- Additional languages beyond PL/EN

---

## 3. Feature Requirements

### 3.1 Homepage

**Purpose:** First impression, orient the visitor quickly.

**Sections:**
- **Hero** — clinic name, tagline, CTA ("Book a visit" → contact page, phone number)
- **Quick-info bar** — today's opening hours, phone number, address (sticky on mobile)
- **Services highlights** — 3–4 cards linking to the full services page
- **Meet the team teaser** — photo strip linking to the staff page
- **Why us** — 3 short value props (e.g., modern equipment, experienced team, emergency hours)
- **Blog teaser** — latest 3 posts (hidden until blog has content)

**Content managed via:** Payload `Pages` collection using the layout builder (existing blocks + new ones as needed).

---

### 3.2 Opening Hours

**Display:** Structured table — day of week, open/close time, special note (e.g., "Emergency only").

**Behavior:**
- Highlight today's row
- Show "Open now" / "Closed" badge based on current time (client-side)
- Support holiday/special hours override

**Content managed via:** Payload Global (e.g., `OpeningHours`) with a repeatable field group: `{ day, openTime, closeTime, note, isClosed }`.

---

### 3.3 Staff / Team Page

**Display:** Grid of team member cards.

**Each card contains:**
- Photo (Media upload)
- Full name
- Title / role (e.g., "Lead Veterinarian", "Veterinary Nurse")
- Short bio (rich text, ~100 words)
- Specialisation tags (e.g., "Surgery", "Dentistry", "Exotic animals")
- Optional: languages spoken

**Content managed via:** New `Team` collection in Payload.

---

### 3.4 How to Find Us (Map & Directions)

**Requirement:** Free, no API key needed for basic embed.

**Recommended solution:** [OpenStreetMap](https://www.openstreetmap.org/) via **Leaflet.js** React wrapper (`react-leaflet`).

- Pin at **54.4472595, 18.5504898** (ul. 23 Marca 32E, Sopot)
- Shows surrounding streets
- "Get directions" button opens native maps app (`geo:54.4472595,18.5504898` URI / Google Maps fallback)
- No Google Maps billing, no API key required

**Content managed via:** `Contact` Global — stores `lat`, `lng`, `address`, `directionsNotes` (rich text, bilingual).

**Fallback (simpler):** OpenStreetMap static embed iframe — zero JS dependency, works immediately.

---

### 3.5 Services Catalog

**Display:** List or grid of service cards, optionally grouped by category (e.g., Prevention, Surgery, Diagnostics, Dentistry).

**Each service contains:**
- Name
- Short description (rich text)
- Icon or illustration
- Optional: price range or "ask for pricing"

**Suggested service categories:** Prevention & Vaccinations, Internal Medicine, Surgery, Dentistry, Diagnostics (X-ray, ultrasound), Dermatology, Small Animals (rabbits, hamsters, guinea pigs, etc.).

**Content managed via:** New `Services` collection in Payload with a `category` relationship to `Categories` (existing collection).

---

### 3.6 Equipment Showcase

**Display:** Gallery or feature list with photos and descriptions.

**Purpose:** Build trust by showing modern diagnostic tools (X-ray, ultrasound, dental unit, etc.).

**Each item contains:**
- Equipment name
- Photo (Media)
- Short description of what it's used for (patient-facing language, not technical)

**Content managed via:** New `Equipment` collection or a block within the relevant page.

---

### 3.7 Contact Page

**Contents:**
- Address (with map — see 3.4)
- Phone number(s)
- Email address
- Opening hours (reused from Global — see 3.2)
- Parking / transport notes (rich text)

**No contact form in v1** to avoid spam handling complexity. Use a direct phone/email CTA instead.

---

### 3.8 Blog (Future — v2)

The existing `Posts` collection and blog infrastructure from the Payload template is already in place. No structural changes needed.

**v2 activates:**
- Blog listing page (`/blog`)
- Post detail page
- Blog teaser on homepage
- Categories / tags filtering

**v1 preparation:** Keep the Posts collection active in the CMS so editors can draft content before launch.

---

## 4. Navigation Structure

```
/                   → Homepage
/team               → Staff page
/services           → Services catalog
/equipment          → Equipment page
/contact            → Contact + map + hours
/blog               → (v2) Blog listing
/blog/[slug]        → (v2) Post detail
```

Admin: `/admin` (Payload panel, existing)

---

## 5. Non-Functional Requirements

| Concern | Requirement |
|---------|-------------|
| Performance | Lighthouse score ≥ 90 on mobile |
| Accessibility | WCAG 2.1 AA — keyboard nav, alt text, colour contrast |
| SEO | Unique `<title>` and `<meta description>` per page, `hreflang` PL/EN, sitemap (already configured via `next-sitemap`) |
| Responsive | Mobile-first, tested on 375px → 1440px |
| i18n | All user-facing text in Polish and English; Payload `localization` feature with `pl` (default) and `en` locales |
| CMS usability | Non-technical editor can update all content without a developer |

---

## 6. Content & Data Model Summary

| Payload entity | Type | New? |
|---------------|------|------|
| `OpeningHours` | Global | Yes |
| `Contact` | Global | Yes |
| `Team` | Collection | Yes |
| `Services` | Collection | Yes |
| `Equipment` | Collection | Yes (or block) |
| `Pages` | Collection | Existing |
| `Posts` | Collection | Existing |
| `Media` | Collection | Existing |
| `Categories` | Collection | Existing |

---

## 7. Open Questions

| # | Question | Status |
|---|----------|--------|
| 1 | Clinic name | ✅ *Lecznica Weterynaryjna* |
| 2 | Address & coordinates | ✅ ul. 23 Marca 32E, Sopot / `54.4472595, 18.5504898` |
| 3 | Animal types | ✅ Dogs & cats primarily; small house pets (hamsters, rabbits, guinea pigs) |
| 4 | Languages | ✅ Bilingual: Polish (default) and English |
| 5 | Emergency hours | ✅ No emergency hours in v1 |
| 6 | Brand identity | ✅ Modern & Professional — see `docs/BRAND.md` |
| 7 | Appointment booking | ✅ Call to book in v1; online booking planned for v2 |

---

## 8. Milestones

| Milestone | Deliverable |
|-----------|-------------|
| M0 — Setup | ✅ All decisions confirmed. See `docs/BRAND.md` for brand guidelines. |
| M1 — Data model | Create Payload collections/globals, generate types |
| M2 — Pages | Build all frontend pages with placeholder content |
| M3 — Content entry | Populate CMS with real content (staff, services, hours) |
| M4 — Polish | SEO meta, accessibility pass, performance audit |
| M5 — Launch | Deploy to production |
| M6 — Blog (v2) | Activate blog, publish first posts |
