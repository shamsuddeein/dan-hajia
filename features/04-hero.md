# Feature 04 — Hero: Business Identity
Build the hero per skill Phase 4: `Element name="hero"` with `overflow-hidden`;
left column carries the headline, sub-line, and buttons from
`client-content.md` section D; right/background shows the owner's best real
shop or stock photo (`pointer-events-none` where it overlaps). Under the hero,
the trust strip (years • city • countries shipped to). The WhatsApp button is
the polymorphic Button with a link generated only from confirmed
`business.publicContacts.whatsappNumber`. Until it is confirmed, keep the
WhatsApp action unavailable or omit it, record the missing contact in the
tracker, and do not fall back to a CAC-form number or placeholder link.
Done when a first-time visitor can state the business, goods,
and location after one glance, with no horizontal scroll on mobile.

Use a suitable supplied photograph selected from `mediaGallery`, with its
source ID retained; choosing one hero image does not exclude any of the other
31 files from the complete gallery. Link to `#gallery` where the composition
calls for a gallery action. Follow `context/media-requirements.md`: prioritize
only the hero image, lazy-load images below the fold, and do not autoplay or
eagerly download video. Use factual visual captions; an overseas/snowy vehicle
image must not be presented as the Kaduna premises. Unknown trust-strip
facts remain internal pending fields and are omitted from the public UI.
