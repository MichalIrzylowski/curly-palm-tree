import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 300

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  const encoder = new TextEncoder()
  const stream = new TransformStream<Uint8Array, Uint8Array>()
  const writer = stream.writable.getWriter()

  const write = (msg: string) => writer.write(encoder.encode(`${msg}\n`))

  // Run seed in background, streaming progress to the client
  seed({
    payload,
    req: await createLocalReq({ user }, payload),
    onProgress: write,
  })
    .then(() => writer.close())
    .catch(async (e) => {
      payload.logger.error({ err: e, message: 'Error seeding data' })
      await write(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`)
      await writer.close()
    })

  return new Response(stream.readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
