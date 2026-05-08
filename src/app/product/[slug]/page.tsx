import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, FileText, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
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
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12 lg:py-32">
        <Link 
          href={category ? `/category/${category.id}` : '/'} 
          className="inline-flex items-center gap-3 text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-16 hover:text-slate-900 transition-colors group"
        >
          <div className="h-8 w-8 rounded-full border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div> 
          {category?.title || 'Back to Catalog'}
        </Link>

        <div className="grid gap-20 lg:grid-cols-2 lg:items-start">
          {/* Image Surface */}
          <div className="sticky top-32 space-y-8">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[3rem] bg-slate-50 border border-slate-100 shadow-[0_40px_100px_-12px_rgba(0,0,0,0.1)] transition-transform hover:-rotate-1">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer shadow-sm hover:shadow-xl">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            <div className="p-8 rounded-[2rem] bg-blue-50/50 border border-blue-100 flex items-center gap-6">
              <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Verified Engineering</p>
                <p className="text-xs font-medium text-slate-500">ISO 9001 Quality Standard</p>
              </div>
            </div>
          </div>

          {/* Content Surface */}
          <div className="flex flex-col">
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-6 block">
              System Overview
            </span>
            <h1 className="text-4xl lg:text-[5.5rem] font-black text-slate-900 tracking-tighter uppercase leading-[0.95] mb-8">
              {product.title}
            </h1>
            <p className="text-xl lg:text-2xl text-slate-500 leading-relaxed font-medium mb-12">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-20">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-105"
              >
                Request Specification <FileText className="w-5 h-5" />
              </Link>
              {product.sourceUrls[0] && (
                <a 
                  href={product.sourceUrls[0]} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Source Details <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>

            <div className="space-y-16">
              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-4">
                  <div className="w-10 h-1 bg-blue-600 rounded-full" /> Engineering Specs
                </h2>
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                  {Object.entries(product.specifications).map(([label, value]) => (
                    <div key={label} className="border-b border-slate-100 pb-6 group">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2 group-hover:translate-x-1 transition-transform">{label}</p>
                      <p className="font-bold text-slate-900 text-lg">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-4">
                  <div className="w-10 h-1 bg-blue-600 rounded-full" /> Key Features
                </h2>
                <ul className="grid gap-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4 text-slate-600 group">
                      <div className="mt-1 h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-slate-700 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-4">
                  <div className="w-10 h-1 bg-blue-600 rounded-full" /> Industry Applications
                </h2>
                <div className="flex flex-wrap gap-3">
                  {product.applications.map((app) => (
                    <span key={app} className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-slate-700 uppercase tracking-widest hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all">
                      {app}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Related Systems Surface */}
      {related.length > 0 && (
        <section className="bg-slate-50/50 py-32 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Discover More</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Similar Systems</h2>
              </div>
              {category && (
                <Link href={`/category/${category.id}`} className="group flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors">
                  View Full Range <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
            <div className="grid gap-10 md:grid-cols-3">
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
