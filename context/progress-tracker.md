# Progress Tracker — Dan Hajiya Investment

Update this file after every meaningful implementation change.

## Current Phase

- **Company Profile Revision & Complete Media Archive Implementation**:
  - The application has been restructured from mock e-commerce / sample priced catalogues into an executive **corporate company profile introducing the owner and presenting evidence of work**.
  - Sequence: **Introduction (Hero) → Company & Owner (About) → What We Do (Activities) → Selected Work → Complete Gallery → Process & FAQ → Company Details & Contact**.
  - Preserved all **32 supplied manifest records (12 photos/graphics, 20 videos)** with dynamic data-derived category counts.
  - Fixed desktop multi-column compilation by restoring standard `sm`, `md`, `lg`, `xl`, `2xl` breakpoints.
  - Fixed mobile drawer height collapse after scroll by separating the drawer DOM from the header's `backdrop-filter` containing block.
  - Implemented accessible modal viewer with Tab/Shift+Tab focus trap, Escape dismissal, native video control arrow key protection, and removed rigid 360px height constraint for short landscape screens.

## Completed Milestones

1. **Design System & Tokens**:
   - `tailwind.config.js`: semantic tokens (`p1`–`p5` gold, `s1`–`s5` dark charcoal, `text-primary`, `text-muted`).
   - Restored standard min-width breakpoints alongside `max-*` modifiers.
   - Zero raw hex codes in component files; all colors use design tokens or CSS variables.
2. **Public Company Details (Confirmed from CAC Portal)**:
   - Director / Principal: `Umar Faruk Abubakar`
   - Legal Entity: `DAN HAJIYA INVESTMENT 19 LTD`
   - CAC Status: Step 1 (Company Details) submitted on CAC portal 2026-10-28.
   - Public Phone & WhatsApp: `+234 810 955 8828` (`2348109558828`)
   - Official Email: `umarfarukabubakar19s@gmail.com`
   - Postal Code: `800283`
   - Location Plus Code: `HCHR+M9F`
   - Registered Address: `No U11, Barrack Road, Hayan Banki, Kaduna (Post Code: 800283, Location Code: HCHR+M9F) — Kaduna-North LGA, Kaduna State, Nigeria`
3. **Navigation & Mobile Drawer**:
   - 6 corporate links: `About`, `What We Do`, `Our Work`, `Gallery`, `Process`, `Contact`.
   - Native link semantics and keyboard activation.
   - Fixed mobile menu clamping: drawer rendered as sibling outside header `backdrop-filter` containing block.
   - Escape key listener, body scroll lock, and focus restoration.
4. **Hero & About**:
   - Concisely describes the company, trading focus, and Kaduna registered base.
   - High-resolution authentic Mercedes-Benz interior photograph with neutral caption.
   - About section introduces Director Umar Faruk Abubakar and verifiable CAC entity.
   - Omitted unconfirmed personal biography, founder years, or fake awards.
5. **What We Do (Activities)**:
   - 4 trading divisions: Automotive, Lands, Residential Homes, Telecommunications.
   - Honest descriptions without unsupported promises (e.g., no universal registry guarantees, no battery health % claims).
   - Automotive links to verified video footage; land, houses, and electronics provide direct consultation links rather than unrelated media proof.
6. **Selected Work**:
   - 4 highlighted documentary case studies: container loading, cargo vessel staging, warehouse walkaround, Aprilia motorcycle demonstration.
   - Click-to-play with poster-first loading (zero initial MP4 download).
7. **Complete 32-Item Media Gallery**:
   - All 32 supplied files reconciled (12 images, 20 videos).
   - 5 promotional graphics restored under `promotional` category with archive disclaimers.
   - Category counts dynamically derived:
     - All: 32
     - Vehicles: 9 (2 photos, 7 videos)
     - Motorcycles: 8 (4 photos, 4 videos)
     - Shipping & Logistics: 6 (6 videos)
     - Showroom & Lot Visits: 3 (3 videos)
     - Company Brand: 1 (1 graphic)
     - Promotional Graphics: 5 (5 archived graphics)
   - Accessible modal viewer with Tab focus trap, Escape dismissal, and responsive landscape height.
8. **Dealing Process & FAQ**:
   - 5-step commercial dealing flow.
   - 5 clear, factual FAQs covering verification, international wire transfers, regional logistics, and land title checks.
10. **Follow-Up Corrections & Hardened Accessibility (2026-10-29)**:
    - **Portrait Media Fit in Landscape**: Repositioned media inside modal container using bounded dimensions with `object-fit: contain` and `absolute inset-0 w-full h-full`. Confirmed portrait visit video Source 24 renders at exactly 180px height inside container at 844×390 landscape, with playback controls, captions, and close buttons completely accessible.
    - **Page-Wide Video Playback Coordination**: Attached global capture listener and explicit pause triggers across `SelectedWork` and `MediaGallery`. Verified playing a Gallery video immediately pauses Selected Work video, ensuring at most one active playing video across the page.
    - **Mobile Drawer Focus Containment & Opaque Background**: Drawer portaled to `document.body` with `bg-s1/[0.98]` and explicit `rgba(10, 10, 11, 0.98)` background. Implemented full Tab/Shift+Tab focus cycling, background `#root` `inert` locking, and reliable focus return to toggle button.
    - **Accessibility Hierarchy**: Rendered gallery modal via `createPortal(..., document.body)` with background `#root` `inert` locking, eliminating Chromium's blocked `aria-hidden` warning.
    - **Neutral Hero Caption**: Changed hero image caption to "Mercedes-Benz Luxury Interior" with neutral sub-caption "Mercedes-Benz interior — supplied company archive".
    - **Reconciled Documentation**: Reconciled `client-content.md` with company profile structure, removing obsolete catalogue/SAMPLE instructions. Corrected visit recording IDs to **24, 25, 29**.
    - **Enforced Verification Suite**: Rewrote `scripts/verify-all.mjs` with 40 programmatic assertions and nonzero exit on failure. All 40 assertions passed. Production build succeeded (0 errors).
11. **Final UI Corrections & Focus Polish (2026-10-29)**:
    - **Gallery Focus Restoration After Removing Inert**:
      - Modal close handler cleanly removes `inert` from `#root` and defers focus restoration via `requestAnimationFrame` to ensure React unmount and DOM inert removal have settled.
      - Isolated modal open state (`isOpen`) from item index; navigating between records via Arrow keys or Prev/Next buttons maintains focus within the dialog without premature opener focus restoration.
      - Verified across all three close triggers: **Escape key**, **modal close button**, and **backdrop click** all return `document.activeElement` to the exact thumbnail opener with `inert` cleanly removed.
    - **Desktop Media Viewer Bounded Height**:
      - Removed `flex-1` from the media body container and applied explicit responsive height: `clamp(220px, 60vh, calc(94vh - 120px))`.
      - At 1440×900 desktop, container measures 540.0px high and the dialog measures 632.0px high, completely eliminating the previous 180px collapse and providing an enlarged view for 4:3 photos and 16:9/9:16 videos.
      - At 844×390 landscape, media container measures 234.0px and total dialog measures 320.0px, keeping portrait videos, native controls, close button, and captions fully visible.
    - **Neutral Hero Photo Alt Text**: Updated `src/sections/Hero.jsx` image alt attribute to exact neutral wording: `"Mercedes-Benz sedan interior from the supplied company archive"`.
    - **Reconciled Media Category Table**: Updated `context/client-content.md` source IDs mapping to match exact manifest records across all 6 categories.
    - **Expanded Enforced Verification Suite**: Added dedicated desktop geometry and focus restoration assertions across all close triggers to `scripts/verify-all.mjs`. All **55/55 programmatic assertions passed** with zero failures. Production build succeeded cleanly (`npm run build`).

---

## Complete Media Inventory (All 32 Records)

| Category | Slug | Images | Videos | Total | Status & Details |
| :--- | :--- | ---: | ---: | ---: | :--- |
| **Vehicles** | `vehicles` | 2 | 7 | **9** | Real Mercedes luxury sedan exterior & red interior photos + 7 walkaround videos |
| **Motorcycles** | `motorcycles` | 4 | 4 | **8** | 4 angle photos of Aprilia motorcycle + 4 walkaround/engine demo videos |
| **Shipping & Logistics** | `shipping` | 0 | 6 | **6** | Container loading, ocean port staging, car carrier transporter videos |
| **Showroom & Lot Visits** | `visits` | 0 | 3 | **3** | Authentic visit recordings at international motorcycle stands and foreign sales lots |
| **Company Brand** | `branding` | 1 | 0 | **1** | Official Dan Hajiya Investment emblem design |
| **Promotional Graphics** | `promotional` | 5 | 0 | **5** | Archived promotional artwork (IDs 7, 8, 9, 11, 12) with historical archive labels |
| **Total** | | **12** | **20** | **32** | **100% of Supplied Manifest Preserved & Reconciled** |

---

## Open Questions & Missing Owner Information

The following items are marked **[OWNER TO SUPPLY]** and omitted from public claims until confirmed:
1. **Director Portrait**: Professional portrait photograph of Director Umar Faruk Abubakar for the About section.
2. **Director Biography**: Verified biographical narrative and year founded / years in business.
3. **Visit Documentary Context**: Names of international partners, dates, and locations for the 3 visit video clips (Source IDs 24, 25, 29). Currently displayed with neutral visual descriptions.
4. **Final CAC Certificate**: Formal RC Number once CAC incorporation Step 2 / certificate issuance completes.
