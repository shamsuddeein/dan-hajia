# Complete Media Gallery — Authoritative Requirements

User instruction recorded 2026-10-28: include every supplied media file in the
website. This document supersedes earlier media-selection limits, including
the former two-video cap. It does not authorize invented business facts.

## Required coverage

The current source inventory is `media/media-manifest.json`: **32 unique files,
12 images and 20 videos**. `media/FILE-MAP.md` maps the original filenames to
their organized copies. The images include photographs, a logo and graphics.

| Gallery category | Slug | Images | Videos | Total | Source folders under media/ |
| --- | --- | ---: | ---: | ---: | --- |
| Vehicles | vehicles | 2 | 7 | 9 | images/cars; videos/stock/cars |
| Motorcycles | motorcycles | 4 | 4 | 8 | images/motorcycles; videos/stock/motorcycles |
| Shipping | shipping | 0 | 6 | 6 | videos/logistics |
| Visits | visits | 0 | 3 | 3 | videos/partners/uncaptioned |
| Branding | branding | 1 | 0 | 1 | images/branding |
| Promotional graphics | promotional | 5 | 0 | 5 | images/promotional |
| **Total** | | **12** | **20** | **32** | |

Every source file must have one corresponding entry in the complete gallery.
Thumbnails, video posters and alternate resolutions do not count as additional
source files. Hero or catalogue reuse does not replace gallery inclusion.
Similar clips remain separate entries unless the user explicitly removes one.
When new media is supplied, reconcile the manifest and update these totals.

## Content model

Define one canonical `mediaGallery` array in `src/constants/index.js`, with one
entry per manifest record. Do not maintain a separate competing media list.
Existing `gallery` consumers may alias this array during migration.
`proofGallery`, if retained, is a derived subset containing only entries with
confirmed partner context; it must not replace the complete gallery.

Each entry has:

- `id`: stable gallery ID; `sourceId`: exact manifest record ID.
- `sourcePath`: manifest `destination_relative` path, relative to `media/`.
- `type`: `image` or `video`; `category`: one of the six slugs above.
- `src`: deployed asset URL for the complete image or video; not a desktop path.
- `poster`: deployed poster URL for videos; optional thumbnail fields for images.
- `alt`: concise visual description; `caption`: factual visible-content caption.
- `captionStatus`: `descriptive` or `owner-confirmed`.
- `productId`: optional; populate only when the source-to-product match is confirmed.

All user-facing gallery labels and media paths come from constants. Use the
manifest for build-time reconciliation, not as a client-side fetch of local paths.
Gallery eligibility is independent of product-card eligibility: missing prices,
model years or partner context must not hide otherwise supplied media.

## Placement and browsing

- Provide a dedicated **Media Gallery** section with stable anchor `gallery`,
  reached by the existing single-tree header link labelled Gallery.
- Provide All plus the six category filters, clear image/video labels, useful
  result counts and accessible Load more or pagination. Every item must remain
  reachable on desktop and mobile, including the final item in each filter.
- Open full images and videos in an accessible viewer: labelled controls,
  keyboard operation, Escape close, focus restoration and visible focus.
- Use selected appropriate media in the hero and product sections; those
  curated sections do not need all files. Keep the editorial showroom style.
- Motorcycles belong in the gallery now. This does not automatically create
  a fifth sales catalogue or assert that any photographed item is available.

## Performance and preservation

- Preserve every original in `media/` and the original-to-copy manifest.
- Create optimized website derivatives in `src/assets/`, each mapped to its
  source ID. Include all 20 complete videos; do not substitute still posters,
  truncate clips or drop files to meet a page-weight target.
- Use correctly sized thumbnails/posters and responsive images. Load images
  lazily below the fold; the selected hero image may load eagerly.
- Videos are poster-first and click-to-play, with no autoplay. Use
  `preload="none"` and attach a video `src` only after the visitor requests
  playback. Do not preload all 20 videos or embed their bytes into JavaScript.
- At most one video plays at a time. Pause playback when the viewer closes,
  the active item changes, or another video starts.
- Network verification must show no MP4 downloads before a play request.
  Pagination or Load more limits initial rendering, not total availability.

## Truthful captions and product use

- Use neutral descriptions of visible content for files without confirmed
  contextual captions, for example 'Motorcycle display visit' or 'Vehicles
  inside a shipping container'. Keep these files in the complete gallery.
- A folder called partners does not prove a partnership. Do not invent people,
  countries, dates, completed deals, ownership or current stock availability.
  Only owner-confirmed context may become a partner-proof claim.
- Keep branding and promotional graphics in their own categories. Identify
  flyers as supplied promotional material; do not transcribe embedded prices,
  years, warranties or claims as confirmed current catalogue information.
  Provide a concise archive label that pricing/availability needs confirmation.
- Do not attach these real vehicle photos to unrelated SAMPLE models. An item
  without the required confirmed product facts may be shown as gallery media
  but must not become a purchasable catalogue listing by inference.
- Unknown business facts remain empty/pending internally and absent from public
  claims. This requirement does not approve draft shipping/payment terms or
  unconfirmed public contact details.

## Required verification before delivery

- [ ] Gallery source IDs exactly equal the manifest source IDs, with no missing,
  duplicated or invented entries: currently 32 = 12 images + 20 videos.
- [ ] Category totals match the table and every deployed asset/poster resolves.
- [ ] All images open and all 20 videos can play; posters alone do not pass.
- [ ] All filters and Load more/pagination expose their full results on phone
  and desktop; returning to All restores access to the entire collection.
- [ ] No MP4 downloads before playback; no autoplay or simultaneous playback.
- [ ] Captions use only visible content or confirmed owner context; promotional
  artwork is clearly separate from factual product listings.
- [ ] Source originals are intact and derivative-to-source mappings are recorded.
- [ ] Navigation, viewer keyboard controls, close/focus behavior, reduced motion
  and responsive layout work; the production build passes.

## Implementation handoff

Gemini implements these requirements in the existing numbered feature workflow.
Reconcile Feature 02 media data and Feature 03 Gallery navigation as needed;
Feature 11 delivers the complete gallery. Updating instructions is not evidence
that gallery implementation or verification has already been completed.
