import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Rocket, ShieldCheck, ChevronRight, Zap, Target, Gauge, type LucideIcon, Building2, Hotel } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';
import { projects, home } from '@/lib/catalog';
import ClientMarquee from '@/components/ClientMarquee';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.highlights
    .filter(p => p.showcase)
    .map((project) => ({
      slug: project.slug
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.highlights.find(p => p.slug === slug);

  if (!project) {
    return {};
  }

  const pageType = project.showcase?.pageType || 'Case Study';
  const title = `${project.title} ${pageType} | Kiran Slido Craft`;
  const description = project.detail.slice(0, 160);
  const url = `https://soundproofindia.com/showcase/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: project.image ? [{ url: project.image }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: project.image ? [project.image] : [],
    },
  };
}

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Zap,
  Target,
  Gauge,
  Building2,
  Hotel,
  Rocket
};

export default async function ProjectShowcase({ params }: Props) {
  const { slug } = await params;
  const project = projects.highlights.find(p => p.slug === slug);
  
  if (!project || !project.showcase) {
    notFound();
  }

  const { showcase } = project;

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
        'name': project.showcase.pageType === 'Specification Brief' ? 'Specification Briefs' : 'Case Studies',
        'item': 'https://soundproofindia.com/clients'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': project.title,
        'item': `https://soundproofindia.com/showcase/${project.slug}`
      }
    ]
  };

  const faqJsonLd = project.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `Where can I find Kiran Slido Craft systems like those in the ${project.title}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Kiran Slido Craft provides direct technical consultation and global supply for all systems shown. We support projects across India, the Middle East, Southeast Asia, and Europe from our engineering hubs in Mumbai and Kolkata.'
        }
      },
      ...project.faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.a
        }
      }))
    ]
  } : null;

  return (
    <article className="flex flex-col min-h-screen bg-white">
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
      
      {/* Immersive Dark Hero */}
      <section className="hero-dark !min-h-screen flex items-center justify-center py-20">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="absolute inset-0 z-0">
          {project.image && (
            <Image
              src={project.image} 
              alt={project.title} 
              fill
              priority
              className="w-full h-full object-cover opacity-40 scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-container px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
             {project.subtitle}
          </div>
          <h1 className="heading-hero text-white mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-[15ch] mx-auto">
            {showcase.heroTitle}
          </h1>
          <p className="max-w-3xl mx-auto text-xl lg:text-3xl text-slate-300 font-medium leading-relaxed">
            {showcase.heroDescription}
          </p>
        </div>
        
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-24 bg-gradient-to-b from-blue-500/50 to-transparent"></div>
        </div>
      </section>

      {/* Enterprise Trust Marquee */}
      <ClientMarquee />

      {/* The Engineering Ask */}
      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6">
              <span className="text-eyebrow">{showcase.challengeLabel}</span>
              <h2 className="heading-page text-slate-900 mb-12">
                {showcase.challengeTitle}
              </h2>
              <div className="space-y-8 text-xl text-slate-500 leading-relaxed font-medium">
                <p>{showcase.challengeDescription}</p>
              </div>
            </div>
            <div className="lg:col-span-6 grid grid-cols-2 gap-6">
              {showcase.stats.map((stat, idx) => {
                const Icon = iconMap[stat.icon] || Target;
                return (
                  <div key={idx} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-sm transition-all hover:bg-white hover:shadow-xl group">
                    <Icon className="w-8 h-8 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                    <p className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">{stat.value}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Deep Engineering Section */}
      <section className="section-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 grayscale mix-blend-screen pointer-events-none">
          {project.image && <Image src={project.image} alt="Detail" fill className="object-cover" />}
        </div>
        
        <div className="max-container relative z-10">
          <div className="max-w-3xl">
            <span className="text-eyebrow text-blue-400">{showcase.uspLabel}</span>
            <h3 className="heading-page text-white mb-16">
              {showcase.uspTitle}
            </h3>
            <p className="text-2xl text-slate-400 leading-relaxed font-medium mb-12">
              {showcase.uspDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-standard text-center">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container max-w-4xl">
          <h2 className="heading-section mb-10">
            {home.engineeringDNA.challengeTitle}
          </h2>
          <p className="text-body-lg mb-16">
            {home.engineeringDNA.challengeDescription}
          </p>
          <Link 
            href={home.engineeringDNA.cta.href} 
            className="group apple-button px-12 py-6 text-sm uppercase tracking-[0.2em] font-black inline-flex items-center justify-center"
          >
            {home.engineeringDNA.cta.label} <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </article>
  );
}
