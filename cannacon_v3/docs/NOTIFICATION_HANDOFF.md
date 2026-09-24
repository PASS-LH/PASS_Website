# Internal purchase / issue notifications

The Stripe webhook endpoint is implemented at `/api/stripe-webhook` and validates Stripe signatures before processing events.

It recognizes:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `checkout.session.expired`
- `charge.refunded`

When `INTERNAL_NOTIFICATION_WEBHOOK` is configured, the Worker sends a concise JSON event containing the CannaCon order reference, salesperson, order type, event codes, amount/status, Stripe object ID and purchaser email when Stripe supplies it.

## Routing policy to implement at the notification destination

- Booth purchase / sponsorship purchase: associated salesperson + Angela + Lucas + Bob.
- Unassigned sales: Joe + Angela + Lucas + Bob.
- Ticket/registration operational issues: Angela + associated salesperson where relevant.
- Routine small ticket sales do not need executive email unless management chooses to enable them.
- Payment failure/expired sales-assisted checkout: associated salesperson + Angela; executive recipients can be included for booth/sponsorship orders.

## Why the destination is configuration rather than hard-coded email

No outbound transactional email provider has been authorized for this website runtime. The webhook is therefore implemented and ready, but the delivery endpoint remains a deployment secret/configuration rather than introducing a new vendor without approval. This can point to a future Jotform automation endpoint, an approved email service, or another internal workflow endpoint without changing website code.
