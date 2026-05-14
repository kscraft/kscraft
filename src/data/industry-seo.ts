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
    eyebrow: 'Quiet Learning',
    description: 'Optimize learning environments by eliminating noise distractions. Our acoustic solutions for classrooms, auditoriums, and music rooms foster concentration and academic excellence.',
    heroImage: '/images/media/project-2.jpg',
    benefits: [
      { title: 'Improved Concentration', description: 'Blocking external traffic and hallway noise for focused student learning.' },
      { title: 'Auditorium Acoustics', description: 'Large-span movable partitions that divide halls while maintaining speech clarity.' },
      { title: 'Music Room Isolation', description: 'Extreme soundproofing for dedicated performance and practice spaces.' }
    ],
    productSlugs: ['sound-proof-windows', 'sound-proof-sliding-folding-partition', 'sound-proof-swing-doors'],
    metaTitle: 'Acoustic Solutions for Schools & Universities | Kiran Slido Craft',
    metaDescription: 'High-performance soundproofing for educational facilities. Improve student focus with acoustic windows and movable partitions for auditoriums and classrooms.'
  },
  {
    slug: 'industrial-manufacturing',
    title: 'Industrial & Manufacturing',
    eyebrow: 'Heavy-Duty Noise Control',
    description: 'Protect your workforce and comply with occupational health standards. We provide high-decibel noise containment for factories, power plants, and control rooms.',
    heroImage: '/images/blogs/industrial-barriers.jpg',
    benefits: [
      { title: 'Worker Safety', description: 'Reducing ambient factory noise to safe levels for personnel health and communication.' },
      { title: 'Control Room Privacy', description: 'Ensuring absolute silence for monitoring stations in high-noise environments.' },
      { title: 'Durability', description: 'Ruggedized acoustic steel doors and heavy-duty frames built for industrial cycles.' }
    ],
    productSlugs: ['sound-proof-swing-doors', 'sound-proof-acoustic-fix-partition', 'motorized-sliding-gates'],
    metaTitle: 'Industrial Soundproofing Solutions | Factory Noise Control',
    metaDescription: 'Heavy-duty acoustic isolation for manufacturing and industrial plants. Ruggedized soundproof doors and windows designed for high-decibel environments.'
  }
];

export function getIndustry(slug: string): IndustrySolution | undefined {
  return industries.find(i => i.slug === slug);
}

export function getProductsForIndustry(industry: IndustrySolution): Product[] {
  return products.filter(p => industry.productSlugs.includes(p.slug));
}
