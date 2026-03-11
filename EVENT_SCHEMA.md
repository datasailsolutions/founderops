# SentrySail Event Schema

All events emitted by SentrySail to FounderOps follow this structure.

## Schema

```json
{
  "event_id":   "uuid-v4",
  "product":    "sentrysail",
  "env":        "dev | staging | prod",
  "account_id": "string",
  "event_type": "see EventType below",
  "severity":   "info | warning | critical",
  "occurred_at": "ISO 8601 datetime",
  "metadata":   {}
}
```

## Event Types

| event_type              | severity  | description                              |
|-------------------------|-----------|------------------------------------------|
| review.new_detected     | info      | New Google review found in polling cycle |
| draft.generated         | info      | LLM draft successfully created           |
| approval.pending_48h    | warning   | Draft awaiting approval > 48 hours       |
| review.posted           | info      | Response posted to Google                |
| oauth.failed            | critical  | Google OAuth token expired or revoked    |
| job.failed              | critical  | Background job failed after retries      |
| trial.started           | info      | New trial account created                |
| trial.expiring          | warning   | Trial ending within 3 days              |
| payment.failed          | critical  | Stripe invoice payment failed            |
| subscription.cancelled  | warning   | Customer cancelled subscription          |

## Authentication

All requests to `/ingest/event` must include:

```
Authorization: Bearer <INGEST_SECRET>
```

The secret must match in both `sentrysail` and `founderops` environments.

## Example Payload

```json
{
  "event_id": "550e8400-e29b-41d4-a716-446655440000",
  "product": "sentrysail",
  "env": "staging",
  "account_id": "acc_abc123",
  "event_type": "review.new_detected",
  "severity": "info",
  "occurred_at": "2026-03-11T03:00:00.000Z",
  "metadata": {
    "review_id": "rev_xyz789",
    "rating": 2,
    "author": "John D."
  }
}
```
