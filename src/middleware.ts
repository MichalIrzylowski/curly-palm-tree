import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Run on frontend pages only. Exclude the Payload admin (`/admin`) and APIs
  // (`/api`), Next internals, the frontend utility routes (`/next/*`), and any
  // file with an extension (sitemaps, assets, etc.).
  matcher: ['/((?!api|admin|next|_next|_vercel|.*\\..*).*)'],
}
