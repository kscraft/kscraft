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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Immersive Category Header */}
      <header className="pt-40 pb-20 px-6 text-center bg-[#fafafa]">
        <div className="mx-auto max-w-4xl">
          <p className="text-[12px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-6">
            Product Line
          </p>
          <h1 className="text-6xl md:text-[6rem] font-bold tracking-tighter text-black uppercase mb-10 leading-none">
            {category.title}.
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </div>
      </header>

      {/* Clean Product Grid */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-400 mb-16 uppercase tracking-widest border-b border-slate-100 pb-6">
            Showing {products.length} {category.title} systems
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 text-center border-t border-slate-100">
        <h2 className="text-4xl font-bold tracking-tight text-black mb-8 uppercase">Need custom specifications?</h2>
        <Link href="/contact" className="apple-button text-sm px-10 py-4">
          Contact our Engineering Team
        </Link>
      </section>
    </div>
  );
}
