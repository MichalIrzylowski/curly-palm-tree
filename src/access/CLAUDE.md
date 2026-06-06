# Access Control

Two built-ins: `anyone.ts` (public) and `authenticated.ts` (logged-in users). `authenticatedOrPublished.ts` grants full access to logged-in users, or restricts to `_status: published` for guests. Custom RBAC is expressed as query constraints returned from access functions (not just booleans).
