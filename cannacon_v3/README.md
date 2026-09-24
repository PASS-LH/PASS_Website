# CannaCon v3 — Commerce-Enabled Static Site

This repository is the complete CannaCon website package. It replaces the prior v2 files and is designed to be copied into the GitHub repository without editing application code.

## What is included

- Static-first public website generated from `content/site.json` and `content/commerce.json`
- Angela feedback: stronger attendee journey, Buy Tickets CTA, Financial Education prominence, agenda/travel utilities, News & Articles naming, Infused Pavilion naming, Instagram/Facebook links
- Stripe ticket checkout for Virginia Beach and St. Paul
- Stripe fixed sponsorship checkout for Virginia Beach and St. Paul
- Universal Jotform sales/invoice workflow
- Universal Jotform attendee registration workflow
- Protected footer-only Sales Team portal for governed booth checkout links
- WCAG-oriented accessibility and accommodations page
- privacy and purchase terms pages
- canonical URLs, sitemap, robots, Organization/Event JSON-LD and security headers
- WordPress-hosted media/editorial dependencies deliberately retained until the follow-up media migration task

## Build

```bash
npm install
npm run build
```

Generated deployable static files are written to `public/`.

## Recommended production deployment

Cloudflare Workers + Static Assets is the primary supported deployment. The Worker serves static files and handles Stripe checkout, Stripe webhooks and the protected sales portal.

Before production deployment, configure these secrets in the hosting provider secret store. Do not put real values in `.env`, GitHub, client JavaScript or committed files.

- `STRIPE_RESTRICTED_KEY` — restricted Stripe key with only the permissions needed for Checkout Sessions, Promotion Codes and session reads
- `STRIPE_WEBHOOK_SECRET` — signing secret for `/api/stripe-webhook`
- `SALES_PORTAL_PASSWORD` — shared sales password supplied by CannaCon management
- `SALES_PORTAL_SESSION_SECRET` — a long random secret used only to sign protected sales sessions
- `INTERNAL_NOTIFICATION_WEBHOOK` — optional internal notification endpoint; see `docs/NOTIFICATION_HANDOFF.md`

`STRIPE_AUTOMATIC_TAX` is currently `false` in `wrangler.toml`. Do not set it to `true` until applicable Stripe Tax registrations and sponsorship tax treatment have been confirmed.

## GitHub

GitHub is the source-control system. Commit the repository contents. The recommended production runtime is Cloudflare Workers rather than GitHub Pages because the secure Stripe/server routes and protected sales portal require server-side execution.

## Existing WordPress contingencies

The new site intentionally continues to reference selected existing `cannacon.org/wp-content/uploads/...` media and existing CannaCon editorial URLs. This allows the current WordPress origin to remain the media/editorial fallback while the public website is refreshed.

Do not shut down WordPress yet. Complete `docs/FOLLOWUP_WORDPRESS_EXIT.md` first.

## Jotform links

- Sales & Invoice Request: https://form.jotform.com/262664752724060
- Attendee Registration: https://form.jotform.com/262665252358059
- Speaker & Education Inquiry: https://form.jotform.com/262643030544046
- Hosted Buyer Request: https://form.jotform.com/262642521146048

## Important launch checks

See `docs/DEPLOYMENT_CHECKLIST.md` and `docs/QA_RESULTS.md` before production cutover.

## Temporary WordPress fallback during migration

The Worker supports `LEGACY_WORDPRESS_ORIGIN`. Set it to the direct legacy WordPress/Cloudways application origin (not `https://cannacon.org`, which would loop). If a path is not present in the new static site, the Worker can proxy that request to the legacy origin. This preserves existing articles, uploaded media and historical URLs during the staged migration.

After the WordPress exit task is complete, remove that deployment variable. No code change is required.
