import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductActions from '@/components/ProductActions';
import { catalog, getCategory, getProduct, getProductsByCategory, products } from '@/lib/catalog';

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
    title: `${product.title} | Kiran Slido Craft - Global Export`,
    description: `${product.description} Available for export to UK, Europe, GCC/MENA, APAC, and Australia. Precision engineered by Kiran Slido Craft.`
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.title,
    'description': product.description,
    'image': `https://kiranslidocraft.com${product.image}`,
    'brand': {
      '@type': 'Brand',
      'name': 'Kiran Slido Craft'
    },
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock',
      'areaServed': ['UK', 'Europe', 'GCC', 'MENA', 'APAC', 'Australia', 'India', 'Americas', 'Africa']
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Immersive Product Hero */}
      <section className="pt-40 pb-20 px-6 text-center bg-[#fafafa]">
        <div className="mx-auto max-w-5xl">
          <p className="text-[12px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-6">
            {category?.title}
          </p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-black uppercase mb-10 leading-none">
            {product.title}.
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed mb-12">
            {product.description}
          </p>
          <ProductActions productTitle={product.title} sourceUrl={product.sourceUrls[0]} />
        </div>
      </section>

      {/* Large Product Visual */}
      <section className="px-6 py-20 bg-white">
        <div className="relative mx-auto max-w-6xl aspect-[16/9] overflow-hidden rounded-[3rem] bg-[#f5f5f7] border border-slate-100 shadow-2xl">
          <Image
            src={product.image} 
            alt={product.title} 
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="w-full h-full object-contain p-12 mix-blend-multiply"
          />
          {/* Authenticity Callout */}
          <div className="absolute bottom-10 right-10 flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/50 px-6 py-3 rounded-full shadow-2xl">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">
              {catalog.company.authenticity.badge}
            </p>
          </div>
        </div>
      </section>

      {/* Technical Specifications - Apple Grid Style */}
      <section className="py-32 px-6 bg-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold tracking-tight text-black mb-20 uppercase text-center">Engineered to <br /> Perfection.</h2>
          
          <div className="grid md:grid-cols-2 gap-20 border-t border-slate-100 pt-20">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-10">Technical Specifications</h3>
              <dl className="space-y-8">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <dt className="text-sm font-bold text-black uppercase mb-1">{key}</dt>
                    <dd className="text-xl text-slate-500 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-10">Key Capabilities</h3>
              <ul className="space-y-6">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xl text-slate-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Surface */}
      <section className="py-32 px-6 bg-[#f5f5f7]">
        <div className="mx-auto max-w-5xl text-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">Applications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {product.applications.map((app) => (
              <span key={app} className="px-8 py-4 bg-white rounded-2xl text-lg font-bold text-black shadow-sm uppercase tracking-tight">
                {app}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Section */}
      {related.length > 0 && (
        <section className="py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black uppercase">Complete your <br /> System.</h2>
              <Link href={`/category/${product.category}`} className="apple-link text-lg">See all {category?.title} &gt;</Link>
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
