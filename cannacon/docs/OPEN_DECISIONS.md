# Open decisions / production dependencies

## Confirmed schedule already applied

### Virginia Beach
- March 17, 2027: financial education + pre-show/exhibitor networking.
- March 18: 9 AM–6 PM.
- March 19: 10 AM–3 PM.
- Virginia Beach Convention Center.

### St. Paul
- July 15, 2027: financial education + pre-show/exhibitor networking.
- July 16: 9 AM–6 PM.
- July 17: 10 AM–3 PM.
- Saint Paul RiverCentre.

### Las Vegas
- May 2027.
- Las Vegas Convention Center.
- Exact dates/hours remain unresolved because supplied/current sources conflict.
- Regional pre-day/education structure is not assumed for Vegas.

## Pass / education specification already applied

Regional show admission:
- 1 day: $40
- 2 days: $80
- all-access: $100, including the two expo days and approved pre-show networking

Financial education:
- Session 1: $100
- Session 2: $300
- Session 3: $300
- all-three bundle: $500

Still confirm before live checkout:
- whether financial-course purchases include any expo/networking entitlement;
- taxes/fees;
- refund/transfer policy;
- capacity controls;
- badge/receipt workflow;
- actual payment/registration provider and SKU URLs.

## Form backend

A true server-side form endpoint is not yet configured. Current forms open a prepared email to `lucas@cannacon.org` and provide copy/save fallback.

Recommended next step: a Catalyst-controlled serverless endpoint (Cloudflare Worker or equivalent) providing validation, spam protection, email delivery, rate limiting and deterministic success/failure responses. The front-end already has an endpoint adapter so this should not require a redesign.

## Newsletter

Constant Contact is the current newsletter platform, but no approved production signup endpoint/embedded form has been provided. The public signup module is intentionally suppressed rather than presenting a form that does not subscribe anyone.

## Speakers / sponsors / partners

- No unapproved speaker names are displayed.
- No sponsor/partner logos are displayed until confirmed.
- Ganjapreneur is not represented as a current partner.
- The speaker/programming page uses real program areas instead of placeholder profiles.

## Media custody

Approved photos/video are still loaded from legacy `cannacon.org` URLs. Before terminating the current hosting:

1. obtain original media/archive where possible;
2. copy required production media to Catalyst-owned storage;
3. optimize responsive formats;
4. update `content/site.json` URLs;
5. retest page speed and fallbacks.

## SEO migration

This staging package is still `noindex` and contains the current operating/UX site, not the complete legacy SEO corpus.

Before production cutover:
- apply the final KEEP / REWRITE / 301 / 410 migration specification;
- implement existing valuable redirect chains at the new edge/site layer;
- migrate high-value editorial assets;
- generate production sitemap/canonicals/schema;
- remove staging noindex only on the final CannaCon.org production deployment.

## Sales materials

The supplied PDFs remain source/reference documents and are linked unchanged. They may contain date/market language that predates later decisions. Event pages and direct approved CannaCon inputs govern current website facts. Consider issuing updated decks before broad public promotion.
