# Feature 03 — Header & Single-Tree Navigation
Build `Header.jsx` per skill Phase 3 and Pillar 2: `isOpen` and `hasScrolled`
(scrollY > 32, listener cleaned up on unmount) state; header compresses to a
blurred compact bar after scrolling. One `<ul>` nav tree for Home, About,
Cars, Lands, Phones, Houses, How to Buy, Gallery, Contact — horizontal on
desktop, the same markup as a full-screen drawer on `max-lg` via `clsx`
opacity/pointer-events. Nav links use react-scroll (`spy`, `smooth`,
`offset -100`); a tap on mobile closes the drawer. Business name text in the
header (logo file only if the owner supplies one). Done when scroll-spy,
drawer behaviour, and header compression all work on phone and desktop sizes.

The Gallery navigation item must target `#gallery` (the matching react-scroll
element name is `gallery`) and open the complete Media Gallery specified in
`context/media-requirements.md`, not a partner-only selection. It must remain
discoverable and keyboard-accessible on desktop and mobile, close the mobile
drawer when selected, and have a valid section target when Feature 11 lands.
All 32 source files must be reachable from that gallery through its filters
and Load more controls. The supplied logo's inclusion in the Branding
gallery is required regardless of which wordmark treatment is used here.
