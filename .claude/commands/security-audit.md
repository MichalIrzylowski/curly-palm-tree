Audit the selected code (or the file currently open) for the three critical Payload CMS security patterns. Check each one and report findings.

## Pattern 1 — Local API Access Control Bypass

Look for any call to `payload.find`, `payload.findByID`, `payload.create`, `payload.update`, `payload.delete`, or `payload.count` that does NOT explicitly set `overrideAccess: false`.

The default is `overrideAccess: true`, which silently bypasses ALL access control even when a `user` is passed. Any server-side code that is supposed to enforce permissions MUST include:

```ts
await req.payload.find({
  collection: 'posts',
  overrideAccess: false,
  user: req.user,
  // ...
})
```

Flag every call missing `overrideAccess: false` as a **critical security issue**.

## Pattern 2 — Transaction Safety in Hooks

Look for any hook (`beforeChange`, `afterChange`, `beforeDelete`, etc.) that performs nested Payload operations (find, create, update, delete) without passing `req` through.

Without `req`, nested operations run outside the current transaction, breaking atomicity. Any failure will leave the database in a partial state.

Correct pattern:
```ts
async beforeChange({ req, data }) {
  await req.payload.update({
    collection: 'related',
    id: data.relatedId,
    data: { status: 'linked' },
    req, // ← must pass req to join the transaction
  })
}
```

Flag any nested operation missing `req` as a **high-severity bug**.

## Pattern 3 — Infinite Hook Loops

Look for hooks that trigger operations on the same collection they belong to (e.g., an `afterChange` hook on `posts` that updates a `posts` document). This causes infinite recursion.

The fix is to guard with `req.context`:

```ts
async afterChange({ req, doc }) {
  if (req.context.isUpdatingRelated) return
  req.context.isUpdatingRelated = true
  await req.payload.update({
    collection: 'posts',
    id: doc.relatedId,
    data: { updatedAt: new Date() },
    req,
  })
}
```

Flag any self-referencing hook without a `req.context` guard as a **high-severity bug**.

---

After checking all three patterns, produce a summary:
- List each violation with file path, line number, and which pattern it breaks
- Rate severity: Critical / High / OK
- Provide the corrected code snippet for each violation
