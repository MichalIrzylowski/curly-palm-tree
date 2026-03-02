Add access control to a Payload CMS collection, global, or field based on the user's description. Use the patterns below.

## Access Control Layers

- **Collection-level**: `create`, `read`, `update`, `delete`, `readVersions` — can return `boolean` OR a `Where` query constraint for row-level security
- **Field-level**: `create`, `read`, `update` — return `boolean` ONLY (no query constraints)
- **Global-level**: `read`, `update` — same as collection

## Common Patterns

```ts
import type { Access } from 'payload'

// Public read
export const anyone: Access = () => true

// Must be logged in
export const authenticated: Access = ({ req }) => Boolean(req.user)

// Admin only
export const adminOnly: Access = ({ req }) =>
  req.user?.role === 'admin'

// Admin or owner (for a collection with a `createdBy` field)
export const adminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (req.user.role === 'admin') return true
  return { createdBy: { equals: req.user.id } }
}

// Published content or logged-in users (blog-style)
export const authenticatedOrPublished: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
```

## Row-Level Security (Query Constraints)

Return a `Where` object to filter which documents are accessible:

```ts
// Users can only see their own org's documents
export const ownOrgOnly: Access = ({ req }) => {
  if (!req.user) return false
  if (req.user.role === 'admin') return true
  return {
    organization: { equals: req.user.organization },
  }
}

// Multi-tenant: super-admin sees all, tenants see their own
export const tenantAccess: Access = ({ req }) => {
  if (!req.user) return false
  if (req.user.isSuperAdmin) return true
  return { tenant: { equals: req.user.tenant } }
}
```

## RBAC Setup

Add a `role` field to the Users collection with `saveToJWT: true` so it's available in `req.user` without extra DB lookups:

```ts
{
  name: 'role',
  type: 'select',
  options: ['admin', 'editor', 'user'],
  defaultValue: 'user',
  saveToJWT: true,
  access: {
    update: ({ req }) => req.user?.role === 'admin',
  },
}
```

## Factory Functions for Reusable Patterns

```ts
// Create role-based access functions dynamically
export const createRoleBasedAccess = (allowedRoles: string[]): Access =>
  ({ req }) => {
    if (!req.user) return false
    return allowedRoles.includes(req.user.role)
  }

// Usage
access: {
  read: createRoleBasedAccess(['admin', 'editor']),
  update: createRoleBasedAccess(['admin']),
}

// Org-scoped access with admin override
export const createOrgScopedAccess = (orgField = 'organization'): Access =>
  ({ req }) => {
    if (!req.user) return false
    if (req.user.role === 'admin') return true
    return { [orgField]: { equals: req.user[orgField] } }
  }
```

## Time-Based Access

```ts
// Scheduled content window
export const withinPublishWindow: Access = ({ req, doc }) => {
  if (req.user?.role === 'admin') return true
  const now = new Date()
  return {
    and: [
      { publishAt: { less_than_equal: now.toISOString() } },
      { unpublishAt: { greater_than: now.toISOString() } },
    ],
  }
}
```

## Critical Notes

1. **Local API bypasses access control by default** — always use `overrideAccess: false` in server-side code that should enforce permissions
2. Field-level access returns `boolean` only — no query constraints
3. Access functions receive `{ req, id, data, doc, siblingData }` — use what you need
4. `req.user` is `null` for unauthenticated requests (check before accessing properties)
5. Default deny: return `false` from access functions when in doubt
6. Add indexes to fields used in `Where` constraints for performance

---

Now implement the access control the user described. Read the relevant collection/global file first, then add the access functions. Ask if the roles, ownership model, or multi-tenancy requirements are unclear.
