'use server'

import { getPageAlternates } from '@/loaders/getPageAlternates'
import type { Locale } from './locales'

/**
 * Resolves the locale-stripped path of the current page in another locale via
 * its sibling slug (see docs/adr/0003-cms-content-localization-model.md).
 * Returns '/' when there is no sibling (e.g. the home page, or an untranslated
 * target where the slug falls back).
 */
export async function resolveAlternatePath(
  currentSlug: string,
  fromLocale: Locale,
  toLocale: Locale,
): Promise<string> {
  const alternates = await getPageAlternates(currentSlug, fromLocale)
  const targetSlug = alternates[toLocale]

  if (!targetSlug || targetSlug === 'home') return '/'
  return `/${targetSlug}`
}
