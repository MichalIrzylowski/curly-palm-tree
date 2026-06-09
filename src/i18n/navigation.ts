import { createNavigation } from 'next-intl/navigation'

import { routing } from './routing'

/**
 * Locale-aware navigation APIs. Always use these instead of `next/link` /
 * `next/navigation` on the frontend so the active locale prefix is preserved.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
