import { getLocationMarketSlug, locationSeoPages, type LocationSeo } from './location-seo';
import serviceLocationSeoData from './service-location-seo.json';

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

export const serviceLocationSeoPages: ServiceLocationSeo[] = serviceLocationSeoData as ServiceLocationSeo[];

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
