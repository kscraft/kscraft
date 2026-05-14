import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BadgeCheck, BarChart3, Building2, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ThemeMarker from '@/components/ThemeMarker';
import { catalog, getProductsByCategory } from '@/lib/catalog';
import { getLocationSeo, getRelatedLocationPages, locationSeoPages } from '@/data/location-seo';

const SITE_URL = 'https://soundproofindia.com';
const products = getProductsByCategory('sound-proof-windows').slice(0, 6);

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return locationSeoPages.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationSeo(slug);

  if (!location) {
    return {};
  }

  const pageUrl = `${SITE_URL}/locations/${location.slug}`;

  return {
    title: `${location.title} | Kiran Slido Craft`,
    description: location.metaDescription,
    keywords: [
      `${location.title.toLowerCase()}`,
      `sound proof windows ${location.city}`,
      `acoustic windows ${location.city}`,
      `noise reduction windows ${location.city}`,
      `soundproof window manufacturer ${location.city}`,
      'Kiran Slido Craft',
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${location.title} | Kiran Slido Craft`,
      description: location.metaDescription,
      url: pageUrl,
      type: 'website',
      images: [{ url: '/images/products/sound-proof-windows.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.title} | Kiran Slido Craft`,
      description: location.metaDescription,
      images: ['/images/products/sound-proof-windows.jpg'],
    },
  };
}

export default async function LocationSeoPage({ params }: Props) {
  const { slug } = await params;
  const location = getLocationSeo(slug);

  if (!location) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/locations/${location.slug}`;
  const relatedLocations = getRelatedLocationPages(location);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: location.title,
    serviceType: 'Soundproof window and acoustic fenestration manufacturing',
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: catalog.company.name,
      url: SITE_URL,
      logo: `${SITE_URL}/logo-ksc.png`,
      telephone: catalog.company.phone,
      email: catalog.company.email,
      hasCredential: 'ISO 9001:2015 Certified',
    },
    areaServed: [
      {
        '@type': 'City',
        name: location.city,
        addressCountry: location.country,
      },
      ...location.serviceAreas.map((area) => ({
        '@type': 'Place',
        name: area,
      })),
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${location.city} acoustic window systems`,
      itemListElement: products.map((product) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: product.title,
          url: `${SITE_URL}/product/${product.slug}`,
          image: `${SITE_URL}${product.image}`,
          description: product.description,
        },
      })),
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Who supplies soundproof windows in ${location.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Kiran Slido Craft manufactures export-grade soundproof windows for ${location.city}, including acoustic sliding, casement, fixed, vertical sliding, and motorized window systems for ${location.buyerSegments.join(', ').toLowerCase()}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What acoustic products are suitable for ${location.city} projects?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${location.productFocus.join(', ')} are the priority product lines for ${location.city}, based on local noise drivers such as ${location.noiseDrivers.join(', ').toLowerCase()}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Why shortlist Kiran Slido Craft for ${location.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Kiran Slido Craft combines ISO 9001:2015 certified manufacturing, acoustic-system specialization, export capability, and the engineering proof point that it manufactured Gaganyaan's capsule entry mechanism.`,
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${SITE_URL}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: location.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="max-container grid gap-12 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.78fr)] lg:items-center">
          <div className="min-w-0">
            <p className="text-eyebrow text-blue-300">
              {location.region} priority {location.priority} market
            </p>
            <h1 className="heading-hero text-white">
              Soundproof Windows <span className="text-blue-500">in {location.city}</span>
            </h1>
            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-slate-300">
              {location.marketSignal} Kiran Slido Craft manufactures acoustic window, door, partition,
              and motorized systems for project teams that need measured noise control and premium finishes.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-slate-950 transition hover:bg-blue-50">
                Request {location.city} Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a href={`tel:${catalog.company.phone}`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-bold text-white transition hover:bg-white/10">
                <Phone className="mr-2 h-4 w-4" />
                Call Engineering Team
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] p-4 shadow-[0_40px_120px_-50px_rgba(15,23,42,1)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white">
              <Image
                src="/images/products/sound-proof-windows.jpg"
                alt={`${location.title} by Kiran Slido Craft`}
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-contain p-6"
              />
            </div>
            <div className="grid gap-3 pt-5 sm:grid-cols-3">
              {[
                [String(location.rank), 'Revenue priority'],
                [String(location.score), 'Growth score'],
                [location.priority, 'Launch tier'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xl font-black text-white">{value}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase leading-4 text-slate-300">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-eyebrow">Market rationale</p>
            <h2 className="heading-section">Why {location.city} is a priority acoustic market</h2>
            <p className="text-body-lg">{location.growthReason}</p>
            <p className="mt-7 text-base font-medium leading-8 text-slate-600">{location.proofAngle}</p>
          </div>
          <div className="grid gap-4">
            {[
              ['Revenue fit', location.marketSignal, BarChart3],
              ['Primary buyers', location.buyerSegments.join(', '), Building2],
              ['Noise drivers', location.noiseDrivers.join(', '), ShieldCheck],
            ].map(([label, value, Icon]) => (
              <div key={label as string} className="flex gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-700">{label as string}</h3>
                  <p className="mt-2 text-base font-semibold leading-7 text-slate-700">{value as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tint">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-12 max-w-3xl">
            <p className="text-eyebrow">Local service areas</p>
            <h2 className="heading-section">Target zones for {location.city} projects</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {location.serviceAreas.map((area) => (
              <span key={area} className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm">
                <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-eyebrow">Recommended systems</p>
              <h2 className="heading-section mb-0">Acoustic products matched to {location.city}</h2>
            </div>
            <Link href="/category/sound-proof-windows" className="apple-button-secondary inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-[0.2em]">
              View Window Lineup
            </Link>
          </div>
          <div className="mb-10 flex flex-wrap gap-3">
            {location.productFocus.map((product) => (
              <span key={product} className="rounded-full bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700">
                {product}
              </span>
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section-standard border-t border-slate-100">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-eyebrow">Selection logic</p>
            <h2 className="heading-section">Ranked by revenue potential, not just search volume</h2>
            <p className="text-body-lg">
              {location.city} ranks #{location.rank} with a {location.score}/100 opportunity score. The score
              combines buyer budget, hospitality and commercial construction depth, acoustic pain, export fit,
              and Kiran Slido Craft&apos;s credibility advantage.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-950">Why Kiran Slido Craft</h3>
            <div className="mt-7 grid gap-4">
              {[
                'ISO 9001:2015 certified acoustic and automation manufacturing.',
                "Kiran Slido Craft manufactured Gaganyaan's capsule entry mechanism.",
                'Custom systems for dimensions, finish, acoustic target, movement, and project documentation.',
              ].map((item) => (
                <div key={item} className="flex gap-4">
                  <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                  <p className="text-sm font-semibold leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-tint">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-12 max-w-3xl">
            <p className="text-eyebrow">Related markets</p>
            <h2 className="heading-section">Nearby growth opportunities</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedLocations.map((related) => (
              <Link key={related.slug} href={`/locations/${related.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-[0_20px_45px_-30px_rgba(15,23,42,0.6)]">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">{related.priority} Rank #{related.rank}</p>
                <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950">{related.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600">{related.growthReason}</p>
                <span className="mt-6 inline-flex items-center text-sm font-bold text-blue-700">
                  Open Market Page
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-standard text-center">
        <div className="max-container max-w-4xl">
          <Sparkles className="mx-auto mb-6 h-9 w-9 text-blue-600" />
          <p className="text-eyebrow text-center">Project consultation</p>
          <h2 className="heading-section text-center">Planning a {location.city} acoustic window project?</h2>
          <Link href="/contact" className="apple-button inline-flex px-10 py-4 text-sm font-black uppercase tracking-widest">
            Send Requirements
          </Link>
        </div>
      </section>
    </div>
  );
}
