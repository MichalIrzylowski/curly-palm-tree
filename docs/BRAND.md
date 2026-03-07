# Brand Identity — Lecznica Weterynaryjna

**Direction:** Modern & Professional
**Tagline (PL):** Dbamy o Twoje zwierzę — profesjonalnie i z troską.
**Tagline (EN):** Expert care, every visit.

---

## 1. Color Palette

### Primary tokens

| Token | Name | Hex | oklch | Usage |
|-------|------|-----|-------|-------|
| `--primary` | Navy | `#1B3A5C` | `oklch(24% 0.085 237deg)` | Main brand color, nav, headings, CTA backgrounds |
| `--secondary` | Teal | `#4A9B8E` | `oklch(58% 0.075 187deg)` | Secondary actions, badges, highlights |
| `--accent` | Bright Teal | `#2EC4B6` | `oklch(72% 0.11 188deg)` | Focus rings, hover states, inline links |
| `--background` | Cool White | `#F8FAFB` | `oklch(98.5% 0.003 220deg)` | Page background |
| `--foreground` | Dark Ink | `#1A1A2E` | `oklch(14% 0.035 272deg)` | Body text |

### Supporting tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--card` | `#FFFFFF` | Card surfaces (stand out from cool-white bg) |
| `--muted` | `#EEF2F5` | Subtle section backgrounds, table stripes |
| `--muted-foreground` | `#5E7080` | Captions, metadata, helper text |
| `--border` | `#D4DDE6` | Borders, dividers |

### Do / Don't

- ✅ Use Navy on white/cool-white backgrounds — minimum 4.5:1 contrast ratio met
- ✅ Use Bright Teal as CTA accent on Navy backgrounds
- ✅ Use white text on Navy (`#1B3A5C`) — contrast ≈ 9.3:1 (AAA)
- ❌ Don't place Bright Teal text on white — fails AA (contrast ≈ 3.1:1); use Navy for text instead
- ❌ Don't use bright/warm colors — no orange, red, or yellow brand elements

---

## 2. Typography

### Typefaces

| Role | Font | Weights | Source |
|------|------|---------|--------|
| Headings | **Plus Jakarta Sans** | 600 SemiBold, 700 Bold | Google Fonts |
| Body / UI | **Inter** | 400 Regular, 500 Medium | Google Fonts |

### Type scale (base 16px)

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| `h1` | 3.5rem / 56px (desktop) | 700 | Hero, page titles |
| `h2` | 2rem / 32px | 700 | Section headings |
| `h3` | 1.5rem / 24px | 600 | Card headings, sub-sections |
| `h4` | 1.125rem / 18px | 600 | Labels, group headings |
| Body | 1rem / 16px | 400 | Prose, paragraphs |
| Small / Caption | 0.875rem / 14px | 400–500 | Metadata, tags, captions |

### Rules

- Headings always use Plus Jakarta Sans
- Never use italic headings
- Line height: headings 1.15, body 1.65
- Letter spacing: headings `−0.01em`, body `0`

---

## 3. Shape & Spacing

| Property | Value | Rationale |
|----------|-------|-----------|
| Border radius | `8px` (0.5rem) | Approachable, modern — not clinical/sharp |
| Card radius | `12px` (0.75rem) | Soft, friendly cards consistent with illustrated aesthetic |
| Button radius | `8px` | Consistent with base radius |
| Section padding | `80px` vertical (desktop), `48px` (mobile) | Generous white space |
| Grid | 12-column, max-width 1280px | Existing container system |

---

## 4. Iconography

- Use **line icons** (1.5px stroke), never filled
- Recommended free set: [Lucide](https://lucide.dev/) — already available via `lucide-react` if installed, or add as a dependency
- Icon size: 20px inline, 24px standalone, 32px feature icons
- Icon color: matches surrounding text, or `--secondary` (Teal) for decorative use

---

## 5. Imagery & Illustration

- **Subject:** Animals (dogs, cats, small pets) alongside people (owners, vets) — warm, caring interactions
- **Style:** Two valid approaches, used consistently per section:
  1. **Illustration** — Flat/semi-realistic illustrated characters (people + animals). Warm, friendly, not cartoony. Used in hero and teaser sections. Palette should harmonise with brand teal and navy.
  2. **Photography** — Well-lit, natural colours, clean backgrounds. Used for staff headshots and equipment.
- **Staff photos:** Professional headshots, consistent neutral background (light grey or white)
- **Equipment photos:** Close-up, clean, modern — emphasise precision
- **Avoid:** Clip-art-quality stock icons, overly bright saturated edits, anything that looks scary or sterile; do not mix illustration and photo styles within the same section

---

## 6. Voice & Tone

| Context | Polish | English |
|---------|--------|---------|
| Hero tagline | Dbamy o Twoje zwierzę — profesjonalnie i z troską. | Expert care, every visit. |
| CTA | Umów wizytę / Zadzwoń do nas | Book a visit / Call us |
| Opening hours label | Godziny otwarcia | Opening hours |
| Staff page heading | Nasz zespół | Our team |
| Services page heading | Nasze usługi | Our services |

**Tone rules:**
- Professional but never cold
- Avoid medical jargon in public-facing copy
- Reassure pet owners; their anxiety is real
- PL: formal "Państwa" or "Twój" depending on context (prefer "Twój" for warmth)

---

## 7. Implementation Notes

- CSS custom properties defined in `src/app/(frontend)/globals.css`
- Fonts loaded via `next/font/google` in `src/app/(frontend)/layout.tsx`
- Tailwind tokens extend from CSS variables — add classes like `bg-primary`, `text-accent`
- `--radius` set to `0.5rem`; use `--radius-card: 0.75rem` for cards
- Dark mode: not required for v1 (medical/clinic sites are typically light-only)
