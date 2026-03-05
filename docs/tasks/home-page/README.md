# Homepage (M2) — Task Breakdown

Tasks extracted from `docs/PRD-homepage.md` (Section 6: Requirements).

## Task Files by Section

| Section | Tasks | File |
|---------|-------|------|
| Hero | H-01 to H-06 | [hero-section.md](hero-section.md) |
| Quick-info Bar | Q-01 to Q-06 | [quick-info-section.md](quick-info-section.md) |
| Services Highlights | S-01 to S-05 | [services-highlights-section.md](services-highlights-section.md) |
| Meet the Team Teaser | T-01 to T-05 | [team-teaser-section.md](team-teaser-section.md) |
| Why Us | W-01 to W-04 | [why-us-section.md](why-us-section.md) |
| Blog Teaser | B-01 to B-05 | [blog-teaser-section.md](blog-teaser-section.md) |

## Summary

**Total Requirements:** 31 tasks
**Must Have:** 22
**Should Have:** 7
**Could Have:** 2

## Dependencies

- ✅ OpeningHours global (M1) — required for Q-01
- ✅ Contact global (M1) — required for Q-03, Q-04, H-04
- ✅ Team collection (M1) — required for T-01
- ✅ Services collection (M1) — required for S-01, S-02
- ⚠️ lucide-react package — check installation (OQ-05)

## Blocked by Open Questions

| Question | Tasks Blocked | Target |
|----------|---------------|--------|
| OQ-01: Hero image asset | H-05 | Before M3 content entry |
| OQ-02: Default services | S-04 | M3 |
| OQ-04: Sticky bar behavior | Q-05 | Before development |
| OQ-05: lucide-react status | W-03 | Start of M2 |

## New Payload Blocks Required

1. **HeroBlock** — `src/blocks/Hero/`
2. **QuickInfoBlock** — `src/blocks/QuickInfo/`
3. **ServicesHighlightsBlock** — `src/blocks/ServicesHighlights/`
4. **TeamTeaserBlock** — `src/blocks/TeamTeaser/`
5. **WhyUsBlock** — `src/blocks/WhyUs/`
6. **BlogTeaserBlock** — `src/blocks/BlogTeaser/`

All blocks must be registered in `src/payload.config.ts` under the `Pages` collection layout builder.

## Implementation Order

1. **Resolve open questions** (OQ-01, OQ-02, OQ-04, OQ-05)
2. **Build block components** (Hero → QuickInfo → ServicesHighlights → TeamTeaser → WhyUs → BlogTeaser)
3. **Register blocks in Payload** and generate types (`pnpm generate:types`)
4. **Populate seed/test content**
5. **Wire up homepage** (`src/app/(frontend)/page.tsx`)
6. **Accessibility pass** and responsive testing
