import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
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
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12 lg:py-20">
        <Link 
          href={category ? `/category/${category.id}` : '/'} 
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-12 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {category?.title || 'Back to Catalog'}
        </Link>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          {/* Image Gallery Placeholder */}
          <div className="sticky top-32 space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 shadow-2xl shadow-slate-200/50">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden opacity-50 grayscale">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
              {product.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-xl shadow-blue-600/20"
              >
                Request Specification <FileText className="w-5 h-5" />
              </Link>
              {product.sourceUrls[0] && (
                <a 
                  href={product.sourceUrls[0]} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all"
                >
                  Source Details <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-1 bg-blue-600 rounded-full" /> Engineering Specs
                </h2>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                  {Object.entries(product.specifications).map(([label, value]) => (
                    <div key={label} className="border-b border-slate-100 pb-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                      <p className="font-bold text-slate-900">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-1 bg-blue-600 rounded-full" /> Key Features
                </h2>
                <ul className="grid gap-4">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-1 bg-blue-600 rounded-full" /> Applications
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <span key={app} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold text-slate-700">
                      {app}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Related Section */}
      {related.length > 0 && (
        <section className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Discover More</p>
                <h2 className="text-3xl font-black text-slate-900">Similar {category?.title}</h2>
              </div>
              {category && (
                <Link href={`/category/${category.id}`} className="text-sm font-bold text-blue-600 uppercase tracking-widest hover:text-slate-900 transition-colors">
                  View All /
                </Link>
              )}
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
