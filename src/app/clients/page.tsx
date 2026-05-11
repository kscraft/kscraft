import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { catalog, projects, home } from '@/lib/catalog';
import { ChevronRight } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';

export const metadata: Metadata = {
  title: 'Clients & Case Studies | Kiran Slido Craft – ISRO, Defence & Enterprise',
  description: 'Trusted by ISRO Gaganyaan, Indian Defence, and leading enterprises. Explore case studies and project highlights from the Kiran Slido Craft acoustic and automation engineering portfolio.',
  alternates: {
    canonical: 'https://doorwindowcraft.com/clients',
  },
  openGraph: {
    title: 'Clients & Case Studies | Kiran Slido Craft',
    description: 'Engineering trust with ISRO, Defence, and global enterprises. View our high-impact project portfolio.',
    url: 'https://doorwindowcraft.com/clients',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiran Slido Craft Clients | ISRO, Defence & Enterprise Engineering',
    description: 'Trusted by India\u2019s space program and leading enterprises for mission-critical acoustic and automation systems.',
  },
};

export default function ClientsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="hero-light">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <p className="text-eyebrow text-center mb-6">
            {home.showcaseUI.caseStudies}
          </p>
          <h1 className="heading-hero text-black">
            {home.showcaseUI.trustAndPrecision.split(' & ')[0]} & <br /> {home.showcaseUI.trustAndPrecision.split(' & ')[1]}
          </h1>
          <p className="text-body-lg max-w-2xl mx-auto mt-10">
            {home.showcaseUI.trustAndPrecisionSub}
          </p>
        </div>
      </header>

      {/* Project Milestones */}
      <section className="section-standard">
        <div className="max-container">
          <div className="grid md:grid-cols-3 gap-8">
            {projects.highlights.map((project) => (
              <div key={project.title} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:shadow-2xl">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">{project.subtitle}</p>
                <h3 className="text-2xl font-black tracking-tight text-black mb-6 uppercase leading-tight">{project.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">{project.detail}</p>
                <div className="mt-auto">
                  {project.slug ? (
                    <Link 
                      href={`/showcase/${project.slug}`} 
                      className="group apple-button-secondary px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-black inline-flex items-center justify-center gap-2 self-start"
                    >
                      {catalog.company.ui.viewCaseStudy} <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
            ))}
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="section-tint">
        <div className="max-container">
          <h2 className="heading-section text-center mb-24">{home.showcaseUI.partneringWithLeaders}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-12 items-center justify-items-center opacity-40 grayscale contrast-150">
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
          
          <div className="mt-32 pt-20 border-t border-slate-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12">
              {catalog.company.clients.map((client) => (
                <div key={client} className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
