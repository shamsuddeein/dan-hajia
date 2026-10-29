# Feature 02 — Content Constants
Create `src/constants/index.js` transcribing `context/client-content.md`:
`business` (name, address, years, CAC), `navItems`, `cars`, `phones`,
`lands`, `houses`, `buyingSteps`, `faqs`, `mediaGallery`, `contact`. Use the SAMPLE
entries already in client-content.md for development, each prefixed `SAMPLE`.
Any value marked [OWNER TO SUPPLY] becomes a clearly named empty field — never
a guessed value. Done when every section of the page can render purely from
this file and the tracker lists which fields are still empty.

## Complete media inventory

Follow `context/media-requirements.md`. Build one canonical `mediaGallery`
array from every record in `media/media-manifest.json`: currently **32 unique
source files — 12 images and 20 videos**. Required category slugs and counts:

| Category | Images | Videos | Total |
| --- | ---: | ---: | ---: |
| `vehicles` | 2 | 7 | 9 |
| `motorcycles` | 4 | 4 | 8 |
| `shipping` | 0 | 6 | 6 |
| `visits` | 0 | 3 | 3 |
| `branding` | 1 | 0 | 1 |
| `promotional` | 5 | 0 | 5 |

Each entry contains `id`, `sourceId` (the manifest record ID), `sourcePath`
(the original organized path relative to `media/`), `type`, `category`, `src`
(the usable optimized derivative), `alt`, `caption`, and `captionStatus`.
Videos also require `poster`; `productId` is optional and is set only for a
confirmed inventory match. Preserve an explicit source-to-derivative mapping.
Set `captionStatus` to `descriptive` or `owner-confirmed`. A neutral visual
description is sufficient to include an asset when country, date, people or
deal details are unconfirmed; those missing facts must not hide the file.

Keep the canonical inventory separate from product eligibility. Do not attach
the Mercedes photographs to a SAMPLE Toyota, infer vehicle identity from a
folder, or treat a flyer as confirmed stock/pricing. Hero, catalogue and
gallery selections reference the same source IDs. If `proofGallery` remains
for compatibility, derive it from the owner-confirmed proof subset of
`mediaGallery`; do not maintain a second independent inventory.

Verification must reconcile all 32 unique `sourceId` values against the
manifest, including the image/video and category counts above. Every source
must have a usable display/playback path before final gallery delivery;
pending derivative work belongs in the tracker, not a permanently empty
gallery placeholder. Public contact guards and draft-status rules remain in
force; no unconfirmed phone fallback or invented business facts.
