# Feature 01 — Design System & Tokens
Configure the design tokens from `context/ui-context.md` in `tailwind.config.js`
and `src/index.css`: accents `p1`–`p5` (p1 = deep gold), surfaces `s1`–`s5`,
gradients `g1`–`g8`, type scale (`h1`–`h6`, `body-1`, `body-2`, `caption`),
glow helpers (`inner-before`, `glow-before`, `glow-after`), and the
desktop-first breakpoints (`max-lg`, `max-md`, `max-sm`). No components yet.
Done when a test render shows every token correctly and the tracker is updated.

Media design must also follow `context/media-requirements.md`: the complete
32-file Media Gallery uses the editorial typography, restrained borders,
visible focus states, filter controls, image frames, and video poster/play
states. Reserve stable aspect ratios so media loading does not shift the page.
Glow helpers are available utilities, not the default gallery treatment; the
editorial direction in `context/ui-context.md` governs their use. Do not build
the gallery in this feature or impose a limit on its number of videos.
