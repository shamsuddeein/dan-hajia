const fs = require('fs');
const path = require('path');

const all32Items = JSON.parse(fs.readFileSync(path.join(__dirname, 'all-32-items.json'), 'utf8'));

const constantsContent = `/**
 * Single source of truth for all content, company profile details, and media records.
 * Follows the corporate profile structure: Introduction, Company & Owner, What We Do,
 * Selected Work, Complete 32-Item Media Archive, Dealing Process, and Contact.
 */

// Helper to format Nigerian Naira (NGN)
export const formatNgn = (val) => {
  if (typeof val !== 'number') return val;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(val);
};

// Helper to format USD
export const formatUsd = (val) => {
  if (typeof val !== 'number') return val;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val);
};

// Company Identity, CAC Verification Evidence & Confirmed Public Contacts
export const business = {
  name: 'Dan Hajiya Investment',
  registeredLegalName: 'DAN HAJIYA INVESTMENT 19 LTD',
  rcNumber: '', // Awaits CAC certificate issuance
  cacStatus: 'CAC registration in progress: DAN HAJIYA INVESTMENT 19 LTD (Step 1 Company Details completed 2026-10-28)',
  yearsInBusiness: '', // Omitted from public claims until confirmed

  // Confirmed contact channels (from CAC registration portal)
  publicContacts: {
    phone: '+234 810 955 8828',
    whatsappNumber: '2348109558828',
    email: 'umarfarukabubakar19s@gmail.com',
    postCode: '800283',
    plusCode: 'HCHR+M9F',
    streetName: 'HCHR+M9F, Hayan Banki, Kaduna, Nigeria',
    address:
      'No U11, Barrack Road, Hayan Banki, Kaduna (Post Code: 800283, Location Code: HCHR+M9F) — Kaduna-North LGA, Kaduna State, Nigeria',
  },

  // Company leadership
  leadership: {
    title: 'Executive Leadership',
    role: 'Principal Operator & Director',
    name: 'Umar Faruk Abubakar', // Name recorded on CAC incorporation form
    bio: '', // Omitted from public UI until owner provides confirmed biography
  },

  social: {
    instagram: '',
    facebook: '',
  },
  shopPhotos: [],
};

// Helper to generate WhatsApp enquiry URL with pre-filled enquiry topic
export const getWhatsAppEnquiryUrl = (topic = '') => {
  const whatsappNumber = business.publicContacts?.whatsappNumber;
  if (!whatsappNumber) return null;
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const text = topic
    ? \`Hello Dan Hajiya Investment, I would like to make an enquiry regarding: \${topic}.\`
    : \`Hello Dan Hajiya Investment, I would like to make an enquiry regarding your business services.\`;
  return \`https://wa.me/\${cleanNumber}?text=\${encodeURIComponent(text)}\`;
};

// Navigation Items: Clean, company-oriented six links
export const navItems = [
  { id: 'about', title: 'About', href: 'about' },
  { id: 'what-we-do', title: 'What We Do', href: 'what-we-do' },
  { id: 'our-work', title: 'Our Work', href: 'our-work' },
  { id: 'gallery', title: 'Gallery', href: 'gallery' },
  { id: 'process', title: 'Process', href: 'process' },
  { id: 'contact', title: 'Contact', href: 'contact' },
];

// Hero Section Content
export const heroContent = {
  eyebrow: 'Kaduna Headquarters • Commercial Profile & Operations',
  headline: 'Commercial Trading, Vehicle Importation & Property Sourcing.',
  subline:
    'Dan Hajiya Investment is a Nigerian trading business based in Kaduna. We import vehicles, source verified land and residential properties, and supply original mobile devices with direct inspection and documented ownership.',
  ctaWhatsApp: 'Direct WhatsApp Enquiry',
  ctaOverview: 'Explore What We Do',
};

// About / Company & Owner Narrative
export const aboutContent = {
  eyebrow: 'Corporate Profile • Business Background',
  heading: 'Trading House Built on Personal Verification',
  paragraphs: [
    'Dan Hajiya Investment (DAN HAJIYA INVESTMENT 19 LTD) is a commercial trading enterprise founded and operating in Kaduna, Nigeria. The company conducts business across four primary sectors: motor vehicle importation, real estate and land sourcing, residential property, and telecommunications equipment.',
    'Rather than operating as an anonymous online marketplace, our business model relies on physical inspection, verifiable documentation, and direct principal-to-principal dealing. Every asset we handle is available for live video examination or in-person evaluation at our Kaduna facility or on site prior to transaction agreement.',
  ],
};

// Business Activities (What We Do) — Grounded, factual summaries without unsupported claims
export const businessActivities = [
  {
    id: 'automotive',
    anchorId: 'cars',
    badge: 'Vehicle Importation',
    title: 'Automotive & Commercial Vehicles',
    subtitle: 'Foreign-Used Sedans, Work Vehicles & Haulage Transport',
    description:
      'We source and supply foreign-used passenger vehicles and commercial transport units. Condition is documented via pre-shipment walkaround recordings, with customs documentation reviewed and direct physical handover arranged.',
    points: [
      'Pre-purchase video walkarounds of engine, bodywork, and interior',
      'Accompanied in-person vehicle inspection at our Kaduna facility',
      'Port clearance documentation and customs papers verified per unit',
      'Regional road transport options and destination handover',
    ],
    gallerySlug: 'vehicles',
    enquiryTopic: 'Vehicle sourcing and automotive availability',
  },
  {
    id: 'lands',
    anchorId: 'lands',
    badge: 'Land Sourcing',
    title: 'Land Parcels & Surveyed Plots',
    subtitle: 'Residential & Commercial Land Across Kaduna State',
    description:
      'Facilitating the identification and acquisition of genuine land plots in Kaduna. We coordinate on-site perimeter inspections and verify held ownership documentation (such as Certificate of Occupancy or official allocation records).',
    points: [
      'Site perimeter inspections and physical ground walkthroughs',
      'Review of documented title instruments held by sellers',
      'Assistance with registry due diligence prior to purchase',
      'Clear boundary identification and transfer coordination',
    ],
    gallerySlug: 'shipping',
    enquiryTopic: 'Kaduna land plot sourcing and title review',
  },
  {
    id: 'properties',
    anchorId: 'houses',
    badge: 'Residential Property',
    title: 'Residential Homes & Housing Units',
    subtitle: 'Duplexes & Family Residences in Kaduna',
    description:
      'Handling residential houses and modern duplexes for private buyers and diaspora investors. We arrange comprehensive structural walkthroughs and direct deed handovers with legitimate property owners.',
    points: [
      'Accompanied physical walkthroughs of building interior and exterior',
      'Inspection options for buyer-appointed local representatives',
      'Ownership document review and formal transfer coordination',
      'Direct principal communication throughout the transaction',
    ],
    gallerySlug: 'visits',
    enquiryTopic: 'Residential property inspection and purchase',
  },
  {
    id: 'electronics',
    anchorId: 'phones',
    badge: 'Original Devices',
    title: 'Mobile Devices & Telecommunications',
    subtitle: 'Original Smartphones & Hardware for Retail and Wholesale',
    description:
      'Direct supply of genuine, original smartphones and mobile accessories. We provide high-grade UK-used and brand-new sealed handsets for individual buyers and regional trade dealers.',
    points: [
      'Original brand devices verified before supply',
      'Inspection of battery health and physical condition on used stock',
      'Wholesale supply options for cross-border and regional dealers',
      'Testing and verification permitted prior to final settlement',
    ],
    gallerySlug: 'branding',
    enquiryTopic: 'Wholesale smartphone and device supply',
  },
];

// Selected Documentary Work — Connecting real activities directly to supplied proof media
export const selectedWork = [
  {
    id: 'work-1',
    category: 'Logistics',
    title: 'Vehicle Container Loading & Securing',
    description:
      'Documentary footage showing passenger vehicles loaded, blocked, and secured inside international shipping containers for secure freight.',
    sourceId: 22,
    mediaPath: '/media/videos/logistics/mercedes-benz-sedan-container-loading-1.mp4',
    posterPath: '/media/posters/source-22-poster.jpeg',
    type: 'video',
    duration: '0:30',
  },
  {
    id: 'work-2',
    category: 'Port Operations',
    title: 'Ocean Cargo Vessel Vehicle Staging',
    description:
      'Commercial vehicles staged at deepwater ocean port docks alongside international maritime cargo vessels ready for maritime shipment.',
    sourceId: 31,
    mediaPath: '/media/videos/logistics/port-cargo-ship-and-vehicles-1.mp4',
    posterPath: '/media/posters/source-31-poster.jpeg',
    type: 'video',
    duration: '0:43',
  },
  {
    id: 'work-3',
    category: 'Vehicle Inspection',
    title: 'Luxury Sedan Warehouse Walkaround',
    description:
      'Comprehensive exterior, wheel, and panel walkaround recording of black Mercedes-Benz luxury sedan documented in storage warehouse.',
    sourceId: 19,
    mediaPath: '/media/videos/stock/cars/black-mercedes-benz-sedan/black-mercedes-benz-sedan-warehouse-walkaround-1.mp4',
    posterPath: '/media/posters/source-19-poster.jpeg',
    type: 'video',
    duration: '0:41',
  },
  {
    id: 'work-4',
    category: 'Motorcycles',
    title: 'Aprilia Motorcycle Indoor Demonstration',
    description:
      'Operational engine run and display demonstration of red Aprilia sport motorcycle on showroom stand.',
    sourceId: 23,
    mediaPath: '/media/videos/stock/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-indoor-demo-1.mp4',
    posterPath: '/media/posters/source-23-poster.jpeg',
    type: 'video',
    duration: '0:18',
  },
];

// Gallery Category definitions (counts derived from mediaGallery)
export const galleryCategories = [
  { slug: 'all', label: 'All Media' },
  { slug: 'vehicles', label: 'Vehicles' },
  { slug: 'motorcycles', label: 'Motorcycles' },
  { slug: 'shipping', label: 'Shipping & Logistics' },
  { slug: 'visits', label: 'Showroom & Lot Visits' },
  { slug: 'branding', label: 'Company Brand' },
  { slug: 'promotional', label: 'Promotional Graphics' },
];

// Canonical Media Gallery — All 32 supplied manifest records (12 images, 20 videos)
export const mediaGallery = ` + JSON.stringify(all32Items, null, 2) + `;

// Dealing Process (How We Trade)
export const dealingProcess = [
  {
    step: '01',
    title: 'Initial Consultation',
    desc: 'Contact us via WhatsApp, phone, or email to discuss your vehicle, property, or equipment requirements.',
  },
  {
    step: '02',
    title: 'Verification & Inspection',
    desc: 'Review recorded walkaround footage, schedule a live interactive video call, or arrange an on-site visit to our Kaduna premises or plot.',
  },
  {
    step: '03',
    title: 'Documentation & Invoice',
    desc: 'Formal invoice and documentation issued directly on company letterhead. Payments are conducted via direct bank transfer.',
  },
  {
    step: '04',
    title: 'Dispatch & Delivery',
    desc: 'Regional road freight or international shipping arrangements coordinated with timeline and carrier tracking agreed per order.',
  },
  {
    step: '05',
    title: 'Handover & Confirmation',
    desc: 'Goods received, inspected, and title/ownership instruments handed over with continuous communication.',
  },
];

// Verified FAQ
export const companyFaqs = [
  {
    id: 'faq-1',
    question: 'How do I verify the authenticity of an item before payment?',
    answer:
      'We provide fresh high-definition walkaround video recordings of the exact unit, arrange live video inspection calls, and welcome you or your appointed local mechanic/surveyor to visit our Kaduna facility.',
  },
  {
    id: 'faq-2',
    question: 'How are payments handled for international transactions?',
    answer:
      'Payments are conducted by international bank wire transfer against a formal corporate invoice. For security and fraud prevention, corporate bank account details are never published on this website and are shared privately after contract agreement.',
  },
  {
    id: 'faq-3',
    question: 'Can you arrange delivery across West Africa and internationally?',
    answer:
      'Yes. We coordinate road delivery to neighbouring West African nations and arrange containerized ocean freight and air cargo from Nigerian ports. Specific delivery terms, costs, and carriers are confirmed per transaction.',
  },
  {
    id: 'faq-4',
    question: 'How is land and property ownership confirmed?',
    answer:
      'Every land plot or residential building we handle includes review of held title documents (Certificate of Occupancy, registered allocation, or survey plan). Clients are encouraged to verify records at the Kaduna lands registry and conduct physical site perimeter checks.',
  },
  {
    id: 'faq-5',
    question: 'Where is your physical office and facility located?',
    answer:
      'Our registered office and facility is located at No U11, Barrack Road, Hayan Banki, Kaduna (Post Code: 800283, Location Code: HCHR+M9F) in Kaduna-North LGA, Kaduna State, Nigeria.',
  },
];

// Footer details
export const footerContent = {
  registeredName: 'DAN HAJIYA INVESTMENT 19 LTD',
  brandName: 'Dan Hajiya Investment',
  address: 'No U11, Barrack Road, Hayan Banki, Kaduna (Post Code: 800283) — Kaduna-North LGA, Kaduna State, Nigeria',
  cacStatusNotice: 'CAC registration in progress: DAN HAJIYA INVESTMENT 19 LTD',
  rights: \`© \${new Date().getFullYear()} Dan Hajiya Investment. All rights reserved.\`,
  disclaimer:
    'All business transactions, invoices, and bank account transfers are conducted privately through verified direct communication.',
};

// Aliases for backward compatibility during migration
export const buyingSteps = dealingProcess;
export const faqs = companyFaqs;
export const tradingDivisions = businessActivities;
export const cars = [];
export const phones = [];
export const lands = [];
export const houses = [];
export const proofGallery = mediaGallery.filter((item) => item.category === 'visits');
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'constants', 'index.js'), constantsContent, 'utf8');
console.log('Successfully generated complete constants file!');

