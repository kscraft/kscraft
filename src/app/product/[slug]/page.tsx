import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import ProductGallery from '@/components/ProductGallery';
import ProductActions from '@/components/ProductActions';
import Breadcrumbs from '@/components/Breadcrumbs';
import AcousticGraph from '@/components/AcousticGraph';
import ProductDownloads from '@/components/ProductDownloads';
import blogsData from '@/data/blogs.json';
import {
  getProduct,
  getProductsByCategory,
  getProductPrimaryCategory,
  getProductPrimaryCategoryId,
  products
} from '@/lib/catalog';
import ThemeMarker from '@/components/ThemeMarker';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return {};

  const url = `https://soundproofindia.com/product/${product.slug}`;

  return {
    title: `${product.title} | Kiran Slido Craft`,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.title,
      description: product.description,
      url: url,
      images: [{ url: product.images[0] }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Kiran Slido Craft`,
      description: `${product.description.slice(0, 150)}…`,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const primaryCategoryId = getProductPrimaryCategoryId(product);
  const category = getProductPrimaryCategory(product);
  const related = getProductsByCategory(primaryCategoryId)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  const relatedBlogs = blogsData.blogs.filter(blog => 
    blog.relatedProducts && blog.relatedProducts.includes(product.slug)
  );

  const stcMatch = Object.values(product.specifications).find(v => v.includes('STC'))?.match(/\d+/);
  const stcRating = stcMatch ? parseInt(stcMatch[0]) : null;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.title,
    'description': product.description,
    'image': `https://soundproofindia.com${product.images[0]}`,
    'brand': {
      '@type': 'Brand',
      'name': 'Kiran Slido Craft'
    },
    'offers': {
      '@type': 'Offer',
      'url': `https://soundproofindia.com/product/${product.slug}`,
      'availability': 'https://schema.org/InStock',
      'areaServed': ['UK', 'Europe', 'GCC', 'MENA', 'APAC', 'Australia', 'India', 'Americas', 'Africa']
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
        'name': category?.title || 'Products',
        'item': `https://soundproofindia.com/category/${primaryCategoryId}`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': product.title,
        'item': `https://soundproofindia.com/product/${product.slug}`
      }
    ]
  };

  return (
    <article className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      
      {/* Product Hero */}
      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="max-container px-6">
          <Breadcrumbs items={[
            { label: category?.title || 'Products', href: `/category/${primaryCategoryId}` },
            { label: product.title }
          ]} />
          
          <div className="mt-10 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
             {category?.title} Systems
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none max-w-4xl">
            {product.title.split(' ').slice(0, -1).join(' ')} <br />
            <span className="text-blue-500">{product.title.split(' ').slice(-1)}</span>
          </h1>
          <p className="max-w-3xl text-xl md:text-2xl text-slate-400 leading-relaxed font-medium mt-10">
            {product.description}
          </p>
          <div className="mt-12">
            <ProductActions productTitle={product.title} />
          </div>
        </div>
      </header>

      {/* Product Showcase */}
      <section className="section-standard">
        <div className="max-container">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left: Gallery */}
            <div className="lg:col-span-7">
              <ProductGallery product={product} />
              
              <div className="mt-20">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-10">Technical Specifications</h2>
                <div className="grid sm:grid-cols-2 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-white p-8">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{key}</p>
                      <p className="text-lg font-black text-slate-900 tracking-tight">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Features */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-16">
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-10">Engineering Features</h2>
                  <div className="space-y-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-6 group">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <p className="text-lg font-bold text-slate-900 leading-tight pt-2">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {stcRating && (
                  <div>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-10">Acoustic Performance</h2>
                    <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-inner">
                      <AcousticGraph stcRating={stcRating} />
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-10">Primary Applications</h2>
                  <div className="flex flex-wrap gap-3">
                    {product.applications.map((app, idx) => (
                      <span key={idx} className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-700 shadow-sm">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Downloads */}
      <section className="section-tint">
        <div className="max-container">
          <ProductDownloads productTitle={product.title} />
        </div>
      </section>

      {/* Related Content & Products */}
      {(related.length > 0 || relatedBlogs.length > 0) && (
        <section className="section-standard bg-white border-t border-slate-50">
          <div className="max-container">
            <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
              {/* Related Products */}
              {related.length > 0 && (
                <div>
                  <div className="mb-14 flex items-center justify-between">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Similar Systems</h2>
                    <Link href={`/category/${primaryCategoryId}`} className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">
                      View All &rarr;
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {related.slice(0, 2).map((item) => (
                      <ProductCard key={item.slug} product={item} compact />
                    ))}
                  </div>
                </div>
              )}

              {/* Related Engineering Insights */}
              {relatedBlogs.length > 0 && (
                <div>
                  <div className="mb-14 flex items-center justify-between">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Technical Insights</h2>
                    <Link href="/blog" className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">
                      technical Journal &rarr;
                    </Link>
                  </div>
                  <div className="space-y-6">
                    {relatedBlogs.slice(0, 2).map((blog) => (
                      <Link 
                        key={blog.slug} 
                        href={`/blog/${blog.slug}`}
                        className="flex group gap-8 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
                      >
                        <div className="relative h-24 w-24 shrink-0 rounded-2xl overflow-hidden shadow-md">
                          <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-2">{blog.tags[0]}</p>
                          <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors uppercase">{blog.title}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Global Sector Teaser */}
      <section className="section-dark bg-slate-950 py-32 overflow-hidden relative">
        <div className="max-container text-center relative z-10">
          <span className="text-eyebrow text-blue-500 mb-8 inline-block">Engineering DNA</span>
          <h2 className="heading-section text-white mb-10 max-w-4xl mx-auto">
            Ready to solve your most complex <span className="text-blue-500">acoustic or movement challenges?</span>
          </h2>
          <p className="text-xl text-slate-400 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
            Partner with the engineering firm trusted by India&apos;s space program and global industrial leaders.
          </p>
          <Link href="/contact" className="apple-button px-12 py-5 text-sm font-black uppercase tracking-widest inline-flex items-center gap-3">
             Contact Engineering <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent"></div>
      </section>
    </article>
  );
}
