# Live acceptance check

Run these tests after the GitHub Pages deployment finishes. Do not use real credit cards or private customer data.

## Staging isolation

- Play At Scale home and its original pages still render unchanged.
- `/cannacon/` and `/cannacon/index.html` both open the new homepage.
- No accidental `/cannacon/cannacon/` nesting.
- No CannaCon CSS is applied outside `/cannacon/`.
- View source: `noindex,nofollow` exists on all preview HTML. Production cannacon.org is unchanged.

## Browser / mobile

- New browser/private window shows the 21+ prompt. No keeps the site restricted. Escape cannot dismiss the age question.
- Yes opens the site. Refresh and navigate to MN27; the acknowledgement should persist if storage is allowed.
- Footer 'Reset age acknowledgement' requires acknowledgement again.
- 'Essential only' persists; footer Privacy choices reopens preferences.
- Mobile menu opens, links work, Escape closes it. Test at narrow phone widths.
- Photos display from the approved CannaCon.org URLs. Try Play show footage and the YouTube experience video. Photos/footage were not locally mirrored in this release.

## Inquiry workflows

- Test Exhibitor, Speaker, Sponsor and Hosted Buyers.
- Show and inquiry-type dropdowns work; Other displays its explanation field.
- Missing required fields cannot prepare a draft.
- Preview is addressed to lucas@cannacon.org.
- Buyer subject is exactly `Infused Product Expo | Hosted Buyer Request`.
- Copy message and Save as text preserve all answers.
- Open email draft invokes your configured mail app. For long inquiries the link only prepares the recipient/subject: copy the full message manually, as the page instructs.
- No form success message says an email has already been sent. Only the visitor's email app sends the final message.
- Use a subject/body clearly marked TEST for any actual message and confirm receipt in Lucas's inbox. This cannot be verified by local browser tests.

## Ticket math

- 1-day = $40; select a day.
- 2-day = $80.
- Regional all-access = $100.
- Session 1 = $100, Session 2 = $300, Session 3 = $300.
- Bundle = $500, replacing individual-session selections.
- All-access + bundle = $600.
- 1-day + Session 1 = $140; 1-day + bundle = $540.
- Checkout remains disabled on all pages. Vegas does not imply the unconfirmed pre-show/course extras.

## References / operations

- Open each of the three sales/buyer PDFs in a separate browser tab.
- Verify all three Map Dynamics destinations for the intended show; some systems may need a normal browser/session.
- LinkedIn and YouTube are the only active social accounts displayed.
- No sponsor or partner logo implies an unconfirmed affiliation.
- Newsletter reports that no subscription was created.

## Local test limitations

The build was tested in Chromium using an inlined DOM harness because the runtime browser blocks navigation and external network requests. Tests cover local rendering, selectors, interactive logic and simulated storage state, not real HTTPS cookies, GitHub Pages deployment, live third-party media, mail-client behavior, payment processing, or inbox receipt. No Lighthouse score or full WCAG conformance claim is made.
