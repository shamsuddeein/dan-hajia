import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Deen/.gemini/antigravity/brain/b37255b0-62bf-452f-9450-00743d9b1fda';
const BASE_URL = 'http://localhost:5173';

let totalAssertions = 0;
let failedAssertions = 0;

function assert(condition, message) {
  totalAssertions++;
  if (!condition) {
    failedAssertions++;
    console.error(`❌ ASSERTION FAILED: ${message}`);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

async function run() {
  console.log('=====================================================');
  console.log('   STARTING ENFORCED VERIFICATION & REGRESSION SUITE  ');
  console.log('=====================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Track console warnings (e.g. Chromium blocked aria-hidden warning)
  const consoleWarnings = [];
  page.on('console', (msg) => {
    if (msg.type() === 'warning' || msg.type() === 'error') {
      consoleWarnings.push(msg.text());
    }
  });

  // Track MP4 network requests
  const mp4Requests = [];
  page.on('request', (req) => {
    if (req.url().endsWith('.mp4')) {
      mp4Requests.push(req.url());
    }
  });

  // -------------------------------------------------------------------------
  // 1. Initial Page Load & Zero-Preload MP4 Check
  // -------------------------------------------------------------------------
  console.log('[SECTION 1] Initial Page Load & Network Audit...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  assert(mp4Requests.length === 0, `Zero initial MP4 downloads before playback (detected: ${mp4Requests.length})`);

  // -------------------------------------------------------------------------
  // 2. Responsive Grid Columns Assertions (1440, 1024, 768, 390)
  // -------------------------------------------------------------------------
  console.log('\n[SECTION 2] Verifying Responsive Breakpoints & Grid Columns...');

  // 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(300);
  const actCols1440 = await page.evaluate(() => {
    const grid = document.querySelector('#what-we-do .grid');
    return window.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  });
  assert(actCols1440 === 2, `Activities grid has 2 columns at 1440px (computed: ${actCols1440})`);

  const galCols1440 = await page.evaluate(() => {
    const grid = document.querySelector('#gallery .grid');
    return window.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  });
  assert(galCols1440 === 4, `Gallery grid has 4 columns at 1440px (computed: ${galCols1440})`);

  // 1024px
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.waitForTimeout(300);
  const galCols1024 = await page.evaluate(() => {
    const grid = document.querySelector('#gallery .grid');
    return window.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  });
  assert(galCols1024 === 3, `Gallery grid has 3 columns at 1024px (computed: ${galCols1024})`);

  // 768px
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(300);
  const galCols768 = await page.evaluate(() => {
    const grid = document.querySelector('#gallery .grid');
    return window.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  });
  assert(galCols768 === 2, `Gallery grid has 2 columns at 768px (computed: ${galCols768})`);

  // 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  const galCols390 = await page.evaluate(() => {
    const grid = document.querySelector('#gallery .grid');
    return window.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  });
  assert(galCols390 === 1, `Gallery grid has 1 column at 390px (computed: ${galCols390})`);

  // -------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer: Background Color & Focus Trapping
  // -------------------------------------------------------------------------
  console.log('\n[SECTION 3] Verifying Mobile Drawer Focus Trap & Background Styling...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(300);

  const toggleBtn = page.locator('button[aria-label="Open mobile navigation menu"]');
  await toggleBtn.click();
  await page.waitForTimeout(300);

  const drawerLocator = page.locator('#mobile-navigation-drawer');
  assert(await drawerLocator.isVisible(), 'Mobile drawer is visible after scroll');

  // Verify computed background color is opaque dark charcoal
  const drawerBg = await page.evaluate(() => {
    const el = document.getElementById('mobile-navigation-drawer');
    return window.getComputedStyle(el).backgroundColor;
  });
  const isOpaqueBg =
    drawerBg.includes('rgba(10, 10, 11') ||
    drawerBg.includes('rgb(10, 10, 11)') ||
    drawerBg.includes('rgba(10, 10, 11, 0.98)');
  assert(isOpaqueBg, `Mobile drawer background is opaque dark charcoal (computed: "${drawerBg}")`);

  // Verify background (#root) is marked inert
  const isRootInertWithDrawer = await page.evaluate(() => {
    return document.getElementById('root')?.hasAttribute('inert');
  });
  assert(isRootInertWithDrawer, 'Background (#root) is marked inert while mobile drawer is open');

  // Verify initial focus is on close button inside drawer
  const closeBtnFocused = await page.evaluate(() => {
    return document.activeElement?.getAttribute('aria-label') === 'Close navigation menu';
  });
  assert(closeBtnFocused, 'Initial focus inside drawer is on the close button');

  // Get all focusable elements in drawer
  const drawerFocusableCount = await page.evaluate(() => {
    const drawer = document.getElementById('mobile-navigation-drawer');
    return drawer.querySelectorAll('button, [href]').length;
  });

  // Tab through all elements to verify focus wrap
  for (let i = 0; i < drawerFocusableCount - 1; i++) {
    await page.keyboard.press('Tab');
  }

  // Next Tab must wrap to the first element (close button)
  await page.keyboard.press('Tab');
  const wrappedToFirst = await page.evaluate(() => {
    return document.activeElement?.getAttribute('aria-label') === 'Close navigation menu';
  });
  assert(wrappedToFirst, 'Tab wrapped from last element back to first element in mobile drawer');

  // Shift+Tab from first element must wrap to last element
  await page.keyboard.press('Shift+Tab');
  const wrappedToLast = await page.evaluate(() => {
    const drawer = document.getElementById('mobile-navigation-drawer');
    const focusable = drawer.querySelectorAll('button, [href]');
    return document.activeElement === focusable[focusable.length - 1];
  });
  assert(wrappedToLast, 'Shift+Tab wrapped from first element back to last element in mobile drawer');

  // Dismiss via Escape and verify focus restoration
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  assert(!(await drawerLocator.isVisible()), 'Mobile drawer closed via Escape key');

  const focusRestoredToToggle = await page.evaluate(() => {
    return document.activeElement?.getAttribute('aria-label') === 'Open mobile navigation menu';
  });
  assert(focusRestoredToToggle, 'Focus restored to hamburger toggle button upon drawer dismissal');

  const isRootInertRemoved = await page.evaluate(() => {
    return !document.getElementById('root')?.hasAttribute('inert');
  });
  assert(isRootInertRemoved, 'Inert attribute cleanly removed from background after drawer dismissal');

  // -------------------------------------------------------------------------
  // 4. Portrait Media Sizing in 844×390 Landscape (Regression for Source 24)
  // -------------------------------------------------------------------------
  console.log('\n[SECTION 4] Testing Portrait Media Sizing in 844x390 Landscape Viewport...');
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Filter to Visits category (contains portrait video source 24)
  const visitsBtn = page.locator('#gallery button:has-text("Showroom & Lot Visits")');
  await visitsBtn.click();
  await page.waitForTimeout(400);

  // Click card for Source 24 ("Showroom Motorcycle Display Visit")
  const source24Card = page.locator('#gallery button[aria-label*="Showroom Motorcycle Display Visit"]');
  await source24Card.click();
  await page.waitForTimeout(600);

  const modalPortal = page.locator('#gallery-dialog-portal');
  assert(await modalPortal.isVisible(), 'Gallery modal portal is visible in 844x390 landscape');

  // Check portal location in DOM
  const isDirectChildOfBody = await page.evaluate(() => {
    const el = document.getElementById('gallery-dialog-portal');
    return el && el.parentElement === document.body;
  });
  assert(isDirectChildOfBody, 'Gallery modal dialog is rendered through portal as direct child of document.body');

  // Measure video bounds vs container and viewport bounds
  const mediaGeometry = await page.evaluate(() => {
    const video = document.querySelector('#gallery-dialog-portal video');
    const container = video?.parentElement;
    const closeBtn = document.querySelector('#gallery-dialog-portal button[aria-label="Close media viewer"]');
    const footer = document.querySelector('#gallery-dialog-portal .py-2\\.5.px-4');

    if (!video || !container) return null;

    const vRect = video.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    const closeRect = closeBtn ? closeBtn.getBoundingClientRect() : null;
    const footerRect = footer ? footer.getBoundingClientRect() : null;

    return {
      videoHeight: vRect.height,
      videoWidth: vRect.width,
      videoBottom: vRect.bottom,
      containerHeight: cRect.height,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      closeBtnVisible: closeRect && closeRect.top >= 0 && closeRect.bottom <= window.innerHeight,
      footerVisible: footerRect && footerRect.top >= 0 && footerRect.bottom <= window.innerHeight,
    };
  });

  assert(mediaGeometry !== null, 'Found video element inside modal dialog');
  if (mediaGeometry) {
    console.log(`Measured Geometry: videoHeight=${mediaGeometry.videoHeight.toFixed(1)}px, containerHeight=${mediaGeometry.containerHeight.toFixed(1)}px, windowHeight=${mediaGeometry.windowHeight}px`);

    assert(
      mediaGeometry.videoHeight <= mediaGeometry.containerHeight + 1,
      `Portrait video height (${mediaGeometry.videoHeight.toFixed(1)}px) fits inside container height (${mediaGeometry.containerHeight.toFixed(1)}px)`
    );
    assert(
      mediaGeometry.videoBottom <= mediaGeometry.windowHeight,
      `Portrait video bottom edge (${mediaGeometry.videoBottom.toFixed(1)}px) is within viewport (${mediaGeometry.windowHeight}px)`
    );
    assert(
      mediaGeometry.videoHeight < 300,
      `Portrait video is NOT expanded to 1412px (actual height: ${mediaGeometry.videoHeight.toFixed(1)}px)`
    );
    assert(mediaGeometry.closeBtnVisible, 'Modal close button is fully visible in landscape');
    assert(mediaGeometry.footerVisible, 'Modal caption footer is fully visible in landscape');
  }

  // Capture landscape screenshot for evidence
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit-landscape-video-source-24.png') });

  // Close modal via Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  assert(!(await modalPortal.isVisible()), 'Gallery modal closed cleanly via Escape');

  // Check no blocked aria-hidden warnings occurred
  const ariaHiddenWarnings = consoleWarnings.filter((w) => w.includes('aria-hidden'));
  assert(ariaHiddenWarnings.length === 0, `No blocked aria-hidden console warnings (count: ${ariaHiddenWarnings.length})`);

  // -------------------------------------------------------------------------
  // 4B. Desktop Media Viewer Bounded Height & Focus Restoration Across Close Triggers
  // -------------------------------------------------------------------------
  console.log('\n[SECTION 4B] Testing Desktop Media Viewer Height (1440x900) & Focus Restoration...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // 1. Desktop Bounded Height Verification (Source 1 - Image)
  const card1Button = page.locator('#gallery .grid > div').first().locator('button').first();
  await card1Button.click();
  await page.waitForTimeout(400);

  const desktopModalPortal = page.locator('#gallery-dialog-portal');
  assert(await desktopModalPortal.isVisible(), 'Gallery modal is visible on desktop (1440x900)');

  const desktopGeometry = await page.evaluate(() => {
    const portal = document.getElementById('gallery-dialog-portal');
    const dialog = portal?.querySelector('.relative.z-10.bg-s2') || portal;
    const mediaContainer = portal?.querySelector('img, video')?.parentElement;
    const imgOrVideo = mediaContainer?.querySelector('img, video');
    if (!dialog || !mediaContainer) return null;

    const dRect = dialog.getBoundingClientRect();
    const cRect = mediaContainer.getBoundingClientRect();
    const mRect = imgOrVideo ? imgOrVideo.getBoundingClientRect() : null;

    return {
      dialogHeight: dRect.height,
      dialogWidth: dRect.width,
      containerHeight: cRect.height,
      containerWidth: cRect.width,
      mediaHeight: mRect ? mRect.height : null,
      mediaWidth: mRect ? mRect.width : null,
      windowHeight: window.innerHeight,
    };
  });

  assert(desktopGeometry !== null, 'Desktop modal dialog and media container found');
  if (desktopGeometry) {
    console.log(`Desktop Geometry at 1440x900: containerHeight=${desktopGeometry.containerHeight.toFixed(1)}px, dialogHeight=${desktopGeometry.dialogHeight.toFixed(1)}px`);
    assert(
      desktopGeometry.containerHeight >= 500 && desktopGeometry.containerHeight <= 600,
      `Desktop media container height is bounded and prominent (~540px, actual: ${desktopGeometry.containerHeight.toFixed(1)}px)`
    );
    assert(
      desktopGeometry.dialogHeight >= 550 && desktopGeometry.dialogHeight <= 880,
      `Desktop dialog height utilizes available desktop space (~630px, actual: ${desktopGeometry.dialogHeight.toFixed(1)}px)`
    );
    assert(
      desktopGeometry.containerHeight > 250,
      `Desktop media container is NOT collapsed to 180px minimum (actual: ${desktopGeometry.containerHeight.toFixed(1)}px)`
    );
  }

  // Capture desktop modal screenshot for verification evidence
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit-desktop-modal-1440x900.png') });

  // 2. Navigation check: Next button does NOT restore focus to opener while modal is open
  const nextBtn = page.locator('#gallery-dialog-portal button[aria-label="Next media record"]');
  await nextBtn.click();
  await page.waitForTimeout(300);

  const focusDuringNavigation = await page.evaluate(() => {
    const active = document.activeElement;
    const dialog = document.getElementById('gallery-dialog-portal');
    return {
      activeInDialog: dialog ? dialog.contains(active) : false,
      activeTag: active ? active.tagName : null,
      activeAriaLabel: active ? active.getAttribute('aria-label') : null,
    };
  });
  assert(focusDuringNavigation.activeInDialog, 'Focus remains inside gallery dialog during record navigation');

  // 3. Focus Restoration Check A: Escape Key
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  const focusRestoredAfterEscape = await page.evaluate(() => {
    const active = document.activeElement;
    const card1Btn = document.querySelector('#gallery .grid > div:first-child button');
    const isRootInert = document.getElementById('root')?.hasAttribute('inert');
    return {
      isExactOpener: active === card1Btn,
      isRootInert,
      activeTag: active?.tagName,
      activeText: active?.textContent?.trim()?.slice(0, 30),
    };
  });
  assert(focusRestoredAfterEscape.isExactOpener, 'Focus restored to exact thumbnail opener after Escape key dismissal');
  assert(!focusRestoredAfterEscape.isRootInert, 'Root is no longer inert after Escape key dismissal');

  // 4. Focus Restoration Check B: Close Button Click
  const card2Button = page.locator('#gallery .grid > div').nth(1).locator('button').first();
  await card2Button.click();
  await page.waitForTimeout(400);
  assert(await desktopModalPortal.isVisible(), 'Modal opened for Card 2');

  const closeButton = page.locator('#gallery-dialog-portal button[aria-label="Close media viewer"]');
  await closeButton.click();
  await page.waitForTimeout(300);

  const focusRestoredAfterCloseBtn = await page.evaluate(() => {
    const active = document.activeElement;
    const card2Btn = document.querySelectorAll('#gallery .grid > div')[1]?.querySelector('button');
    const isRootInert = document.getElementById('root')?.hasAttribute('inert');
    return {
      isExactOpener: active === card2Btn,
      isRootInert,
      activeTag: active?.tagName,
    };
  });
  assert(focusRestoredAfterCloseBtn.isExactOpener, 'Focus restored to exact thumbnail opener after Close button click');
  assert(!focusRestoredAfterCloseBtn.isRootInert, 'Root is no longer inert after Close button dismissal');

  // 5. Focus Restoration Check C: Backdrop Click
  const card3Button = page.locator('#gallery .grid > div').nth(2).locator('button').first();
  await card3Button.click();
  await page.waitForTimeout(400);
  assert(await desktopModalPortal.isVisible(), 'Modal opened for Card 3');

  // Click backdrop outside modal card (e.g. at top-left 30, 30)
  await page.mouse.click(30, 30);
  await page.waitForTimeout(300);

  const focusRestoredAfterBackdrop = await page.evaluate(() => {
    const active = document.activeElement;
    const card3Btn = document.querySelectorAll('#gallery .grid > div')[2]?.querySelector('button');
    const isRootInert = document.getElementById('root')?.hasAttribute('inert');
    return {
      isExactOpener: active === card3Btn,
      isRootInert,
      activeTag: active?.tagName,
    };
  });
  assert(focusRestoredAfterBackdrop.isExactOpener, 'Focus restored to exact thumbnail opener after Backdrop click dismissal');
  assert(!focusRestoredAfterBackdrop.isRootInert, 'Root is no longer inert after Backdrop dismissal');

  // -------------------------------------------------------------------------
  // 5. Cross-Section Single Video Playback Coordination
  // -------------------------------------------------------------------------
  console.log('\n[SECTION 5] Testing Page-Wide Single Video Playback Coordination...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // 1. Start Selected Work video
  const selectedWorkPlayBtn = page.locator('#our-work button[aria-label*="Play video"]').first();
  await selectedWorkPlayBtn.click();
  await page.waitForTimeout(600);

  const isSelectedWorkPlaying = await page.evaluate(() => {
    const video = document.querySelector('#our-work video');
    return video && !video.paused;
  });
  assert(isSelectedWorkPlaying, 'Selected Work video started playing');

  // 2. Filter to Vehicles category and open a Gallery modal video (e.g. source 13)
  const vehiclesFilterBtn = page.locator('#gallery button:has-text("Vehicles")');
  await vehiclesFilterBtn.click();
  await page.waitForTimeout(400);

  const galleryVideoCard = page.locator('#gallery button[aria-label*="White Mercedes-Benz Sedan"]').first();
  await galleryVideoCard.click();
  await page.waitForTimeout(800);

  // Verify Gallery modal video is playing
  const isGalleryModalPlaying = await page.evaluate(() => {
    const video = document.querySelector('#gallery-dialog-portal video');
    return video && !video.paused;
  });
  assert(isGalleryModalPlaying, 'Gallery modal video started playing');

  // Verify Selected Work video was paused
  const isSelectedWorkPaused = await page.evaluate(() => {
    const video = document.querySelector('#our-work video');
    return video && video.paused;
  });
  assert(isSelectedWorkPaused, 'Selected Work video was automatically PAUSED when Gallery video started');

  // 3. Close Gallery modal: verify modal video is paused and cleaned up
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  const activeVideosCount = await page.evaluate(() => {
    const videos = Array.from(document.querySelectorAll('video'));
    return videos.filter((v) => !v.paused).length;
  });
  assert(activeVideosCount === 0, `Exactly 0 playing videos across page after modal close (count: ${activeVideosCount})`);

  // -------------------------------------------------------------------------
  // 6. Gallery Inventory & Category Reconcile
  // -------------------------------------------------------------------------
  console.log('\n[SECTION 6] Reconciling All 32 Manifest Records & Categories...');
  const categoryFilters = [
    { label: 'All Media', expectedCount: 32 },
    { label: 'Vehicles', expectedCount: 9 },
    { label: 'Motorcycles', expectedCount: 8 },
    { label: 'Shipping & Logistics', expectedCount: 6 },
    { label: 'Showroom & Lot Visits', expectedCount: 3 },
    { label: 'Company Brand', expectedCount: 1 },
    { label: 'Promotional Graphics', expectedCount: 5 },
  ];

  for (const cat of categoryFilters) {
    const btn = page.locator(`#gallery button:has-text("${cat.label}")`);
    await btn.click();
    await page.waitForTimeout(250);

    // Click Load More if present
    const loadMore = page.locator('#gallery button:has-text("Load More")');
    while (await loadMore.isVisible()) {
      await loadMore.click();
      await page.waitForTimeout(250);
    }

    const cardCount = await page.$$eval('#gallery .grid > div', (cards) => cards.length);
    assert(cardCount === cat.expectedCount, `Category "${cat.label}" renders ${cat.expectedCount} items (actual: ${cardCount})`);
  }

  // -------------------------------------------------------------------------
  // 7. Neutral Hero Caption & Confirmed Data Verification
  // -------------------------------------------------------------------------
  console.log('\n[SECTION 7] Verifying Neutral Hero Caption & Confirmed Values...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  const heroImgAlt = await page.locator('#home img').first().getAttribute('alt');
  assert(
    heroImgAlt === 'Mercedes-Benz sedan interior from the supplied company archive',
    `Hero photo alt text uses exact neutral wording ("${heroImgAlt}")`
  );

  const heroCaption = await page.locator('#home .font-serif.text-sm').innerText();
  const heroSubCaption = await page.locator('#home .font-mono.text-\\[10px\\]').innerText();
  assert(heroCaption.includes('Mercedes-Benz Luxury Interior'), 'Hero caption has neutral title');
  assert(heroSubCaption.includes('supplied company archive'), `Hero sub-caption uses neutral description ("${heroSubCaption}")`);
  assert(!heroCaption.includes('Import Inventory'), 'Hero caption does not make unconfirmed "Import Inventory" claim');
  assert(!heroSubCaption.includes('Documented vehicle import record'), 'Hero caption does not make unconfirmed "Documented vehicle import record" claim');

  await browser.close();

  // -------------------------------------------------------------------------
  // Final Evaluation
  // -------------------------------------------------------------------------
  console.log('\n=====================================================');
  console.log(`TOTAL ASSERTIONS: ${totalAssertions}`);
  console.log(`PASSED: ${totalAssertions - failedAssertions}`);
  console.log(`FAILED: ${failedAssertions}`);
  console.log('=====================================================');

  if (failedAssertions > 0) {
    console.error(`\n❌ VERIFICATION FAILED: ${failedAssertions} assertion(s) failed.`);
    process.exit(1);
  } else {
    console.log('\n✅ ALL VERIFICATION ASSERTIONS PASSED WITH ZERO FAILURES.\n');
    process.exit(0);
  }
}

run().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
