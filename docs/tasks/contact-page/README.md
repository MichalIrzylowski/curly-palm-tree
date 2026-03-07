# Contact Page (M2) — Task Breakdown

Tasks derived from `docs/PRD.md` (Sections 3.4 and 3.7).

## Task Files by Section

| Section | Tasks | File |
|---------|-------|------|
| Page Setup | PS-01 to PS-03 | [page-setup.md](page-setup.md) |
| Map & Directions | M-01 to M-05 | [map-directions.md](map-directions.md) |
| Contact Info | CI-01 to CI-04 | [contact-info.md](contact-info.md) |
| Opening Hours | OH-01 to OH-04 | [opening-hours.md](opening-hours.md) |
| Parking & Transport | PT-01 to PT-03 | [parking-transport.md](parking-transport.md) |

## Summary

**Total Requirements:** 19 tasks
**Must Have:** 15
**Should Have:** 4

## Dependencies

- ✅ Contact global (M1) — required for CI-01, CI-02, CI-03, M-01, M-03, PT-01
- ✅ OpeningHours global (M1) — required for OH-01, OH-02, OH-03, OH-04

## Implementation Order

1. **Create the `/contact` route** (PS-01)
2. **Wire up Map** (M-01 → M-05) — pick Leaflet vs iframe early (OQ-01)
3. **Contact info section** (CI-01 → CI-04)
4. **Opening hours section** (OH-01 → OH-04) — reuse logic from QuickInfoBlock if applicable
5. **Parking & transport section** (PT-01 → PT-03)
6. **SEO meta and accessibility pass** (PS-02, PS-03)

## Open Questions

| # | Question | Tasks Blocked |
|---|----------|---------------|
| OQ-01 | Leaflet (`react-leaflet`) vs static OSM iframe | M-01, M-05 |
| OQ-02 | Number of phone numbers to display | CI-02 |
