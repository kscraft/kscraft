import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe2, MapPin, Trophy } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';
import { locationSeoPages, priorityLocationPages } from '@/data/location-seo';

const SITE_URL = 'https://soundproofindia.com';

export const metadata: Metadata = {
  title: 'Soundproof Window Markets | India, Middle East, Asia & Islands',
  description:
    'Ranked soundproof window market pages for India, Middle East, Singapore, Malaysia, Nepal, Dhaka, Mauritius, Maldives, and island hospitality projects.',
  alternates: {
    canonical: `${SITE_URL}/locations`,
  },
  openGraph: {
    title: 'Soundproof Window Markets | Kiran Slido Craft',
    description: 'Ranked acoustic-window growth markets for India, Middle East, Asia, and island hospitality projects.',
    url: `${SITE_URL}/locations`,
    type: 'website',
  },
};

const regionOrder = ['India', 'Middle East', 'Asia', 'Islands'];

export default function LocationsPage() {
  const groupedLocations = regionOrder.map((region) => ({
    region,
    locations: locationSeoPages.filter((location) => location.region === region),
  }));

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Soundproof Window Location Markets',
    description: 'Ranked location pages for soundproof windows and acoustic systems.',
    url: `${SITE_URL}/locations`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: locationSeoPages.length,
      itemListElement: locationSeoPages.map((location) => ({
        '@type': 'ListItem',
        position: location.rank,
        name: location.title,
        url: `${SITE_URL}/locations/${location.slug}`,
      })),
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />

      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="max-container px-6">
          <div className="max-w-4xl">
            <p className="text-eyebrow text-blue-200">Global Service Network</p>
            <h1 className="heading-hero text-white max-w-[18ch]">
              Soundproof Window Hubs <span className="text-blue-500">Across Global Regions</span>
            </h1>
            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-slate-300">
              Kiran Slido Craft delivers high-performance acoustic and automation systems to priority markets
              across India, the Middle East, Southeast Asia, and island hospitality destinations.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              [String(locationSeoPages.length), 'Market Hubs'],
              [String(priorityLocationPages.length), 'Primary Centers'],
              ['4', 'Strategic Regions'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur-sm">
                <p className="text-4xl font-black tracking-tight text-white">{value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-14 max-w-3xl">
            <p className="text-eyebrow">Service Deployment</p>
            <h2 className="heading-section">Strategic Regional Footprint</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {priorityLocationPages.map((location) => (
              <Link key={location.slug} href={`/locations/${location.slug}`} className="group rounded-[2.5rem] border border-slate-200 bg-slate-50 p-10 transition hover:border-blue-200 hover:bg-white hover:shadow-2xl">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white group-hover:bg-blue-600 transition-colors">
                    {location.rank}
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                    Precision Tier
                  </span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-950">{location.city}</h3>
                <p className="mt-5 line-clamp-3 text-sm font-medium leading-7 text-slate-500">{location.growthReason}</p>
                <span className="mt-10 inline-flex items-center text-xs font-black uppercase tracking-widest text-blue-600">
                  Open Region Page
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
            <p className="text-eyebrow">All target markets</p>
            <h2 className="heading-section">Regional programmatic SEO coverage</h2>
          </div>

          <div className="space-y-14">
            {groupedLocations.map(({ region, locations }) => (
              <div key={region}>
                <div className="mb-6 flex items-center gap-3">
                  <Globe2 className="h-5 w-5 text-blue-700" />
                  <h3 className="text-2xl font-black uppercase tracking-tight text-slate-950">{region}</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {locations.map((location) => (
                    <Link key={location.slug} href={`/locations/${location.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-[0_20px_45px_-30px_rgba(15,23,42,0.6)]">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
                          {location.priority} Rank #{location.rank}
                        </p>
                        {location.rank <= 10 ? <Trophy className="h-4 w-4 text-blue-600" /> : <MapPin className="h-4 w-4 text-slate-400" />}
                      </div>
                      <h4 className="mt-3 text-xl font-black tracking-tight text-slate-950">{location.title}</h4>
                      <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-600">{location.marketSignal}</p>
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
