import Link from 'next/link';
import { notFound } from 'next/navigation';
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

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.id);
  const heroProduct = products[0];

  return (
    <div className="pb-16">
      <header className="grid min-w-0 gap-10 border-b border-slate-200 bg-white px-6 pb-14 pt-24 lg:grid-cols-[1fr_0.7fr] lg:px-12 lg:pt-28">
        <div className="min-w-0 max-w-[calc(100vw-3rem)] sm:max-w-none">
          <Link href="/" className="mb-7 block text-xs font-black uppercase tracking-widest text-blue-700">
            / Engineering Overview
          </Link>
          <h1 className="break-words text-4xl font-black leading-tight tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-5xl sm:leading-none lg:text-6xl">
            {category.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-600">
            {category.description}
          </p>
        </div>
        {heroProduct ? (
          <div className="min-w-0 max-w-[calc(100vw-3rem)] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm sm:max-w-none">
            <img src={heroProduct.image} alt={heroProduct.title} className="h-full min-h-72 w-full object-cover" />
          </div>
        ) : null}
      </header>

      <section className="px-6 py-16 lg:px-12">
        <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">{products.length} products</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Catalog Items</h2>
          </div>
          <Link href="/contact" className="text-sm font-black uppercase tracking-widest text-blue-700">
            Request quote /
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
