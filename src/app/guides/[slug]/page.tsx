import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Clock, Tag, BookOpen, ArrowLeft } from 'lucide-react';
import { guides, getGuide } from '@/data/guides';
import { getProduct, products } from '@/lib/catalog';
import ProductCard from '@/components/ProductCard';
import ThemeMarker from '@/components/ThemeMarker';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  const relatedProducts = guide.relatedProducts
    .map(pSlug => getProduct(pSlug))
    .filter((p): p is any => !!p);

  return (
    <div className="bg-white min-h-screen">
      <header className="pt-32 pb-20 border-b border-slate-100">
        <div className="max-container px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 mb-12 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[10px] font-black uppercase tracking-widest text-blue-600">
              <Tag className="w-3 h-3" /> {guide.category}
            </span>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Clock className="w-3 h-3" /> {guide.readTime}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.95] max-w-5xl">
            {guide.title}
          </h1>
          <p className="mt-10 text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl">
            {guide.excerpt}
          </p>
        </div>
      </header>

      <div className="max-container px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">
            {guide.content.map((section, idx) => (
              <section key={idx} className="prose prose-slate max-w-none">
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">
                  {section.sectionTitle}
                </h2>
                <div className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                  {section.text}
                </div>
              </section>
            ))}

            <div className="pt-20 border-t border-slate-100">
              <div className="bg-slate-950 rounded-[3rem] p-10 lg:p-20 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter mb-8">Need custom <br /> technical advice?</h3>
                  <p className="text-xl text-slate-400 mb-12 font-medium max-w-xl">
                    Our engineering team can help clarify complex acoustic requirements for your specific project environment.
                  </p>
                  <Link href="/contact" className="apple-button px-10 py-5 text-sm uppercase tracking-widest font-black inline-flex items-center gap-3">
                    Consult an expert <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-16">
            <div className="sticky top-32 space-y-16">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                  <BookOpen className="w-4 h-4" /> Related Systems
                </h3>
                <div className="space-y-10">
                  {relatedProducts.map((product) => (
                    <div key={product.slug} className="group">
                      <Link href={`/product/${product.slug}`} className="block relative aspect-video rounded-3xl overflow-hidden bg-slate-50 mb-6 border border-slate-100 group-hover:shadow-xl transition-all">
                        <Image 
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain p-4 group-hover:scale-110 transition-transform"
                        />
                      </Link>
                      <Link href={`/product/${product.slug}`} className="block">
                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                          {product.title}
                        </h4>
                        <p className="text-sm text-slate-500 font-medium mt-2 line-clamp-2">
                          {product.description}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
