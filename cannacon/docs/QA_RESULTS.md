# QA Results — UX / Conversion v2

**Date:** 2026-09-22

## Passed static/source checks

- Node syntax check: `cannacon.js` passed.
- Node syntax check: `build.mjs` passed.
- Generator completed successfully.
- Generated HTML pages: **18**.
- Broken local references: **0**.
- Duplicate HTML IDs: **0**.
- Pages missing `noindex`: **0**.
- Visitor-facing scaffold/development phrase hits from the defined audit list: **0**.
- Jotform references in generated HTML: **0**.

## Form-size verification

| Form | Required | Optional | Visible lead fields |
|---|---:|---:|---:|
| Exhibitor | 4 | 2 | 6 |
| Sponsor | 4 | 2 | 6 |
| Speaker | 6 | 1 | 7 |
| Hosted Buyer | 7 | 2 | 9 |
| General Contact | 3 | 3 | 6 |

## Layout artifacts

Included under `docs/qa/`:

- `homepage-desktop.png`
- `homepage-mobile.png`
- `exhibitor-form.png`

These are **offline static layout renders**, used to inspect gross layout and content placement. They are not browser-perfect screenshots and are not a substitute for the live acceptance test after deployment.

## Must be tested live after deployment

The local environment could not provide a faithful networked Chromium acceptance run of the v2 package. Verify on `https://www.playatscale.com/cannacon/`:

- 21+ persistence and restricted state;
- privacy preference persistence;
- mobile menu and fixed quick actions;
- remote CannaCon.org photography/video;
- YouTube consent/loading;
- Map Dynamics links;
- email-client fallback behavior and actual inbox receipt;
- no console errors;
- real browser responsive layout;
- keyboard/focus behavior;
- PDF opening behavior.

There is no configured form POST endpoint, payment provider or Constant Contact endpoint to test in this release.

Machine-readable results are in `QA_RESULTS.json`.
