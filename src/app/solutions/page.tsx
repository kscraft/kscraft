import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Layers, Settings2, Zap } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';
import { getLocationMarketSlug, priorityLocationPages } from '@/data/location-seo';
import { serviceLocationSeoPages } from '@/data/service-location-seo';

const SITE_URL = 'https://soundproofindia.com';

export const metadata: Metadata = {
  title: 'Automation & Acoustic Solution Pages | Kiran Slido Craft',
  description:
    'Programmatic SEO hub for automatic sliding windows, motorized soundproof windows, automatic acoustic partitions, sliding doors, and roof systems by city.',
  alternates: {
    canonical: `${SITE_URL}/solutions`,
  },
  openGraph: {
    title: 'Automation & Acoustic Solution Pages | Kiran Slido Craft',
    description: 'Automation and acoustic system pages by priority city and export market.',
    url: `${SITE_URL}/solutions`,
    type: 'website',
  },
};

export default function SolutionsPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Automation and Acoustic Solution Pages',
    description: 'Service plus location pages for acoustic and automation systems.',
    url: `${SITE_URL}/solutions`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: serviceLocationSeoPages.length,
      itemListElement: serviceLocationSeoPages.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.title,
        url: `${SITE_URL}/solutions/${service.slug}/${getLocationMarketSlug(priorityLocationPages[0])}`,
      })),
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />

      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="max-container px-6">
          <div className="max-w-5xl">
            <p className="text-eyebrow text-blue-300">Automation plus location SEO</p>
            <h1 className="heading-hero text-white">
              Automatic Sliding Windows, Acoustic Partitions <span className="text-blue-500">and Motorized Systems</span>
            </h1>
            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-slate-300">
              City-specific pages for high-intent searches such as automatic sliding window in Dubai,
              automatic acoustic partition near me, motorized soundproof window in Mumbai, and folding doors in Kolkata.
            </p>
          </div>
        </div>
      </header>

      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-14 max-w-3xl">
            <p className="text-eyebrow">Solution families</p>
            <h2 className="heading-section">Service-intent pages by city</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {serviceLocationSeoPages.map((service, index) => {
              const icons = [Zap, Settings2, Layers];
              const Icon = icons[index % icons.length];
              const topMarket = priorityLocationPages[0];
              return (
                <article key={service.slug} className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">{service.intentPhrase}</p>
                  <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{service.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{service.metaLead}</p>
                  <Link href={`/solutions/${service.slug}/${getLocationMarketSlug(topMarket)}`} className="mt-7 inline-flex items-center text-sm font-bold text-blue-700">
                    Open Mumbai Example
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-tint">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-14 max-w-3xl">
            <p className="text-eyebrow">P0 market links</p>
            <h2 className="heading-section">Launch automation pages in highest-value cities first</h2>
          </div>
          <div className="grid gap-8">
            {priorityLocationPages.map((location) => (
              <div key={location.slug} className="rounded-3xl border border-slate-200 bg-white p-7">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-2xl font-black tracking-tight text-slate-950">{location.city}</h3>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
                    Rank #{location.rank} | {location.score}/100
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {serviceLocationSeoPages.map((service) => (
                    <Link key={service.slug} href={`/solutions/${service.slug}/${getLocationMarketSlug(location)}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                      {service.shortTitle} in {location.city}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
