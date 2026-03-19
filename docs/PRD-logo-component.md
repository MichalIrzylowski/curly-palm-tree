# PRD: Logo Component

- **Feature:** Clinic Logo SVG Component
- **Date:** 2026-03-19
- **Status:** Done
- **Priority:** High

---

## 1. Problem

The existing `src/components/Logo/Logo.tsx` rendered a remote Payload CMS placeholder logo via `<img>`. It has been replaced with the clinic's actual brand logo (`public/logo.svg`), loaded via SVGR so colour and size are controllable through props.

---

## 2. Deliverables

### 2.1 SVGR webpack setup

`@svgr/webpack` is installed as a dev dependency and registered in `next.config.js`. Any `.svg` file imported as a module becomes a React component typed as `FC<SVGProps<SVGSVGElement>>`. The module type declaration lives in `src/environment.d.ts`.

### 2.2 Logo component — `src/components/Logo/Logo.tsx`

Imports `public/logo.svg` via SVGR and wraps it with clinic-specific prop defaults.

The SVG source contains three visual groups:
- Paw+cross icon (veterinary symbol, right side of the mark)
- "LECZNICA" wordmark (large lettering)
- "WETERYNARYJNA" sub-wordmark (smaller lettering below)

All three groups share the brand green `#3a803b` by default via the `fill` prop forwarded to the root `<svg>`.

**Props:**

- `className?: string` — forwarded to the root `<svg>` element
- `width?: number` — defaults to `310` (native SVG width)
- `height?: number` — defaults to `58` (native SVG height)
- `color?: string` — sets `fill` on the root `<svg>`, inherited by all groups; defaults to `#3a803b`
- `aria-label?: string` — defaults to `"Lecznica Weterynaryjna"` for accessibility

**Behaviour:**

- Renders an inline `<svg>` via SVGR — no external request, no flash of missing content
- `viewBox`, `width`, and `height` are preserved from the source SVG so it scales correctly at any size
- Pure presentational component (no side effects, no data fetching)

### 2.3 Usage sites — updated

- `src/Header/Component.client.tsx` — renders `<Logo />` in the sticky site header
- `src/Footer/Component.tsx` — renders `<Logo />` in the footer
- `src/components/BeforeLogin/index.tsx` — renders `<Logo />` on the Payload admin login screen

---

## 3. Acceptance Criteria

- Logo renders correctly in the site header at the default size ✓
- Logo renders correctly in the Payload admin login screen ✓
- Logo scales without distortion when `width`/`height` props are changed ✓
- No external network requests are made to fetch the logo ✓
- Screen readers announce the logo as "Lecznica Weterynaryjna" (or the value passed via `aria-label`) ✓
- `color` prop changes the fill of all SVG groups simultaneously ✓

---

## 4. Out of scope

- Animated logo variants
- Dark-mode auto-switching (handled by CSS at the call site if needed)
- Separate icon-only variant (paw+cross without text) — deferred to a future task

---

## 5. Open Questions

- `[OPEN QUESTION]` Should the admin panel logo use the full horizontal lockup or just the icon mark? (Currently using full lockup.)
- `[OPEN QUESTION]` Is a white/inverted version of the logo needed for dark backgrounds (e.g. dark footer)?

---

## 6. Version History

- 2026-03-19 — Initial draft
- 2026-03-19 — Implemented: SVGR setup, Logo component, all usage sites updated; status → Done
