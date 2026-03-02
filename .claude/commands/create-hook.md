Create a Payload CMS collection or field hook based on the user's description. Follow all patterns and best practices below.

## Hook Types & When to Use Them

| Hook | When it runs | Common use |
|---|---|---|
| `beforeValidate` | Before validation | Normalize/format data |
| `beforeChange` | After validation, before save | Business logic, set computed fields |
| `afterChange` | After save | Side effects (email, revalidation, sync) |
| `afterRead` | After reading from DB | Add virtual/computed fields |
| `beforeDelete` | Before deletion | Cascading deletes, guards |

## Correct Patterns

### Always pass `req` to nested operations (transaction safety)

```ts
// WRONG — breaks transaction atomicity
async afterChange({ doc, req }) {
  await req.payload.update({
    collection: 'related',
    id: doc.relatedId,
    data: { status: 'linked' },
    // req missing!
  })
}

// CORRECT
async afterChange({ doc, req }) {
  await req.payload.update({
    collection: 'related',
    id: doc.relatedId,
    data: { status: 'linked' },
    req, // joins the transaction
  })
}
```

### Prevent infinite hook loops with `req.context`

When a hook on collection A triggers an operation on collection A (self-referencing), use a context flag:

```ts
async afterChange({ doc, req, operation }) {
  if (req.context.updatingRelated) return // prevent loop
  req.context.updatingRelated = true

  await req.payload.update({
    collection: 'posts',
    id: doc.relatedPost,
    data: { lastLinkedAt: new Date().toISOString() },
    req,
  })
}
```

### Share data between hooks using `req.context`

```ts
// beforeChange: compute something expensive once
async beforeChange({ data, req }) {
  req.context.computedSlug = generateSlug(data.title)
  return data
}

// afterChange: use what was computed
async afterChange({ doc, req }) {
  console.log('Saved with slug:', req.context.computedSlug)
}
```

### Next.js cache revalidation pattern

```ts
import { revalidatePath } from 'next/cache'

async afterChange({ doc, req, collection }) {
  if (req.context.disableRevalidate) return
  revalidatePath(`/${collection.slug}/${doc.slug}`)
  revalidatePath(`/${collection.slug}`)
}
```

### Auto-set a field on create

```ts
// In fields array, on a date field
hooks: {
  beforeChange: [
    ({ value, operation }) =>
      operation === 'create' ? new Date().toISOString() : value,
  ],
}
```

### Auto-generate slug from title

```ts
hooks: {
  beforeValidate: [
    ({ data, value }) =>
      value || data?.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  ],
}
```

### Cascading delete

```ts
async beforeDelete({ id, req }) {
  // Find and delete all related documents
  const related = await req.payload.find({
    collection: 'comments',
    where: { post: { equals: id } },
    req,
  })
  await Promise.all(
    related.docs.map((comment) =>
      req.payload.delete({ collection: 'comments', id: comment.id, req }),
    ),
  )
}
```

## Key Rules

1. Always pass `req` to every nested `req.payload.*` call
2. Use `req.context` flags to prevent infinite loops (not a module-level variable)
3. Use `beforeValidate` for formatting, `beforeChange` for logic, `afterChange` for side effects
4. `afterChange` receives the final saved `doc`; `beforeChange` receives `data` (pre-save)
5. Return `data` from `beforeValidate`/`beforeChange` if you modify it; field hooks return the new value
6. `afterRead` hooks should be pure — no DB writes
7. Check `operation` (`'create'` | `'update'`) when behavior differs

---

Now implement the hook the user described. Read the relevant collection file first. Ask if the trigger condition, data shape, or side effects are unclear.
