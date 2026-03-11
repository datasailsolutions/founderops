import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import ingestEvent from './api/ingest/event'
import health from './api/health'

const app = new Hono()

app.route('/health', health)
app.route('/ingest/event', ingestEvent)

const port = parseInt(process.env.PORT ?? '3001')
console.log(`FounderOps server running on port ${port}`)

serve({ fetch: app.fetch, port })
