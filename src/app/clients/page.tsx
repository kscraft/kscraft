import Link from 'next/link';
import { Shield, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
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
  ['Tata Power', '/images/clients/tatapower.jpg'],
  ['Sahara Star', '/images/clients/saharastar.jpg'],
  ['Mahindra', '/images/clients/mahindra4.jpg'],
  ['Indian Oil', '/images/clients/indianoil.jpg'],
  ['Cadbury', '/images/clients/cadbury.jpg'],
  ['BPCL', '/images/clients/bpcl.jpg'],
  ['Billimoria', '/images/clients/billimoria.jpg'],
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
      <header className="relative py-24 lg:py-48 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/modern-architecture.jpg" 
            alt="Clients" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-[7rem] font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
            Trust & <span className="text-blue-500">Quality.</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-400 leading-relaxed mx-auto lg:mx-0 font-medium">
            A diverse portfolio of high-impact engineering projects and industrial partnerships across India.
          </p>
        </div>
      </header>

      {/* Project Highlights */}
      <section className="py-32 mx-auto max-w-7xl px-6 lg:px-12 w-full">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Case Studies</span>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">Project Milestones</h2>
          </div>
          <p className="text-xl text-slate-500 max-w-md font-medium leading-relaxed">
            From strategic space missions to luxury hospitality, we deliver engineering excellence at every scale.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {projectHighlights.map((project) => (
            <article key={project.title} className="p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 shadow-sm transition-all hover:-translate-y-2 hover:bg-white hover:border-blue-200 hover:shadow-2xl">
              <div className="mb-8 h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6">Strategic Project</p>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">{project.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {project.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Certifications Surface */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
            <div className="max-w-2xl">
              <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Compliance</span>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none">Quality Registrations</h2>
            </div>
            <Link href="/contact" className="group flex items-center gap-4 text-xs font-black text-blue-400 uppercase tracking-[0.2em] transition-all hover:text-white">
              Request Documentation <div className="h-10 w-10 rounded-full border border-blue-900/50 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all"><ArrowRight className="w-4 h-4" /></div>
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {catalog.company.certifications.map((certification) => (
              <div key={certification} className="flex items-center gap-8 p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all hover:bg-white/10 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform">
                  {getInitials(certification)}
                </div>
                <p className="text-2xl font-black tracking-tighter uppercase">{certification}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="py-32 mx-auto max-w-7xl px-6 lg:px-12 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-50"></div>
        
        <div className="text-center mb-24">
          <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Strategic Alliances</span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-8 leading-none">Partnering with Leaders</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Trusted by the most recognized names in pharmaceuticals, finance, and industrial sectors.
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-7 mb-24">
          {clientLogos.map(([name, src]) => (
            <div key={name} className="aspect-square flex items-center justify-center rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all group grayscale hover:grayscale-0">
              <img src={src} alt={name} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110" />
            </div>
          ))}
        </div>

        {/* Text grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {catalog.company.clients.map((client) => (
            <div key={client} className="flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center transition-all hover:bg-white hover:shadow-2xl group hover:border-blue-100">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[10px] font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all mb-6 uppercase shadow-sm group-hover:rotate-6">
                {getInitials(client)}
              </div>
              <p className="text-xs font-black leading-tight text-slate-800 uppercase tracking-tighter">{client}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
