---
name: task-writer
description: Break a Payload CMS PRD into atomic, ordered implementation tasks. Requires an existing PRD as input. Outputs an INDEX.md overview and individual TASK-NN files in docs/tasks/[feature]/. Use when the user says "write tasks for", "break down the PRD", "create tasks from the PRD", or "plan implementation for".
---

# Payload CMS Task Writer

Decompose a PRD into ordered, atomic implementation tasks with exact Payload CMS steps. Focus on **how** things must be built — specific files, commands, and registration steps — not why.

## When to use

- User says "write tasks for [feature]", "break down the PRD", "create a task list"
- A PRD exists in `docs/` and implementation is about to start
- User wants a step-by-step build plan rooted in a PRD

## Workflow

### Step 1: Read the PRD

Require the user to provide a PRD path (e.g. `docs/PRD-team-page.md`). Read it fully. Extract:

- Deliverables table (ID, item, type, MoSCoW)
- Dependencies (what collections/globals/features must already exist)
- Scope (in/out of scope)
- Open questions (flag any that block implementation)

If the PRD is missing, stop and ask the user to provide or write it first.

### Step 2: Identify task types and map deliverables

Group PRD deliverables into tasks by type. Each task must be a single coherent unit of work. Use this classification:

| Type | When to use |
|------|-------------|
| `collection` | New or modified Payload collection (schema, access, hooks) |
| `global` | New or modified Payload global |
| `block` | New layout builder block (config + component + RenderBlocks registration) |
| `page` | New Next.js frontend route (`src/app/(frontend)/`) |
| `component` | Standalone React component (not a block, not a page) |
| `config` | Changes to `src/payload.config.ts` or `next.config.ts` only |
| `seed` | Seed script for initial data |
| `migration` | Database migration via `pnpm payload migrate` |

Multiple PRD deliverables of the same type can merge into one task if they share the same files.

### Step 3: Order tasks by dependency

Always sequence tasks so later tasks can use the output of earlier ones:

1. Schema tasks (`collection`, `global`) — must come first
2. `pnpm generate:types` — always follows any schema task (include as a step, not a separate task)
3. `block` tasks — after types are generated (blocks reference collection types)
4. `page` tasks — after blocks and types exist
5. `component` tasks — whenever their dependencies (types, data) are ready
6. `seed` / `migration` — after schema is stable

Flag any task that depends on an open question from the PRD with `[BLOCKED: OQ-N]`.

### Step 4: Write the files

**File locations:**
- Index: `docs/tasks/[feature-slug]/INDEX.md`
- Tasks: `docs/tasks/[feature-slug]/TASK-NN-slug.md` (zero-padded: 01, 02…)

---

## INDEX.md format

```markdown
# Tasks — [Feature Name]

| Field | Value |
|-------|-------|
| PRD | `docs/PRD-[feature].md` |
| Date | YYYY-MM-DD |
| Status | In Progress |

## Task list

| # | Title | Type | Status |
|---|-------|------|--------|
| 01 | [Title] | collection | [ ] |
| 02 | [Title] | page | [ ] |
```

Keep the index lean — title, type, status only. No implementation details.

---

## TASK-NN-slug.md format

```markdown
# TASK-NN — [Title]

| Field | Value |
|-------|-------|
| Type | collection / global / block / page / component / config / seed / migration |
| PRD ref | T-01, T-02 |
| Depends on | TASK-NN or — |
| Status | [ ] Todo |

## Context

One short paragraph: what this task delivers and which PRD deliverable(s) it implements.

## Steps

Numbered, exact steps. No vague instructions.

## Files

- **Create:** list files to create
- **Modify:** list files to modify

## Done when

Checklist of verifiable conditions (not tests — functional verification only).
```

---

## Exact steps by task type

### `collection`

1. Determine structure: use `src/collections/<Name>/index.ts` (directory-based) for collections with custom admin UI or complexity; use `src/collections/<Name>.ts` (file-based) for simple schema + access only.
2. Define fields, access control, and hooks in the collection file.
3. For localized fields: wrap with `{ type: 'text', localized: true }` — localization must be enabled in `src/payload.config.ts`.
4. Register the collection in `src/payload.config.ts` under the `collections` array.
5. Run `pnpm generate:types` to regenerate `src/payload-types.ts`.
6. Run `pnpm exec tsc --noEmit` to verify no type errors.

### `global`

1. Create `src/globals/<Name>/config.ts` (always directory-based).
2. Define fields, access control, and hooks.
3. For localized fields: mark with `localized: true`.
4. Register the global in `src/payload.config.ts` under the `globals` array.
5. Run `pnpm generate:types`.
6. Run `pnpm exec tsc --noEmit`.

### `block`

1. Create `src/blocks/<Name>/config.ts` — export a `Block` type with `slug` and `fields`.
2. Create `src/blocks/<Name>/Component.tsx` — React Server Component that receives typed block props.
3. Register the block in the `layout` field of the relevant collection/global (add to the `blocks` array in the field config).
4. Register the component in `src/blocks/RenderBlocks.tsx` — add the block slug to the dispatch map.
5. Run `pnpm generate:importmap` if the component uses any admin-facing UI.
6. Run `pnpm exec tsc --noEmit`.

### `page`

1. Create route directory under `src/app/(frontend)/[route]/`.
2. Create `page.tsx` as an async Server Component.
3. Fetch data using the Payload Local API (`getPayload`) or REST — prefer Local API for server-side routes.
4. Apply locale from `params` or `searchParams` for bilingual pages (`?locale=en`).
5. Add `generateMetadata` export for SEO (`<title>`, `<meta description>`, `hreflang` alternates).
6. Run `pnpm exec tsc --noEmit`.

### `component`

1. Create the component in the most specific location: co-locate with its page or block, not in a generic `components/` folder unless shared across 3+ places.
2. Mark `'use client'` only if the component uses browser APIs, event handlers, or React hooks (`useState`, `useEffect`). Default to Server Component.
3. Accept typed props derived from `src/payload-types.ts` — never use `any`.
4. Run `pnpm exec tsc --noEmit`.

### `seed`

1. Create seed script in `src/seed/` or extend existing `src/endpoints/seed.ts`.
2. Use Payload Local API to create documents (not raw SQL).
3. Guard against duplicate seeding (check if documents already exist before inserting).
4. Document how to run the seed in the task's **Done when** section.

### `migration`

1. Run `pnpm payload migrate:create --name [description]` to generate a migration file.
2. Edit the generated migration in `src/migrations/` if custom SQL is needed.
3. Run `pnpm payload migrate` to apply.
4. Verify with `pnpm exec tsc --noEmit`.

---

## Rules

- **Every task must be self-contained.** A developer should be able to pick up one task file and know exactly what to do.
- **Always include `pnpm generate:types` after any schema change.** Never skip it.
- **Always include `pnpm exec tsc --noEmit` as the final verification step** for any task that creates or modifies TypeScript files.
- **Never write vague steps** like "implement the component" or "add the necessary fields". Be explicit about field names, file paths, and which array/config to modify.
- **Flag open questions.** If a PRD open question blocks a task, mark the task `[BLOCKED: OQ-N]` in the index and add a note at the top of the task file.
- **Tests are welcome but not required.** If a task has an obvious integration test, note it in **Done when** as optional (`[ ] optional`). Do not create tasks solely for test coverage.
- **UI copy** — any string visible to end users must be a Polish-default hardcoded string or a localized CMS field. Never use task names or spec labels as UI copy.

---

## Quality checklist

Before writing files, verify:
- [ ] Every PRD Must-have deliverable maps to at least one task
- [ ] Tasks are ordered so no task depends on a later task
- [ ] Every schema task includes `pnpm generate:types` as a step
- [ ] Every task that touches TypeScript ends with `pnpm exec tsc --noEmit`
- [ ] No task has vague steps — every step names a specific file or command
- [ ] Open questions that block tasks are flagged in both INDEX.md and the task file
- [ ] INDEX.md matches the actual task files (no orphans, no missing entries)
