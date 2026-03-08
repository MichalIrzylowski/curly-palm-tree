---
name: prd-writer
description: Write feature-focused PRDs for Payload CMS projects. Define what needs to be delivered without implementation details. Use when the user asks to "write a PRD", "spec out a feature", "document requirements", or describes a feature they want to build. Produces concise, deliverable-focused PRDs stored in docs/ with PRD-[feature] naming.
---

# Payload CMS PRD Writer

Document features and deliverables for Payload CMS projects. PRDs focus on **what** needs to be built (features, data structures, user outcomes), not **how** to build it.

## When to use

- User describes a feature they want to build ("add a testimonials collection", "create an admin dashboard", "enable bulk publishing")
- User asks to write or spec out requirements for a CMS feature
- User provides rough notes and wants them formalized into a PRD
- User says "write a PRD for", "spec out", "document requirements for"

## Workflow

### Step 1: Gather context

Ask for critical information about the feature:

1. **Feature name** — What are we delivering? (e.g., "Team Showcase", "Blog Search", "Content Workflows")
2. **Problem / user need** — Why do we need this? Who needs it? (e.g., "Content authors need to publish multiple posts at once")
3. **Scope** — What's in scope vs. out of scope? (e.g., "First iteration: collections + globals only, no custom plugins")
4. **Deliverables** — What will the user/editor see and do? Focus on outcomes, not implementation.
5. **Success criteria** — How will we know this is working? What should users be able to accomplish?
6. **Dependencies** — What collections, globals, or features does this depend on?
7. **Constraints** — Timeline, priorities, known limitations?

Extract as much as possible from rough notes. Only ask about gaps critical to understanding scope and deliverables. A good PRD can be written with partial information if open questions are flagged.

### Step 2: Write the PRD

Focus on **deliverables and features**, not implementation. Answer these questions without dictating *how*:

**Be specific about user outcomes.**

```
Bad:  "Users should be able to manage content."
Good: "Content editors can create, edit, publish, and archive blog posts with automatic SEO preview."
```

**Describe data and relationships clearly.**

```
Bad:  "Add a collection for products."
Good: "A Products collection with fields for name, description, pricing, and linked categories (reference field)."
```

**Separate must-haves from nice-to-haves.** Use MoSCoW (Must, Should, Could, Won't) to help prioritize scope and make tradeoffs.

**Flag open questions.** Mark decisions still pending with `[OPEN QUESTION]` tags. Don't guess or omit.

**Include acceptance criteria.** Define what "done" looks like — what can users do when this feature ships?

### Step 3: Format and file location

Store the PRD in the `docs/` folder with filename: `PRD-[feature-slug].md`

Examples: `PRD-team-showcase.md`, `PRD-bulk-publish.md`, `PRD-search.md`

Format guidelines:
- Use document title as H1
- Include metadata: feature name, date, status, priority
- Numbered sections with clear hierarchy (1, 1.1, 1.2) as H2/H3 headings
- Use tables for deliverables with columns: Item, Type, Deliverable, MoSCoW
- Keep paragraphs concise (2–4 sentences)
- Add version history at the end

### Step 4: Review and iterate

After presenting, offer to:
- Clarify deliverables or refine scope
- Adjust priorities (MoSCoW)
- Add or remove items based on feedback
- Create a follow-up PRD for Phase 2 / next iteration

## Quality checklist

Before finalizing, verify:
- Every deliverable has a clear priority (Must/Should/Could/Won't)
- Acceptance criteria exist for all Must-haves
- Open questions are explicitly marked
- Success criteria are measurable (e.g., "editors can save drafts", not "better workflow")
- The document flows logically and focuses on outcomes, not technical HOW
- No ambiguity about scope — what's in, what's out, what's deferred

## Examples

**Example 1: Collection feature**
User: "I want to add a testimonials section to the homepage."
PRD scope: Testimonials collection with fields (quote, author, photo), admin sorting/visibility controls, homepage block to display.
Focus: What editors can do (add/edit testimonials, control visibility) and what visitors see.

**Example 2: Global data feature**
User: "Clinic hours and emergency contact info need to be manageable from the admin panel."
PRD scope: OpeningHours global (hours per day, optional notes), Contact global (address, phones, email, map coords).
Focus: What admins can edit and how it appears on the site.

**Example 3: Multi-phase feature**
User: "We need better content workflows."
Phase 1 PRD scope: Draft/publish states, role-based visibility. Must-haves: drafts, admin approval.
Phase 2 (deferred): Scheduled publishing, content workflows with multiple approval stages.
