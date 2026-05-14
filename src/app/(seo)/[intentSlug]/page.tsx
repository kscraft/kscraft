import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BadgeCheck, Phone, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ThemeMarker from '@/components/ThemeMarker';
import { catalog, getProduct } from '@/lib/catalog';
import { getIntentSeo, intentSeoPages } from '@/data/intent-seo';

const SITE_URL = 'https://soundproofindia.com';

type Props = {
  params: Promise<{ intentSlug: string }>;
};

export async function generateStaticParams() {
  return intentSeoPages.map((intent) => ({
    intentSlug: intent.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { intentSlug } = await params;
  const intent = getIntentSeo(intentSlug);

  if (!intent) {
    return {};
  }

  const pageUrl = `${SITE_URL}/${intent.slug}`;

  return {
    title: `${intent.title} | Kiran Slido Craft`,
    description: intent.metaDescription,
    keywords: [
      `${intent.title.toLowerCase()}`,
      `soundproof systems india`,
      `acoustic fenestration`,
      'Kiran Slido Craft',
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${intent.title} | Kiran Slido Craft`,
      description: intent.metaDescription,
      url: pageUrl,
      type: 'website',
      images: [{ url: '/images/showcase/gaganyaan-ksc-hero.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${intent.title} | Kiran Slido Craft`,
      description: intent.metaDescription,
      images: ['/images/showcase/gaganyaan-ksc-hero.jpg'],
    },
  };
}

export default async function IntentSeoPage({ params }: Props) {
  const { intentSlug } = await params;
  const intent = getIntentSeo(intentSlug);

  if (!intent) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/${intent.slug}`;
  const relatedProducts = intent.relatedProducts.map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: intent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
        name: intent.heroTitle,
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="max-container grid gap-12 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.78fr)] lg:items-center">
          <div className="min-w-0">
            <p className="text-eyebrow text-blue-300">
              {intent.heroSubtitle}
            </p>
            <h1 className="heading-hero text-white">
              {intent.heroTitle}
            </h1>
            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-slate-300">
              {intent.heroDescription} {intent.proofAngle}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={`/contact?scope=${encodeURIComponent(intent.heroTitle)}`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-slate-950 transition hover:bg-blue-50">
                Request Technical Quote
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
                src="/images/showcase/gaganyaan-ksc-hero.jpg"
                alt="Gaganyaan Manufacturing Proof"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover opacity-90"
              />
            </div>
            <div className="grid gap-3 pt-5">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xl font-black text-white">ISO 9001:2015</p>
                <p className="mt-2 text-[10px] font-bold uppercase leading-4 text-slate-300">Certified Manufacturing</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-eyebrow">Precision Engineered</p>
              <h2 className="heading-section mb-0">Recommended {intent.heroTitle} Systems</h2>
            </div>
            <Link href={`/category/${intent.primaryCategorySlug}`} className="apple-button-secondary inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-[0.2em]">
              View Full Category
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section-tint">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-eyebrow">Frequently Asked</p>
            <h2 className="heading-section">Technical Specifications & Capabilities</h2>
            <p className="text-body-lg mb-8">
              Everything you need to know about specifying {intent.heroTitle.toLowerCase()} for your project.
            </p>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
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
          <div className="grid gap-6">
            {intent.faqs.map((faq, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-blue-200">
                <h3 className="text-xl font-bold leading-tight text-slate-900">{faq.question}</h3>
                <p className="mt-4 text-base font-medium leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-standard text-center">
        <div className="max-container max-w-4xl">
          <Sparkles className="mx-auto mb-6 h-9 w-9 text-blue-600" />
          <p className="text-eyebrow text-center">Project Consultation</p>
          <h2 className="heading-section text-center">Ready to specify {intent.heroTitle.toLowerCase()}?</h2>
          <Link href={`/contact?scope=${encodeURIComponent(intent.heroTitle)}`} className="apple-button inline-flex px-10 py-4 text-sm font-black uppercase tracking-widest">
            Send Technical Requirements
          </Link>
        </div>
      </section>
    </div>
  );
}
