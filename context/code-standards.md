# Code Standards

## General

- Keep modules small and single-purpose.
- Fix root causes; do not layer workarounds.
- Do not mix unrelated concerns in one component.
- Section components handle layout, state, and `.map()` rendering only.

## JavaScript

- ES modules throughout; named exports in the constants module.
- Plain, explicit data shapes for products:
  cars/phones `{ id, name, condition, note, priceNgn, priceUsd, photo }`;
  lands `{ id, name, location, sizeSqm, title, priceNgn, priceUsd, photo }`;
  houses `{ id, name, location, bedrooms, title, priceNgn, priceUsd, photo }`.
- Validate owner-supplied content when transcribing it into constants —
  a missing photo or price means the item is not listed, never a guess.

## React (Vite)

- Functional components with hooks; no class components.
- Every `window.addEventListener("scroll", ...)` is paired with cleanup in
  `useEffect`.
- Shared UI (Button, Card) is built once and reused — never copy-pasted
  between sections.

## Styling

- Use the design tokens defined in `ui-context.md` — no hardcoded hex values
  in components.
- Follow the border radius scale defined in `ui-context.md`.
- Desktop-first classes with `max-lg` / `max-md` / `max-sm` overrides.
- Prefer hairline rules and restrained interaction feedback from `ui-context.md`.
  Pseudo-element helpers are available; glowing or bento treatments are not defaults.

## External Links (no API routes — the site is static)

- WhatsApp links are built only from the owner's number in constants, in
  international format (`https://wa.me/234...`), with `?text=` pre-filling
  the item name on catalogue cards.
- Every outbound link is tested before delivery.
- No bank details, no payment links, and no third-party trackers on the page.

## Data and Storage

- All content belongs in `src/constants/index.js`, transcribed from
  `context/client-content.md`.
- Optimized media derivatives belong in `src/assets/` and map to all source
  entries in `media/media-manifest.json`; originals remain intact in `media/`.
  Do not omit files, truncate videos, or substitute a poster for a complete clip.
- Do not fetch content from any external CMS or API at runtime.

## File Organization

- `context/` — the specification pack (source of truth, not shipped)
- `src/constants/` — all site content
- `src/components/` — shared primitives (Button, Marker, Card, Header)
- `src/sections/` — one component per page section
- `src/assets/` — supplied photos, graphics, complete videos and their posters

## Gallery data and rendering

Follow `media-requirements.md`. Use one canonical `mediaGallery` array with
`id`, `sourceId`, `sourcePath`, `type`, `category`, `src`, `alt`, `caption`,
`captionStatus`, a video `poster`, and optional confirmed `productId`.
Use stable source IDs; `captionStatus` is `descriptive` or `owner-confirmed`.
Do not gate neutral gallery media on confirmed product prices or partner facts.

Enforce exact source-ID coverage: currently 32 records, 12 images and 20 videos.
Do not count derivatives as new records or reassign real images to SAMPLE items.
Keep captions, category labels, counts and deployed URLs in constants.

Video cards initially render only posters. Attach the media URL on explicit
playback request; set `preload="none"`, show native controls/playsInline, disable
autoplay and pause on close/item change/another play. Lazy-load below-fold image
thumbnails. Never eager-fetch all video files or inline their bytes into JS.
Filters, Load more and viewers must be operable with keyboard and touch and
restore focus. Validate manifest coverage, every asset URL and the network
loading behavior as well as the production build.
