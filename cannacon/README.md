# CannaCon preview v1 - 2026-09-22

Deploy this **cannacon folder** into the existing PASS_Website repository. The package replaces the placeholder CannaCon pages; it does not include or change the Play At Scale root homepage, CNAME, robots.txt, sitemap.xml, CSS or scripts.

## Upload in the GitHub browser

1. Download and extract the ZIP on your computer. Do not upload the ZIP itself.
2. Open `PASS-LH/PASS_Website` on GitHub and go to the repository root (the level containing the Play At Scale `index.html` and `CNAME`).
3. Select **Add file -> Upload files**. Drag the extracted **cannacon folder** onto the upload area. Keep its subfolders.
4. Before committing, check the paths include `cannacon/index.html`, `cannacon/cannacon.css`, `cannacon/MN27/index.html` and `cannacon/assets/decks/cannacon-sales-deck.pdf`.
5. Do not create `cannacon/cannacon/`. Do not upload these HTML files at the repository root.
6. Commit with a message such as `Add CannaCon preview v1 with email-draft inquiries`.
7. Wait for the existing GitHub Pages deployment to finish. No new GitHub Pages setting, DNS change or build workflow is needed for this upload.
8. Open `https://www.playatscale.com/cannacon/`. Use Ctrl+Shift+R if the browser shows the old version.

## What works now

- Eighteen prebuilt HTML pages; all original placeholder filenames remain usable.
- CannaCon branding, pavilions, exhibitor-first navigation and responsive layouts.
- 21+ acknowledgement on every preview page, with an under-21 restricted screen.
- 180-day acknowledgement and privacy preference storage when the browser permits it.
- Regional pre-show / expo schedules and ticket-selection calculators.
- Four native inquiry composers: exhibitor, speaker, sponsor and hosted buyer.
- Three original supplied PDFs, linked to open in a browser tab.
- CannaCon-hosted photography, optional footage, click-to-load YouTube and Map Dynamics links.
- Existing editorial titles and images, linking to the original CannaCon.org articles.
- Newsletter prototype with an explicit non-submission message.
- No Jotform embed, WordPress runtime, database, npm dependencies, tracking tags or payment credentials.

## Important limits

**Inquiry forms DO NOT automatically send email.** They prepare a draft addressed to lucas@cannacon.org. The visitor sends it from an email app. Copy-message and save-as-text fallbacks are included for webmail and long messages. Nothing is sent, stored or confirmed by the website itself. A reliable production submission service still needs to be selected later.

**No ticket checkout is connected.** The displayed prices and calculator are for review. No order, reservation or payment is created. Do not promote these pages as live ticket sales.

**Newsletter signup is not connected to Constant Contact.** No addresses are saved or submitted.

**Vegas exact dates are unresolved.** The supplied buyer guide shows May 14-15, 2027, while the old event website shows May 13-14. The preview says May 2027. The regional three-day schedule and financial-course extras are not automatically applied to Vegas.

**The original PDFs remain unchanged.** They contain earlier branding, date text, market claims and links to the current CannaCon website. They are reference documents, not revised representations of every decision in the preview. Review them before public promotion. An updated deck was not generated in this release.

**Remote images/video depend on CannaCon.org remaining available.** The logos and PDF files are local. Photography and footage currently use the approved live assets. Cache and optimize those media locally before retiring Cloudways. The hero uses a still image until the visitor chooses to play the original footage; automatic playback is disabled until a lightweight clip is available.

**Preview is public, not private.** All HTML pages contain `noindex,nofollow`. This is not authentication. PDFs, JSON and source files are publicly reachable and do not inherit the HTML robots directive. Do not put secrets, attendee data, form entries, confidential sponsorship amounts or unapproved documents here. No preview URL is added to Play At Scale's sitemap. Do not block crawling in robots.txt while relying on the noindex meta tag.

## Routes

| Route within /cannacon/ | Purpose |
|---|---|
| index.html | Main preview homepage |
| events.html | All three CannaCon event destinations |
| MN27/ | St. Paul show information and pass/course calculator |
| VA27/ | Virginia Beach show information and pass/course calculator |
| LV27/ | Las Vegas preview; exact dates/extras held for confirmation |
| attend.html | Attendee and pass overview |
| exhibit.html | Exhibitor overview, decks, email inquiry |
| sponsor.html | Sponsorship overview and email inquiry |
| speak.html | Speaker proposal email inquiry |
| speakers.html | Programming and speaker announcement space |
| hosted-buyers.html | Buyer program and email inquiry |
| education.html | Three financial course sessions and bundle |
| schedule.html | Confirmed regional schedule structure |
| news.html | Four existing CannaCon articles |
| about.html | CannaCon-first positioning and team experience |
| contact.html | Inquiry routing and direct email |
| decks.html | Browser-openable reference PDFs |
| privacy.html | Preview storage and workflow disclosure |

## Editing content

The authoritative editable content is `content/site.json`. Existing/generated HTML serves the complete text without client-side content rendering.

To change dates, ticket prices, article cards, contact email, media or event links:

1. Edit `content/site.json`.
2. Run `node cannacon/build.mjs` from the repository root using Node.js 20 or newer.
3. Upload/commit the changed content file AND regenerated HTML and `runtime-data.js`.

The generated files are already included: Node is NOT required for the initial upload. Editing JSON alone will not rebuild this repository automatically. No GitHub workflow was installed or changed.

`brand.contactEmail` is the single recipient setting for all four inquiry composers. A later move to an info@ address takes one edit plus regeneration. Subject lines are in `forms`; the buyer subject remains exactly `Infused Product Expo | Hosted Buyer Request`.

`cannacon.css` controls presentation; `cannacon.js` controls age/privacy, menus, video, inquiry drafts and ticket calculations. `build.mjs` is the dependency-free template generator.

System font stacks use Segoe UI / Arial / Helvetica with a small Georgia editorial accent. No font files or external font-service calls are shipped.

## Before treating this as production

Resolve the items in `docs/OPEN_DECISIONS.md`, test the deployed site using `docs/LIVE_TEST_CHECKLIST.md`, connect a reliable submission service and hosted checkout, complete the production SEO redirect map, localize approved media and replace preview-only privacy/terms. The reviewed legacy SEO library is not yet migrated into this prototype.
