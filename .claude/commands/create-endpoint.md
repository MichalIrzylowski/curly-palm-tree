Create a custom Payload CMS REST endpoint based on the user's description. Follow all patterns below exactly.

## Critical: Endpoints Are NOT Authenticated by Default

You MUST manually check `req.user` at the top of every endpoint handler that requires authentication. There is no automatic auth middleware.

```ts
// WRONG — no auth check
handler: async (req) => {
  const data = await req.json()
  // ...
}

// CORRECT
handler: async (req) => {
  if (!req.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ...
}
```

## Endpoint Structure

```ts
import type { Endpoint } from 'payload'
import { APIError } from 'payload'
import { addDataAndFileToRequest } from '@payloadcms/next/utilities'
import { headersWithCors } from '@payloadcms/next/utilities'

const myEndpoint: Endpoint = {
  path: '/my-route',          // relative to collection/global base path
  method: 'post',             // get | post | put | patch | delete
  handler: async (req) => {
    // 1. Auth check (if required)
    if (!req.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse body (POST/PUT/PATCH only)
    await addDataAndFileToRequest(req)
    const { name, value } = req.data as { name: string; value: string }

    // 3. Parse query params
    const url = new URL(req.url)
    const page = url.searchParams.get('page') ?? '1'

    // 4. Path params
    const id = req.routeParams?.id as string

    // 5. Business logic using req.payload (joins the transaction)
    try {
      const result = await req.payload.create({
        collection: 'my-collection',
        data: { name, value },
        user: req.user,
        overrideAccess: false, // enforce access control
        req,
      })

      return Response.json({ doc: result }, { status: 201 })
    } catch (err) {
      throw new APIError('Something went wrong', 500)
    }
  },
}
```

## Where to Mount Endpoints

- **Collection endpoint** — add to `endpoints` array in collection config; path is relative to `/api/<collection-slug>`
- **Global endpoint** — add to `endpoints` array in global config; path is relative to `/api/globals/<global-slug>`
- **Root endpoint** — add to `endpoints` array in `payload.config.ts`; path is relative to `/api`

## Key Rules

1. Always check `req.user` before any auth-required logic
2. Use `addDataAndFileToRequest(req)` to parse body — never `req.json()` directly for multipart
3. Use `req.payload` (not imported `payload`) so operations join the current transaction
4. Pass `overrideAccess: false` + `user: req.user` when enforcing access control
5. Use `headersWithCors(headers, req)` if the endpoint needs CORS support
6. Throw `APIError` for structured error responses
7. Access path params via `req.routeParams?.paramName`

---

Now create the endpoint the user described. Ask for clarification if the route, method, auth requirement, or body shape is unclear.
