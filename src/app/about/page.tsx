import type { Metadata } from 'next';
import Image from 'next/image';
import { catalog, products, about } from '@/lib/catalog';
import { Award, Target, Users } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';

export const metadata: Metadata = {
  title: 'About Us | Kiran Slido Craft – ISO 9001 Certified Acoustic Engineers',
  description: 'ISO 9001:2015 certified manufacturer and global exporter of premium soundproofing windows, doors, partitions, and architectural automation systems.',
  alternates: {
    canonical: 'https://soundproofindia.com/about',
  },
  openGraph: {
    title: 'About Kiran Slido Craft | 35+ Years of Acoustic Engineering Excellence',
    description: 'ISO 9001:2015 certified manufacturer and global exporter of precision-engineered acoustic systems and architectural automation. Serving UK, Europe, GCC/MENA, APAC, and Australia.',
    url: 'https://soundproofindia.com/about',
    images: [{ url: '/images/hero/modern-architecture.jpg' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Kiran Slido Craft | Acoustic & Automation Engineers Since 1989',
    description: 'ISO 9001 certified. 35+ years engineering silence and movement for residential, commercial, and aerospace sectors worldwide.',
  },
};

export default function AboutPage() {
  const { hero, infrastructure, values, ui } = about;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Header */}
      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/modern-architecture.jpg" 
            alt={`About ${catalog.company.name}`} 
            fill
            sizes="100vw"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 max-container px-6 text-center lg:text-left">
          <h1 className="heading-hero text-white">
            {hero.title.split(' ')[0]} <span className="text-blue-500">{hero.title.split(' ')[1]}</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-400 leading-relaxed mx-auto lg:mx-0 font-medium">
            {hero.description}
          </p>
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="section-standard overflow-hidden">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/30 -skew-x-12 transform translate-x-20"></div>
        <div className="max-container grid lg:grid-cols-12 gap-20 items-center relative z-10">
          <div className="lg:col-span-7">
            <span className="text-eyebrow">{infrastructure.label}</span>
            <h2 className="heading-page text-slate-900 mb-10">
              {infrastructure.title.split(', ')[0]} <br />{infrastructure.title.split(', ')[1]}
            </h2>
            <div className="space-y-8 text-xl text-slate-500 leading-relaxed font-medium">
              <p>
                {catalog.company.description}
              </p>
              <p>
                {infrastructure.description}
              </p>
            </div>
          </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-6">
              <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-blue-900/5">
                <p className="text-5xl font-black text-blue-600 mb-2 tracking-tighter">35+</p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">{ui.experienceLabel}</p>
              </div>
              <div className="p-10 rounded-[3rem] bg-slate-950 text-white shadow-2xl shadow-blue-600/10 border border-white/5">
                <p className="text-5xl font-black text-blue-400 mb-2 tracking-tighter">{products.length}</p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">{ui.systemsLabel}</p>
              </div>
              <div className="col-span-2 p-10 rounded-[3rem] bg-blue-50 border border-blue-100 shadow-inner">
                <Award className="w-10 h-10 text-blue-600 mb-6" />
                <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">{catalog.company.certifications[0]}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase tracking-wide">{ui.certDetail}</p>
              </div>
            </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="section-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-950/20 to-transparent"></div>
        <div className="max-container relative z-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white/5 backdrop-blur-xl p-16 rounded-[4rem] border border-white/10 shadow-2xl transition-all hover:bg-white/10 group">
              <div className="h-16 w-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white mb-10 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">{values.mission.title}</h3>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                {values.mission.description}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-16 rounded-[4rem] border border-white/10 shadow-2xl transition-all hover:bg-white/10 group">
              <div className="h-16 w-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white mb-10 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">{values.vision.title}</h3>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                {values.vision.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
