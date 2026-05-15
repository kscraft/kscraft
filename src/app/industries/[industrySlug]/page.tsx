import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { industries, getIndustry, getProductsForIndustry } from '@/lib/catalog';
import ProductCard from '@/components/ProductCard';
import ThemeMarker from '@/components/ThemeMarker';
import SpecProcess from '@/components/SpecProcess';

interface Props {
  params: Promise<{ industrySlug: string }>;
}

export async function generateStaticParams() {
  return industries.map((ind) => ({
    industrySlug: ind.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industrySlug } = await params;
  const industry = getIndustry(industrySlug);

  if (!industry) return {};

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      images: [{ url: industry.heroImage }],
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { industrySlug } = await params;
  const industry = getIndustry(industrySlug);

  if (!industry) notFound();

  const relatedProducts = getProductsForIndustry(industry);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="hero-dark relative overflow-hidden">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="absolute inset-0 z-0">
          <Image 
            src={industry.heroImage}
            alt={industry.title}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950/60 to-slate-950"></div>
        </div>
        
        <div className="relative z-10 max-container px-6">
          <div className="max-w-4xl">
            <p className="text-eyebrow text-blue-400 mb-6">{industry.eyebrow}</p>
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
              {industry.title.split(' ').slice(0, -1).join(' ')} <span className="text-blue-600">{industry.title.split(' ').slice(-1)}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl">
              {industry.description}
            </p>
            <div className="mt-12">
              <Link href="/contact" className="apple-button px-10 py-5 text-sm uppercase tracking-widest font-black inline-flex items-center gap-3">
                Consult an Engineer <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-standard">
        <div className="max-container">
          <div className="grid md:grid-cols-3 gap-10">
            {industry.benefits.map((benefit, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-600/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">{benefit.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions - Product Grid */}
      <section className="section-standard bg-slate-50/50 border-y border-slate-100">
        <div className="max-container">
          <div className="mb-20">
            <span className="text-eyebrow">Solutions Portfolio</span>
            <h2 className="heading-section">Recommended <br />Systems for {industry.title.split(' ').slice(-1)}.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {relatedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section Integration */}
      <section className="section-standard overflow-hidden">
        <div className="max-container">
          <div className="mb-20 max-w-3xl">
            <span className="text-eyebrow">The Engineering Journey</span>
            <h2 className="heading-section">How we deliver precision to your industry.</h2>
          </div>
          <SpecProcess />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-container">
          <div className="relative rounded-[4rem] bg-slate-950 p-12 lg:p-24 overflow-hidden text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.2),transparent_70%)]"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 uppercase tracking-tighter">Ready to define <br /> your space?</h2>
              <p className="text-xl text-slate-400 mb-12 font-medium">
                Our acoustic engineers are ready to review your industry-specific requirements and drawings.
              </p>
              <Link href="/contact" className="apple-button px-12 py-6 text-sm uppercase tracking-widest font-black inline-flex items-center gap-4">
                Start Specification <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
