export type IntentSeo = {
  slug: string;
  title: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  primaryCategorySlug: string;
  relatedProducts: string[];
  faqs: { question: string; answer: string }[];
  proofAngle: string;
};

export const intentSeoPages: IntentSeo[] = [
  {
    slug: 'soundproof-windows',
    title: 'Soundproof Windows | Aerospace-Grade Acoustic Glazing',
    metaDescription: 'Custom soundproof windows engineered for 40-50+ STC reduction. Ideal for homes, studios, hospitals, and hotels facing traffic or industrial noise.',
    heroTitle: 'Soundproof Windows',
    heroSubtitle: 'Silence Any Environment',
    heroDescription: 'Engineered for maximum acoustic attenuation, our soundproof windows drop external noise by up to 50 dB. Designed with the same precision we apply to aerospace components.',
    primaryCategorySlug: 'sound-proof-windows',
    relatedProducts: ['sound-proof-sliding-windows', 'sound-proof-casement-windows', 'sound-proof-acoustic-fix-partition'],
    faqs: [
      { question: 'How much noise do your soundproof windows block?', answer: 'Depending on the glazing configuration, our systems achieve an STC (Sound Transmission Class) rating of 40 to 50+, effectively reducing traffic, rail, or airport noise by up to 90%.' },
      { question: 'Do you offer motorized options?', answer: 'Yes, we provide motorized sliding options for heavy acoustic panels, allowing effortless operation at the push of a button.' }
    ],
    proofAngle: 'Manufactured by the team that built the Gaganyaan capsule entry mechanism.',
  },
  {
    slug: 'soundproof-doors',
    title: 'Soundproof Doors | Acoustic Isolation for Studios & Hotels',
    metaDescription: 'Heavy-duty soundproof doors delivering high STC ratings for recording studios, home theaters, boardrooms, and premium hotels.',
    heroTitle: 'Soundproof Doors',
    heroSubtitle: 'Complete Acoustic Isolation',
    heroDescription: 'Stop sound leaks dead in their tracks. Our high-density acoustic doors feature specialized multi-point locking and perimeter seals to ensure true soundproofing for your most critical spaces.',
    primaryCategorySlug: 'sound-proof-doors',
    relatedProducts: ['sound-proof-swing-doors', 'sound-proof-sliding-doors'],
    faqs: [
      { question: 'What is the STC rating of your soundproof doors?', answer: 'Our standard acoustic doors provide STC 42 to STC 55 ratings depending on the material (wood or steel) and core density.' },
      { question: 'Can these be installed in existing frames?', answer: 'For maximum acoustic performance, we recommend installing our doors with their engineered acoustic frames, which include integrated seals.' }
    ],
    proofAngle: 'Tested and deployed in critical broadcasting studios and five-star hospitality suites.',
  },
  {
    slug: 'acoustic-partitions',
    title: 'Acoustic Partitions | Movable Soundproof Walls',
    metaDescription: 'Movable acoustic partitions and sliding folding walls for banquets, hotels, offices, and conference centers. High STC ratings and seamless operation.',
    heroTitle: 'Acoustic Partitions',
    heroSubtitle: 'Flexible Space, Uncompromised Silence',
    heroDescription: 'Divide large spaces dynamically without sacrificing acoustic privacy. Our movable sliding partitions offer STC 50+ isolation with effortless, track-based movement.',
    primaryCategorySlug: 'sound-proof-partitions',
    relatedProducts: ['sound-proof-acoustic-movable-partition', 'sound-proof-sliding-folding-partition'],
    faqs: [
      { question: 'How heavy are the movable partitions?', answer: 'While acoustic panels are dense (weighing up to 45kg/sqm), our aerospace-grade tracking and carriage systems allow a single person to move them effortlessly.' },
      { question: 'Are bottom tracks required?', answer: 'No, our advanced top-hung systems do not require floor tracks, preserving your flooring aesthetics while maintaining acoustic seals via retractable bottom sweeps.' }
    ],
    proofAngle: 'Trusted by major international hotel chains and corporate headquarters.',
  },
  {
    slug: 'soundproof-sliding-windows',
    title: 'Soundproof Sliding Windows | Acoustic Glazing',
    metaDescription: 'Space-saving soundproof sliding windows offering exceptional noise reduction, specialized acoustic seals, and heavy-duty smooth operation.',
    heroTitle: 'Soundproof Sliding Windows',
    heroSubtitle: 'Smooth Operation, Total Silence',
    heroDescription: 'Get the space-saving benefits of sliding windows without the typical acoustic leaks. Our heavy-duty tracks and specialized brush seals deliver uncompromising noise reduction.',
    primaryCategorySlug: 'sound-proof-windows',
    relatedProducts: ['sound-proof-sliding-windows', 'motorized-soundproof-sliding-windows'],
    faqs: [
      { question: 'Do sliding windows block sound as well as casement windows?', answer: 'Standard sliding windows leak sound. However, our engineered acoustic sliding windows use overlapping interlocking profiles and dense acoustic seals to match the performance of fixed windows.' },
      { question: 'Can they be retrofitted?', answer: 'Yes, we often install secondary acoustic sliding windows behind your existing windows to drastically reduce noise without altering the building facade.' }
    ],
    proofAngle: 'Precision-engineered tracking systems ensuring zero friction and maximum acoustic sealing.',
  },
  {
    slug: 'motorized-sliding-roof',
    title: 'Motorized Sliding Roofs | Retractable Automation',
    metaDescription: 'Architectural motorized sliding roofs and skylights. Weather-proof, thermally insulated, and effortlessly automated for luxury homes and restaurants.',
    heroTitle: 'Motorized Sliding Roofs',
    heroSubtitle: 'Automated Sky Views',
    heroDescription: 'Transform indoor spaces into open-air environments at the touch of a button. Our motorized retractable roofs feature smooth, silent operation and complete weather sealing.',
    primaryCategorySlug: 'roof-sliding-systems',
    relatedProducts: ['motorized-sliding-roof', 'motorized-telescopic-gates'],
    faqs: [
      { question: 'Are the sliding roofs completely waterproof?', answer: 'Absolutely. We use EPDM rubber gaskets and advanced gutter profiles to ensure 100% water tightness when closed.' },
      { question: 'What happens in case of a power failure?', answer: 'Our motorized systems come with manual override features, and can be integrated with battery backups or building management systems.' }
    ],
    proofAngle: 'Built with the same precision mechanics we developed for ISRO\'s aerospace projects.',
  },
  {
    slug: 'soundproof-room-solutions',
    title: 'Soundproof Room Solutions | Complete Acoustic Isolation',
    metaDescription: 'Turnkey soundproofing solutions for entire rooms, studios, home theaters, and meeting rooms. Expert acoustic consulting and manufacturing.',
    heroTitle: 'Complete Soundproof Rooms',
    heroSubtitle: 'End-to-End Acoustic Isolation',
    heroDescription: 'When a single window isn\'t enough. We provide holistic room soundproofing including windows, doors, and partitions to guarantee absolute acoustic privacy.',
    primaryCategorySlug: 'sound-proof-windows',
    relatedProducts: ['sound-proof-sliding-windows', 'sound-proof-swing-doors', 'sound-proof-acoustic-movable-partition'],
    faqs: [
      { question: 'Do you offer complete room isolation?', answer: 'Yes, we manufacture and install the entire acoustic envelope: windows, doors, and movable walls.' },
      { question: 'Is this suitable for home theaters?', answer: 'Perfectly. We provide specialized high-density doors and windows to keep theater audio in and environmental noise out.' }
    ],
    proofAngle: 'ISO 9001 certified acoustic engineering tailored for critical environments.',
  },
  {
    slug: 'industrial-soundproofing',
    title: 'Industrial Soundproofing | Acoustic Windows & Doors',
    metaDescription: 'Heavy-duty industrial soundproofing. High-STC windows and doors for manufacturing facilities, control rooms, and power plants.',
    heroTitle: 'Industrial Soundproofing',
    heroSubtitle: 'Heavy-Duty Noise Control',
    heroDescription: 'Protect your personnel and equipment. Our industrial-grade acoustic windows and doors are designed to withstand extreme decibel levels in factories and control rooms.',
    primaryCategorySlug: 'sound-proof-doors',
    relatedProducts: ['sound-proof-swing-doors', 'sound-proof-acoustic-fix-partition', 'motorized-sliding-gates'],
    faqs: [
      { question: 'Can your windows handle factory floor noise?', answer: 'Yes, our industrial fixed windows are built with multi-layered acoustic laminated glass capable of handling extreme decibel levels.' },
      { question: 'Do you make oversized acoustic doors for equipment rooms?', answer: 'Yes, we manufacture custom oversized acoustic steel doors for plant and machinery access.' }
    ],
    proofAngle: 'Engineered for the highest compliance and safety standards, trusted by national infrastructure projects.',
  },
  {
    slug: 'hotel-acoustic-solutions',
    title: 'Hotel Acoustic Solutions | Soundproof Windows & Partitions',
    metaDescription: 'Acoustic solutions for the hospitality industry. Soundproof windows for guest rooms and movable partitions for banquets to ensure premium guest experiences.',
    heroTitle: 'Hotel Acoustic Solutions',
    heroSubtitle: 'Premium Silence for Guests',
    heroDescription: 'Elevate your guest experience. From soundproof windows that block city noise to movable banquet partitions that allow simultaneous events, we provide complete hospitality acoustics.',
    primaryCategorySlug: 'sound-proof-partitions',
    relatedProducts: ['sound-proof-acoustic-movable-partition', 'sound-proof-sliding-folding-partition', 'sound-proof-sliding-windows'],
    faqs: [
      { question: 'Can we retrofit hotel windows without stopping operations?', answer: 'Yes, our secondary glazing systems can be installed quickly from the inside, minimizing room downtime.' },
      { question: 'How do you handle banquet hall acoustics?', answer: 'Our STC 50+ movable partitions allow you to divide large halls for simultaneous events without noise bleed, maximizing revenue.' }
    ],
    proofAngle: 'Specified by leading international hotel chains across India and the Middle East.',
  }
];

export function getIntentSeo(slug: string) {
  return intentSeoPages.find((intent) => intent.slug === slug);
}
