import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
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
      <header className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroProduct?.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"} 
            alt={category.title} 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950/40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-widest mb-8 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Overview
          </Link>
          <h1 className="text-4xl lg:text-7xl font-black text-white tracking-tight mb-6">
            {category.title}
          </h1>
          <p className="max-w-2xl text-lg lg:text-xl text-slate-300 leading-relaxed">
            {category.description}
          </p>
        </div>
      </header>

      {/* Product List */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{products.length} Professional Systems</p>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Catalog Items</h2>
          </div>
          <Link href="/contact" className="bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-600 transition-all">
            Request Price List
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
