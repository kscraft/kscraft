import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Settings, Wrench, ShieldCheck, ClipboardCheck, ChevronRight } from 'lucide-react';
import { catalog, services, home } from '@/lib/catalog';
import ThemeMarker from '@/components/ThemeMarker';

export const metadata: Metadata = {
  title: 'Services & Support | Kiran Slido Craft – AMC, Installation & Maintenance',
  description: 'Comprehensive installation, annual maintenance contracts (AMC), and technical lifecycle support for acoustic systems, motorized automation, and architectural soundproofing solutions.',
  alternates: {
    canonical: 'https://kiranslidocraft.com/services',
  },
  openGraph: {
    title: 'Services & Technical Support | Kiran Slido Craft',
    description: 'Installation, maintenance, and lifecycle support for our acoustic and automation systems. ISO 9001 certified service excellence.',
    url: 'https://kiranslidocraft.com/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiran Slido Craft Services | AMC, Installation & Maintenance',
    description: 'Expert installation and annual maintenance for soundproofing and automation systems across India and export markets.',
  },
};

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
      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/modern-architecture.jpg" 
            alt="Services" 
            fill
            sizes="100vw"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 max-container px-6 text-center lg:text-left">
          <h1 className="heading-hero text-white">
            {home.services.heroTitle.split(' ')[0]} <span className="text-blue-500">{home.services.heroTitle.split(' ')[1]}</span>
          </h1>
          <p className="max-w-3xl text-xl lg:text-2xl text-slate-400 leading-relaxed mx-auto lg:mx-0 font-medium">
            {home.services.heroDescription}
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="grid gap-10 md:grid-cols-2">
            {services.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Settings;
              return (
                <Link href="/contact" key={service.title} className="block group p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 shadow-sm transition-all hover:bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-600/5">
                  <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white shadow-xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">{service.title}</h2>
                  <p className="text-xl text-slate-500 leading-relaxed font-medium mb-10">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs font-black text-blue-600 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    {catalog.company.ui.learnMore} <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-32 relative overflow-hidden rounded-[4rem] bg-slate-950 p-16 lg:p-32 text-white text-center shadow-[0_50px_100px_-12px_rgba(0,0,0,0.5)]">
            <div className="relative z-10">
              <span className="text-eyebrow text-blue-500">{home.services.assistLabel}</span>
              <h2 className="heading-page mb-10">
                {home.services.assistTitle.split(', ')[0]}, <br />{home.services.assistTitle.split(', ')[1]}
              </h2>
              <p className="mx-auto max-w-3xl text-body-lg mb-16">
                {home.services.assistDescription}
              </p>
              <Link 
                href="/contact" 
                className="group apple-button px-12 py-6 text-sm uppercase tracking-widest font-black inline-flex items-center justify-center"
              >
                {home.services.ctaLabel} <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
