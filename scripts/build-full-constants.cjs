const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '..', 'media', 'media-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const titles = {
  1: 'Black Mercedes-Benz Sedan — Rear Angle',
  2: 'Mercedes-Benz Sedan — Red Leather Interior',
  3: 'Red Aprilia Motorcycle — Rear Angle',
  4: 'Red Aprilia Motorcycle — Side Profile',
  5: 'Red Aprilia Motorcycle — Front Angle',
  6: 'Red Aprilia Motorcycle — Rear View',
  7: 'Mercedes-Benz Automotive Artwork',
  8: 'Mercedes-Benz C300 Sales Graphic',
  9: 'Toyota Yaris Sales Graphic',
  10: 'Dan Hajiya Brand Mark — Black & Gold',
  11: 'Hyundai Veloster Sales Graphic',
  12: 'Dan Hajiya Greeting Artwork',
  13: 'White Mercedes-Benz Sedan Walkaround',
  14: 'Silver Mercedes-Benz Sedan Walkaround',
  15: 'Shipping Container Door Inspection',
  16: 'Shipping Container Vehicle Overview',
  17: 'White Toyota Sedan Walkaround',
  18: 'Vehicle Protective Wrap & Pre-Shipment',
  19: 'Black Mercedes-Benz Sedan Warehouse Walkaround',
  20: 'Black Mercedes-Benz Sedan Outdoor Walkaround',
  21: 'Silver Hatchback Snow Walkaround',
  22: 'Mercedes-Benz Sedan Container Loading',
  23: 'Red Aprilia Motorcycle Indoor Demonstration',
  24: 'Showroom Motorcycle Display Visit',
  25: 'Motorcycle Display Selfie Visit',
  26: 'Silver Kawasaki Motorcycle Walkaround',
  27: 'Silver Kawasaki Motorcycle Detailed Walkaround',
  28: 'Silver Kawasaki Motorcycle Exterior Walkaround',
  29: 'Car Lot Evening Visit',
  30: 'Vehicle Lot Evening Overview',
  31: 'Port Cargo Ship and Vehicle Staging',
  32: 'Car Transporter Loaded with Vehicles'
};

const captions = {
  1: 'Exterior rear angle of black Mercedes-Benz luxury sedan on display.',
  2: 'Interior cabin view showing red leather upholstery and center console.',
  3: 'Rear three-quarter perspective of red Aprilia sport motorcycle.',
  4: 'Full side profile view of red Aprilia sport motorcycle on showroom stand.',
  5: 'Front three-quarter perspective of red Aprilia sport motorcycle.',
  6: 'Direct rear view of red Aprilia sport motorcycle exhaust and rear tire.',
  7: 'Supplied promotional graphic with Mercedes-Benz vehicle design. Embedded details are archive material.',
  8: 'Supplied sales flyer for Mercedes-Benz C300. Embedded prices and model terms are archive material.',
  9: 'Supplied sales flyer for Toyota Yaris. Embedded prices and specifications are archive material.',
  10: 'Official Dan Hajiya Investment emblem design in black and gold.',
  11: 'Supplied sales flyer for Hyundai Veloster. Embedded prices and specifications are archive material.',
  12: 'Supplied seasonal greeting flyer for Dan Hajiya Investment.',
  13: 'Exterior video walkaround of white Mercedes-Benz luxury sedan.',
  14: 'Exterior video walkaround of silver Mercedes-Benz luxury sedan.',
  15: 'Inspection of shipping container cargo doors prior to transit.',
  16: 'Overview of motor vehicles secured inside international shipping container.',
  17: 'Detailed exterior video walkaround of white Toyota four-door sedan.',
  18: 'Application of protective shipping wrap on vehicle prior to transit.',
  19: 'Indoor warehouse walkaround of black Mercedes-Benz luxury sedan.',
  20: 'Outdoor comprehensive walkaround recording of black Mercedes-Benz sedan.',
  21: 'Exterior walkaround video of silver hatchback vehicle in winter conditions.',
  22: 'Loading and securing of Mercedes-Benz sedan into freight shipping container.',
  23: 'Indoor engine and operational demonstration of red Aprilia sport motorcycle.',
  24: 'Showroom motorcycle display recording.',
  25: 'Showroom motorcycle display recording.',
  26: 'Video walkaround of silver Kawasaki sport motorcycle with visible overlay.',
  27: 'Detailed walkaround video showing bodywork of silver Kawasaki motorcycle.',
  28: 'Exterior walkaround recording of silver Kawasaki sport motorcycle.',
  29: 'Vehicle sales lot recording in the evening.',
  30: 'Wide-angle evening overview video of parked commercial car lot.',
  31: 'Ocean port cargo vessel staging with commercial vehicles ready for freight.',
  32: 'Automotive carrier truck loaded with passenger vehicles in transit.'
};

const getCategory = (p) => {
  if (p.startsWith('images/cars') || p.startsWith('videos/stock/cars')) return 'vehicles';
  if (p.startsWith('images/motorcycles') || p.startsWith('videos/stock/motorcycles')) return 'motorcycles';
  if (p.startsWith('videos/logistics')) return 'shipping';
  if (p.startsWith('videos/partners')) return 'visits';
  if (p.startsWith('images/branding')) return 'branding';
  if (p.startsWith('images/promotional')) return 'promotional';
  return 'other';
};

const all32Items = manifest.records.map(r => {
  const isVideo = r.destination_relative.endsWith('.mp4');
  const cat = getCategory(r.destination_relative);
  return {
    id: 'gallery-' + r.id,
    sourceId: r.id,
    sourcePath: r.destination_relative,
    type: isVideo ? 'video' : 'image',
    category: cat,
    title: titles[r.id],
    src: '/media/' + r.destination_relative,
    poster: isVideo ? '/media/posters/source-' + r.id + '-poster.jpeg' : '/media/' + r.destination_relative,
    duration: r.duration_seconds || null,
    alt: titles[r.id],
    caption: captions[r.id],
    captionStatus: 'descriptive',
    isPromotional: cat === 'promotional',
    isVisitUncaptioned: cat === 'visits'
  };
});

fs.writeFileSync(path.join(__dirname, 'all-32-items.json'), JSON.stringify(all32Items, null, 2));
console.log('Successfully generated all 32 items.');

