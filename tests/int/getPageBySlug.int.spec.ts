// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'

// next/headers has no request scope inside a test — mock the boundary.
vi.mock('next/headers', () => ({
  draftMode: async () => ({ isEnabled: true }),
}))

import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'
import { getPageBySlug } from '@/loaders/getPageBySlug'
import { getPageAlternates } from '@/loaders/getPageAlternates'

const PL_SLUG = 'tdd-locale-scope-pl'
const EN_SLUG = 'tdd-locale-scope-en'

let payload: Payload
let pageId: string | number

describe('getPageBySlug locale scoping', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
    const created = await payload.create({
      collection: 'pages',
      locale: 'pl',
      context: { disableRevalidate: true },
      data: {
        title: 'Strona testowa',
        slug: PL_SLUG,
        _status: 'published',
        layout: [{ blockType: 'quickInfoBlock' }],
      },
    })
    pageId = created.id
    await payload.update({
      collection: 'pages',
      id: pageId,
      locale: 'en',
      context: { disableRevalidate: true },
      data: { title: 'Test page', slug: EN_SLUG, _status: 'published' },
    })
  }, 30_000)

  afterAll(async () => {
    if (pageId) {
      await payload.delete({
        collection: 'pages',
        id: pageId,
        context: { disableRevalidate: true },
      })
    }
  })

  it('resolves the English slug under the en locale', async () => {
    const page = await getPageBySlug(EN_SLUG, 'en')
    expect(page?.id).toBe(pageId)
  })

  it('does not resolve the English slug under the pl locale', async () => {
    const page = await getPageBySlug(EN_SLUG, 'pl')
    expect(page).toBeNull()
  })

  it('resolves the Polish slug under the pl locale', async () => {
    const page = await getPageBySlug(PL_SLUG, 'pl')
    expect(page?.id).toBe(pageId)
  })

  it('returns the sibling slug for every locale given the current slug', async () => {
    const alternates = await getPageAlternates(EN_SLUG, 'en')
    expect(alternates).toEqual({ pl: PL_SLUG, en: EN_SLUG })
  })
})
