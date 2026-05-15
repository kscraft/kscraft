import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { catalog, projects, home } from '@/lib/catalog';
import { ChevronRight, Rocket, Shield, Building2, Zap, Sparkles, Hotel, type LucideIcon } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Shield,
  Building2,
  Zap,
  Sparkles,
  Hotel
};
import ClientMarquee from '@/components/ClientMarquee';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Clients & Case Studies | Kiran Slido Craft – ISRO, Tata Steel & Enterprise',
  description: 'Trusted by ISRO, Tata Steel, and Mahindra. Explore our high-impact projects in acoustic engineering and architectural automation.',
  alternates: {
    canonical: 'https://soundproofindia.com/clients',
  },
  openGraph: {
    title: 'Clients & Case Studies | Kiran Slido Craft',
    description: 'Engineering trust with ISRO, Tata Steel, and global enterprises. View our project portfolio.',
    url: 'https://soundproofindia.com/clients',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiran Slido Craft Clients | Enterprise Engineering Portfolio',
    description: 'Trusted by India\u2019s space program and leading enterprises for precision acoustic and automation systems.',
  },
};

export default function ClientsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Clients & Case Studies | Kiran Slido Craft",
    "description": metadata.description,
    "publisher": {
      "@type": "Organization",
      "name": "Kiran Slido Craft",
      "logo": {
        "@type": "ImageObject",
        "url": "https://soundproofindia.com/logo-ksc.png"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Featured Engineering Projects",
      "numberOfItems": projects.highlights.length,
      "itemListElement": projects.highlights.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.detail,
          "image": project.image || "https://soundproofindia.com/images/hero/modern-architecture.jpg"
        }
      }))
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <header className="hero-light relative">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container relative z-10 text-center">
          <div className="flex justify-center mb-10">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Clients', href: '/clients' },
            ]} />
          </div>
          <p className="text-eyebrow mb-6">
            {home.showcaseUI.caseStudies}
          </p>
          <h1 className="heading-hero text-black mx-auto">
            Clients & Case Studies: <br />
            <span className="text-blue-600">Engineering Trust & Precision</span>
          </h1>
          <p className="text-body-lg max-w-2xl mx-auto mt-10">
            {home.showcaseUI.trustAndPrecisionSub}
          </p>
        </div>
      </header>

      {/* Auto-rolling Logo Catalog */}
      <ClientMarquee />

      {/* Project Milestones */}
      <section className="section-standard">
        <div className="max-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.highlights.map((project) => {
              const Icon = iconMap[project.icon || 'Sparkles'] || Sparkles;
              return (
                <div key={project.title} className="flex flex-col rounded-[2.5rem] bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden p-10">
                  <div className="flex-1 flex flex-col">
                    <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">{project.subtitle}</p>
                    <h3 className="text-2xl font-black tracking-tight text-black mb-6 uppercase leading-tight">{project.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">{project.detail}</p>
                    <div className="mt-auto">
                      {project.slug ? (
                        <Link 
                          href={`/showcase/${project.slug}`} 
                          className="group apple-button-secondary px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-black inline-flex items-center justify-center gap-2 self-start"
                        >
                          {project.showcase?.pageType === 'Specification Brief' ? 'View Brief' : catalog.company.ui.viewCaseStudy} <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      ) : (
                        <Link 
                          href="/contact" 
                          className="group apple-button-secondary px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-black inline-flex items-center justify-center gap-2 self-start"
                        >
                          {catalog.company.ui.requestTechnicalDetails} <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="section-tint">
        <div className="max-container">
          <h2 className="heading-section text-center mb-24">{home.showcaseUI.partneringWithLeaders}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-12 items-center justify-items-center opacity-60 grayscale contrast-125">
            {catalog.company.clientLogos.map((client) => (
              <Image 
                key={client.name}
                src={client.image} 
                alt={client.name} 
                width={120} 
                height={48} 
                className="max-h-12 w-auto object-contain hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-standard bg-slate-950 text-white">
        <div className="max-container text-center">
          <h2 className="text-4xl lg:text-6xl font-black mb-10 tracking-tighter uppercase">Start Your Engineering <br />Consultation</h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-16 font-medium">
            Join the ranks of world-class organizations. Partner with Kiran Slido Craft for high-performance acoustic and automation systems.
          </p>
          <Link href="/contact" className="apple-button px-12 py-5 text-xs font-black uppercase tracking-widest">
            Request Technical Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
