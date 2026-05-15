import type { LocationSeo } from '@/data/location-seo';
import type { ServiceLocationSeo } from '@/data/service-location-seo';

export function getLocationSoundProofAnswer(location: LocationSeo) {
  const primaryNoiseDrivers = location.noiseDrivers.slice(0, 3).join(', ').toLowerCase();

  return `Sound proof in ${location.city} means reducing unwanted sound entering or leaving a room through windows, doors, partitions, ceilings, walls, and air gaps. For ${location.city} projects affected by ${primaryNoiseDrivers}, the first practical upgrade is usually an airtight acoustic window system using laminated or insulated glass, followed by acoustic doors, partitions, and sealing where the noise path requires it.`;
}

export function getServiceLocationAnswer(service: ServiceLocationSeo, location: LocationSeo) {
  return `${service.shortTitle} in ${location.city} means a custom-engineered ${service.intentPhrase} package for ${service.buyerFit.join(', ').toLowerCase()} that need ${service.noiseOrMotionNeed.toLowerCase()}. Kiran Slido Craft manufactures and supports these systems for ${location.city}, ${location.country}, with project sizing, finish, acoustic or motion requirements, and documentation handled during quotation.`;
}

export function getServiceLocationFirstStep(service: ServiceLocationSeo, location: LocationSeo) {
  return `For ${service.intentPhrase} projects in ${location.city}, start by sharing opening sizes, site photos or drawings, required finish, usage frequency, acoustic target if applicable, and the service zone. Kiran Slido Craft then matches the requirement to relevant products and confirms the engineered specification before quotation.`;
}

export function getLocationWhereToFindAnswer(location: LocationSeo) {
  return `You can find Kiran Slido Craft systems in ${location.city} through our direct engineering consultation and supply network. We support projects across ${location.serviceAreas.slice(0, 3).join(', ')} and surrounding regions. Contact our team for a site-specific technical quote.`;
}

export function getServiceWhereToFindAnswer(service: ServiceLocationSeo, location: LocationSeo) {
  return `Kiran Slido Craft provides technical consultation and direct supply of ${service.shortTitle.toLowerCase()} for projects in ${location.city}. Our engineering team handles project sizing, finish, and acoustic requirements for ${location.serviceAreas.slice(0, 3).join(', ')} and export markets.`;
}
