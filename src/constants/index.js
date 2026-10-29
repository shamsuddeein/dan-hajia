/**
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
    ? `Hello Dan Hajiya Investment, I would like to make an enquiry regarding: ${topic}.`
    : `Hello Dan Hajiya Investment, I would like to make an enquiry regarding your business services.`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
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
export const mediaGallery = [
  {
    "id": "gallery-1",
    "sourceId": 1,
    "sourcePath": "images/cars/black-mercedes-benz-sedan/black-mercedes-benz-sedan-rear-angle-1.jpeg",
    "type": "image",
    "category": "vehicles",
    "title": "Black Mercedes-Benz Sedan — Rear Angle",
    "src": "/media/images/cars/black-mercedes-benz-sedan/black-mercedes-benz-sedan-rear-angle-1.jpeg",
    "poster": "/media/images/cars/black-mercedes-benz-sedan/black-mercedes-benz-sedan-rear-angle-1.jpeg",
    "duration": null,
    "alt": "Black Mercedes-Benz Sedan — Rear Angle",
    "caption": "Exterior rear angle of black Mercedes-Benz luxury sedan on display.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-2",
    "sourceId": 2,
    "sourcePath": "images/cars/black-mercedes-benz-sedan/mercedes-benz-sedan-red-leather-interior-1.jpeg",
    "type": "image",
    "category": "vehicles",
    "title": "Mercedes-Benz Sedan — Red Leather Interior",
    "src": "/media/images/cars/black-mercedes-benz-sedan/mercedes-benz-sedan-red-leather-interior-1.jpeg",
    "poster": "/media/images/cars/black-mercedes-benz-sedan/mercedes-benz-sedan-red-leather-interior-1.jpeg",
    "duration": null,
    "alt": "Mercedes-Benz Sedan — Red Leather Interior",
    "caption": "Interior cabin view showing red leather upholstery and center console.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-3",
    "sourceId": 3,
    "sourcePath": "images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-rear-angle-1.jpeg",
    "type": "image",
    "category": "motorcycles",
    "title": "Red Aprilia Motorcycle — Rear Angle",
    "src": "/media/images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-rear-angle-1.jpeg",
    "poster": "/media/images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-rear-angle-1.jpeg",
    "duration": null,
    "alt": "Red Aprilia Motorcycle — Rear Angle",
    "caption": "Rear three-quarter perspective of red Aprilia sport motorcycle.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-4",
    "sourceId": 4,
    "sourcePath": "images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-side-view-1.jpeg",
    "type": "image",
    "category": "motorcycles",
    "title": "Red Aprilia Motorcycle — Side Profile",
    "src": "/media/images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-side-view-1.jpeg",
    "poster": "/media/images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-side-view-1.jpeg",
    "duration": null,
    "alt": "Red Aprilia Motorcycle — Side Profile",
    "caption": "Full side profile view of red Aprilia sport motorcycle on showroom stand.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-5",
    "sourceId": 5,
    "sourcePath": "images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-front-angle-1.jpeg",
    "type": "image",
    "category": "motorcycles",
    "title": "Red Aprilia Motorcycle — Front Angle",
    "src": "/media/images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-front-angle-1.jpeg",
    "poster": "/media/images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-front-angle-1.jpeg",
    "duration": null,
    "alt": "Red Aprilia Motorcycle — Front Angle",
    "caption": "Front three-quarter perspective of red Aprilia sport motorcycle.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-6",
    "sourceId": 6,
    "sourcePath": "images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-rear-view-1.jpeg",
    "type": "image",
    "category": "motorcycles",
    "title": "Red Aprilia Motorcycle — Rear View",
    "src": "/media/images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-rear-view-1.jpeg",
    "poster": "/media/images/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-rear-view-1.jpeg",
    "duration": null,
    "alt": "Red Aprilia Motorcycle — Rear View",
    "caption": "Direct rear view of red Aprilia sport motorcycle exhaust and rear tire.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-7",
    "sourceId": 7,
    "sourcePath": "images/promotional/mercedes-benz-promotional-artwork-1.jpeg",
    "type": "image",
    "category": "promotional",
    "title": "Mercedes-Benz Automotive Artwork",
    "src": "/media/images/promotional/mercedes-benz-promotional-artwork-1.jpeg",
    "poster": "/media/images/promotional/mercedes-benz-promotional-artwork-1.jpeg",
    "duration": null,
    "alt": "Mercedes-Benz Automotive Artwork",
    "caption": "Supplied promotional graphic with Mercedes-Benz vehicle design. Embedded details are archive material.",
    "captionStatus": "descriptive",
    "isPromotional": true,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-8",
    "sourceId": 8,
    "sourcePath": "images/promotional/mercedes-benz-c300-sales-flyer-1.jpeg",
    "type": "image",
    "category": "promotional",
    "title": "Mercedes-Benz C300 Sales Graphic",
    "src": "/media/images/promotional/mercedes-benz-c300-sales-flyer-1.jpeg",
    "poster": "/media/images/promotional/mercedes-benz-c300-sales-flyer-1.jpeg",
    "duration": null,
    "alt": "Mercedes-Benz C300 Sales Graphic",
    "caption": "Supplied sales flyer for Mercedes-Benz C300. Embedded prices and model terms are archive material.",
    "captionStatus": "descriptive",
    "isPromotional": true,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-9",
    "sourceId": 9,
    "sourcePath": "images/promotional/toyota-yaris-sales-flyer-1.jpeg",
    "type": "image",
    "category": "promotional",
    "title": "Toyota Yaris Sales Graphic",
    "src": "/media/images/promotional/toyota-yaris-sales-flyer-1.jpeg",
    "poster": "/media/images/promotional/toyota-yaris-sales-flyer-1.jpeg",
    "duration": null,
    "alt": "Toyota Yaris Sales Graphic",
    "caption": "Supplied sales flyer for Toyota Yaris. Embedded prices and specifications are archive material.",
    "captionStatus": "descriptive",
    "isPromotional": true,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-10",
    "sourceId": 10,
    "sourcePath": "images/branding/dan-hajiya-logo-black-gold-1.jpeg",
    "type": "image",
    "category": "branding",
    "title": "Dan Hajiya Brand Mark — Black & Gold",
    "src": "/media/images/branding/dan-hajiya-logo-black-gold-1.jpeg",
    "poster": "/media/images/branding/dan-hajiya-logo-black-gold-1.jpeg",
    "duration": null,
    "alt": "Dan Hajiya Brand Mark — Black & Gold",
    "caption": "Official Dan Hajiya Investment emblem design in black and gold.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-11",
    "sourceId": 11,
    "sourcePath": "images/promotional/hyundai-veloster-sales-flyer-1.jpeg",
    "type": "image",
    "category": "promotional",
    "title": "Hyundai Veloster Sales Graphic",
    "src": "/media/images/promotional/hyundai-veloster-sales-flyer-1.jpeg",
    "poster": "/media/images/promotional/hyundai-veloster-sales-flyer-1.jpeg",
    "duration": null,
    "alt": "Hyundai Veloster Sales Graphic",
    "caption": "Supplied sales flyer for Hyundai Veloster. Embedded prices and specifications are archive material.",
    "captionStatus": "descriptive",
    "isPromotional": true,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-12",
    "sourceId": 12,
    "sourcePath": "images/promotional/dan-hajiya-new-month-greeting-1.jpeg",
    "type": "image",
    "category": "promotional",
    "title": "Dan Hajiya Greeting Artwork",
    "src": "/media/images/promotional/dan-hajiya-new-month-greeting-1.jpeg",
    "poster": "/media/images/promotional/dan-hajiya-new-month-greeting-1.jpeg",
    "duration": null,
    "alt": "Dan Hajiya Greeting Artwork",
    "caption": "Supplied seasonal greeting flyer for Dan Hajiya Investment.",
    "captionStatus": "descriptive",
    "isPromotional": true,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-13",
    "sourceId": 13,
    "sourcePath": "videos/stock/cars/white-mercedes-benz-sedan/white-mercedes-benz-sedan-walkaround-1.mp4",
    "type": "video",
    "category": "vehicles",
    "title": "White Mercedes-Benz Sedan Walkaround",
    "src": "/media/videos/stock/cars/white-mercedes-benz-sedan/white-mercedes-benz-sedan-walkaround-1.mp4",
    "poster": "/media/posters/source-13-poster.jpeg",
    "duration": 39.43,
    "alt": "White Mercedes-Benz Sedan Walkaround",
    "caption": "Exterior video walkaround of white Mercedes-Benz luxury sedan.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-14",
    "sourceId": 14,
    "sourcePath": "videos/stock/cars/silver-mercedes-benz-sedan/silver-mercedes-benz-sedan-walkaround-1.mp4",
    "type": "video",
    "category": "vehicles",
    "title": "Silver Mercedes-Benz Sedan Walkaround",
    "src": "/media/videos/stock/cars/silver-mercedes-benz-sedan/silver-mercedes-benz-sedan-walkaround-1.mp4",
    "poster": "/media/posters/source-14-poster.jpeg",
    "duration": 11.93,
    "alt": "Silver Mercedes-Benz Sedan Walkaround",
    "caption": "Exterior video walkaround of silver Mercedes-Benz luxury sedan.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-15",
    "sourceId": 15,
    "sourcePath": "videos/logistics/shipping-container-door-inspection-1.mp4",
    "type": "video",
    "category": "shipping",
    "title": "Shipping Container Door Inspection",
    "src": "/media/videos/logistics/shipping-container-door-inspection-1.mp4",
    "poster": "/media/posters/source-15-poster.jpeg",
    "duration": 10.82,
    "alt": "Shipping Container Door Inspection",
    "caption": "Inspection of shipping container cargo doors prior to transit.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-16",
    "sourceId": 16,
    "sourcePath": "videos/logistics/shipping-container-vehicle-overview-1.mp4",
    "type": "video",
    "category": "shipping",
    "title": "Shipping Container Vehicle Overview",
    "src": "/media/videos/logistics/shipping-container-vehicle-overview-1.mp4",
    "poster": "/media/posters/source-16-poster.jpeg",
    "duration": 17.07,
    "alt": "Shipping Container Vehicle Overview",
    "caption": "Overview of motor vehicles secured inside international shipping container.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-17",
    "sourceId": 17,
    "sourcePath": "videos/stock/cars/white-toyota-sedan/white-toyota-sedan-walkaround-1.mp4",
    "type": "video",
    "category": "vehicles",
    "title": "White Toyota Sedan Walkaround",
    "src": "/media/videos/stock/cars/white-toyota-sedan/white-toyota-sedan-walkaround-1.mp4",
    "poster": "/media/posters/source-17-poster.jpeg",
    "duration": 30.37,
    "alt": "White Toyota Sedan Walkaround",
    "caption": "Detailed exterior video walkaround of white Toyota four-door sedan.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-18",
    "sourceId": 18,
    "sourcePath": "videos/logistics/white-car-protective-wrap-1.mp4",
    "type": "video",
    "category": "shipping",
    "title": "Vehicle Protective Wrap & Pre-Shipment",
    "src": "/media/videos/logistics/white-car-protective-wrap-1.mp4",
    "poster": "/media/posters/source-18-poster.jpeg",
    "duration": 30.29,
    "alt": "Vehicle Protective Wrap & Pre-Shipment",
    "caption": "Application of protective shipping wrap on vehicle prior to transit.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-19",
    "sourceId": 19,
    "sourcePath": "videos/stock/cars/black-mercedes-benz-sedan/black-mercedes-benz-sedan-warehouse-walkaround-1.mp4",
    "type": "video",
    "category": "vehicles",
    "title": "Black Mercedes-Benz Sedan Warehouse Walkaround",
    "src": "/media/videos/stock/cars/black-mercedes-benz-sedan/black-mercedes-benz-sedan-warehouse-walkaround-1.mp4",
    "poster": "/media/posters/source-19-poster.jpeg",
    "duration": 41.42,
    "alt": "Black Mercedes-Benz Sedan Warehouse Walkaround",
    "caption": "Indoor warehouse walkaround of black Mercedes-Benz luxury sedan.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-20",
    "sourceId": 20,
    "sourcePath": "videos/stock/cars/black-mercedes-benz-sedan/black-mercedes-benz-sedan-outdoor-walkaround-1.mp4",
    "type": "video",
    "category": "vehicles",
    "title": "Black Mercedes-Benz Sedan Outdoor Walkaround",
    "src": "/media/videos/stock/cars/black-mercedes-benz-sedan/black-mercedes-benz-sedan-outdoor-walkaround-1.mp4",
    "poster": "/media/posters/source-20-poster.jpeg",
    "duration": 78.51,
    "alt": "Black Mercedes-Benz Sedan Outdoor Walkaround",
    "caption": "Outdoor comprehensive walkaround recording of black Mercedes-Benz sedan.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-21",
    "sourceId": 21,
    "sourcePath": "videos/stock/cars/silver-hatchback/silver-hatchback-snow-walkaround-1.mp4",
    "type": "video",
    "category": "vehicles",
    "title": "Silver Hatchback Snow Walkaround",
    "src": "/media/videos/stock/cars/silver-hatchback/silver-hatchback-snow-walkaround-1.mp4",
    "poster": "/media/posters/source-21-poster.jpeg",
    "duration": 30.19,
    "alt": "Silver Hatchback Snow Walkaround",
    "caption": "Exterior walkaround video of silver hatchback vehicle in winter conditions.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-22",
    "sourceId": 22,
    "sourcePath": "videos/logistics/mercedes-benz-sedan-container-loading-1.mp4",
    "type": "video",
    "category": "shipping",
    "title": "Mercedes-Benz Sedan Container Loading",
    "src": "/media/videos/logistics/mercedes-benz-sedan-container-loading-1.mp4",
    "poster": "/media/posters/source-22-poster.jpeg",
    "duration": 30.49,
    "alt": "Mercedes-Benz Sedan Container Loading",
    "caption": "Loading and securing of Mercedes-Benz sedan into freight shipping container.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-23",
    "sourceId": 23,
    "sourcePath": "videos/stock/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-indoor-demo-1.mp4",
    "type": "video",
    "category": "motorcycles",
    "title": "Red Aprilia Motorcycle Indoor Demonstration",
    "src": "/media/videos/stock/motorcycles/red-aprilia-motorcycle/red-aprilia-motorcycle-indoor-demo-1.mp4",
    "poster": "/media/posters/source-23-poster.jpeg",
    "duration": 18.41,
    "alt": "Red Aprilia Motorcycle Indoor Demonstration",
    "caption": "Indoor engine and operational demonstration of red Aprilia sport motorcycle.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-24",
    "sourceId": 24,
    "sourcePath": "videos/partners/uncaptioned/motorcycle-display-visit-1.mp4",
    "type": "video",
    "category": "visits",
    "title": "Showroom Motorcycle Display Visit",
    "src": "/media/videos/partners/uncaptioned/motorcycle-display-visit-1.mp4",
    "poster": "/media/posters/source-24-poster.jpeg",
    "duration": 19.89,
    "alt": "Showroom Motorcycle Display Visit",
    "caption": "Showroom motorcycle display recording.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": true
  },
  {
    "id": "gallery-25",
    "sourceId": 25,
    "sourcePath": "videos/partners/uncaptioned/motorcycle-display-selfie-1.mp4",
    "type": "video",
    "category": "visits",
    "title": "Motorcycle Display Selfie Visit",
    "src": "/media/videos/partners/uncaptioned/motorcycle-display-selfie-1.mp4",
    "poster": "/media/posters/source-25-poster.jpeg",
    "duration": 6.85,
    "alt": "Motorcycle Display Selfie Visit",
    "caption": "Showroom motorcycle display recording.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": true
  },
  {
    "id": "gallery-26",
    "sourceId": 26,
    "sourcePath": "videos/stock/motorcycles/silver-kawasaki-motorcycle/silver-kawasaki-motorcycle-captioned-walkaround-1.mp4",
    "type": "video",
    "category": "motorcycles",
    "title": "Silver Kawasaki Motorcycle Walkaround",
    "src": "/media/videos/stock/motorcycles/silver-kawasaki-motorcycle/silver-kawasaki-motorcycle-captioned-walkaround-1.mp4",
    "poster": "/media/posters/source-26-poster.jpeg",
    "duration": 26.39,
    "alt": "Silver Kawasaki Motorcycle Walkaround",
    "caption": "Video walkaround of silver Kawasaki sport motorcycle with visible overlay.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-27",
    "sourceId": 27,
    "sourcePath": "videos/stock/motorcycles/silver-kawasaki-motorcycle/silver-kawasaki-motorcycle-walkaround-1.mp4",
    "type": "video",
    "category": "motorcycles",
    "title": "Silver Kawasaki Motorcycle Detailed Walkaround",
    "src": "/media/videos/stock/motorcycles/silver-kawasaki-motorcycle/silver-kawasaki-motorcycle-walkaround-1.mp4",
    "poster": "/media/posters/source-27-poster.jpeg",
    "duration": 22.74,
    "alt": "Silver Kawasaki Motorcycle Detailed Walkaround",
    "caption": "Detailed walkaround video showing bodywork of silver Kawasaki motorcycle.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-28",
    "sourceId": 28,
    "sourcePath": "videos/stock/motorcycles/silver-kawasaki-motorcycle/silver-kawasaki-motorcycle-walkaround-2.mp4",
    "type": "video",
    "category": "motorcycles",
    "title": "Silver Kawasaki Motorcycle Exterior Walkaround",
    "src": "/media/videos/stock/motorcycles/silver-kawasaki-motorcycle/silver-kawasaki-motorcycle-walkaround-2.mp4",
    "poster": "/media/posters/source-28-poster.jpeg",
    "duration": 15.48,
    "alt": "Silver Kawasaki Motorcycle Exterior Walkaround",
    "caption": "Exterior walkaround recording of silver Kawasaki sport motorcycle.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-29",
    "sourceId": 29,
    "sourcePath": "videos/partners/uncaptioned/car-lot-evening-visit-1.mp4",
    "type": "video",
    "category": "visits",
    "title": "Car Lot Evening Visit",
    "src": "/media/videos/partners/uncaptioned/car-lot-evening-visit-1.mp4",
    "poster": "/media/posters/source-29-poster.jpeg",
    "duration": 7.92,
    "alt": "Car Lot Evening Visit",
    "caption": "Vehicle sales lot recording in the evening.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": true
  },
  {
    "id": "gallery-30",
    "sourceId": 30,
    "sourcePath": "videos/stock/cars/car-lot/car-lot-evening-overview-1.mp4",
    "type": "video",
    "category": "vehicles",
    "title": "Vehicle Lot Evening Overview",
    "src": "/media/videos/stock/cars/car-lot/car-lot-evening-overview-1.mp4",
    "poster": "/media/posters/source-30-poster.jpeg",
    "duration": 8.97,
    "alt": "Vehicle Lot Evening Overview",
    "caption": "Wide-angle evening overview video of parked commercial car lot.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-31",
    "sourceId": 31,
    "sourcePath": "videos/logistics/port-cargo-ship-and-vehicles-1.mp4",
    "type": "video",
    "category": "shipping",
    "title": "Port Cargo Ship and Vehicle Staging",
    "src": "/media/videos/logistics/port-cargo-ship-and-vehicles-1.mp4",
    "poster": "/media/posters/source-31-poster.jpeg",
    "duration": 43.48,
    "alt": "Port Cargo Ship and Vehicle Staging",
    "caption": "Ocean port cargo vessel staging with commercial vehicles ready for freight.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  },
  {
    "id": "gallery-32",
    "sourceId": 32,
    "sourcePath": "videos/logistics/car-transporter-loaded-vehicles-1.mp4",
    "type": "video",
    "category": "shipping",
    "title": "Car Transporter Loaded with Vehicles",
    "src": "/media/videos/logistics/car-transporter-loaded-vehicles-1.mp4",
    "poster": "/media/posters/source-32-poster.jpeg",
    "duration": 19.74,
    "alt": "Car Transporter Loaded with Vehicles",
    "caption": "Automotive carrier truck loaded with passenger vehicles in transit.",
    "captionStatus": "descriptive",
    "isPromotional": false,
    "isVisitUncaptioned": false
  }
];

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
  rights: `© ${new Date().getFullYear()} Dan Hajiya Investment. All rights reserved.`,
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
