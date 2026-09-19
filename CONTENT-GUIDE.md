# Play At Scale Content Guide

This site is intentionally built so the public pages can stay stable while changing content is managed through `site-data.js` and the `assets/` folders.

## The one file to edit most often

Open `site-data.js` for:

- CannaCon program URL
- scheduling URL
- payment links
- webcast registration links
- Vimeo video IDs
- downloadable slide decks
- downloadable framework files
- event/classroom photos
- testimonials and testimonial photos

Most future updates should not require editing the HTML pages.

## Future payment support

GitHub Pages is a static host. Do not put credit card forms or secret payment keys directly into this repository.

Recommended approach:

1. Create a hosted checkout link with Stripe Payment Links, Square, Eventbrite, CannaCon, or another trusted provider.
2. Copy the public checkout URL.
3. Paste it into the matching `paymentUrl` field in `site-data.js`.
4. Commit the change.

The education-page buttons will automatically switch from `Program / Registration Info` to `Pay & Register` when a payment URL exists.

## Zoom or Google webcast registration

For a live webcast:

1. Create the Zoom Webinar registration page, Google Calendar event/appointment page, or other registration page.
2. In `site-data.js`, find the `webcasts` section.
3. Fill in the title, date, platform, description, registration URL, and optional payment URL.
4. Change `enabled: false` to `enabled: true`.

The webcast will then appear automatically on `resources.html`.

## Vimeo on-demand video

1. Upload the recording to Vimeo.
2. Copy the numeric Vimeo video ID.
3. If Vimeo gives you a privacy hash, copy that too.
4. In `site-data.js`, find `onDemandVideos`.
5. Add the Vimeo ID and optional hash.
6. Set `enabled: true`.

The video will appear automatically on `resources.html` in a responsive embed.

## Slides and downloadable files

Suggested file locations:

- `assets/slides/level-1-business-finance-foundations.pdf`
- `assets/slides/level-2-financial-management-analytics.pdf`
- `assets/slides/level-3-capital-strategic-finance.pdf`
- `assets/frameworks/cash-flow-forecasting-model.xlsx`
- `assets/frameworks/unit-economics-pricing-calculator.xlsx`
- `assets/frameworks/kpi-dashboard-template.xlsx`
- `assets/frameworks/scenario-planning-framework.xlsx`
- `assets/frameworks/lender-investor-readiness-checklist.pdf`
- `assets/frameworks/investment-evaluation-toolkit.xlsx`
- `assets/downloads/business-finance-strategy-program-overview.pdf`

After uploading a file, set the corresponding `enabled` flag in `site-data.js` to `true`.

## Event and classroom photos

Place approved images in:

`assets/events/`

Recommended names:

- `cannacon-classroom-01.jpg`
- `cannacon-classroom-02.jpg`
- `cannacon-lecture-01.jpg`

Then update the `eventGallery` entries in `site-data.js` and set them to `enabled: true`.

The education-page gallery is completely hidden until at least one image is enabled.

## Testimonials

Place approved testimonial photos in:

`assets/testimonials/`

Then add the approved quote, name, role, company, and optional photo path to `site-data.js`.

Only use testimonials you have permission to publish.

The testimonial section is hidden until at least one quote is enabled.

## Replacing the booking provider

The site currently uses the HubSpot scheduling URL.

If you later create a Google Calendar Appointment Schedule, replace only this value in `site-data.js`:

`links.scheduling`

All scheduling buttons update automatically.

## CannaCon program link

When the dedicated CannaCon finance-program page is published, replace only:

`links.cannaconProgram`

All CannaCon program buttons update automatically.
