// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { slugify } from '@/utilities/slugify'

describe('slugify (Polish-aware)', () => {
  it('transliterates Polish diacritics to ASCII', () => {
    expect(slugify('Usługi')).toBe('uslugi')
    expect(slugify('Łódź')).toBe('lodz')
    expect(slugify('Zażółć gęślą jaźń')).toBe('zazolc-gesla-jazn')
  })

  it('lowercases, trims, and hyphenates whitespace', () => {
    expect(slugify('O nas')).toBe('o-nas')
    expect(slugify('  Strona   główna  ')).toBe('strona-glowna')
  })

  it('drops punctuation and collapses repeated separators', () => {
    expect(slugify('Usługi i ceny!')).toBe('uslugi-i-ceny')
    expect(slugify('a -- b')).toBe('a-b')
  })

  it('returns an empty string for empty input', () => {
    expect(slugify('')).toBe('')
  })
})
