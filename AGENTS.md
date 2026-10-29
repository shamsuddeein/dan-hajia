# Application Building Context — Dan Hajiya Investment Website

Read the following files in order before implementing or making any architectural decision:

1. `context/project-overview.md`
2. `context/client-content.md`
3. `context/architecture.md`
4. `context/ui-context.md`
5. `context/code-standards.md`
6. `context/ai-workflow-rules.md`
7. `context/progress-tracker.md`
8. `context/media-requirements.md`

This build adapts the **Modern SaaS Landing Page Architecture** skill `SKILL.md`
(`modern-saas-landing-page-architect`): use its reusable architecture patterns.
The site is structured as a **professional company profile with an introduction
to the owner and evidence of the company's work**, rather than an e-commerce
shop with sample priced products.

The section sequence is:
**Introduction (Hero) → Company & Owner (About) → What We Do (Activities) → Selected Work → Complete Gallery → Process & FAQ → Company Details & Contact**.

The project-specific editorial styling in `context/ui-context.md` and complete
media coverage in `context/media-requirements.md` take precedence over generic
SaaS examples. Pricing and sample catalogues are replaced by honest business
activities and documentary selected work; app download becomes direct contact.

Items marked **[OWNER TO SUPPLY]** are facts only the business owner can give.
Never invent a value for one. Keep the marker visible in internal documents,
omit unconfirmed claims from the public UI, and record the gap under Open
Questions in `context/progress-tracker.md`. Missing contextual captions must
not exclude gallery media: use neutral visual descriptions instead.

Update `context/progress-tracker.md` after each meaningful implementation change.

## Complete media requirement

Include all **32 supplied files (12 images and 20 videos)** in the Media Gallery,
linked from the header at `#gallery`. Reconcile `mediaGallery` against
`media/media-manifest.json`. Include vehicles (9), motorcycles (8), shipping (6),
visits (3), branding (1), and promotional graphics (5). Hero/selected work
display a relevant selection; the complete collection remains accessible
through filters and Load More. Archived promotional graphics do not indicate
current stock or pricing. There is no total video-count cap: use posters,
click-to-play, and on-demand sources so videos do not download before playback.
Detailed acceptance criteria are in `context/media-requirements.md`.
