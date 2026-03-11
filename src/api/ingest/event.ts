import { Hono } from 'hono'
import { EventSchema } from '../../lib/event-schema'
import { prisma } from '../../db/client'
import { formatEventMessage, postSlackMessage } from '../../slack/notify'

const app = new Hono()

app.post('/', async (c) => {
  // Auth
  const auth = c.req.header('Authorization')
  if (!process.env.INGEST_SECRET || auth !== `Bearer ${process.env.INGEST_SECRET}`) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  // Parse + validate
  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  const result = EventSchema.safeParse(body)
  if (!result.success) {
    return c.json({ error: 'Invalid event schema', issues: result.error.issues }, 400)
  }

  const event = result.data

  // Store in DB — upsert on event_id for idempotency (safe to retry)
  await prisma.event.upsert({
    where: { event_id: event.event_id },
    create: {
      event_id: event.event_id,
      product: event.product,
      env: event.env,
      account_id: event.account_id,
      event_type: event.event_type,
      severity: event.severity,
      occurred_at: new Date(event.occurred_at),
      metadata: event.metadata as object,
    },
    update: {}, // already stored — no-op
  })

  // Notify Slack
  await postSlackMessage(formatEventMessage(event))

  return c.json({ ok: true }, 201)
})

export default app
