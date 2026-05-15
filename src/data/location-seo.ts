import locationsData from './locations.json';

export type LocationSeo = {
  slug: string;
  city: string;
  country: string;
  region: 'India' | 'Middle East' | 'Asia' | 'Islands';
  rank: number;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  score: number;
  title: string;
  metaDescription: string;
  marketSignal: string;
  growthReason: string;
  buyerSegments: string[];
  noiseDrivers: string[];
  productFocus: string[];
  serviceAreas: string[];
  proofAngle: string;
  relatedSlugs: string[];
};

export const locationSeoPages: LocationSeo[] = locationsData as unknown as LocationSeo[];

export const priorityLocationPages = locationSeoPages.filter((location) => location.priority === 'P0');

export function getLocationMarketSlug(location: LocationSeo) {
  return location.slug.replace(/^soundproof-windows-/, '');
}

export function getLocationByMarketSlug(marketSlug: string) {
  return locationSeoPages.find((location) => getLocationMarketSlug(location) === marketSlug);
}

export function getLocationSeo(slug: string) {
  return locationSeoPages.find((location) => location.slug === slug);
}

export function getRelatedLocationPages(location: LocationSeo) {
  return location.relatedSlugs
    .map((slug) => getLocationSeo(slug))
    .filter((item): item is LocationSeo => Boolean(item));
}
