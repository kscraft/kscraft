import Link from 'next/link';
import { ArrowRight, Settings, Wrench, ShieldCheck, ClipboardCheck, ChevronRight } from 'lucide-react';
import { services } from '@/lib/catalog';

const iconMap = {
  Settings: Settings,
  Wrench: Wrench,
  ShieldCheck: ShieldCheck,
  ClipboardCheck: ClipboardCheck,
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative py-24 lg:py-48 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/modern-architecture.jpg" 
            alt="Services" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-[7rem] font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
            Service <span className="text-blue-500">Support.</span>
          </h1>
          <p className="max-w-3xl text-xl lg:text-2xl text-slate-400 leading-relaxed mx-auto lg:mx-0 font-medium">
            Comprehensive maintenance and technical lifecycle support for our range of premium acoustic and automatic systems.
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <section className="py-32 mx-auto max-w-7xl px-6 lg:px-12 w-full">
        <div className="grid gap-10 md:grid-cols-2">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Settings;
            return (
              <article key={service.title} className="group p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 shadow-sm transition-all hover:bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-600/5">
                <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white shadow-xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">{service.title}</h2>
                <p className="text-xl text-slate-500 leading-relaxed font-medium mb-10">
                  {service.description}
                </p>
                <div className="flex items-center gap-3 text-xs font-black text-blue-600 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-32 relative overflow-hidden rounded-[4rem] bg-slate-950 p-16 lg:p-32 text-white text-center shadow-[0_50px_100px_-12px_rgba(0,0,0,0.5)]">
          <div className="relative z-10">
            <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs mb-6 block">Ready to Assist</span>
            <h2 className="text-4xl lg:text-7xl font-black mb-10 tracking-tighter uppercase leading-[0.9]">International Standards, <br />Indigenous Support.</h2>
            <p className="mx-auto max-w-3xl text-xl lg:text-2xl text-slate-400 leading-relaxed mb-16 font-medium">
              Kiran Slido Craft provides technical response times and support availability that matches our high engineering quality.
            </p>
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-4 bg-blue-600 text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-105"
            >
              Request Service Support <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </section>
    </div>
  );
}
