import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getCategory, getProduct, getProductsByCategory, products } from '@/lib/catalog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.title} | Kiran Slido Craft`,
    description: product.description
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const category = getCategory(product.category);
  const related = getProductsByCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="pb-16">
      <header className="border-b border-slate-200 bg-white px-6 pb-14 pt-24 lg:px-12 lg:pt-28">
        <Link href={category ? `/category/${category.id}` : '/'} className="mb-7 block text-xs font-black uppercase tracking-widest text-blue-700">
          / {category?.title ?? 'Products'}
        </Link>
        <div className="grid min-w-0 gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div className="min-w-0 max-w-[calc(100vw-3rem)] sm:max-w-none">
            <h1 className="break-words text-4xl font-black leading-tight tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-5xl sm:leading-none lg:text-6xl">
              {product.title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-600">{product.description}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="btn-primary w-full justify-center sm:w-auto">
                Request Specification
              </Link>
              {product.sourceUrls[0] ? (
                <a href={product.sourceUrls[0]} target="_blank" rel="noreferrer" className="w-full rounded-lg border border-slate-200 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto">
                  View Source
                </a>
              ) : null}
            </div>
          </div>

          <div className="min-w-0 max-w-[calc(100vw-3rem)] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm sm:max-w-none">
            <img src={product.image} alt={product.title} className="h-full max-h-[520px] min-h-80 w-full object-cover" />
          </div>
        </div>
      </header>

      <section className="grid gap-8 px-6 py-16 lg:grid-cols-[1fr_0.7fr] lg:px-12">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Engineering Details</h2>
          <dl className="mt-8 grid gap-5 md:grid-cols-2">
            {Object.entries(product.specifications).map(([label, value]) => (
              <div key={label} className="border-b border-slate-100 pb-4">
                <dt className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</dt>
                <dd className="mt-2 text-sm font-bold leading-6 text-slate-950">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-lg bg-slate-950 p-8 text-white shadow-sm">
          <h2 className="text-2xl font-black tracking-tight">Standard Features</h2>
          <ul className="mt-7 space-y-4">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-300">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="rounded-lg border border-slate-200 bg-white p-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Common Applications</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {product.applications.map((application) => (
              <span key={application} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                {application}
              </span>
            ))}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="px-6 pb-16 lg:px-12">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Related</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{category?.title}</h2>
            </div>
            {category ? (
              <Link href={`/category/${category.id}`} className="text-sm font-black uppercase tracking-widest text-blue-700">
                View all /
              </Link>
            ) : null}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} compact />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
