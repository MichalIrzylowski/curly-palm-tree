# Hero Section Tasks

## H-01: Display clinic name as primary h1
- **Priority:** Must
- **Acceptance Criteria:** h1 present, text matches CMS value in active locale
- **Status:** Pending
- **Component:** HeroBlock

## H-02: Display brand tagline
- **Priority:** Must
- **Tagline:** PL: *Dbamy o Twoje zwierzę — profesjonalnie i z troską.* / EN: *Expert care, every visit.*
- **Acceptance Criteria:** Tagline visible in both locales; sourced from Payload field
- **Status:** Pending
- **Component:** HeroBlock

## H-03: Show primary CTA button
- **Priority:** Must
- **Label:** "Umów wizytę / Book a visit"
- **Link:** `/contact`
- **Acceptance Criteria:** Button renders, navigates to `/contact`
- **Status:** Pending
- **Component:** HeroBlock

## H-04: Show secondary CTA (phone number)
- **Priority:** Must
- **Acceptance Criteria:** Phone number is clickable on mobile; sourced from `Contact` global
- **Status:** Pending
- **Component:** HeroBlock

## H-05: Display hero background image
- **Priority:** Should
- **Description:** Full-bleed clinic exterior or calming animal photo
- **Acceptance Criteria:** Image has descriptive `alt` text; uses `next/image` with priority loading
- **Status:** Pending
- **Component:** HeroBlock
- **Note:** Awaiting image asset from clinic (OQ-01)

## H-06: Make hero content editable via layout builder
- **Priority:** Must
- **Acceptance Criteria:** Editor can change heading, tagline, CTA label, and image without code changes
- **Status:** Pending
- **Component:** HeroBlock in Payload
