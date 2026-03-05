# Why Us Section Tasks

## W-01: Display 3 value proposition items
- **Priority:** Must
- **Items:** Icon + heading + short description (≤ 30 words each)
- **Acceptance Criteria:** All 3 items visible; no overflow
- **Status:** Pending
- **Component:** WhyUsBlock

## W-02: Set default value propositions
- **Priority:** Must
- **Defaults:**
  1. Modern diagnostic equipment
  2. Experienced specialist team
  3. Dog, cat & small pet care
- **Acceptance Criteria:** Defaults pre-populated in seed; editable in CMS
- **Status:** Pending
- **Component:** WhyUsBlock (with seeds)

## W-03: Use Lucide line icons
- **Priority:** Should
- **Icon Style:** 24px, `--secondary` teal colour
- **Fallback:** Emoji if Lucide not yet installed
- **Acceptance Criteria:** Icons render; fallback graceful
- **Status:** Pending
- **Component:** WhyUsBlock
- **Note:** Check if `lucide-react` installed (OQ-05)
- **Depends On:** `lucide-react` package

## W-04: Editable text per locale
- **Priority:** Must
- **Fields:** Icon, heading, description (all editable)
- **Acceptance Criteria:** Both PL and EN fields independently editable via `WhyUsBlock`
- **Status:** Pending
- **Component:** WhyUsBlock in Payload
