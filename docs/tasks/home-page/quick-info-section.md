# Quick-info Bar Section Tasks

## Q-01: Display today's opening hours
- **Priority:** Must
- **Format:** Day name + open/close times or "Closed"
- **Acceptance Criteria:** Correct day is highlighted; data sourced from `OpeningHours` global
- **Status:** Pending
- **Component:** QuickInfoBlock
- **Depends On:** OpeningHours global (M1)

## Q-02: Show real-time "Open now" or "Closed" badge
- **Priority:** Must
- **Timezone:** Europe/Warsaw
- **Acceptance Criteria:** Badge updates client-side; `<noscript>` hides badge gracefully
- **Status:** Pending
- **Component:** QuickInfoBlock (client component with Suspense)

## Q-03: Display clinic phone number
- **Priority:** Must
- **Format:** `tel:` link
- **Acceptance Criteria:** Tappable on mobile, sourced from `Contact` global
- **Status:** Pending
- **Component:** QuickInfoBlock
- **Depends On:** Contact global (M1)

## Q-04: Display short address
- **Priority:** Must
- **Format:** Street + city
- **Acceptance Criteria:** Sourced from `Contact` global
- **Status:** Pending
- **Component:** QuickInfoBlock
- **Depends On:** Contact global (M1)

## Q-05: Bar is sticky on mobile viewport
- **Priority:** Should
- **Position:** Bottom of screen
- **Acceptance Criteria:** Bar remains visible while scrolling; does not obscure interactive content
- **Status:** Pending
- **Component:** QuickInfoBlock
- **Note:** Decision pending on slide-up vs top strip behavior (OQ-04)

## Q-06: Bar is visible on desktop as horizontal strip
- **Priority:** Must
- **Viewport:** 1280px+
- **Acceptance Criteria:** Renders as expected at 1280px+ viewport
- **Status:** Pending
- **Component:** QuickInfoBlock
