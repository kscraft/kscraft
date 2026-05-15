import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BadgeCheck, BarChart3, Building2, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ThemeMarker from '@/components/ThemeMarker';
import ClientMarquee from '@/components/ClientMarquee';
import { catalog, getProductsByCategory } from '@/lib/catalog';
import { getLocationSeo, getRelatedLocationPages, locationSeoPages } from '@/data/location-seo';
import { getLocationSoundProofAnswer } from '@/lib/ai-seo-answer-blocks';

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
  const soundProofAnswer = getLocationSoundProofAnswer(location);
  const selectionGuidance = [
    {
      title: 'Homes and bedrooms',
      body: `Start with acoustic sliding, casement, or fixed windows when the main problem is ${location.noiseDrivers[0]?.toLowerCase() || 'outside traffic noise'}.`,
    },
    {
      title: 'Studios and offices',
      body: 'Combine windows with acoustic doors, fixed partitions, and controlled seals so speech, music, and meeting noise do not leak through weak junctions.',
    },
    {
      title: 'Hotels, hospitals, and industry',
      body: 'Specify performance targets, frame depth, glass build-up, hardware, and installation tolerances before requesting a quote.',
    },
  ];

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
        name: `Sound proof in ${location.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: soundProofAnswer,
        },
      },
      {
        '@type': 'Question',
        name: `What should I install first for ${location.city} traffic noise?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `For most ${location.city} homes, hotels, clinics, studios, and offices, start with airtight acoustic windows using laminated or insulated glass because windows and frame gaps are often the weakest exterior noise path. Doors, partitions, ceilings, and wall isolation should be added when the site survey shows those paths are also leaking sound.`,
        },
      },
      {
        '@type': 'Question',
        name: `Where can I find ${location.productFocus[0]} in ${location.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Kiran Slido Craft provides technical consultation and direct supply of ${location.productFocus[0]} for projects across ${location.city} and its surrounding areas, including ${location.serviceAreas.slice(0, 3).join(', ')}. Contact our engineering team for a site-specific quote.`,
        },
      },
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
            <p className="text-eyebrow text-blue-200">
              {location.region} Engineering Operations
            </p>
            <h1 className="heading-hero text-white">
              Soundproof Windows <span className="text-blue-500">in {location.city}</span>
            </h1>
            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-slate-300">
              {location.marketSignal} Kiran Slido Craft delivers high-performance acoustic isolation and architectural
              automation systems for {location.city} project teams requiring measured noise control and premium finishes.
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
                ['ISO 9001', 'Certified'],
                ['STC 50+', 'Rating'],
                [location.priority === 'P0' ? 'Priority' : 'Regional', 'Service'],
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
            <h2 className="heading-section">Sound proof in {location.city}?</h2>
            <p className="text-body-lg">{soundProofAnswer}</p>
            <p className="mt-6 text-base font-semibold leading-8 text-slate-600">
              Kiran Slido Craft is a Mumbai-headquartered, ISO 9001:2015 certified manufacturer of soundproof windows,
              acoustic doors, acoustic partitions, and motorized systems for quote-driven residential, commercial,
              hospitality, healthcare, studio, and industrial projects.
            </p>
          </div>
          <div className="grid gap-4">
            {selectionGuidance.map((item) => (
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
            <p className="text-eyebrow">Technical Footprint</p>
            <h2 className="heading-section">Why {location.city} demands <br /><span className="text-blue-600">Precision Engineering</span></h2>
            <p className="text-body-lg">{location.growthReason}</p>
            <p className="mt-7 text-base font-medium leading-8 text-slate-600">{location.proofAngle}</p>
          </div>
          <div className="grid gap-4">
            {[
              ['Local Insights', location.marketSignal, BarChart3],
              ['Sector Focus', location.buyerSegments.join(', '), Building2],
              ['Noise Mitigation', location.noiseDrivers.join(', '), ShieldCheck],
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
            <h2 className="heading-section">Operational zones for <br />{location.city} projects</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {location.serviceAreas.map((area) => (
              <span key={area} className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 transition-colors">
                <MapPin className="mr-3 h-4 w-4 text-blue-600" />
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
            <p className="text-eyebrow">Engineering Rigor</p>
            <h2 className="heading-section">Why KSC is the <br /><span className="text-blue-600">Calculated Choice.</span></h2>
            <p className="text-body-lg">
              Our presence in {location.city} is backed by technical depth and project-specific engineering.
              Whether it is high-decibel traffic noise or complex architectural movement, we provide
              systems validated by laboratory testing and mission-grade manufacturing proof points.
            </p>
          </div>
          <div className="rounded-[3rem] border border-slate-200 bg-slate-50 p-10 shadow-sm">
            <h3 className="text-3xl font-black uppercase tracking-tight text-slate-950 mb-8">Why Shortlist KSC</h3>
            <div className="grid gap-6">
              {[
                'ISO 9001:2015 certified acoustic and automation manufacturing.',
                "Kiran Slido Craft manufactured Gaganyaan's capsule entry mechanism for ISRO.",
                'Custom systems for dimensions, finish, acoustic target, movement, and project documentation.',
              ].map((item) => (
                <div key={item} className="flex gap-5">
                  <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <p className="text-lg font-semibold leading-relaxed text-slate-700">{item}</p>
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
