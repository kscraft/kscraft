import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BadgeCheck, Building2, MapPin, Phone, Settings2, ShieldCheck } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ThemeMarker from '@/components/ThemeMarker';
import ClientMarquee from '@/components/ClientMarquee';
import { catalog, products } from '@/lib/catalog';
import { getServiceLocationAnswer, getServiceLocationFirstStep } from '@/lib/ai-seo-answer-blocks';
import { getLocationByMarketSlug } from '@/data/location-seo';
import {
  getServiceLocationPairs,
  getServiceLocationSeo,
  getServiceLocationTitle,
  serviceLocationSeoPages,
} from '@/data/service-location-seo';

const SITE_URL = 'https://soundproofindia.com';

type Props = {
  params: Promise<{ service: string; market: string }>;
};

export async function generateStaticParams() {
  return getServiceLocationPairs().map(({ service, marketSlug }) => ({
    service: service.slug,
    market: marketSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug, market } = await params;
  const service = getServiceLocationSeo(serviceSlug);
  const location = getLocationByMarketSlug(market);

  if (!service || !location) {
    return {};
  }

  const title = getServiceLocationTitle(service, location);
  const pageUrl = `${SITE_URL}/solutions/${service.slug}/${market}`;

  return {
    title: `${title} | Kiran Slido Craft`,
    description: `${service.metaLead} Serving ${location.city}, ${location.country} with ISO 9001 certified manufacturing and export-grade engineering.`,
    keywords: [
      `${service.intentPhrase} in ${location.city}`,
      `${service.nearMePhrase}`,
      `${service.shortTitle.toLowerCase()} ${location.city}`,
      `automatic acoustic systems ${location.city}`,
      `Kiran Slido Craft ${location.city}`,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${title} | Kiran Slido Craft`,
      description: `${service.metaLead} ${location.growthReason}`,
      url: pageUrl,
      type: 'website',
      images: [{ url: '/images/products/motorized-sliding-system.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `${service.metaLead} ${location.city} project consultation.`,
      images: ['/images/products/motorized-sliding-system.jpg'],
    },
  };
}

export default async function ServiceLocationPage({ params }: Props) {
  const { service: serviceSlug, market } = await params;
  const service = getServiceLocationSeo(serviceSlug);
  const location = getLocationByMarketSlug(market);

  if (!service || !location) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/solutions/${service.slug}/${market}`;
  const title = getServiceLocationTitle(service, location);
  const selectedProducts = service.productSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is typeof products[number] => Boolean(product));
  const serviceLocationAnswer = getServiceLocationAnswer(service, location);
  const serviceLocationFirstStep = getServiceLocationFirstStep(service, location);
  const selectedProductNames = selectedProducts.map((product) => product.title).join(', ');
  const serviceSelectionGuidance = [
    {
      title: 'Best-fit buyers',
      body: `${service.shortTitle} are most relevant for ${service.buyerFit.join(', ').toLowerCase()} in ${location.city}.`,
    },
    {
      title: 'Product options',
      body: selectedProductNames
        ? `Relevant Kiran Slido Craft systems include ${selectedProductNames}.`
        : `Kiran Slido Craft maps ${service.shortTitle.toLowerCase()} requirements to custom acoustic and automation systems.`,
    },
    {
      title: 'First step',
      body: serviceLocationFirstStep,
    },
  ];

  const siblingServices = serviceLocationSeoPages.filter((item) => item.slug !== service.slug).slice(0, 3);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: title,
    serviceType: service.title,
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
    audience: service.buyerFit.map((segment) => ({
      '@type': 'Audience',
      audienceType: segment,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${title} product options`,
      itemListElement: selectedProducts.map((product) => ({
        '@type': 'Offer',
        item: {
          "@type": "Product",
          name: product.title,
          url: `${SITE_URL}/product/${product.slug}`,
          image: `${SITE_URL}${product.images[0]}`,
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
        name: `What are ${service.shortTitle.toLowerCase()} in ${location.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: serviceLocationAnswer,
        },
      },
      {
        '@type': 'Question',
        name: `Where can I find ${service.shortTitle.toLowerCase()} in ${location.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Kiran Slido Craft provides technical consultation and direct supply of ${service.shortTitle.toLowerCase()} for projects across ${location.city} and its surrounding areas, including ${location.serviceAreas.slice(0, 3).join(', ')}. Contact our engineering team for a site-specific quote.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which Kiran Slido Craft products fit ${service.shortTitle.toLowerCase()} in ${location.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: selectedProductNames
            ? `${selectedProductNames} are the main product options for ${service.shortTitle.toLowerCase()} in ${location.city}, subject to final site dimensions, finish, operation, and acoustic requirements.`
            : `Kiran Slido Craft maps ${service.shortTitle.toLowerCase()} requirements in ${location.city} to custom acoustic and automation systems after reviewing the project brief.`,
        },
      },
      {
        '@type': 'Question',
        name: `Who supplies ${service.intentPhrase}s in ${location.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Kiran Slido Craft manufactures ${service.intentPhrase}s for ${location.city} projects including ${service.buyerFit.join(', ').toLowerCase()}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Can I search for ${service.nearMePhrase} and request custom sizing?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. Kiran Slido Craft supports custom dimensions, finish requirements, acoustic targets, movement requirements, and project documentation for ${location.city} and export markets.`,
        },
      },
      {
        '@type': 'Question',
        name: `Why choose Kiran Slido Craft for ${title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${service.proof} The company is ISO 9001:2015 certified and manufactured Gaganyaan's capsule entry mechanism.`,
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
        name: 'Solutions',
        item: `${SITE_URL}/solutions`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${SITE_URL}/solutions/${service.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: title,
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
            <p className="text-eyebrow text-blue-200">
              {service.intentPhrase} &bull; {location.city}
            </p>
            <h1 className="heading-hero text-white">
              {service.shortTitle} <span className="text-blue-500">in {location.city}</span>
            </h1>
            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-slate-300">
              {service.metaLead} Kiran Slido Craft delivers specialized systems for {location.city} projects
              requiring {` ${service.noiseOrMotionNeed.toLowerCase()}`} with reliable manufacturing and deep engineering
              documentation.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-slate-950 transition hover:bg-blue-50">
                Request {location.city} Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a href={`tel:${catalog.company.phone}`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-8 text-sm font-bold text-white transition hover:bg-white/10">
                <Phone className="mr-2 h-4 w-4" />
                Engineering Consultation
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.08] p-5 shadow-[0_40px_120px_-50px_rgba(15,23,42,1)] backdrop-blur-md">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem] bg-white">
              <Image
                src={selectedProducts[0]?.images[0] || '/images/products/motorized-sliding-system.jpg'}
                alt={`${title} by Kiran Slido Craft`}
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-contain p-6"
              />
            </div>
            <div className="grid gap-3 pt-5 sm:grid-cols-3">
              {[
                ['ISO 9001', 'Certified'],
                ['STC 50+', 'Verified'],
                [String(selectedProducts.length), 'Systems'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xl font-black text-white">{value}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-300">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Enterprise Trust Marquee */}
      <ClientMarquee />

      <section className="section-standard border-b border-slate-100">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-eyebrow">Direct answer</p>
            <h2 className="heading-section">What are {service.shortTitle.toLowerCase()} in {location.city}?</h2>
            <p className="text-body-lg">{serviceLocationAnswer}</p>
            <p className="mt-6 text-base font-semibold leading-8 text-slate-600">
              This page is the canonical source for {service.intentPhrase} in {location.city}; use the matched products,
              local service areas, and proof points below when comparing suppliers or requesting a quote.
            </p>
          </div>
          <div className="grid gap-4">
            {serviceSelectionGuidance.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">{item.title}</h3>
                <p className="mt-3 text-base font-semibold leading-7 text-slate-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-eyebrow">Technical Capability</p>
            <h2 className="heading-section">Engineered for <br /><span className="text-blue-600">{location.city} Projects</span></h2>
            <p className="text-body-lg">
              Architectural automation and acoustic control require a discipline that goes beyond standard fenestration.
              We provide the {location.city} market with project-ready systems backed by aerospace-grade manufacturing
              and rigorous documentation for developers and architects.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              ['Sector Fit', service.buyerFit.join(', '), Building2],
              ['Regional Focus', location.growthReason, MapPin],
              ['Core Function', service.noiseOrMotionNeed, Settings2],
            ].map(([label, value, Icon]) => (
              <div key={label as string} className="flex gap-5 rounded-[2rem] border border-slate-200 bg-slate-50 p-7 group hover:bg-white hover:shadow-xl transition-all">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">{label as string}</h3>
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
            <h2 className="heading-section">{location.city} operational <br />coverage zones</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {location.serviceAreas.map((area) => (
              <span key={area} className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 transition-colors">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-16 max-w-3xl">
            <p className="text-eyebrow">Matched products</p>
            <h2 className="heading-section mb-0">Systems for {title}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {selectedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section-standard border-t border-slate-100">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-eyebrow">Proof</p>
            <h2 className="heading-section">Automation and acoustic systems need engineering discipline</h2>
            <p className="text-body-lg">{service.proof}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-950">Why shortlist KSC</h3>
            <div className="mt-7 grid gap-4">
              {[
                'ISO 9001:2015 certified manufacturing.',
                "Kiran Slido Craft manufactured Gaganyaan's capsule entry mechanism.",
                'Custom sizing, finish, acoustic targets, motion requirements, and project documentation.',
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
            <p className="text-eyebrow">Related solution searches</p>
            <h2 className="heading-section">More {location.city} automation and acoustic pages</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {siblingServices.map((sibling) => (
              <Link key={sibling.slug} href={`/solutions/${sibling.slug}/${market}`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-[0_20px_45px_-30px_rgba(15,23,42,0.6)]">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">{sibling.intentPhrase}</p>
                <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950">{getServiceLocationTitle(sibling, location)}</h3>
                <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600">{sibling.metaLead}</p>
                <span className="mt-6 inline-flex items-center text-sm font-bold text-blue-700">
                  Open Page
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-standard text-center">
        <div className="max-container max-w-4xl">
          <ShieldCheck className="mx-auto mb-6 h-9 w-9 text-blue-600" />
          <p className="text-eyebrow text-center">Project consultation</p>
          <h2 className="heading-section text-center">Need {service.shortTitle.toLowerCase()} in {location.city}?</h2>
          <Link href="/contact" className="apple-button inline-flex px-10 py-4 text-sm font-black uppercase tracking-widest">
            Send Requirements
          </Link>
        </div>
      </section>
    </div>
  );
}
