import { products, type Product } from '@/lib/catalog';

export type IndustrySolution = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  benefits: {
    title: string;
    description: string;
  }[];
  productSlugs: string[];
  metaTitle: string;
  metaDescription: string;
};

export const industries: IndustrySolution[] = [
  {
    slug: 'hotels-hospitality',
    title: 'Hospitality & Luxury Hotels',
    eyebrow: 'Five-Star Silence',
    description: 'Ensure guest comfort and privacy with world-class acoustic insulation. From grand ballrooms to peaceful suites, we provide the silence your guests expect.',
    heroImage: '/images/blogs/commercial-soundproofing.jpg',
    benefits: [
      { title: 'Room-to-Room Privacy', description: 'Certified high-STC partitions prevent sound leakage between guest rooms.' },
      { title: 'Facade Noise Control', description: 'Precision-engineered windows that block city and airport traffic noise.' },
      { title: 'Aesthetic Integration', description: 'Sleek, slim-profile systems that complement luxury interior designs.' }
    ],
    productSlugs: ['sound-proof-windows', 'sound-proof-sliding-windows', 'sound-proof-acoustic-movable-partition'],
    metaTitle: 'Acoustic Solutions for Hotels & Hospitality | Kiran Slido Craft',
    metaDescription: 'Specialized soundproofing and acoustic solutions for luxury hotels. High-STC windows and partitions engineered for guest comfort and privacy.'
  },
  {
    slug: 'recording-studios',
    title: 'Recording & Broadcast Studios',
    eyebrow: 'Precision Acoustics',
    description: 'Zero tolerance for ambient noise. Our systems are the choice of elite broadcast studios and professional music producers globally.',
    heroImage: '/images/blogs/stc-oitc-acoustics.jpg',
    benefits: [
      { title: 'Extreme STC Ratings', description: 'Dual and triple glazed systems reaching up to STC 55+ for total isolation.' },
      { title: 'Mechanical Silence', description: 'Motorized systems with near-silent operation for controlled environments.' },
      { title: 'Visual Transparency', description: 'Large-span acoustic glass for control rooms without compromising isolation.' }
    ],
    productSlugs: ['sound-proof-windows', 'sound-proof-doors', 'automatic-acoustic-partitions'],
    metaTitle: 'Studio Soundproofing Solutions | Broadcast Isolation Systems',
    metaDescription: 'Professional-grade acoustic isolation for recording and broadcast studios. High-performance windows and doors with extreme STC ratings.'
  },
  {
    slug: 'healthcare-hospitals',
    title: 'Healthcare & Hospitals',
    eyebrow: 'Healing Environments',
    description: 'Quiet environments are essential for patient recovery and confidential consultations. Our antimicrobial acoustic systems meet stringent medical standards.',
    heroImage: '/images/blogs/acoustic-glass-partitions.jpg',
    benefits: [
      { title: 'Patient Recovery', description: 'Reducing ambient ward noise to facilitate faster healing and better sleep.' },
      { title: 'HIPAA Compliance', description: 'Soundproof consultation rooms for guaranteed patient confidentiality.' },
      { title: 'Hygiene Ready', description: 'Easy-to-clean profiles compatible with hospital-grade sterilization.' }
    ],
    productSlugs: ['sound-proof-doors', 'sound-proof-partitions', 'automatic-sliding-windows'],
    metaTitle: 'Hospital Acoustic Solutions | Healthcare Soundproofing',
    metaDescription: 'Acoustic insulation systems for healthcare facilities. Improving patient recovery and ensuring consultation privacy with soundproof windows and doors.'
  },
  {
    slug: 'corporate-offices',
    title: 'Corporate & Commercial Offices',
    eyebrow: 'Productive Workspaces',
    description: 'Transform open offices into hubs of concentration. Our movable partitions and soundproof glass optimize focus and meeting room privacy.',
    heroImage: '/images/blogs/aesthetic-acoustics.jpg',
    benefits: [
      { title: 'Dynamic Layouts', description: 'Movable acoustic walls that reconfigure boardrooms in minutes.' },
      { title: 'Focus Zones', description: 'Glass partitions that maintain visual openness while blocking acoustic distractions.' },
      { title: 'Executive Privacy', description: 'High-performance doors for secure, confidential executive suites.' }
    ],
    productSlugs: ['sound-proof-partitions', 'automatic-acoustic-partitions', 'sound-proof-doors'],
    metaTitle: 'Office Acoustic Solutions | Corporate Soundproofing',
    metaDescription: 'Maximize productivity with professional office acoustics. Movable partitions and soundproof glass for boardrooms and open-plan offices.'
  },
  {
    slug: 'education-institutions',
    title: 'Education & Institutions',
    eyebrow: 'Quiet Learning Environments',
    description: 'Optimize academic performance by eliminating noise distractions. Our acoustic solutions for classrooms, auditoriums, and music conservatories meet stringent institutional standards for speech clarity and background noise control.',
    heroImage: '/images/media/project-2.jpg',
    benefits: [
      { title: 'Acoustic Comfort Standards', description: 'Systems designed to meet BB93 (UK) and similar global educational acoustic criteria.' },
      { title: 'Auditorium Versatility', description: 'Large-span movable partitions with STC 50+ ratings for simultaneous multi-use hall operations.' },
      { title: 'Music Suite Isolation', description: 'Extreme soundproofing for dedicated performance, practice, and recording spaces within institutions.' }
    ],
    productSlugs: ['sound-proof-windows', 'sound-proof-sliding-folding-partition', 'sound-proof-swing-doors', 'sound-proof-acoustic-fix-partition'],
    metaTitle: 'Acoustic Solutions for Schools & Universities | Institutional Soundproofing',
    metaDescription: 'High-performance soundproofing for educational facilities. Improve student focus with acoustic windows and movable partitions designed for auditoriums, music rooms, and classrooms.'
  },
  {
    slug: 'industrial-manufacturing',
    title: 'Industrial & Manufacturing',
    eyebrow: 'Heavy-Duty Noise Containment',
    description: 'Ensure regulatory compliance and protect workforce health with high-decibel noise containment. We provide engineered acoustic barriers for factories, power plants, and mission-critical control rooms.',
    heroImage: '/images/blogs/industrial-barriers.jpg',
    benefits: [
      { title: 'OSHA & NIOSH Compliance', description: 'Reducing ambient factory noise to levels that satisfy occupational health and safety regulations.' },
      { title: 'Control Room Integrity', description: 'Absolute silence for monitoring stations in high-decibel environments (turbine halls, forge shops).' },
      { title: 'Ruggedized Engineering', description: 'Acoustic steel doors and heavy-duty reinforced frames built for millions of industrial operational cycles.' }
    ],
    productSlugs: ['sound-proof-swing-doors', 'sound-proof-acoustic-fix-partition', 'motorized-sliding-gates', 'motorized-telescopic-gates'],
    metaTitle: 'Industrial Soundproofing Solutions | Factory & Plant Noise Control',
    metaDescription: 'Heavy-duty acoustic isolation for manufacturing and industrial plants. Ruggedized soundproof doors, partitions, and windows designed for high-decibel containment and safety.'
  }
];

export function getIndustry(slug: string): IndustrySolution | undefined {
  return industries.find(i => i.slug === slug);
}

export function getProductsForIndustry(industry: IndustrySolution): Product[] {
  return products.filter(p => industry.productSlugs.includes(p.slug));
}
