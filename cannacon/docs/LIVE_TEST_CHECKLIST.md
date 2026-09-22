# Live acceptance checklist

Run after the GitHub Pages deployment finishes. Use test data only.

## 1. Deployment isolation

- Play At Scale homepage and original pages remain unchanged.
- `/cannacon/` and `/cannacon/index.html` render the same CannaCon homepage.
- No accidental `/cannacon/cannacon/` nesting.
- CannaCon CSS does not affect Play At Scale pages.
- View source on several CannaCon pages and confirm `noindex,nofollow,noarchive` remains present.

## 2. First-visit / privacy

- Private/incognito browser shows the 21+ question.
- `Yes` enters the site.
- Refresh and navigate to another CannaCon page; acknowledgement should persist where browser storage is enabled.
- `No` shows the restricted state.
- Keyboard focus remains within the age dialog until a choice is made.
- Privacy choices remain available from the footer.
- Essential-only preference persists.
- External YouTube content does not load until the visitor chooses/permits it.

## 3. Global navigation

Desktop:
- Shows, Experience, Attend, Stories, About, Contact all resolve.
- Exhibit CTA resolves to the exhibitor journey.

Mobile:
- Menu opens/closes and can be dismissed with Escape.
- Fixed `Shows` and `Exhibit` actions do not cover essential content.
- Test at 320, 375, 430 and 768 px widths.

## 4. Conversion paths

Verify from the live homepage:

- Exhibit -> inquiry in one click.
- See 2027 Shows -> show portfolio in one click.
- Each home show card reaches its event in one click.
- Each available Floor Plan action opens the correct Map Dynamics show in a new tab.
- Contact is one click from primary navigation.

From each event page:

- Exhibit reaches the exhibitor inquiry.
- Event-specific inquiry links preselect the correct show where implemented.
- Floor Plan opens correct destination.
- Pass/pricing information is clear without implying that payment has occurred.

## 5. Forms

### Exhibitor
Required: Full name / Business email / Company / Show.  
Optional: Phone / single context message.

### Sponsor
Required: Full name / Business email / Company / Show.  
Optional: Phone / single context message.

### Speaker
Required: Full name / Email / Organization / Show / Topic-title / Session description.  
Optional: Website/LinkedIn/past presentation URL.

### Hosted Buyer
Required: Full name / Business email / Company / Job title / Show / Buyer type / Category interest.  
Optional: Phone / sourcing note.

### Contact
Required: Name / Email / Inquiry type.  
Optional: Company / Show / Message.

For each form:

- Required-field validation works.
- Browser autofill works sensibly.
- `?show=VA27`, `?show=MN27`, `?show=LV27` preselects the show.
- Current fallback opens a message to `lucas@cannacon.org`.
- Buyer subject is exactly `Infused Product Expo | Hosted Buyer Request`.
- If an email app does not open, Copy/Save fallback preserves all entered fields.
- No success message claims a message was delivered unless a future POST endpoint actually returns success.

## 6. Show facts

### Virginia Beach
- March 17: financial education + pre-show/exhibitor networking.
- March 18: 9 AM–6 PM.
- March 19: 10 AM–3 PM.
- Virginia Beach Convention Center.

### St. Paul
- July 15: financial education + pre-show/exhibitor networking.
- July 16: 9 AM–6 PM.
- July 17: 10 AM–3 PM.
- Saint Paul RiverCentre.

### Las Vegas
- Must display only approved `May 2027` / Las Vegas Convention Center facts until dates are reconciled.
- Must not imply the regional pre-day structure.

## 7. Pass information

Regional pricing should show:

- 1-day: $40
- 2-day: $80
- All-access: $100
- Financial Session 1: $100
- Session 2: $300
- Session 3: $300
- All three: $500

No button or status should imply that payment/registration completed if no provider is connected.

## 8. Sales materials

Open in a new browser tab:

- CannaCon exhibitor sales deck
- Las Vegas / Infused sales deck
- Hosted Buyer guide

Confirm the browser displays each PDF successfully.

## 9. Media / external systems

- Approved remote show-floor photography loads.
- Hero/show footage action works.
- YouTube loads only after chosen.
- Map Dynamics routes resolve to the intended show.
- LinkedIn opens current CannaCon company page.
- YouTube opens current CannaCon channel.

## 10. Visitor-facing cleanup

Search pages visually for any accidental language such as:

- Website Preview
- Development preview
- Prototype
- Checkout not connected
- Placeholder
- Programming in development
- More social channels coming soon

None should appear in visitor-facing UI.

## 11. Final live checks

- No browser console errors attributable to CannaCon code.
- No broken local images/assets.
- No horizontal scroll at target breakpoints.
- Keyboard tab order is sensible.
- Visible focus states exist.
- Forms work without a mouse.
- Remote media failure leaves readable content/brand treatment.

## Local QA limitation

The packaged QA includes static/source integrity tests and offline layout renders. The execution environment could not perform a faithful networked Chromium acceptance pass against the not-yet-deployed v2 package. This checklist is therefore mandatory after GitHub deployment.
