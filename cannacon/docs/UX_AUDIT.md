# CannaCon 2.0 UX / Conversion Audit

**Audit date:** 2026-09-22  
**Scope:** `/cannacon/` staging site only  
**Primary business objective:** establish credibility, make upcoming shows immediately understandable, and make it exceptionally easy for a prospective exhibitor to start a sales conversation.

## Executive finding

The prior deployment already had a credible visual system, real event content, working routes, age/privacy controls, sales materials, and direct event utilities. The largest remaining UX problems were not visual: they were visitor-facing development language, form over-qualification, weak visibility of direct sales contact, and too many equal-priority pathways competing with the highest-value task.

This revision therefore preserves the CannaCon visual language and event architecture while simplifying conversion behavior around **Discover -> Understand -> Trust -> Contact**.

The peer set consistently reinforces the same pattern:

- **NECANN** puts event date/location, attendee/buyer admission, exhibitor options and show-floor utilities together at the event level. https://necann.com/
- **MJBizCon** keeps Register and Exhibit/Sponsor persistent and gives Hosted Buyers a distinct value proposition rather than treating the program as a generic form. https://mjbizconference.com/
- **CES** makes the exhibitor value proposition and reservation action explicit, then supports it with buyer-quality and audience proof. https://exhibit.ces.tech/exhibit2027/
- **Shoptalk** uses persistent ticket/sponsor actions and proof of commercial audience quality. https://spring.shoptalk.com/
- **Natural Products Expo West** makes exhibitor and attendee paths explicit and uses specialized buyer/exhibitor resources rather than one undifferentiated website journey. https://www.expowest.com/

These are interaction references only; no competitor text or creative assets are copied.

## What changed

| Priority | Finding before this pass | Change implemented | Expected benefit |
|---|---|---|---|
| P0 | Visible `Website Preview`, development-state language and implementation disclaimers reduced credibility. | Removed visitor-facing preview/prototype/development messaging while retaining invisible `noindex,nofollow,noarchive`. | Site reads like an operating event business rather than a technical demo. |
| P0 | Exhibitor, sponsor, speaker and hosted-buyer forms attempted too much qualification before human contact. | Reduced first-touch forms to only the information sales/programming needs before responding. | Faster completion, lower abandonment, earlier human follow-up. |
| P0 | Forms depended on an email-draft workaround and explained that limitation too prominently. | Kept the honest email-client fallback, but moved technical detail out of the visitor journey. Added a centralized future endpoint adapter. | Less friction now; clean path to a true POST submission later. |
| P1 | Too many top-level items competed equally with exhibitor sales. | Simplified primary navigation to Shows / Experience / Attend / Stories / About / Contact plus a high-contrast Exhibit CTA. | Stronger information scent and commercial prioritization. |
| P1 | Direct contact existed but was not consistently prominent. | Added Contact to primary navigation, hero/closing conversion paths and direct email beside forms. | Visitor can reach a person in one click from core pages. |
| P1 | Missing speakers/sponsors/socials produced explanatory placeholder copy. | Empty partner/sponsor modules are hidden; only active LinkedIn/YouTube appear; speaker page presents real programming areas instead of absent names. | Removes low-trust empty states. |
| P1 | Event utility had to compete with narrative content. | Event cards and event pages keep city/date/venue plus direct Show / Exhibit / Floor Plan / Pass paths. | Faster completion of core event tasks. |
| P1 | Proof of execution appeared too late or generically. | Moved approved team-experience proof into the exhibitor journey and site credibility story: 30+ years trade-show execution, 13 years cannabis/regulated industries, 50+ B2B cannabis events. | Helps an exhibitor decide whether a sales conversation is worth starting. |
| P2 | Stories page carried migration/legal-style commentary around old articles. | Reframed as normal CannaCon editorial discovery with direct article links. | Editorial feels like part of the brand rather than archived technical baggage. |
| P2 | Pass UI risked looking like an ecommerce flow before payment exists. | Converted to straightforward pass/pricing presentation with contact actions; no fake checkout success state. | Clear pricing without suggesting a transaction occurred. |
| P2 | Mobile conversion required opening navigation. | Added restrained two-action mobile bar: Shows / Exhibit. | Primary tasks remain reachable on narrow screens. |
| P2 | Future measurement was not normalized. | Added `data-track` hooks for exhibit, contact, show, floor-plan, deck, article, video and form interactions. | Analytics can be added later without reworking page structure. |

## Credibility source material used

The CannaCon sales material positions the show as **more than a trade show**, with business, product discovery, education, culture and buyer activity working together. It also describes a team with 30+ years of large-scale trade-show execution, 13 years in cannabis/regulated industries, and 50+ B2B cannabis events. Those source-backed themes now appear as concise credibility proof rather than long sales-deck reproductions.

The Hosted Buyer material centers on **qualified meetings, less wasted time**, supplier discovery and buyer intent. The hosted-buyer web journey now follows that framing and collects only enough information to start matching/follow-up.

## Page-by-page assessment

### Homepage

**Purpose:** explain CannaCon, surface upcoming shows, establish credibility and convert exhibitor interest.

**After changes:**
- Hero answers what CannaCon is immediately.
- `Exhibit at CannaCon` is the primary CTA.
- `See 2027 shows` and `Talk to the team` remain visible in the hero.
- Upcoming shows are prominent and expose direct floor-plan/commercial routes.
- Execution history appears before deep program detail.
- Pavilion content explains the broader ecosystem without forcing each pavilion into the top navigation.
- Editorial remains visible because it is a material audience/SEO asset.
- No preview banner or visitor-facing deployment commentary.

### Events / event pages

**Purpose:** give show facts and direct next actions.

**After changes:**
- City/date/venue/hours remain dominant.
- Floor-plan links are direct utilities.
- Regional pre-day programming is distinguished from expo days.
- Event-specific exhibitor/contact links can preselect the event in the inquiry form.
- Las Vegas remains `May 2027` until exact dates are reconciled.

### Exhibit

**Purpose:** convert qualified exhibitor interest into a sales conversation.

**After changes:**
- Execution proof and pavilion rationale support the commercial decision.
- Current sales decks remain available in-browser.
- First-touch form is reduced to four required fields plus two optional fields.
- Direct email remains available.

### Sponsor

**Purpose:** begin a sponsorship/partnership conversation.

**After changes:**
- Removed early-stage requirements for budget, detailed activation plans, historical relationship, audience definition and multiple narrative fields.
- Captures contact/company/show interest, then allows one optional context note.

### Speaker / programming

**Purpose:** capture a credible session idea without demanding a full submission dossier.

**After changes:**
- Requires identity, organization, show, topic/title and one session-description field.
- Optional link can point to a website, LinkedIn profile or past presentation.
- Speaker-list page is useful before names are approved by presenting programming areas rather than placeholder speaker cards.

### Hosted Buyers

**Purpose:** qualify enough buyer intent to justify follow-up/matching.

**After changes:**
- Keeps the fields that genuinely matter for buyer review: role, buyer type and category interest.
- Consolidates sourcing notes into one optional field.
- Uses the approved buyer-value framing rather than a generic application disclaimer.

### Contact

**Purpose:** universal escape hatch for someone who does not know which route to choose.

**After changes:**
- New compact form captures Name / Email / Inquiry Type, with company/show/message optional.
- Contact is visible in primary navigation.

### Stories

**Purpose:** maintain CannaCon's media/editorial discovery layer.

**After changes:**
- Removed migration and legal/regulatory caveat-style copy from article cards/page framing.
- Existing approved articles remain available through normal `Read article` links.

### Footer / global utilities

**After changes:**
- No visible staging/development label.
- No inactive social placeholders.
- LinkedIn and YouTube only.
- Privacy choices remain available without a visitor-facing age-reset control.

## Remaining P0/P1 dependencies outside this static UX pass

1. **Real form endpoint:** current forms honestly open the visitor's email client. A small Cloudflare Worker/form endpoint should eventually accept POSTs, send notifications, provide spam protection and show a true success state.
2. **Payment/registration provider:** pass pricing is published, but no payment transaction is enabled. Connect a hosted checkout before using purchase-language CTAs.
3. **Constant Contact:** newsletter UI is intentionally not faked. Add only when the actual signup endpoint/consent behavior is available.
4. **Las Vegas exact dates:** source conflict remains unresolved; the website continues to use `May 2027`.
5. **Local media custody:** approved show-floor images/video still resolve from `cannacon.org`. Copy/optimize them into Catalyst-owned hosting before terminating the legacy host.

## Conclusion

The revised site now makes the five highest-value questions answerable with little effort:

1. What is CannaCon? — homepage hero.
2. Where are the shows? — hero + show cards + Shows navigation.
3. Why should I trust it? — execution proof, real show-floor media, sales materials.
4. Can I exhibit? — persistent Exhibit action and one-click inquiry path.
5. Can I reach someone? — Contact navigation, direct email and short forms.

The remaining material conversion risk is no longer page structure; it is connecting true server-side lead submission and, later, registration/payment infrastructure.
