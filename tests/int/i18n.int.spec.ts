// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { locales, defaultLocale, isValidLocale } from '@/i18n/locales'

describe('locale source of truth', () => {
  it('declares pl and en, with pl as the default', () => {
    expect(locales).toEqual(['pl', 'en'])
    expect(defaultLocale).toBe('pl')
    expect(locales).toContain(defaultLocale)
  })

  it('recognises supported locales and rejects everything else', () => {
    expect(isValidLocale('pl')).toBe(true)
    expect(isValidLocale('en')).toBe(true)
    expect(isValidLocale('de')).toBe(false)
    expect(isValidLocale('')).toBe(false)
    expect(isValidLocale('EN')).toBe(false)
  })
})
