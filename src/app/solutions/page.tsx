import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Layers, Settings2, Zap, MapPin, ChevronRight } from 'lucide-react';
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
            <p className="text-eyebrow text-blue-200">System Deployment Map</p>
            <h1 className="heading-hero text-white">
              Architectural Automation <span className="text-blue-500">and Acoustic Systems</span>
            </h1>
            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-slate-300">
              Specialized regional solutions for high-performance architectural needs, from automatic acoustic 
              partitions in global hubs to motorized soundproof windows for premium urban projects.
            </p>
          </div>
        </div>
      </header>

      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-14 max-w-3xl">
            <p className="text-eyebrow">Solution Families</p>
            <h2 className="heading-section">Specialized Regional Services</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {serviceLocationSeoPages.map((service, index) => {
              const icons = [Zap, Settings2, Layers];
              const Icon = icons[index % icons.length];
              const topMarket = priorityLocationPages[0];
              return (
                <article key={service.slug} className="group rounded-[2.5rem] border border-slate-200 bg-slate-50 p-10 hover:bg-white hover:shadow-2xl transition-all">
                  <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-blue-500 group-hover:bg-blue-600 group-hover:text-white shadow-lg transition-all">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">{service.shortTitle}</p>
                  <h3 className="text-3xl font-black tracking-tighter text-slate-950 uppercase">{service.title}</h3>
                  <p className="mt-6 text-sm font-medium leading-relaxed text-slate-500">{service.metaLead}</p>
                  <Link href={`/solutions/${service.slug}/${getLocationMarketSlug(topMarket)}`} className="mt-10 inline-flex items-center text-xs font-black uppercase tracking-widest text-blue-600">
                    View Technical Details
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
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
            <p className="text-eyebrow">Regional Specifications</p>
            <h2 className="heading-section">Primary Operations by Global Hub</h2>
          </div>
          <div className="grid gap-10">
            {priorityLocationPages.map((location) => (
              <div key={location.slug} className="rounded-[3rem] border border-slate-200 bg-white p-10 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                   <MapPin className="w-40 h-40 text-slate-900" />
                </div>
                <div className="relative z-10 mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-4xl font-black tracking-tighter text-slate-950 uppercase">{location.city}</h3>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 px-4 py-2 bg-blue-50 rounded-full">
                    Operational Tier #{location.rank}
                  </span>
                </div>
                <div className="relative z-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {serviceLocationSeoPages.map((service) => (
                    <Link key={service.slug} href={`/solutions/${service.slug}/${getLocationMarketSlug(location)}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-white hover:text-blue-600 hover:shadow-xl group flex items-center justify-between">
                      <span>{service.shortTitle} in {location.city}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
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
