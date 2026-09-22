# Form Simplification

## Principle

The first website interaction should capture enough information for the CannaCon team to respond — not perform the entire qualification process before a human conversation begins.

Every first-touch field must answer:

> Why must the team know this before calling or emailing the prospect?

If the answer is weak, the field belongs in follow-up rather than the public lead form.

## Before / after

The prior deployed forms generally contained roughly 20+ visitor inputs per exhibitor/sponsor/speaker workflow and roughly 40 hosted-buyer elements once category choices were included.

The revised visible lead fields are:

| Form | Required | Optional | Total visible lead fields |
|---|---:|---:|---:|
| Exhibitor | 4 | 2 | 6 |
| Sponsor | 4 | 2 | 6 |
| Speaker / Programming | 6 | 1 | 7 |
| Hosted Buyer | 7 | 2 | 9 |
| General Contact | 3 | 3 | 6 |

The hidden copy-message fallback textarea is a delivery fallback, not a lead-input field.

## Exhibitor

### Required
- Full name
- Business email
- Company
- Show(s) of interest

### Optional
- Phone
- Anything specific you want us to know about your inquiry?

### Removed from initial inquiry
- Budget
- Booth-size preference
- Referral source
- Past CannaCon participation
- Pavilion preference
- Brand-deck URL
- Multiple company/product-description fields
- Multiple goals/qualification narratives

These can be handled during sales follow-up.

## Sponsor

### Required
- Full name
- Business email
- Company
- Show(s) of interest

### Optional
- Phone
- Anything specific you want us to know?

### Removed from initial inquiry
- Activation type
- Proposed deliverables
- Budget
- Audience definition
- Detailed timing
- Existing relationship narrative

## Speaker / programming

### Required
- Full name
- Email
- Organization
- Show(s) of interest
- Proposed topic/session title
- Session description

### Optional
- Website / LinkedIn / past presentation URL

### Deferred until review
- Headshot
- Long bio
- Co-presenters
- Three formal learning outcomes
- Schedule restrictions
- Detailed format choice
- Commercial-affiliation disclosure workflow

## Hosted Buyer

Hosted Buyer retains slightly more qualification because matching depends on actual buying role and category need.

### Required
- Full name
- Business email
- Company
- Job title
- Show
- Buyer/business type
- Product/category interests

### Optional
- Phone
- Anything specific about what you are sourcing?

### Deferred until buyer review
- Store/location counts
- Purchasing-volume ranges
- Geographic distribution footprint
- Multiple sourcing-priority fields
- Requested introductions
- Product certifications
- buying timeline
- availability matrix

## General contact

### Required
- Name
- Email
- Inquiry type

### Optional
- Company
- Show
- Message

This route exists so the user never has to understand the internal CannaCon organization before contacting the team.

## Submission behavior

The code now has one centralized submission decision:

1. If a real form endpoint is configured, the form can POST JSON and show a true success state.
2. Until then, submitting opens an email addressed to `lucas@cannacon.org` with the form answers already composed.
3. If an email application does not open, the visitor can copy/save the prepared message.

The page never claims a message was sent when the website itself did not send it.

## Recommended production follow-up

The next infrastructure step should be a small Catalyst-controlled endpoint, preferably on Cloudflare Workers or an equivalent serverless service, that:

- accepts validated POST submissions;
- sends notification email;
- provides spam/bot protection;
- rate-limits abuse;
- does not expose credentials client-side;
- returns a deterministic success/failure response;
- optionally writes leads into Salesforce later.

That change should not require redesigning these forms.
