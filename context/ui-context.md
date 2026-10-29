# UI Context — Editorial Showroom Direction

## Theme

Dark only. No light mode. A restrained editorial showroom aesthetic — deep charcoal
layered surfaces with a restrained, muted gold accent — that reads established,
stately, and trustworthy to a foreign buyer, rather than a flashy tech SaaS.

Key principles:
- **Editorial Typography**: Elegant serif display headings (`Georgia`, with system serif fallbacks) paired with clean, legible sans-serif (`Inter`) for data, specifications, and supporting copy.
- **Restrained Architecture**: Generous spacing, thin 1px hairline rules, crisp borders (`rounded-none` to `rounded-lg`), avoiding heavy neon glows or bubbly bento curves as default styling.
- **Photography-First**: Large, authentic photography of real premises and vehicles carries the identity.

## Colors

All components use these tokens — no hardcoded hex values in UI components.
Exposed in `tailwind.config.js` with semantic tokens (`p1`–`p5` accents, `s1`–`s5` surfaces, `g1`–`g8` gradients).

| Role            | CSS Variable       | Value     | Description |
| --------------- | ------------------ | --------- | ----------- |
| Page background | `--bg-base`        | `#0A0A0B` | Deep charcoal base (`s1`) |
| Surface         | `--bg-surface`     | `#141416` | Editorial surface (`s2`) |
| Elevated card   | `--bg-elevated`    | `#1C1C1F` | Showroom card surface (`s3`) |
| Primary text    | `--text-primary`   | `#F5F2EA` | Warm ivory text |
| Muted text      | `--text-muted`     | `#A3A3AB` | Subtle editorial caption & metadata |
| Primary accent  | `--accent-primary` | `#C9A227` | Restrained deep gold (`p1`) |
| Border / rule   | `--border-default` | `#26262B` | Hairline border rule (`s4`) |
| Error           | `--state-error`    | `#E5484D` | Form validation & warning |
| Success         | `--state-success`  | `#30A46C` | Verification & active badge |

## Typography

| Role            | Font Family                         | Variable        |
| --------------- | ----------------------------------- | --------------- |
| Display headings| `Georgia, 'Times New Roman', serif` | `--font-serif`  |
| Body & UI text  | `Inter, system-ui, sans-serif`      | `--font-sans`   |
| Numbers / Code  | `ui-monospace, monospace`           | `--font-mono`   |

Type scale utility classes:
- `h1`–`h4`: Serif display typography with negative letter-spacing for showroom titles.
- `h5`–`h6`: Semi-bold structural labels.
- `body-1`, `body-2`: High-legibility sans-serif with comfortable line-height for specs and story.
- `caption`: Uppercase tracked sans-serif for eyebrows, badges, and category labels.

## Borders & Radii

Restrained and architectural rather than bubbly:
- Inline UI / Badges: `rounded-sm` or `rounded-md` (2px–6px)
- Cards & Frames: `rounded-lg` or `rounded-xl` (8px–12px)
- Hairline dividers: `border-s4` (1px solid `#26262B`)

## Component Library

No third-party component library. Hand-built React primitives shared across sections:
- Polymorphic `Button` (renders `<a>` with `href`, else `<button>`).
- Reusable product `Card` for cars and phones.
- Property variant `Card` for lands and houses (location, size/bedrooms, title document badge).
- `Header` with sticky compression and single-tree drawer.

## Layout Patterns

- Single stacked column in fixed order: Header, Hero, Trust & Proof, Cars, Lands, Phones, Houses, How Buying Works, FAQ, Media Gallery, Contact, Footer.
- Header: Sticky; single navigation tree reused as a full-screen mobile drawer on `max-lg`.
- Catalogues: Clean card grids — 1 column on mobile, 3 on desktop; featured items first.
- Contact: Direct verified WhatsApp link when confirmed; clear physical office address.

## Complete Media Gallery

Follow `media-requirements.md`: all 32 files (12 images and 20 videos) are
accessible at `#gallery`. Keep the Gallery navigation item visible on desktop
and in the single-tree mobile drawer. Use All plus Vehicles, Motorcycles,
Shipping, Visits, Branding and Promotional graphics filters, with counts.

Use consistent thumbnail proportions, readable captions, image/video labels,
and generous spacing. Load more or pagination may reduce initial rendering but
must expose the entire collection. A viewer shows full images and plays videos
only on request, with accessible controls, Escape close and focus restoration.
No autoplay; no MP4 download before play. Keep all visual labels in constants.

Use neutral visual captions for unknown context. Promotional graphics stay
separate from stock photography and carry an archive/confirmation label.
Hero and catalogue imagery remains selective; their selection does not remove
files from the complete gallery. Source names and internal confirmation markers
are not customer-facing copy.
