const fs = require('fs');
const path = require('path');

const galleryItems = JSON.parse(fs.readFileSync(path.join(__dirname, 'gallery-items.json'), 'utf8'));

const galleryCode = `
// Gallery Categories — Authoritative definition matching context/media-requirements.md
export const galleryCategories = [
  { slug: 'all', label: 'All', count: 32 },
  { slug: 'vehicles', label: 'Vehicles', count: 9 },
  { slug: 'motorcycles', label: 'Motorcycles', count: 8 },
  { slug: 'shipping', label: 'Shipping', count: 6 },
  { slug: 'visits', label: 'Visits', count: 3 },
  { slug: 'branding', label: 'Branding', count: 1 },
  { slug: 'promotional', label: 'Promotional graphics', count: 5 },
];

// Canonical Media Gallery — 32 verified manifest records (12 images, 20 videos)
export const mediaGallery = ` + JSON.stringify(galleryItems, null, 2) + `;

// Derived proof gallery (retained for backward compatibility; derives uncaptioned visit clips)
export const proofGallery = mediaGallery.filter((item) => item.category === 'visits');
`;

const constantsPath = path.join(__dirname, '..', 'src', 'constants', 'index.js');
let content = fs.readFileSync(constantsPath, 'utf8');
const target = '// Proof Gallery Items (Foreign Partners & Business Visits)';
const idx = content.indexOf(target);
if (idx !== -1) {
  const footerIdx = content.indexOf('// Footer details');
  const newContent = content.slice(0, idx) + galleryCode + '\n' + content.slice(footerIdx);
  fs.writeFileSync(constantsPath, newContent, 'utf8');
  console.log('Successfully updated src/constants/index.js');
} else {
  console.error('Target comment not found in constants file');
}

