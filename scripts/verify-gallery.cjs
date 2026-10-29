const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'media', 'media-manifest.json'), 'utf8'));

// Dynamically import or read constants
const constantsText = fs.readFileSync(path.join(__dirname, '..', 'src', 'constants', 'index.js'), 'utf8');

const regex = /"sourceId":\s*(\d+)/g;
let match;
const foundSourceIds = new Set();
while ((match = regex.exec(constantsText)) !== null) {
  foundSourceIds.add(parseInt(match[1], 10));
}

console.log('--- RECONCILIATION AUDIT ---');
console.log('Manifest records:', manifest.records.length);
console.log('Found sourceIds in mediaGallery:', foundSourceIds.size);

const missing = [];
manifest.records.forEach(r => {
  if (!foundSourceIds.has(r.id)) {
    missing.push(r.id);
  }
});

console.log('Missing IDs:', missing.length === 0 ? 'None (100% covered)' : missing);

// Check files on disk
let missingFiles = 0;
let missingPosters = 0;

manifest.records.forEach(r => {
  const filePath = path.join(__dirname, '..', 'public', 'media', r.destination_relative);
  if (!fs.existsSync(filePath)) {
    console.error('Missing media file on disk:', r.destination_relative);
    missingFiles++;
  }
  if (r.destination_relative.endsWith('.mp4')) {
    const posterPath = path.join(__dirname, '..', 'public', 'media', 'posters', `source-${r.id}-poster.jpeg`);
    if (!fs.existsSync(posterPath)) {
      console.error('Missing poster file on disk:', posterPath);
      missingPosters++;
    }
  }
});

console.log('Missing files on disk:', missingFiles);
console.log('Missing posters on disk:', missingPosters);

