# Parking & Transport Section Tasks

## PT-01: Render parking and transport rich text
- **Priority:** Must
- **Acceptance Criteria:** Rich text content from `Contact` global `directionsNotes` field is rendered with correct typography (headings, lists, bold); no raw HTML visible
- **Status:** Pending
- **Depends On:** Contact global (M1) — `directionsNotes` field

## PT-02: Content is bilingual (PL / EN)
- **Priority:** Must
- **Acceptance Criteria:** Correct locale variant of `directionsNotes` is displayed based on active locale; switching locale updates the text
- **Status:** Pending
- **Depends On:** Contact global (M1) — `directionsNotes` localised field

## PT-03: Content editable via Payload admin
- **Priority:** Must
- **Acceptance Criteria:** Non-technical editor can update parking/transport notes in both `pl` and `en` locales via the Payload admin `Contact` global without code changes
- **Status:** Pending
- **Depends On:** Contact global (M1)
