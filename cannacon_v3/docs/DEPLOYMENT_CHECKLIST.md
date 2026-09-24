# Deployment checklist

## Before pushing to production

- Run `npm install` and `npm run build`.
- Configure Stripe restricted key and webhook secret in the deployment secret store.
- Configure Sales Team password and a unique session-signing secret in the deployment secret store.
- Keep `STRIPE_AUTOMATIC_TAX=false` until Stripe Tax registrations and product tax treatment are confirmed.
- In Stripe, add webhook destination: `/api/stripe-webhook`.
- Verify Jotform Sales & Invoice Request routing for Joe, Sean, LaShonda, Angela and Unassigned.
- Verify Jotform Attendee Registration routing and the Complete Later path.
- Confirm official hotel-block URLs before adding them; the current site intentionally says they are coming when confirmed.
- Keep Las Vegas ticket purchasing disabled until the Stripe products and dates are finalized.
- Confirm commercial refund/transfer terms and replace the general purchase-terms language if a more specific policy is adopted.
- Perform keyboard-only, screen-reader, 200%/400% zoom and 320px reflow testing.
- Verify analytics/Search Console tags if they are injected by the production host.

## Smoke tests

1. Homepage: Buy Tickets and Exhibit are both immediately available.
2. Mobile: fixed Tickets / Exhibit actions do not cover focused content.
3. Virginia Beach and St. Paul: floor plan, agenda and travel links work.
4. Ticket cart: Day 1, Day 2, Multi-Day and Financial Program line items calculate correctly.
5. Ticket promo codes: EXHIBITOR, BUYER, EARLY50 validation works as intended.
6. Sponsor page: fixed packages create Stripe Checkout sessions.
7. Sales portal: wrong password denied; correct password grants a session; session expires.
8. Sales portal: LOYALTY1K works; BUNDLE10 rejects same-show-only cart; custom discount requires reason and notes for Other.
9. Order completion: successful Stripe session shows order ID and registration link.
10. Jotform: sales/invoice and attendee-registration forms open correctly.
11. No Stripe secrets or sales password appear in `public/`, JavaScript or Git history.
