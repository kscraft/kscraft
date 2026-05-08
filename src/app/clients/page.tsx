import Link from 'next/link';
import { catalog } from '@/lib/catalog';
import { ChevronRight } from 'lucide-react';

const projectHighlights = [
  {
    title: 'ISRO Gaganyaan Mission',
    subtitle: 'Strategic Engineering',
    detail: 'Design and construction of the astronaut entry mechanism for the Gaganyaan space mission at SHAR Sriharikota.',
  },
  {
    title: 'VJ Villa Pune',
    subtitle: 'Residential Automation',
    detail: 'Complete architectural automation integration including motorized sliding windows and terrace roofing systems.',
  },
  {
    title: 'Hilton Hotel Bengaluru',
    subtitle: 'Commercial Acoustics',
    detail: 'Bespoke motorized vertical sliding window systems for high-performance acoustic isolation.',
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

export default function ClientsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="pt-40 pb-20 px-6 text-center bg-[#fafafa]">
        <div className="mx-auto max-w-4xl">
          <p className="text-[12px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-6">
            Case Studies
          </p>
          <h1 className="text-6xl md:text-[6rem] font-bold tracking-tighter text-black uppercase mb-10 leading-none">
            Trust & <br /> Precision.
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Delivering high-impact engineering solutions for India's leading organizations.
          </p>
        </div>
      </header>

      {/* Project Milestones */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {projectHighlights.map((project) => (
              <div key={project.title} className="p-12 rounded-[2.5rem] bg-[#f5f5f7] border border-slate-100 group transition-all hover:bg-white hover:shadow-2xl">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">{project.subtitle}</p>
                <h3 className="text-3xl font-bold tracking-tight text-black mb-6 uppercase leading-tight">{project.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">{project.detail}</p>
                <Link href="/contact" className="apple-link">Request technical details <ChevronRight className="w-4 h-4" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="py-32 px-6 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold tracking-tight text-black text-center mb-24 uppercase">Partnering with Leaders.</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-12 items-center justify-items-center opacity-40 grayscale contrast-150">
            {clientLogos.map(([name, src]) => (
              <img key={name} src={src} alt={name} className="max-h-12 w-auto object-contain hover:opacity-100 transition-opacity" />
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
