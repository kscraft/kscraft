import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductActions from '@/components/ProductActions';
import ProductGallery from '@/components/ProductGallery';
import AcousticGraph from '@/components/AcousticGraph';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductDownloads from '@/components/ProductDownloads';
import blogsData from '@/data/blogs.json';
import {
  catalog,
  getProduct,
  getProductsByCategory,
  getProductPrimaryCategory,
  getProductPrimaryCategoryId,
  products,
} from '@/lib/catalog';

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

  const url = `https://soundproofindia.com/product/${product.slug}`;

  return {
    title: `${product.title} | Kiran Slido Craft - Global Export`,
    description: `${product.description} Available for export to UK, Europe, GCC/MENA, APAC, and Australia. Precision engineered by Kiran Slido Craft.`,
    keywords: [product.title, `${product.title} manufacturer`, `${product.title} exporter`, 'acoustic engineering', 'soundproofing', 'Kiran Slido Craft'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.title} | Kiran Slido Craft`,
      description: product.description,
      url: url,
      images: [{ url: product.image }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Kiran Slido Craft`,
      description: `${product.description.slice(0, 150)}…`,
      images: [product.image],
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
    'image': `https://soundproofindia.com${product.image}`,
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
        'name': category?.title || 'Catalog',
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

  const faqJsonLd = product.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': product.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  } : null;

  return (
    <article className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* Immersive Product Hero */}
      <header className="hero-light">
        <div className="max-container">
          <div className="flex justify-center mb-6">
            <Breadcrumbs items={[
              { label: category?.title || 'Catalog', href: `/category/${primaryCategoryId}` },
              { label: product.title }
            ]} />
          </div>
          <p className="text-eyebrow text-center mb-6">
            {category?.title}
          </p>
          <h1 className="heading-hero text-black">
            {product.title}.
          </h1>
          <p className="text-body-lg max-w-3xl mx-auto mt-10">
            {product.description}
          </p>
          <div className="mt-12">
            <ProductActions productTitle={product.title} sourceUrl={product.sourceUrls[0]} />
          </div>
        </div>
      </header>

      {/* Large Product Visual Gallery */}
      <ProductGallery product={product} />

      {/* Technical Specifications - Apple Grid Style */}
      <section className="py-32 px-6 bg-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold tracking-tight text-black mb-20 uppercase text-center">Engineered to <br /> Perfection.</h2>
          
          <div className="grid lg:grid-cols-2 gap-20 border-t border-slate-100 pt-20">
            <div className="space-y-16">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-10">Technical Specifications</h3>
                <div role="table" aria-label="Product Specifications" className="space-y-8">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} role="row" className="flex flex-col border-b border-slate-50 pb-4">
                      <span role="columnheader" className="text-sm font-bold text-black uppercase mb-1">{key}</span>
                      <span role="cell" className="text-xl text-slate-500 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {stcRating && <AcousticGraph stcRating={stcRating} />}
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
          <ProductDownloads productTitle={product.title} />
        </div>
      </section>

      {/* Applications Surface */}
      <section className="section-tint">
        <div className="max-container text-center">
          <span className="text-eyebrow">Applications</span>
          <div className="flex flex-wrap justify-center gap-4">
            {product.applications.map((app) => (
              <span key={app} className="px-8 py-4 bg-white rounded-2xl text-lg font-bold text-black shadow-sm uppercase tracking-tight">
                {app}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Technical FAQ Section */}
      {product.faqs && (
        <section className="section-standard border-t border-slate-100">
          <div className="max-container max-w-3xl">
            <span className="text-eyebrow text-center">Technical Q&A</span>
            <div className="space-y-12 mt-10">
              {product.faqs.map((faq, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{faq.q}</h4>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Insights Section */}
      {relatedBlogs.length > 0 && (
        <section className="section-standard bg-slate-50/50 border-t border-slate-100">
          <div className="max-container">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 px-6 gap-8">
              <div className="max-w-2xl">
                <span className="text-eyebrow">Engineering Resources</span>
                <h2 className="heading-section">Related <br />Insights.</h2>
              </div>
              <Link 
                href="/blog"
                className="group apple-button-secondary px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-black inline-flex items-center justify-center gap-3 self-start sm:self-auto"
              >
                View all articles
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map(blog => (
                <Link key={blog.id} href={`/blog/${blog.slug}`} className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all">
                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-6 font-medium leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 inline-flex items-center gap-1">
                    Read Article <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Section */}
      {related.length > 0 && (
        <section className="section-standard bg-slate-50/30 border-t border-slate-100">
          <div className="max-container">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 px-6 gap-8">
              <div className="max-w-2xl">
                <span className="text-eyebrow">Systems Selection</span>
                <h2 className="heading-section">Related <br />Solutions.</h2>
              </div>
              <Link 
                href={`/category/${primaryCategoryId}`}
                className="group apple-button-secondary px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-black inline-flex items-center justify-center gap-3 self-start sm:self-auto"
              >
                {catalog.company.ui.exploreAllSystems} 
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
