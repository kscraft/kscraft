import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';
import { getLocationMarketSlug, locationSeoPages, priorityLocationPages } from '@/data/location-seo';
import { getServiceLocationSeo } from '@/data/service-location-seo';

const SITE_URL = 'https://soundproofindia.com';

type Props = {
  params: Promise<{ service: string }>;
};

export async function generateStaticParams() {
  const { serviceLocationSeoPages } = await import('@/data/service-location-seo');
  return serviceLocationSeoPages.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceLocationSeo(serviceSlug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} by City | Kiran Slido Craft`,
    description: `${service.metaLead} Browse city-specific ${service.intentPhrase} pages for India, Middle East, Asia, and island hospitality markets.`,
    alternates: {
      canonical: `${SITE_URL}/solutions/${service.slug}`,
    },
  };
}

export default async function ServiceHubPage({ params }: Props) {
  const { service: serviceSlug } = await params;
  const service = getServiceLocationSeo(serviceSlug);

  if (!service) {
    notFound();
  }

  const remainingLocations = locationSeoPages.filter((location) => !priorityLocationPages.includes(location));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="max-container px-6">
          <p className="text-eyebrow text-blue-300">{service.intentPhrase} by city</p>
          <h1 className="heading-hero text-white">
            {service.title} <span className="text-blue-500">Location Pages</span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-slate-300">
            {service.metaLead} Use this index to open city-specific pages for high-value acoustic and automation markets.
          </p>
        </div>
      </header>

      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-14 max-w-3xl">
            <p className="text-eyebrow">P0 markets</p>
            <h2 className="heading-section">Start with the highest revenue potential</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {priorityLocationPages.map((location) => (
              <Link key={location.slug} href={`/solutions/${service.slug}/${getLocationMarketSlug(location)}`} className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-200 hover:bg-white">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">Rank #{location.rank}</p>
                <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950">{service.shortTitle} in {location.city}</h3>
                <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-600">{location.growthReason}</p>
                <span className="mt-6 inline-flex items-center text-sm font-bold text-blue-700">
                  Open Page
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tint">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-14 max-w-3xl">
            <p className="text-eyebrow">All markets</p>
            <h2 className="heading-section">Complete city coverage</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {remainingLocations.map((location) => (
              <Link key={location.slug} href={`/solutions/${service.slug}/${getLocationMarketSlug(location)}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                {service.shortTitle} in {location.city}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
