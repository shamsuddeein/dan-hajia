---
name: saas-landing-page-architect
description: Comprehensive development guide for building modern company profile and showcase landing pages using React.js, Vite, Tailwind CSS, and accessible component architectures.
---

# Company Profile & Landing Page Architecture Skill

## Dan Hajiya Project Overrides (Company Profile Specification)

For this project, read `AGENTS.md`, `context/ui-context.md`, `context/project-overview.md`, and `context/media-requirements.md` before applying generic examples.
The site is built as a **professional company profile with an introduction to the owner and evidence of the company's work**. It is not an e-commerce storefront with sample priced catalogues.

The approved section sequence is:
**Introduction (Hero) → Company & Owner (About) → What We Do (Activities) → Selected Work → Complete Gallery → Process & FAQ → Company Details & Contact**.

Editorial direction:
- Restrained dark/gold palette (`s1`–`s5` charcoal, `p1`–`p2` gold).
- Serif display headings, generous but purposeful spacing, authentic documentary media.
- Zero raw hex codes in components; semantic tokens only.
- Navigation links must have native link semantics and accessible keyboard navigation.
- The mobile navigation drawer must be rendered outside the header's `backdrop-filter` containing block to prevent viewport clamping.

Complete Media Requirement:
- Expose all **32 source files: 12 images and 20 videos**, including vehicles (9), motorcycles (8), shipping (6), visits (3), branding (1), and promotional graphics (5).
- All 5 promotional graphics are preserved in a dedicated Promotional Graphics category with clear archive disclaimers.
- No video downloads before user interaction (`preload="none"`, poster-first).
- Single active video player in the accessible modal viewer with Tab focus trapping, Escape dismissal, and arrow key preservation for native video controls.

---

## 1. Design System & Breakpoints Setup

### Tailwind Setup (`tailwind.config.js`)
- Standard mobile-first breakpoints (`sm: '640px'`, `md: '768px'`, `lg: '1024px'`, `xl: '1280px'`, `2xl: '1536px'`) alongside desktop-first `max-*` helpers.
- Semantic color tokens:
  * Primary tokens (`p1`–`p5`): Gold accents and highlights.
  * Secondary tokens (`s1`–`s5`): Dark surfaces and borders.
- Editorial typography:
  * Serif font family for headings (`font-serif`).
  * Clean sans-serif font family for body copy (`font-sans`).
  * Monospace for badges and metadata (`font-mono`).

---

## 2. Core Section Architecture

### A. Introduction (`Hero.jsx`)
- Clear corporate identity, Kaduna headquarters, scope of commercial trading.
- High-resolution documentary inventory photograph with neutral caption.
- Direct WhatsApp enquiry CTA and anchor to business activities.

### B. Company & Owner (`About.jsx`)
- Background of the enterprise and confirmed leadership: Director Umar Faruk Abubakar.
- Confirmed corporate entity: `DAN HAJIYA INVESTMENT 19 LTD` with actual CAC portal status.
- Registered facility address in Kaduna.
- Omit unconfirmed personal claims, invented years, or fake testimonials.

### C. What We Do (`Activities.jsx`)
- Four primary trading lines: Automotive & Commercial Vehicles, Land Parcels & Surveyed Plots, Residential Homes & Housing Units, Mobile Devices & Telecommunications.
- Grounded factual points without unsupported guarantees.
- Link only supported activities to relevant media footage; provide direct consultation links for others.

### D. Selected Work (`SelectedWork.jsx`)
- Four documentary case studies: container loading, port vessel staging, luxury sedan warehouse walkaround, Aprilia motorcycle demonstration.
- Click-to-play on demand without preloading MP4 assets.

### E. Complete Media Gallery (`MediaGallery.jsx`)
- All 32 supplied manifest items accessible with category filtering.
- Dynamic counts derived from data (`all: 32`, `vehicles: 9`, `motorcycles: 8`, `shipping: 6`, `visits: 3`, `branding: 1`, `promotional: 5`).
- Accessible modal dialog: Tab/Shift+Tab focus containment, Escape dismissal, focus restoration, no arrow key conflict with video controls, and responsive layout for landscape mobile screens without rigid height clamps.

### F. Process & FAQ (`DealingFaq.jsx`)
- 5-step commercial dealing flow.
- Two-column desktop split FAQ accordion answering due diligence questions honestly.

### G. Company Details & Contact (`Contact.jsx` & `Footer.jsx`)
- Confirmed phone, WhatsApp, email, Post Code (`800283`), and Plus Code (`HCHR+M9F`).
- Registered office address in Kaduna-North LGA.
- Fraud prevention reminder explaining that corporate bank account details are shared privately.
