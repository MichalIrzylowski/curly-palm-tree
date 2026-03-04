'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const LOCALE_COOKIE = 'payload-locale'
const LOCALE_RE = new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`)

function getLocale(): string {
  if (typeof document === 'undefined') return 'pl'
  const match = document.cookie.match(LOCALE_RE)
  return match ? decodeURIComponent(match[1]) : 'pl'
}

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter()
  const [locale, setLocale] = useState<string>('pl')

  useEffect(() => {
    setLocale(getLocale())
  }, [])

  const switchLocale = (newLocale: string) => {
    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=31536000`
    setLocale(newLocale)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium" aria-label="Language switcher">
      <button
        onClick={() => switchLocale('pl')}
        className={
          locale === 'pl'
            ? 'text-primary font-bold'
            : 'text-muted-foreground hover:text-foreground transition-colors'
        }
        aria-label="Polski"
      >
        PL
      </button>
      <span className="text-muted-foreground" aria-hidden="true">
        |
      </span>
      <button
        onClick={() => switchLocale('en')}
        className={
          locale === 'en'
            ? 'text-primary font-bold'
            : 'text-muted-foreground hover:text-foreground transition-colors'
        }
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
