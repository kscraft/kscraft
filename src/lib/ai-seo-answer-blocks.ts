import type { LocationSeo } from '@/data/location-seo';
import type { ServiceLocationSeo } from '@/data/service-location-seo';

export function getLocationSoundProofAnswer(location: LocationSeo) {
  const primaryNoiseDrivers = location.noiseDrivers.slice(0, 3).join(', ').toLowerCase();

  return `Effective soundproofing in ${location.city} requires a systematic approach to blocking unwanted noise from ${primaryNoiseDrivers} through every potential entry point, including windows, doors, partitions, and air gaps. For most ${location.city} residential and commercial projects, the most practical and immediate upgrade is an airtight acoustic window system using high-performance laminated or insulated glass. This addresses the weakest noise path first, followed by specialized acoustic doors and partitions where deeper isolation is required.`;
}

export function getServiceLocationAnswer(service: ServiceLocationSeo, location: LocationSeo) {
  return `Choosing the right ${service.shortTitle.toLowerCase()} in ${location.city} involves selecting a custom-engineered ${service.intentPhrase} package specifically designed for ${service.buyerFit.join(', ').toLowerCase()} dealing with ${service.noiseOrMotionNeed.toLowerCase()}. Kiran Slido Craft manufactures and supports these high-performance systems for ${location.city} projects, with all technical specifications—including STC ratings, movement automation, and custom finishes—handled directly by our engineering team during the quotation process.`;
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
