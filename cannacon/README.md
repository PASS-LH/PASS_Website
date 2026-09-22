# CannaCon UX / Conversion deployment package v2

**Build date:** 2026-09-22  
**Scope:** `cannacon/` only

This package upgrades the working CannaCon test site under `https://www.playatscale.com/cannacon/`. It does **not** contain or modify the Play At Scale root homepage, `CNAME`, root CSS/JS, DNS or GitHub Pages configuration.

## Primary changes in v2

- Removed visitor-facing preview/prototype/development language.
- Simplified primary navigation and made **Exhibit** the dominant commercial CTA.
- Added faster direct Contact access.
- Reduced first-touch form friction:
  - Exhibitor: 6 fields / 4 required
  - Sponsor: 6 / 4
  - Speaker: 7 / 6
  - Hosted Buyer: 9 / 7
  - General Contact: 6 / 3
- Added event preselection from show-specific links.
- Reframed speaker/programming pages to be useful before a confirmed speaker roster exists.
- Hidden empty sponsor/partner/social placeholders instead of explaining missing content.
- Reframed Stories as a normal CannaCon editorial destination.
- Replaced checkout-like interaction with clear pass/pricing information until a payment provider exists.
- Added a mobile Shows / Exhibit quick-action bar.
- Added future analytics hooks (`data-track`) without installing a tracking provider.
- Added UX audit, conversion-path, form-simplification and QA documentation.

## Deployment

1. Download and extract the ZIP.
2. In `PASS-LH/PASS_Website`, upload the extracted **`cannacon` folder** at the repository root.
3. Preserve all subfolders.
4. Confirm paths such as:

   ```text
   cannacon/index.html
   cannacon/cannacon.css
   cannacon/cannacon.js
   cannacon/content/site.json
   cannacon/MN27/index.html
   cannacon/VA27/index.html
   cannacon/LV27/index.html
   cannacon/docs/UX_AUDIT.md
   ```

5. Do **not** create `cannacon/cannacon/`.
6. Do **not** replace the Play At Scale root `index.html`.
7. Commit and allow the existing GitHub Pages deployment to complete.
8. Review `https://www.playatscale.com/cannacon/` in a private/incognito browser and follow `docs/LIVE_TEST_CHECKLIST.md`.

## Site architecture

| Route | Purpose |
|---|---|
| `/cannacon/` | Main CannaCon homepage |
| `/cannacon/events.html` | 2027 show portfolio |
| `/cannacon/VA27/` | Virginia Beach |
| `/cannacon/LV27/` | Las Vegas |
| `/cannacon/MN27/` | St. Paul |
| `/cannacon/attend.html` | Pass and attendance information |
| `/cannacon/exhibit.html` | Exhibitor value + sales inquiry |
| `/cannacon/sponsor.html` | Sponsor inquiry |
| `/cannacon/speak.html` | Speaker/programming inquiry |
| `/cannacon/speakers.html` | Programming areas |
| `/cannacon/hosted-buyers.html` | Hosted Buyer program/request |
| `/cannacon/education.html` | Financial education program/pricing |
| `/cannacon/schedule.html` | Regional schedule structure |
| `/cannacon/news.html` | Existing CannaCon editorial stories |
| `/cannacon/about.html` | Brand/team positioning |
| `/cannacon/contact.html` | Universal inquiry |
| `/cannacon/decks.html` | Sales/buyer PDFs |
| `/cannacon/privacy.html` | Privacy/storage information |

## Authoritative editable data

`content/site.json` is the main structured content/configuration source.

To change centrally managed dates, event URLs, prices, form recipient/subjects, articles or media:

1. Edit `content/site.json`.
2. From inside `cannacon/`, run:

   ```bash
   node build.mjs
   ```

3. Commit the changed JSON, regenerated HTML and `runtime-data.js`.

No npm install is required. The generator uses Node.js standard libraries only.

## Current form behavior

The forms are intentionally lightweight. The code supports a future POST endpoint, but no server-side endpoint is configured in this release.

Until one is configured:

- submitting opens the visitor's email application addressed to `lucas@cannacon.org`;
- the form data is composed into the message;
- copy/save fallbacks are available if an email application does not open;
- the site does not claim an email was delivered when it was not.

The next infrastructure improvement should be a Catalyst-controlled serverless form endpoint.

## Current pass behavior

Approved regional prices are displayed:

- 1 day: $40
- 2 days: $80
- all-access regional pass: $100
- financial course Session 1: $100
- Session 2: $300
- Session 3: $300
- all-three bundle: $500

No payment processor is configured. The site presents options/pricing without fabricating a completed checkout.

## Staging SEO safety

All 18 HTML pages contain:

```html
<meta name="robots" content="noindex,nofollow,noarchive">
```

Do not remove this while the test site lives under `playatscale.com/cannacon/`.

## Key documentation

- `docs/UX_AUDIT.md`
- `docs/UX_CONVERSION_PATHS.md`
- `docs/FORM_SIMPLIFICATION.md`
- `docs/LIVE_TEST_CHECKLIST.md`
- `docs/OPEN_DECISIONS.md`
- `docs/QA_RESULTS.md`
- `docs/QA_RESULTS.json`
- `docs/SOURCES.md`

## Remaining production dependencies

Before final `cannacon.org` cutover:

- configure real form POST/email delivery;
- connect registration/payment provider;
- connect Constant Contact if newsletter signup is shown;
- resolve exact Las Vegas dates/hours;
- localize approved remote CannaCon images/video;
- complete the SEO redirect deployment map;
- move from staging `noindex` rules to production SEO metadata only at cutover.
