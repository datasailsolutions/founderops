import type { SentrySailEvent } from '../lib/event-schema'

export async function postSlackMessage(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL
  if (!url) {
    console.warn('[slack] SLACK_WEBHOOK_URL not set, skipping notification')
    return
  }
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
}

export function formatEventMessage(event: SentrySailEvent): string {
  const icon =
    event.severity === 'critical' ? '🔴' : event.severity === 'warning' ? '🟡' : '🟢'
  const lines = [
    `${icon} *[${event.product}] ${event.event_type}*`,
    `Account: \`${event.account_id}\``,
    `Env: ${event.env} | Severity: ${event.severity}`,
    `Time: ${event.occurred_at}`,
  ]
  if (Object.keys(event.metadata).length > 0) {
    lines.push(`Metadata: \`${JSON.stringify(event.metadata)}\``)
  }
  return lines.join('\n')
}
