# Contact Info Section Tasks

## CI-01: Display clinic address
- **Priority:** Must
- **Format:** Full street address + city/postcode
- **Acceptance Criteria:** Address matches value from `Contact` global; localised in both `pl` and `en`
- **Status:** Pending
- **Depends On:** Contact global (M1) — `address` field

## CI-02: Display phone number(s) as clickable `tel:` links
- **Priority:** Must
- **Acceptance Criteria:** Each phone number renders as `<a href="tel:…">`; tappable on mobile; number sourced from `Contact` global
- **Status:** Pending
- **Depends On:** Contact global (M1) — `phones` field
- **Note:** Number of phone numbers TBD (OQ-02); component should handle 1–3 entries

## CI-03: Display email address as a `mailto:` link
- **Priority:** Must
- **Acceptance Criteria:** Email renders as `<a href="mailto:…">`; sourced from `Contact` global
- **Status:** Pending
- **Depends On:** Contact global (M1)

## CI-04: Contact info editable via Payload admin
- **Priority:** Must
- **Acceptance Criteria:** Non-technical editor can update address, phones, and email in the Payload admin without code changes; changes reflect on the page after revalidation
- **Status:** Pending
- **Depends On:** Contact global (M1)
