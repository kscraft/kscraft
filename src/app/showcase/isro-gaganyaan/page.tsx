import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Rocket, ShieldCheck, ChevronRight, Zap, Target, Gauge, type LucideIcon } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';
import { projects, home } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'ISRO Gaganyaan Case Study | Kiran Slido Craft - Aerospace Engineering',
  description: 'A deep dive into Kiran Slido Craft’s mission-critical engineering for ISRO’s Gaganyaan crew entry mechanism. Indigenous precision for India’s space mission.',
};

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Zap,
  Target,
  Gauge
};

export default function GaganyaanShowcase() {
  const project = projects.highlights.find(p => p.slug === 'isro-gaganyaan');
  
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
        'item': 'https://kiranslidocraft.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Case Studies',
        'item': 'https://kiranslidocraft.com/clients'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': project.title,
        'item': `https://kiranslidocraft.com/showcase/${project.slug}`
      }
    ]
  };

  const faqJsonLd = project.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': project.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
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
      {/* Immersive Space Hero */}
      <section className="hero-dark !h-screen flex items-center justify-center">
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
            <Rocket className="w-4 h-4" /> {project.subtitle}
          </div>
          <h1 className="heading-hero text-white mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {showcase.heroTitle.split(' ')[0]} <br /><span className="text-blue-500">{showcase.heroTitle.split(' ')[1]}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl lg:text-3xl text-slate-300 font-medium leading-relaxed">
            {showcase.heroDescription}
          </p>
        </div>
        
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-24 bg-gradient-to-b from-blue-500/50 to-transparent"></div>
        </div>
      </section>

      {/* The Engineering Ask */}
      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6">
              <span className="text-eyebrow">{showcase.challengeLabel}</span>
              <p className="heading-page text-slate-900 mb-12">
                {showcase.challengeTitle.split(' ').slice(0, 2).join(' ')} <br />{showcase.challengeTitle.split(' ').slice(2).join(' ')}
              </p>
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
              {showcase.uspTitle.split(' ').slice(0, 3).join(' ')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">{showcase.uspTitle.split(' ')[3]}</span> <br />
              {showcase.uspTitle.split(' ').slice(4).join(' ')}
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
