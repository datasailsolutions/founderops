import { z } from 'zod'

export const EventSchema = z.object({
  event_id: z.string().uuid(),
  product: z.literal('sentrysail'),
  env: z.enum(['dev', 'staging', 'prod']),
  account_id: z.string(),
  event_type: z.enum([
    'review.new_detected',
    'draft.generated',
    'approval.pending_48h',
    'review.posted',
    'oauth.failed',
    'job.failed',
    'trial.started',
    'trial.expiring',
    'payment.failed',
    'subscription.cancelled',
  ]),
  severity: z.enum(['info', 'warning', 'critical']),
  occurred_at: z.string().datetime(),
  metadata: z.record(z.string(), z.unknown()),
})

export type SentrySailEvent = z.infer<typeof EventSchema>
