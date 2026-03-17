# Service Expandable Table Component

**Feature Slug:** service-expandable-table
**Status:** Pending
**Priority:** Medium
**Last Updated:** 2026-03-17

---

## 1. Overview

Replace the grid-based service card display with an expandable table layout. This allows visitors to scan all services and prices at a glance, then click a row to reveal the full service description. Improves content density and readability on all screen sizes.

---

## 2. Problem & User Need

**Current state:** Services display as a 3-column card grid. Cards show name, icon, and truncated description. Users must interact with multiple cards to compare services and prices.

**User outcome:** Visitors should quickly scan available services and pricing, then click to read detailed descriptions without navigating away. Better information architecture for service browsing.

---

## 3. Scope

### In Scope (M2 — Pages)

- Redesign `ServiceGridBlock` component to use expandable table rows instead of card grid
- Table displays services in order, collapsible rows with full descriptions
- Responsive layout (stacked on mobile, table on desktop)
- Maintains existing block configuration (heading, description fields)

### Out of Scope

- Admin-facing format switcher (hardcode table layout)
- Service categories or filtering
- Pricing calculator or multi-tier pricing display
- Analytics tracking on row clicks

---

## 4. Deliverables

| Item | Type | Deliverable | MoSCoW |
|------|------|-------------|--------|
| Expandable table component | React Component | New component to render services as expandable rows | Must |
| Row collapse/expand toggle | UI Element | Click handler + icon for expand/collapse state per row | Must |
| Service name display | Table Cell | Service name in left column (always visible) | Must |
| Service price display | Table Cell | Price text in right column (always visible) | Must |
| Expanded row description | Details Row | Full localized description shown below expanded row | Must |
| Mobile responsiveness | CSS/Layout | Table stacks vertically on small screens; remains functional | Must |
| Block configuration | Payload Config | Keep existing heading + description fields unchanged | Must |

---

## 5. User Experience

### On Desktop

1. User sees section with optional heading
2. Table displays: Service name (left), Price (right), each in its own row
3. Click anywhere on a row to expand below, revealing full description
4. Click again to collapse
5. Multiple rows can be expanded simultaneously

### On Mobile

- Table adapts to single-column layout
- Row expandable by tap
- Description inline or in collapse panel (design choice)

---

## 6. Data & Relationships

**Source:** Services collection (ordered by `order` field)

**Fields displayed:**
- `name` — localized service name
- `priceText` — localized price display (e.g., "50 zł", "on quote")
- `description` — localized full description (shown on expand)

**Localization:** Component respects locale param (pl/en) and fetches localized data.

---

## 7. Acceptance Criteria

- ✓ Table renders all services from collection in order
- ✓ Clicking a row toggles expand/collapse state
- ✓ Expanded row shows full description without truncation
- ✓ Service name and price visible in collapsed state
- ✓ Responsive on mobile (stacks or reflows gracefully)
- ✓ Block heading and description still render if configured
- ✓ Empty state handled ("Brak usług" or similar)
- ✓ No changes to ServiceGridBlock Payload config schema

---

## 8. Success Criteria

- Visitors can scan all services and prices in one view
- Click-to-expand interaction is intuitive and works on all devices
- Page load time unaffected by layout change
- No regression in accessibility (keyboard nav, screen readers)

---

## 9. Dependencies

- Services collection (existing)
- Localization support (existing)
- Payload fetch in component (existing pattern)

---

## 10. Open Questions / Notes

- Expand/collapse icon design: Use chevron, +/−, or disclosure triangle? (defer to design system)
- Should multiple rows be expandable at once, or auto-collapse on opening a new row? (default: allow multiple)
- Table styling: Use `<table>` semantic HTML or `<div>` layout? (prefer semantic if accessible)

---

## Version History

| Date | Change |
|------|--------|
| 2026-03-17 | Initial PRD — expandable table layout, hardcoded format |
