// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'

vi.mock('next/headers', () => ({
  draftMode: async () => ({ isEnabled: true }),
}))

import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'

let payload: Payload
let pageId: string | number

describe('slug generation from a Polish title', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
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

  it('generates an ASCII slug that preserves Polish letters as their base form', async () => {
    const created = await payload.create({
      collection: 'pages',
      locale: 'pl',
      draft: true,
      context: { disableRevalidate: true },
      data: {
        title: 'Łódź',
        layout: [{ blockType: 'quickInfoBlock' }],
      },
    })
    pageId = created.id

    expect(created.slug).toBe('lodz')
  })
})
