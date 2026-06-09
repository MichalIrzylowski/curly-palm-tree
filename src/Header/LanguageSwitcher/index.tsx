'use client'

import React, { Fragment, useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { resolveAlternatePath } from '@/i18n/switchLocaleAction'
import type { Locale } from '@/i18n/locales'

/**
 * URL-prefix language switcher (ADR-0001). Switching is a sibling-slug lookup,
 * not a prefix swap (ADR-0003): the target slug is resolved server-side, then
 * next-intl's router applies the destination locale prefix.
 */
export const LanguageSwitcher: React.FC = () => {
  const activeLocale = useLocale() as Locale
  const pathname = usePathname() // locale-stripped, e.g. '/about' or '/'
  const router = useRouter()
  const t = useTranslations('LanguageSwitcher')
  const [isPending, startTransition] = useTransition()

  const currentSlug = pathname === '/' ? 'home' : pathname.replace(/^\//, '')

  const switchTo = (target: Locale) => {
    if (target === activeLocale) return
    startTransition(async () => {
      const targetPath = await resolveAlternatePath(currentSlug, activeLocale, target)
      router.replace(targetPath, { locale: target })
    })
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium" aria-label={t('label')}>
      {routing.locales.map((loc, i) => (
        <Fragment key={loc}>
          {i > 0 && (
            <span className="text-muted-foreground" aria-hidden="true">
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-label={t(loc)}
            aria-current={loc === activeLocale ? 'true' : undefined}
            className={
              loc === activeLocale
                ? 'text-primary font-bold'
                : 'text-muted-foreground hover:text-foreground transition-colors'
            }
          >
            {loc.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
