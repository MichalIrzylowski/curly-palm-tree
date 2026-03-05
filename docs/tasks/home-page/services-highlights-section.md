# Services Highlights Section Tasks

## S-01: Display 3–4 service cards
- **Priority:** Must
- **Card Contents:** Name, short description, icon
- **Acceptance Criteria:** Cards match CMS-selected services; localized in active locale
- **Status:** Done
- **Component:** ServicesHighlightsBlock
- **Depends On:** Services collection (M1)

## S-02: Each card links to services page
- **Priority:** Must
- **Link:** `/services` or specific service anchor
- **Acceptance Criteria:** Link navigates correctly
- **Status:** Done
- **Component:** ServicesHighlightsBlock

## S-03: Add "View all services" link
- **Priority:** Must
- **Position:** Section bottom
- **Link:** `/services`
- **Acceptance Criteria:** Link present and functional
- **Status:** Done
- **Component:** ServicesHighlightsBlock

## S-04: Editor can select services to highlight
- **Priority:** Must
- **Component:** `ServicesHighlightsBlock` in Payload
- **Field:** `services` (relationship → Services, hasMany, max 4)
- **Acceptance Criteria:** Block accepts multi-select up to 4 services
- **Status:** Done
- **Note:** Decision pending on default services (OQ-02)

## S-05: Section heading editable in both locales
- **Priority:** Must
- **Acceptance Criteria:** Editor changes heading; both PL and EN saved independently
- **Status:** Done
- **Component:** ServicesHighlightsBlock
