import Link from 'next/link';
import { Shield, Award, Users, ArrowRight } from 'lucide-react';
import { catalog } from '@/lib/catalog';

const projectHighlights = [
  {
    title: 'Crew Entry Mechanism for Gaganyaan',
    detail: 'Design and build of astronaut entry mechanism for ISRO mission Gaganyaan at SHAR Sriharikota, completed in 2024.',
  },
  {
    title: 'VJ Villa Pune',
    detail: 'Premium villa work covering motorized sliding windows, railings and facade scope across windows and terrace railings.',
  },
  {
    title: 'Hilton Hotel Bengaluru',
    detail: 'Motorized vertical sliding windows project delivered for Hilton Hotel Bengaluru through ARC LUX.',
  },
];

const clientLogos = [
  ['Tata Power', 'https://kiranslidocraft.com/clients/tatapower.jpg'],
  ['Sahara Star', 'https://kiranslidocraft.com/clients/saharastar.jpg'],
  ['Mahindra', 'https://kiranslidocraft.com/clients/mahindra4.jpg'],
  ['Indian Oil', 'https://kiranslidocraft.com/clients/indianoil.jpg'],
  ['Cadbury', 'https://kiranslidocraft.com/clients/cadbury.jpg'],
  ['BPCL', 'https://kiranslidocraft.com/clients/bpcl.jpg'],
  ['Billimoria', 'https://kiranslidocraft.com/clients/billimoria.jpg'],
];

function getInitials(name: string) {
  return name
    .replace(/&/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

export default function ClientsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative py-24 lg:py-40 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Clients" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950/40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tight leading-none mb-8 uppercase">
            Trust & <span className="text-blue-500">Quality.</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-300 leading-relaxed mx-auto lg:mx-0">
            A diverse portfolio of high-impact engineering projects and industrial partnerships across India.
          </p>
        </div>
      </header>

      {/* Project Highlights */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-12 w-full">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4">Project Milestones</h2>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            From strategic space missions to luxury hospitality, we deliver engineering excellence at every scale.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {projectHighlights.map((project) => (
            <article key={project.title} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6">Strategic Project</p>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">{project.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {project.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-5xl font-black tracking-tight uppercase mb-4">Quality Registrations</h2>
              <p className="text-lg text-slate-400">
                Verified compliance with national and international industrial standards.
              </p>
            </div>
            <Link href="/contact" className="group flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-widest transition-colors hover:text-white">
              Request Documentation <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {catalog.company.certifications.map((certification) => (
              <div key={certification} className="flex items-center gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white shadow-xl shadow-blue-600/20">
                  {getInitials(certification)}
                </div>
                <p className="text-xl font-black tracking-tight">{certification}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase mb-6">Partnering with Leaders</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Trusted by the most recognized names in pharmaceuticals, finance, and industrial sectors.
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7 mb-12">
          {clientLogos.map(([name, src]) => (
            <div key={name} className="aspect-square flex items-center justify-center rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl transition-shadow grayscale hover:grayscale-0">
              <img src={src} alt={name} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>

        {/* Text grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {catalog.company.clients.map((client) => (
            <div key={client} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center transition-all hover:bg-white hover:shadow-lg group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-[10px] font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-4 uppercase">
                {getInitials(client)}
              </div>
              <p className="text-xs font-black leading-tight text-slate-800 uppercase tracking-tight">{client}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
