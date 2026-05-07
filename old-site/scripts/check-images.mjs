import fs from 'node:fs';
import path from 'node:path';

// Manual check based on previous read of src/data/catalogData.ts
const images = [
  "sliding-windows/1.jpg", "sliding-windows/2.jpg", "sliding-windows/3.jpg", "sliding-windows/4.jpg", "sliding-windows/technical-details.jpg", "sliding-windows/btu-loss.jpg",
  "sliding-windows/item1.jpg", "sliding-windows/item2.jpg", "sliding-windows/item3.jpg", "sliding-windows/item4.jpg",
  "sliding-windows/item-a1.jpg", "sliding-windows/item-a2.jpg", "sliding-windows/item-a3.jpg", "sliding-windows/item-a4.jpg",
  "sliding-windows/item-b1.jpg", "sliding-windows/item-b2.jpg", "sliding-windows/item-b3.jpg", "sliding-windows/item-b4.jpg",
  "sliding-windows/item-c1.jpg", "sliding-windows/item-c2.jpg", "sliding-windows/item-c3.jpg", "sliding-windows/item-c4.jpg",
  "partition/1.jpg", "partition/2.jpg", "partition/item-a1.jpg", "partition/item-b1.jpg",
  "partition/item-a1.jpg", "partition/item-a2.jpg", "partition/item-a3.jpg", "partition/item-a4.jpg",
  "partition/item-b1.jpg", "partition/item-b2.jpg", "partition/item-b3.jpg", "partition/item-b4.jpg",
  "sliding-doors/item-a1.jpg", "sliding-doors/item-a2.jpg", "sliding-doors/item-a3.jpg",
  "motorized-sliding-windows/item-a1.jpg", "motorized-sliding-windows/item-a2.jpg", "motorized-sliding-windows/item-a3.jpg", "motorized-sliding-windows/item-a4.jpg",
  "motorized-sliding-system/1.jpg", "motorized-sliding-system/2.jpg", "motorized-sliding-system/item-a1.jpg", "motorized-sliding-system/item-b1.jpg",
  "motorized-sliding-system/item-a1.jpg",
  "motorized-sliding-system/item-b1.jpg",
  "roof-sliding-system/1.jpg", "roof-sliding-system/2.jpg", "roof-sliding-system/item-a1.jpg", "roof-sliding-system/item-b1.jpg",
  "roof-sliding-system/item-a1.jpg", "roof-sliding-system/item-a2.jpg", "roof-sliding-system/item-a3.jpg", "roof-sliding-system/item-a4.jpg",
  "roof-sliding-system/item-b1.jpg", "roof-sliding-system/item-b2.jpg", "roof-sliding-system/item-b3.jpg", "roof-sliding-system/item-b4.jpg",
  "barrier-systems/item-a1.jpg", "barrier-systems/item-a2.jpg", "barrier-systems/item-a3.jpg",
  "vertical-windows/1.jpg", "vertical-windows/2.jpg", "vertical-windows/item-a1.jpg", "vertical-windows/item-b1.jpg",
  "vertical-windows/item-a1.jpg", "vertical-windows/item-a2.jpg", "vertical-windows/item-a3.jpg",
  "vertical-windows/item-b1.jpg", "vertical-windows/item-b2.jpg", "vertical-windows/item-b3.jpg", "vertical-windows/item-b4.jpg"
];

const publicDir = 'public';
const missing = [];

images.forEach(image => {
  const fullPath = path.join(publicDir, 'assets/source', image);
  if (!fs.existsSync(fullPath)) {
    missing.push(image);
  }
});

if (missing.length > 0) {
  console.log('Missing Images:');
  console.log(JSON.stringify(missing, null, 2));
} else {
  console.log('All catalog images found.');
}
