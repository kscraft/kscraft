import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Rocket, ShieldCheck, ChevronRight, Zap, Target, Gauge } from 'lucide-react';
import { projects, home } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'ISRO Gaganyaan Case Study | Kiran Slido Craft - Aerospace Engineering',
  description: 'A deep dive into Kiran Slido Craft’s mission-critical engineering for ISRO’s Gaganyaan crew entry mechanism. Indigenous precision for India’s space mission.',
};

const iconMap: Record<string, any> = {
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Immersive Space Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
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

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
            <Rocket className="w-4 h-4" /> {project.subtitle}
          </div>
          <h1 className="text-6xl lg:text-[clamp(5rem,9vw,9rem)] font-black text-white tracking-tighter leading-[0.85] mb-12 uppercase animate-in fade-in slide-in-from-bottom-8 duration-1000">
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
      <section className="py-40 bg-white px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-[12px] font-black text-blue-600 uppercase tracking-[0.4em] mb-12">{showcase.challengeLabel}</h2>
              <p className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-12 uppercase">
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
                  <div key={idx} className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 shadow-sm transition-all hover:bg-white hover:shadow-xl group">
                    <Icon className="w-10 h-10 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                    <p className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{stat.value}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Deep Engineering Section */}
      <section className="py-40 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 grayscale mix-blend-screen pointer-events-none">
          {project.image && <Image src={project.image} alt="Detail" fill className="object-cover" />}
        </div>
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-[12px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12">{showcase.uspLabel}</h2>
            <h3 className="text-5xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-16">
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
      <section className="py-32 bg-white text-center px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-10">
            {home.engineeringDNA.challengeTitle}
          </h2>
          <p className="text-xl text-slate-500 font-medium leading-relaxed mb-16">
            {home.engineeringDNA.challengeDescription}
          </p>
          <Link 
            href={home.engineeringDNA.cta.href} 
            className="group inline-flex items-center gap-4 bg-blue-600 text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-105"
          >
            {home.engineeringDNA.cta.label} <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
