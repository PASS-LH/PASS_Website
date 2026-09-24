# GitHub → Cloudflare deployment

This package is intended to be committed as the repository contents without code editing.

## Repository

1. Extract the package.
2. Copy the contents of `cannacon_v3/` into the CannaCon GitHub repository root, replacing the prior v2 package files.
3. Commit and push.

## Cloudflare Workers build

Connect the GitHub repository to a Cloudflare Worker build, or deploy with Wrangler.

Build command:

```bash
npm install && npm run build
```

Deploy command:

```bash
npx wrangler deploy
```

The Worker serves files from `public/` and handles `/api/*` plus `/sales`.

## Required production secrets

Configure through Cloudflare's secret/environment controls, not in GitHub:

- `STRIPE_RESTRICTED_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SALES_PORTAL_PASSWORD`
- `SALES_PORTAL_SESSION_SECRET`

The shared Sales Team password supplied by management belongs in `SALES_PORTAL_PASSWORD`; it is intentionally not written into this repository.

## Migration variable

During the WordPress transition set:

- `LEGACY_WORDPRESS_ORIGIN` = the direct legacy WordPress application hostname that serves the old site without routing back through `cannacon.org`.

This lets unknown paths and `wp-content` requests fall back to WordPress while the new front-end is live. Remove the variable after the WordPress exit task is completed.

## Optional notification variable

- `INTERNAL_NOTIFICATION_WEBHOOK`

When configured, verified Stripe purchase/payment events are POSTed there for internal routing.

## Tax

`STRIPE_AUTOMATIC_TAX` defaults to `false`. Set it to `true` only after appropriate Stripe Tax registrations and product tax treatment have been confirmed.
