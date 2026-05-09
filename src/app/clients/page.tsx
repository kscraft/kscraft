import Image from 'next/image';
import Link from 'next/link';
import { catalog, projects } from '@/lib/catalog';
import { ChevronRight } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';

export default function ClientsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="hero-light">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <p className="text-eyebrow text-center mb-6">
            Case Studies
          </p>
          <h1 className="heading-hero text-black">
            Trust & <br /> Precision.
          </h1>
          <p className="text-body-lg max-w-2xl mx-auto mt-10">
            Delivering high-impact engineering solutions for leading global organizations.
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
                      className="group apple-button-secondary px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-black flex items-center gap-2 self-start inline-flex"
                    >
                      {catalog.company.ui.viewCaseStudy} <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <Link 
                      href="/contact" 
                      className="group apple-button-secondary px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-black flex items-center gap-2 self-start inline-flex"
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
          <h2 className="heading-section text-center mb-24">Partnering with Leaders.</h2>
          
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
