import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
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

  const url = `https://kiranslidocraft.com/category/${category.id}`;

  return {
    title: `${category.title} Systems | Global Acoustic & Automation Export`,
    description: `Professional ${category.title} solutions for commercial and residential projects. Certified global exporter serving UK, Europe, GCC/MENA, APAC, and Australia.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${category.title} Systems | Kiran Slido Craft`,
      description: category.description,
      url: url,
      images: [{ url: category.image }],
      type: 'website',
    }
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
    'url': `https://kiranslidocraft.com/category/${category.id}`,
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': products.length,
      'itemListElement': products.map((prod, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'url': `https://kiranslidocraft.com/product/${prod.slug}`,
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
        'item': 'https://kiranslidocraft.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': category.title,
        'item': `https://kiranslidocraft.com/category/${category.id}`
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
      <header className="bg-slate-950 px-4 pb-16 pt-32 text-white sm:px-6 md:pb-20 md:pt-40">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(340px,0.74fr)] lg:items-center">
          <div className="min-w-0">
            <p className="mb-5 text-sm font-semibold uppercase leading-6 text-blue-200">
              {category.accent} Product Line
            </p>
            <h1 className="max-w-4xl break-words text-5xl font-semibold leading-none text-white md:text-7xl lg:text-8xl">
              {category.title}
            </h1>
            <p className="mt-7 max-w-2xl break-words text-lg font-medium leading-8 text-slate-300 md:text-2xl md:leading-9">
              {category.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-3xl font-semibold leading-tight">{products.length}</p>
                <p className="mt-2 text-xs font-semibold uppercase leading-5 text-slate-300">Products</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="break-words text-base font-semibold leading-6">{category.bestFor}</p>
                <p className="mt-2 text-xs font-semibold uppercase leading-5 text-slate-300">Best Fit</p>
              </div>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] p-4 shadow-[0_40px_120px_-52px_rgba(0,0,0,0.9)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100">
              <Image
                src={category.image}
                alt={category.title}
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-contain p-5"
              />
            </div>
            <div className="grid gap-3 pt-5">
              {category.highlights.map((highlight) => (
                <div key={highlight} className="flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-200" />
                  <span className="break-words text-sm font-medium leading-6 text-slate-200">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Clean Product Grid */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-slate-100 pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase leading-6 text-blue-600">Available Products</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
                {category.title} lineup
              </h2>
            </div>
            <p className="max-w-xl text-sm font-medium leading-6 text-slate-500">
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

      <section className="bg-[#f6f7f9] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase leading-6 text-blue-600">Related Families</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">Compare nearby solutions</h2>
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
      <section className="border-t border-slate-100 px-6 py-28 text-center">
        <h2 className="mb-8 text-4xl font-semibold leading-tight tracking-tight text-black">Need custom specifications?</h2>
        <Link href="/contact" className="apple-button px-10 py-4 text-sm">
          Contact our Engineering Team
        </Link>
      </section>
    </div>
  );
}
