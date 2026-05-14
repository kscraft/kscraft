export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: {
    sectionTitle: string;
    text: string;
  }[];
  relatedProducts: string[];
  metaTitle: string;
  metaDescription: string;
};

export const guides: Guide[] = [
  {
    slug: 'stc-vs-oitc-ratings-explained',
    title: 'STC vs. OITC: Which Rating Actually Matters?',
    excerpt: 'Understanding the technical differences between Sound Transmission Class (STC) and Outdoor-Indoor Transmission Class (OITC) for your project.',
    category: 'Technical Standards',
    readTime: '6 min read',
    content: [
      {
        sectionTitle: 'What is STC?',
        text: 'Sound Transmission Class (STC) is an integer rating of how well a building partition attenuates airborne sound. In the USA, it is widely used to rate interior partitions, ceilings, floors, doors, and windows. The STC figure very roughly reflects the decibel reduction in noise that a partition can provide. STC is specifically designed to measure speech sounds.'
      },
      {
        sectionTitle: 'What is OITC?',
        text: 'Outdoor-Indoor Transmission Class (OITC) is a standard used for indicating the rate of transmission of sound between outdoor and indoor spaces. Unlike STC, which targets higher-frequency speech sounds, OITC is designed to measure low-to-mid frequency sounds like aircraft, sirens, and heavy traffic noise.'
      },
      {
        sectionTitle: 'Which one should you choose?',
        text: 'If your project is an interior office partition, STC is the standard. If you are specifying windows for a building near an airport or a highway, OITC is the more critical metric to ensure occupant comfort against low-frequency rumble.'
      }
    ],
    relatedProducts: ['sound-proof-windows', 'sound-proof-partitions'],
    metaTitle: 'STC vs OITC Explained | Acoustic Specification Guide',
    metaDescription: 'Learn the technical difference between STC and OITC ratings. Expert guide on choosing the right acoustic metric for your windows and partitions.'
  },
  {
    slug: 'soundproof-window-buying-guide',
    title: 'The Ultimate Soundproof Window Buying Guide',
    excerpt: 'Everything you need to know about glass thickness, air gaps, and seal integrity before specifying acoustic windows.',
    category: 'Buying Guides',
    readTime: '10 min read',
    content: [
      {
        sectionTitle: '1. Glass Mass and Thickness',
        text: 'The most basic principle of soundproofing is mass. Thicker glass blocks more sound. However, using two panes of different thicknesses (asymmetric glazing) is even more effective as it prevents the panes from vibrating at the same frequency.'
      },
      {
        sectionTitle: '2. The Importance of Air Gaps',
        text: 'The space between glass panes acts as an insulator. A larger gap (up to 100mm or more) significantly improves low-frequency noise isolation, but requires specialized wide-profile frames like our Slido Craft series.'
      },
      {
        sectionTitle: '3. Compression Seals',
        text: 'A soundproof window is only as good as its seals. Even a 1% air gap can leak 50% of the sound. We use multi-point compression seals to ensure an airtight, acoustic-tight closure.'
      }
    ],
    relatedProducts: ['sound-proof-windows', 'sound-proof-sliding-windows', 'sound-proof-tilt-turn-windows'],
    metaTitle: 'Soundproof Window Buying Guide | Technical Specifications',
    metaDescription: 'Expert guide to buying soundproof windows. Learn about decibel reduction, glass thickness, and air gaps for maximum noise isolation.'
  }
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug);
}
