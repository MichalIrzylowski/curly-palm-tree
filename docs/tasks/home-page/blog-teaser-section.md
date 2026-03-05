# Blog Teaser Section Tasks

## B-01: Hide section by default
- **Priority:** Must
- **Condition:** Hidden until at least 1 published post exists
- **Acceptance Criteria:** No empty section visible in production before blog goes live
- **Status:** Pending
- **Component:** BlogTeaserBlock
- **Note:** Posts rely on Post collection being populated

## B-02: Display latest 3 published posts
- **Priority:** Should
- **Contents:** Title, excerpt, date, cover image
- **Sort:** By `publishedAt` descending
- **Acceptance Criteria:** Posts render correctly; broken images don't break layout
- **Status:** Pending
- **Component:** BlogTeaserBlock
- **Depends On:** Posts collection with published content

## B-03: Post cards link to blog post
- **Priority:** Should
- **Link Pattern:** `/blog/[slug]`
- **Acceptance Criteria:** Navigation resolves correctly
- **Status:** Pending
- **Component:** BlogTeaserBlock

## B-04: Read the blog CTA
- **Priority:** Should
- **Label:** "Read the blog"
- **Link:** `/blog`
- **Acceptance Criteria:** Navigation correct
- **Status:** Pending
- **Component:** BlogTeaserBlock

## B-05: Toggle section visibility
- **Priority:** Must
- **Feature:** Editor can toggle block on/off without code changes
- **Field:** `enabled` (checkbox, visible in Payload)
- **Acceptance Criteria:** Toggle switch in CMS disables section rendering
- **Status:** Pending
- **Component:** BlogTeaserBlock
