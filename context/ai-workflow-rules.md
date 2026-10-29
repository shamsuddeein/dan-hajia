# AI Workflow Rules

## Approach

Build this project incrementally using a spec-driven workflow. The context
files define what to build, how to build it, and the current state of
progress. Always implement against these specs — do not infer or invent
behaviour from scratch. The build adapts the Modern SaaS Landing Page
Architecture skill; its five pillars and verification checklist apply.

## Scoping Rules

- Work on one feature unit at a time, in the numbered order in `features/`.
- Prefer small, verifiable increments over large speculative changes.
- Do not combine unrelated system boundaries in a single implementation step.

## When to Split Work

Split an implementation step if it combines:

- Two catalogue sections in one step
- Content transcription and component building in one step
- Behaviour not clearly defined in the context files

If a change cannot be verified end to end quickly, the scope is too broad —
split it.

## Handling Missing Requirements

- Do not invent product behaviour — or any business fact — not defined in the
  context files.
- Facts only the owner can supply are marked `[OWNER TO SUPPLY]` in
  `client-content.md`. Build around the gap, keep the marker out of the
  shipped UI (omit the element), and record the item as an open question in
  `progress-tracker.md`, tied to the feature that needs it.
- If a requirement is ambiguous, resolve it in the relevant context file
  before implementing. For media, `media-requirements.md` is authoritative:
  include every source using a neutral description when context is unknown.
  Do not confuse missing product facts with missing permission to include
  the supplied image/video in the complete gallery.
- Sample values are prefixed `SAMPLE` and never survive to launch.

## Protected Files

Do not modify the following unless explicitly instructed:

- `context/client-content.md` facts — the agent transcribes owner answers
  into it but never originates a fact there
- The Modern SaaS Landing Page Architecture skill document itself
- Any third-party library internals

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes:

- System architecture or boundaries
- Storage model decisions
- Code conventions or standards
- Feature scope

## Before Moving to the Next Unit

1. The current unit works end to end within its defined scope.
2. No invariant defined in `architecture.md` was violated.
3. `progress-tracker.md` reflects the completed work.
4. `npm run build` passes.

## Final Verification (before the site is called done)

- [ ] Zero raw hex codes in components
- [ ] Single navigation DOM, reused on mobile
- [ ] Scroll listeners cleaned up
- [ ] Oversized artwork cannot cause horizontal scrolling or block clicks
- [ ] All content imported from `src/constants`
- [ ] Every gallery entry traces to a supplied manifest source; captions
  describe visible content or confirmed facts, and graphics are labelled
- [ ] All `SAMPLE` product data removed; prices on current catalogue offers are
  owner-confirmed. Supplied promotional graphics remain labelled archive
  material; embedded prices are not presented as confirmed current offers
- [ ] WhatsApp buttons (hero, cards, floating) open the owner's real number
- [ ] Business name and address spelled exactly as the owner supplied them
- [ ] No unconfirmed draft copy remains live
- [ ] All 32 unique sources (12 images, 20 videos) are accessible through
  Gallery, every filter and Load more/pagination; all asset URLs resolve
- [ ] All 20 complete videos can play, with posters and no MP4 download before
  a play request; no autoplay or simultaneous playback
- [ ] Original files remain intact and derivatives map to source IDs
- [ ] The complete checklist in `media-requirements.md` passes
- [ ] Page loads acceptably on a phone over a slow connection

## Media scope update — 2026-10-28

The user explicitly requires all supplied media on the website. Apply
`media-requirements.md` and reconcile prior completed work where necessary;
do not retain any earlier two-video cap or proof-only gallery scope. Instruction
updates do not constitute user approval of a feature or completion of gallery
implementation. Gemini continues the numbered implementation/review workflow.
