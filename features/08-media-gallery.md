# Feature 08 — Complete Media Gallery (All 32 Records)

Exposes the complete archive of 32 supplied media assets (12 photos/graphics, 20 videos)
under `#gallery`:

1. **Vehicles** (9 items: 2 photos, 7 videos)
2. **Motorcycles** (8 items: 4 photos, 4 videos)
3. **Shipping & Logistics** (6 items: 6 videos)
4. **Showroom & Lot Visits** (3 items: 3 videos)
5. **Company Brand** (1 item: 1 logo graphic)
6. **Promotional Graphics** (5 items: 5 archived graphics with clear historical disclaimers)

## Implementation Requirements:
- Dynamic category counts derived directly from `mediaGallery` array so counts never drift.
- Load More pagination (12 items per batch).
- Accessible modal viewer:
  - Tab/Shift+Tab focus trap inside dialog.
  - Background marked inert / aria-hidden.
  - Escape key dismisses and restores focus to opener element.
  - Arrow navigation ignores events when user is interacting with `<video>` controls.
  - Responsive dialog without rigid 360px height constraint for landscape mobile viewports.
  - Neutral captions without internal source IDs (`#sourceId`) or implementation terms in visitor UI.

