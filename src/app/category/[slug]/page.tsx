import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Category Hero */}
      <header className="relative bg-slate-950 py-32 lg:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroProduct?.image || "/images/hero/modern-architecture.jpg"} 
            alt={category.title} 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950/60 to-slate-950"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <Link href="/" className="inline-flex items-center gap-3 text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-12 hover:text-white transition-colors group">
            <div className="h-8 w-8 rounded-full border border-blue-900/50 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div> 
            Back to Overview
          </Link>
          <h1 className="text-5xl lg:text-[7rem] font-black text-white tracking-tighter uppercase leading-[0.9] mb-10">
            {category.title}
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-400 leading-relaxed font-medium">
            {category.description}
          </p>
        </div>
      </header>

      {/* Product List Surface */}
      <section className="py-32 bg-slate-50/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-30"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-12 w-full relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 mb-4">
                <LayoutGrid className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">{products.length} Professional Systems</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">Catalog Items</h2>
            </div>
            <Link href="/contact" className="bg-slate-950 text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all hover:shadow-[0_20px_50px_rgba(37,99,235,0.2)]">
              Request Technical Quote
            </Link>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
        
        {/* Background accent */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
      </section>
    </div>
  );
}
