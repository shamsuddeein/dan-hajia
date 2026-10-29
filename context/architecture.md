# Architecture Context

## Stack

| Layer     | Technology               | Role                                             |
| --------- | ------------------------ | ------------------------------------------------ |
| Framework | React (Vite)             | Single-page application, static build            |
| Language  | JavaScript (ES modules)  | Components and content constants                 |
| UI        | Tailwind CSS             | Token-driven styling, no component library       |
| Content   | `src/constants/index.js` | Every word, product, price, and photo path       |
| Media     | `src/assets/`            | Mapped derivatives of all supplied images and videos |
| Hosting   | Vercel or Netlify        | Free-tier static hosting; `.com` domain          |
| Auth      | None                     | Public read-only page — no accounts              |
| Database  | None                     | Content changes are constants-file edits         |

## System Boundaries

- `context/` — the specification pack (this folder). Source of truth for the
  build; not shipped to the browser.
- `src/constants/` — owns all content. The only place words, prices, and
  photo paths may live.
- `src/components/` — owns rendering and interaction only. No content, no
  business facts, no hardcoded values.
- `src/assets/` — owns optimized derivatives of every supplied gallery source:
  photographs, graphics, complete videos and their posters. Each derivative
  maps to an entry in `media/media-manifest.json`.
- `media/` — owns the owner's raw media as received (images and videos,
  organised by section — see `media/README.md`). Every source receives a
  website representation in the complete gallery; originals stay here.
- `documents/` — owns business evidence (CAC certificate, title documents)
  backing the site's claims; held, not published, unless a feature says so.

## Storage Model

- **Content data**: the constants module, transcribed from
  `context/client-content.md`.
- **Media**: all 32 manifest sources (12 images, 20 videos) represented by
  local derivatives in `src/assets/`. No total video-count cap applies. Load
  posters first and attach each video source only when playback is requested;
  use `preload="none"`, no autoplay, at most one playing video, and lazy images.
- **Gallery data**: one canonical `mediaGallery` array in constants. Its source
  IDs must equal the manifest source IDs; partner-proof views are derived
  subsets. See `media-requirements.md` for the data shape and category totals.
- **No database and no blob storage** — the site is fully static.

## Auth and Access Model

- No authentication. The page is public and read-only.
- Only the builder edits the site, by editing the constants file and
  redeploying.
- The owner's bank details are never stored in this project or published on
  the page; they are shared privately on WhatsApp after contact.

## Invariants

1. No component hardcodes copy, products, or prices — everything renders from
   `src/constants/index.js`.
2. No raw hex colour values in components — design tokens only.
3. Business and product claims require owner-supplied or owner-confirmed facts
   in `client-content.md`. Gallery captions may describe visible content as
   defined in `media-requirements.md`; they must not infer unknown context.
4. Sample data is prefixed `SAMPLE` and is fully removed before launch.
5. Gallery visuals come from the supplied inventory; no external stock or
   generated substitute imagery. Supplied branding/promotional graphics have
   their own categories and are not presented as documentary photographs.
6. All 32 sources remain accessible regardless of hero selection, product
   eligibility or missing contextual captions. No video bytes load before play.
