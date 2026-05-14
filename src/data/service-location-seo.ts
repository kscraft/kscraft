import { getLocationMarketSlug, locationSeoPages, type LocationSeo } from './location-seo';

export type ServiceLocationSeo = {
  slug: string;
  title: string;
  shortTitle: string;
  intentPhrase: string;
  nearMePhrase: string;
  metaLead: string;
  categoryIds: string[];
  productSlugs: string[];
  buyerFit: string[];
  noiseOrMotionNeed: string;
  proof: string;
};

export const serviceLocationSeoPages: ServiceLocationSeo[] = [
  {
    slug: 'automatic-sliding-windows',
    title: 'Automatic Sliding Windows',
    shortTitle: 'Automatic Sliding Windows',
    intentPhrase: 'automatic sliding window',
    nearMePhrase: 'automatic sliding window near me',
    metaLead: 'Automatic sliding windows for premium homes, hotels, offices, hospitals, studios, and commercial projects.',
    categoryIds: ['motorized-systems', 'sound-proof-windows'],
    productSlugs: ['motorized-soundproof-sliding-windows', 'motorized-sound-proof-window', 'motorized-vertical-sliding-window', 'sound-proof-sliding-windows'],
    buyerFit: ['Premium residences', 'Hotels', 'Hospitals', 'Commercial facades', 'Executive offices'],
    noiseOrMotionNeed: 'hands-free movement, premium facade control, secure operation, and acoustic performance where required',
    proof: 'Kiran Slido Craft combines motorized movement systems with acoustic-window manufacturing, useful where automation and noise control must work together.',
  },
  {
    slug: 'motorized-soundproof-windows',
    title: 'Motorized Soundproof Windows',
    shortTitle: 'Motorized Soundproof Windows',
    intentPhrase: 'motorized soundproof window',
    nearMePhrase: 'motorized soundproof window near me',
    metaLead: 'Motorized soundproof windows for noise-sensitive premium residences, hotels, hospitals, offices, studios, and industrial rooms.',
    categoryIds: ['motorized-systems', 'sound-proof-windows'],
    productSlugs: ['motorized-sound-proof-window', 'motorized-soundproof-sliding-windows', 'motorized-vertical-sliding-window', 'sound-proof-windows'],
    buyerFit: ['Noise-sensitive homes', 'Hospitals', 'Hotels', 'Studios', 'Boardrooms'],
    noiseOrMotionNeed: 'acoustic isolation, remote operation, sealed closure, and premium user experience',
    proof: 'The same precision culture behind Gaganyaan capsule entry mechanism manufacturing supports high-tolerance acoustic automation.',
  },
  {
    slug: 'automatic-acoustic-partitions',
    title: 'Automatic Acoustic Partitions',
    shortTitle: 'Automatic Acoustic Partitions',
    intentPhrase: 'automatic acoustic partition',
    nearMePhrase: 'automatic acoustic partition near me',
    metaLead: 'Automatic and movable acoustic partitions for hotels, banquet halls, offices, schools, studios, and multipurpose rooms.',
    categoryIds: ['sound-proof-partitions', 'motorized-systems'],
    productSlugs: ['sound-proof-acoustic-movable-partition', 'sound-proof-sliding-folding-partition', 'sound-proof-acoustic-fix-partition', 'motorized-sliding-system'],
    buyerFit: ['Hotels', 'Banquet halls', 'Corporate offices', 'Schools', 'Studios'],
    noiseOrMotionNeed: 'flexible room division, speech privacy, event separation, and fast operational reconfiguration',
    proof: 'Kiran Slido Craft manufactures acoustic partitions and motorized movement systems for flexible commercial interiors.',
  },
  {
    slug: 'automatic-sliding-doors',
    title: 'Automatic Sliding Doors',
    shortTitle: 'Automatic Sliding Doors',
    intentPhrase: 'automatic sliding door',
    nearMePhrase: 'automatic sliding door near me',
    metaLead: 'Automatic sliding doors and acoustic sliding door systems for hotels, hospitals, offices, residences, and commercial entrances.',
    categoryIds: ['motorized-systems', 'sound-proof-doors'],
    productSlugs: ['motorized-sliding-system', 'sound-proof-sliding-doors', 'sound-proof-sliding-folding-doors', 'motorized-sliding-gates'],
    buyerFit: ['Hospitals', 'Hotels', 'Retail entrances', 'Premium residences', 'Offices'],
    noiseOrMotionNeed: 'smooth access control, reliable opening cycles, privacy, and optional acoustic separation',
    proof: 'Automation engineering and acoustic-door manufacturing sit in the same product ecosystem, reducing integration risk.',
  },
  {
    slug: 'motorized-sliding-roof-systems',
    title: 'Motorized Sliding Roof Systems',
    shortTitle: 'Motorized Sliding Roofs',
    intentPhrase: 'motorized sliding roof',
    nearMePhrase: 'motorized sliding roof near me',
    metaLead: 'Motorized sliding roof systems for restaurants, terraces, resorts, villas, clubs, and premium hospitality projects.',
    categoryIds: ['roof-sliding-systems', 'motorized-systems'],
    productSlugs: ['motorized-sliding-roof', 'stainless-steel-frame-roof-sliding-system', 'aluminium-frame-roof-sliding-system', 'motorized-sliding-system'],
    buyerFit: ['Restaurants', 'Resorts', 'Villas', 'Clubs', 'Rooftop venues'],
    noiseOrMotionNeed: 'weather-adaptive openable space, premium guest experience, and engineered movement reliability',
    proof: 'Kiran Slido Craft builds roof movement systems for hospitality and premium residential environments.',
  },
  {
    slug: 'soundproof-sliding-doors',
    title: 'Soundproof Sliding Doors',
    shortTitle: 'Soundproof Sliding Doors',
    intentPhrase: 'soundproof sliding door',
    nearMePhrase: 'soundproof sliding door near me',
    metaLead: 'Soundproof sliding doors for hotels, studios, offices, hospitals, homes, and commercial acoustic separation.',
    categoryIds: ['sound-proof-doors'],
    productSlugs: ['sound-proof-sliding-doors', 'sound-proof-sliding-folding-doors', 'sound-proof-swing-doors', 'sound-proof-acoustic-movable-partition'],
    buyerFit: ['Studios', 'Hotels', 'Hospitals', 'Offices', 'Premium homes'],
    noiseOrMotionNeed: 'room-to-room acoustic separation, smooth movement, privacy, and premium closure quality',
    proof: 'Kiran Slido Craft manufactures acoustic doors as part of a broader soundproofing system package.',
  },
  {
    slug: 'automatic-folding-doors',
    title: 'Automatic Folding Doors',
    shortTitle: 'Automatic Folding Doors',
    intentPhrase: 'automatic folding door',
    nearMePhrase: 'automatic folding door near me',
    metaLead: 'Automatic and motorized folding doors for villas, hotels, and commercial spaces. Space-saving designs with high-performance automation.',
    categoryIds: ['motorized-systems', 'sound-proof-doors'],
    productSlugs: ['sound-proof-sliding-folding-doors', 'motorized-sliding-system', 'sound-proof-sliding-folding-partition'],
    buyerFit: ['Premium villas', 'Hotels', 'Restaurants', 'Commercial facades'],
    noiseOrMotionNeed: 'wide-opening capability, space optimization, effortless automation, and acoustic integrity',
    proof: 'Our experience in building retractable aerospace and architectural systems ensures high-reliability folding mechanisms.',
  },
];

export function getServiceLocationSeo(slug: string) {
  return serviceLocationSeoPages.find((service) => service.slug === slug);
}

export function getServiceLocationPairs() {
  return serviceLocationSeoPages.flatMap((service) =>
    locationSeoPages.map((location) => ({
      service,
      location,
      marketSlug: getLocationMarketSlug(location),
    })),
  );
}

export function getServiceLocationTitle(service: ServiceLocationSeo, location: LocationSeo) {
  return `${service.shortTitle} in ${location.city}`;
}
