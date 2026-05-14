import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ThemeMarker from '@/components/ThemeMarker';
import { categories, getCategory, getProductsByCategory } from '@/lib/catalog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.id
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return {};
  }

  const url = `https://soundproofindia.com/category/${category.id}`;
  const productCount = getProductsByCategory(category.id).length;

  return {
    title: `${category.title} Systems | Kiran Slido Craft – Global Acoustic & Automation Export`,
    description: `Browse ${productCount} professional ${category.title.toLowerCase()} solutions for commercial, residential, and industrial projects. ISO 9001 certified global exporter serving UK, Europe, GCC/MENA, APAC, and Australia.`,
    keywords: [category.title, `${category.title} manufacturer`, `${category.title} exporter`, 'acoustic systems India', 'soundproofing solutions', 'Kiran Slido Craft'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${category.title} Systems | Kiran Slido Craft`,
      description: category.description,
      url: url,
      images: [{ url: category.image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} | Kiran Slido Craft – ${productCount} Systems`,
      description: `Professional ${category.title.toLowerCase()} engineered for global export. Explore our full range.`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.id);
  const relatedCategories = categories.filter((item) => item.id !== category.id);

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `${category.title} Lineup`,
    'description': category.description,
    'url': `https://soundproofindia.com/category/${category.id}`,
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': products.length,
      'itemListElement': products.map((prod, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'url': `https://soundproofindia.com/product/${prod.slug}`,
        'name': prod.title
      }))
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://soundproofindia.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': category.title,
        'item': `https://soundproofindia.com/category/${category.id}`
      }
    ]
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Product-family header */}
      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="max-container px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="max-w-2xl">
            <span className="text-eyebrow text-blue-400">{category.accent} Product Line</span>
            <h1 className="heading-hero text-white mb-8">
              {category.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium">
              {category.description}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-md">
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
                <p className="text-5xl font-black text-blue-500 tracking-tighter">{products.length}</p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Certified Systems</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
                <p className="text-xl font-black text-white leading-tight uppercase tracking-tight">{category.bestFor}</p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Industry Standard</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 min-w-0 overflow-hidden rounded-[3rem] border border-white/15 bg-white/[0.08] p-5 shadow-[0_40px_120px_-50px_rgba(0,0,0,1)] backdrop-blur-md lg:mt-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-100">
              <Image
                src={category.image}
                alt={category.title}
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-contain p-8"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Clean Product Grid */}
      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="min-w-0">
              <span className="text-eyebrow">Product Selection</span>
              <h2 className="heading-section mb-0">
                {category.title} lineup
              </h2>
            </div>
            <p className="max-w-xl text-body-lg">
              Showing {products.length} products matched to this category. Each system can be adapted to site dimensions, finish requirements, and performance targets.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Related Families */}
      <section className="section-tint">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <span className="text-eyebrow">Related Families</span>
              <h2 className="heading-section mb-0">Compare nearby solutions</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {relatedCategories.map((item) => (
              <Link key={item.id} href={`/category/${item.id}`} className="group flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-[0_20px_45px_-30px_rgba(15,23,42,0.6)]">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <Image src={item.image} alt={item.title} fill sizes="96px" className="object-contain p-2 transition group-hover:scale-105" />
                </div>
                <div className="min-w-0">
                  <p className="break-words text-sm font-semibold leading-5 text-slate-950">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.summary}</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-blue-600 transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-standard text-center border-t border-slate-100">
        <div className="max-container max-w-4xl">
          <span className="text-eyebrow text-center mb-6">Technical Consultation</span>
          <h2 className="heading-section text-center mb-10">Need custom <br />specifications?</h2>
          <Link href={`/contact?scope=${encodeURIComponent(category.title)}`} className="apple-button px-10 py-4 text-sm uppercase tracking-widest font-black">
            Contact our Engineering Team
          </Link>
        </div>
      </section>
    </div>
  );
}
