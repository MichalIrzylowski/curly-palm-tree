# Opening Hours Section Tasks

## OH-01: Display full weekly hours table
- **Priority:** Must
- **Format:** Day of week | Open time | Close time | Note (e.g. "Emergency only")
- **Acceptance Criteria:** All seven days rendered; "Closed" shown for `isClosed: true` entries; data sourced from `OpeningHours` global
- **Status:** Pending
- **Depends On:** OpeningHours global (M1)

## OH-02: Highlight today's row
- **Priority:** Must
- **Timezone:** Europe/Warsaw
- **Acceptance Criteria:** Current day's row has a distinct visual style; determination is client-side
- **Status:** Pending
- **Depends On:** OpeningHours global (M1)

## OH-03: Show real-time "Open now" / "Closed" badge
- **Priority:** Must
- **Timezone:** Europe/Warsaw
- **Acceptance Criteria:** Badge reflects current status based on client time; `<noscript>` hides badge gracefully; updates without page reload
- **Status:** Pending
- **Note:** Can share logic with QuickInfoBlock from the homepage if already implemented

## OH-04: Support holiday / special hours override display
- **Priority:** Should
- **Acceptance Criteria:** If a day entry has a non-empty `note` field, it is displayed next to the hours; editor can set a note like "Holiday — closed" without changing times
- **Status:** Pending
- **Depends On:** OpeningHours global (M1) — `note` field per day
