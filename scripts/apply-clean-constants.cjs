const fs = require('fs');
const path = require('path');

const cleanItems = JSON.parse(fs.readFileSync(path.join(__dirname, 'gallery-items-clean.json'), 'utf8'));

// Nav items aligned with Corporate Dossier / Proof structure
const updatedNav = `export const navItems = [
  { id: 'home', title: 'Home', href: 'home' },
  { id: 'about', title: 'Company Profile', href: 'about' },
  { id: 'operations', title: 'Trading Lines', href: 'operations' },
  { id: 'gallery', title: 'Proof Archive', href: 'gallery' },
  { id: 'how-to-buy', title: 'Dealing Process', href: 'how-to-buy' },
  { id: 'contact', title: 'Contact & Office', href: 'contact' },
];`;

const tradingDivisionsCode = `
// Core Business Trading Lines & Capabilities (Replaces fake e-commerce sample listings)
export const tradingDivisions = [
  {
    id: 'automotive',
    anchorId: 'cars',
    badge: 'Direct Import & Supply',
    title: 'Automotive & Commercial Vehicles',
    subtitle: 'Direct Importation, Luxury Sedans & Freight Haulage',
    description:
      'We source, import, and deliver foreign-used and direct-import motor vehicles. Every vehicle is physically inspected, customs status verified, and presented with live video walkarounds before transaction.',
    highlights: [
      'Pre-shipment live video walkarounds and engine runs',
      'Port clearance and customs documentation handling',
      'In-person inspection welcome at our Kaduna facility',
      'Road freight delivery across West Africa & global shipping',
    ],
    gallerySlug: 'vehicles',
    galleryCount: 9,
    enquiryTopic: 'Automotive sourcing and vehicle import enquiry',
  },
  {
    id: 'lands',
    anchorId: 'lands',
    badge: 'Title Verified',
    title: 'Verified Land Assets & Surveyed Plots',
    subtitle: 'Kaduna Residential & Commercial Land with Legitimate Title',
    description:
      'We acquire and facilitate the transfer of verifiable land parcels across strategic locations in Kaduna State. Every plot is backed by authentic title documents and verified directly through the Kaduna lands registry.',
    highlights: [
      'Documented Certificate of Occupancy (C of O) or allocation letters',
      'Full boundary surveys and cadastral identification',
      'Direct lands registry verification before payment',
      'Physical site visits and perimeter walkthroughs welcome',
    ],
    gallerySlug: 'shipping',
    galleryCount: null,
    enquiryTopic: 'Land parcel availability and title verification',
  },
  {
    id: 'properties',
    anchorId: 'houses',
    badge: 'Physical Walkthrough',
    title: 'Residential Houses & Built Properties',
    subtitle: 'Completed Homes & Residential Developments with Direct Handover',
    description:
      'Residential housing solutions in Kaduna, including modern duplexes and family residences. We provide complete structural walkthroughs, verify ownership provenance, and manage formal deed transitions.',
    highlights: [
      'Physical interior and exterior property walkthroughs',
      'Clear title documents held and verified before sale',
      'Structured formal handover and legal documentation',
      'Representation-friendly inspections for diaspora buyers',
    ],
    gallerySlug: 'visits',
    galleryCount: null,
    enquiryTopic: 'Residential house purchase and property inspection',
  },
  {
    id: 'electronics',
    anchorId: 'phones',
    badge: 'Original Hardware',
    title: 'Original Mobile Devices & Electronics',
    subtitle: 'Wholesale & Retail Original Handsets for Domestic & Regional Dealers',
    description:
      'Direct supply of genuine, factory-unlocked smartphones and electronics. Specializing in high-grade UK-used and brand-new sealed devices with verified battery health and hardware integrity.',
    highlights: [
      'Guaranteed original devices — zero refurbished clones',
      'Battery health verification (88%+ on UK-used stock)',
      'Wholesale export pricing for cross-border dealers',
      'Physical device testing prior to purchase',
    ],
    gallerySlug: 'branding',
    galleryCount: null,
    enquiryTopic: 'Bulk electronics supply and smartphone wholesale',
  },
];
`;

const galleryCategoriesCode = `
// Gallery Categories — Focused 100% on Real Documentary Proof (27 authentic assets)
export const galleryCategories = [
  { slug: 'all', label: 'All Proof Assets', count: 27 },
  { slug: 'vehicles', label: 'Vehicles', count: 9 },
  { slug: 'motorcycles', label: 'Motorcycles', count: 8 },
  { slug: 'shipping', label: 'Shipping & Logistics', count: 6 },
  { slug: 'visits', label: 'Showroom & Lot Visits', count: 3 },
  { slug: 'branding', label: 'Company Brand', count: 1 },
];

// Canonical Media Gallery — 27 verified documentary records (7 images, 20 videos)
export const mediaGallery = ` + JSON.stringify(cleanItems, null, 2) + `;

// Derived proof gallery (retained for backward compatibility)
export const proofGallery = mediaGallery.filter((item) => item.category === 'visits');
`;

const constantsPath = path.join(__dirname, '..', 'src', 'constants', 'index.js');
let content = fs.readFileSync(constantsPath, 'utf8');

// Replace navItems
content = content.replace(/export const navItems = \[[\s\S]*?\];/, updatedNav);

// Insert tradingDivisions before catalogue arrays or replacing them
if (!content.includes('export const tradingDivisions =')) {
  const insertTarget = '// Catalogue: Cars';
  content = content.replace(insertTarget, tradingDivisionsCode + '\n' + insertTarget);
}

// Replace galleryCategories and mediaGallery
const galleryIdx = content.indexOf('// Gallery Categories');
if (galleryIdx !== -1) {
  const footerIdx = content.indexOf('// Footer details');
  content = content.slice(0, galleryIdx) + galleryCategoriesCode + '\n' + content.slice(footerIdx);
}

fs.writeFileSync(constantsPath, content, 'utf8');
console.log('Successfully updated src/constants/index.js with clean corporate profile and proof data!');

