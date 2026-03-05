# Meet the Team Teaser Section Tasks

## T-01: Display horizontal photo strip of team members
- **Priority:** Must
- **Contents:** Photo + name + role
- **Acceptance Criteria:** Photos render with correct `alt` text; data from `Team` collection
- **Status:** Pending
- **Component:** TeamTeaserBlock
- **Depends On:** Team collection (M1)

## T-02: Responsive team strip display
- **Priority:** Should
- **Desktop:** Up to 4 team members
- **Mobile:** Scrollable
- **Acceptance Criteria:** No layout breakage on 375px viewport
- **Status:** Pending
- **Component:** TeamTeaserBlock

## T-03: Meet the team CTA
- **Priority:** Must
- **Label:** "Meet the team"
- **Link:** `/team`
- **Acceptance Criteria:** Navigation correct
- **Status:** Pending
- **Component:** TeamTeaserBlock

## T-04: Section heading editable in both locales
- **Priority:** Must
- **Acceptance Criteria:** Both locales independently editable in Payload
- **Status:** Pending
- **Component:** TeamTeaserBlock

## T-05: Optional team member pinning
- **Priority:** Could
- **Feature:** Override default (all active team members) to pin specific members
- **Field:** `pinnedMembers` (relationship → Team, hasMany, optional)
- **Acceptance Criteria:** Optional relationship field in block
- **Status:** Pending
- **Component:** TeamTeaserBlock
