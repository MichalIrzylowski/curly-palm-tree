---
name: prd-writer
description: Write professional Product Requirements Documents (PRDs) from user input, notes, or conversations. Use this skill whenever the user asks to write a PRD, product requirements document, product spec, feature spec, requirements doc, or says things like "write requirements for", "spec out this feature", "document this product idea", "create a PRD", or "help me define requirements". Also use when the user uploads notes or briefs and asks to turn them into a structured product document. Produces well-structured PRDs as .docx files following industry best practices.
---

# PRD Writer

Create comprehensive, well-structured Product Requirements Documents from user input. PRDs are produced as polished .docx files ready for stakeholder review.

## When to use

- User asks to write a PRD, product spec, feature spec, or requirements document
- User provides rough notes, briefs, or ideas and wants them formalized into a PRD
- User wants to document requirements for a new feature, product, or initiative
- User says "spec out", "write requirements for", or "document this product idea"

## Workflow

### Step 1: Gather context

Before writing, collect enough information to produce a useful PRD. Ask the user for anything missing from:

1. **Product/feature name** — What are we building?
2. **Problem statement** — What problem does this solve? Who has this problem?
3. **Target users** — Who are the primary and secondary users?
4. **Goals and success metrics** — How will we measure success?
5. **Key requirements or features** — What must the product do?
6. **Constraints** — Timeline, technical limitations, dependencies, budget
7. **Stakeholders** — Who needs to approve or review this?

If the user provides rough notes or a brief, extract as much as possible from what they've given and only ask about critical gaps. Don't over-interrogate — a good PRD can be written with partial information and clearly marked open questions.

### Step 2: Choose the right template

Consult `references/prd-templates.md` to select the appropriate PRD structure based on scope:

- **Full PRD** — For new products or large features with cross-functional impact
- **Lightweight PRD** — For smaller features, iterations, or well-understood problem spaces
- **API/Technical PRD** — For developer-facing features, APIs, or platform capabilities

Default to the **Full PRD** unless the scope clearly calls for something lighter.

### Step 3: Write the PRD

Follow these principles when drafting:

**Be specific, not vague.** Every requirement should be concrete enough that an engineer could estimate it and a QA engineer could test it.

```
Bad:  "The system should be fast."
Good: "Search results must return within 200ms for 95th percentile queries on datasets up to 1M records."
```

**Separate must-haves from nice-to-haves.** Use MoSCoW prioritization (Must have, Should have, Could have, Won't have) for requirements. This helps teams make tradeoffs when timelines tighten.

**Write for your audience.** PRDs are read by engineers, designers, PMs, and executives. Lead with the "why" (problem, goals, context) before the "what" (requirements, specs). Keep executive summary non-technical. Keep requirements precise.

**Flag open questions explicitly.** If something is unresolved, mark it clearly with an `[OPEN QUESTION]` tag rather than guessing or omitting it. This builds trust and surfaces decisions that need to be made.

**Include acceptance criteria.** For each major requirement, define what "done" looks like. This prevents scope creep and misaligned expectations.

### Step 4: Produce the document

Generate the PRD as a `.docx` file using the docx skill. Follow these formatting guidelines:

- Use the document title as a cover heading
- Include a metadata table at the top (author, date, status, version, stakeholders)
- Use numbered sections with clear hierarchy (1, 1.1, 1.1.1)
- Use tables for requirements with columns: ID, Requirement, Priority, Acceptance Criteria
- Keep paragraphs concise — aim for 2-4 sentences each
- Add a version history table at the end

### Step 5: Review and iterate

After presenting the PRD, offer to:
- Refine specific sections based on feedback
- Adjust priority levels
- Add or remove requirements
- Generate a summary version for executive review
- Export in a different format if needed

## Quality checklist

Before finalizing, verify:
- Every requirement has a clear priority level
- Acceptance criteria exist for all Must-have requirements
- Open questions are explicitly flagged
- Success metrics are measurable (not vague like "improve user experience")
- No orphan references (every section referenced elsewhere actually exists)
- The document reads coherently from start to finish — not just a list of disconnected bullet points

## Examples

**Example 1: Feature PRD from a brief**
User says: "Write a PRD for adding dark mode to our mobile app"
Actions:
1. Ask clarifying questions about target platforms, user research, timeline
2. Select Lightweight PRD template (well-understood feature)
3. Draft PRD with problem statement, user stories, requirements, design considerations
4. Generate .docx with proper formatting
Result: A polished PRD ready for engineering review

**Example 2: Full PRD from rough notes**
User says: "Here are my notes from the brainstorm — turn these into a proper PRD" (attaches notes)
Actions:
1. Parse notes, extract key themes, identify gaps
2. Select Full PRD template (new product initiative)
3. Draft comprehensive PRD, flagging open questions from gaps in notes
4. Generate .docx with metadata, requirements tables, success metrics
Result: A comprehensive PRD that transforms rough ideas into actionable requirements

**Example 3: Technical/API PRD**
User says: "We need to spec out a new webhook system for our platform"
Actions:
1. Gather technical context — existing architecture, target developers, scale requirements
2. Select API/Technical PRD template
3. Draft PRD with API contracts, data models, error handling, rate limits, migration plan
4. Generate .docx with technical diagrams described in text, endpoint tables
Result: A technical PRD that engineering can implement from directly
