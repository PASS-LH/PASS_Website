# UX Conversion Paths

**Goal:** core commercial and event tasks should require almost no navigation interpretation.

## Before / after

| Visitor task | Before this pass | After this pass | Target met? |
|---|---|---|---|
| Home -> Exhibitor inquiry | 1 click from hero, but followed by a long qualification form | 1 click to a six-field first-touch form | Yes |
| Home -> Upcoming show details | 1 click from event card | 1 click from hero/show card/nav | Yes |
| Home -> Floor plan | 1 click from show card | 1 click from show card | Yes |
| Home -> General contact | Available but lower visibility | 1 click from primary nav, hero or conversion modules | Yes |
| Home -> Pass information | 1 click | 1 click via Attend/show page | Yes |
| Event -> Exhibitor inquiry | 1 click | 1 click; event can be preselected through query parameter | Yes |
| Event -> Floor plan | 1 click | 1 click | Yes |
| Event -> Pass information | Event-specific section | Same page / anchor-level access | Yes |
| Home -> Sponsor inquiry | 1-2 clicks | <=2 clicks | Yes |
| Home -> Speaker inquiry | 1-2 clicks | <=2 clicks | Yes |
| Home -> Hosted Buyer request | 1-2 clicks | <=2 clicks | Yes |

## Governing route hierarchy

### Primary navigation

- Shows
- Experience
- Attend
- Stories
- About
- Contact
- **Exhibit** — persistent high-contrast CTA

This prevents Sponsor / Speak / Hosted Buyer / Education from competing at the same visual level while keeping them accessible through relevant pages and footer navigation.

## Exhibitor journey

### Fast path

`Homepage -> Exhibit at CannaCon -> Exhibitor inquiry -> Email CannaCon`

The form asks only:

- Full name
- Business email
- Company
- Show(s) of interest
- Phone (optional)
- Anything specific you want us to know? (optional)

### Event-context path

`Event page -> Exhibit -> exhibitor form`

Links may carry `?show=VA27`, `?show=MN27`, or `?show=LV27` so the user does not repeat information already known from their path.

## Show-discovery journey

`Homepage -> See 2027 shows -> event`

or direct event cards:

- Virginia Beach
- Las Vegas
- St. Paul

Each event should expose the decision-support information before long narrative content:

- location
- date
- venue
- hours where approved
- Exhibit
- Attend/passes
- Floor plan
- Contact

## Contact journey

`Any page -> Contact -> universal inquiry`

Contact requires only:

- Name
- Email
- Inquiry type

Company, show and message are optional. This is the fallback for a visitor who does not know which specialized workflow applies.

## Hosted Buyer journey

`Homepage / footer -> Hosted Buyers -> buyer value -> short qualification form`

The page explains the buyer proposition before asking for information. Qualification is limited to identity, role, show, buyer type and product/category interest, with one optional sourcing note.

## Mobile journey

A restrained fixed action bar provides:

- **Shows**
- **Exhibit**

The bar does not add secondary actions. Contact remains immediately available in the mobile menu and on conversion sections.

## CTA language standard

Preferred:

- Exhibit at CannaCon
- Talk to Sales / Talk to the team
- See 2027 shows
- View Floor Plan
- View Passes
- Apply as a Hosted Buyer
- Propose a Session
- Open Sales Deck
- Contact CannaCon

Avoid vague CTA labels when a task-specific phrase is available.
