'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, ChevronRight, Gauge, Layers, Maximize, Rocket, Shield, Sparkles, Wind, Zap, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import SpecsSearch from '@/components/SpecsSearch';
import ThemeMarker from '@/components/ThemeMarker';
import SpecProcess from '@/components/SpecProcess';
import ClientMarquee from '@/components/ClientMarquee';
import { catalog, categories, getFeaturedProducts, getProductsByCategory, home, projects } from '@/lib/catalog';
import { cn } from '@/lib/utils';
import { trackQuoteClick, trackClientEvent } from '@/lib/analytics-client';

const categoryIcons: Record<string, LucideIcon> = {
  'sound-proof-windows': Wind,
  'sound-proof-partitions': Layers,
  'sound-proof-doors': Shield,
  'motorized-systems': Zap,
  'roof-sliding-systems': Maximize,
};

const promiseIcons: Record<string, LucideIcon> = {
  'acoustic-control': Shield,
  'motorized-movement': Gauge,
  'project-ready': Building2,
};

export default function Home() {
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Product-led Hero */}
      <section className="hero-dark isolate">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.26),transparent_32%),linear-gradient(135deg,#020617_0%,#0f172a_48%,#111827_100%)]" />
        <div className="max-container grid min-h-[74svh] w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center px-6">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="min-w-0"
          >
            <p className="text-eyebrow text-blue-200">
              {home.hero.eyebrow}
            </p>
            <h1 className="heading-hero text-white max-w-[15ch] lg:max-w-none">
              {home.hero.title.split(' ').slice(0, 2).join(' ')} <br /><span className="text-blue-500">{home.hero.title.split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="mt-7 max-w-full break-words text-base font-medium leading-7 text-slate-200 sm:text-lg sm:leading-8 md:max-w-2xl md:text-2xl md:leading-9">
              {home.hero.highlight} <span className="text-slate-400">{home.hero.subhighlight}</span>
            </p>
            <p className="mt-5 max-w-full break-words text-sm leading-7 text-slate-400 sm:text-base md:max-w-2xl">
              {home.hero.description}
            </p>
            <div className="mt-10 flex max-w-full flex-col gap-4 sm:flex-row">
              <Link 
                href={home.hero.cta.href} 
                onClick={() => trackQuoteClick('hero_cta', 'homepage')}
                className="inline-flex min-h-12 w-full min-w-0 items-center justify-center rounded-full bg-white px-5 text-center text-sm font-semibold leading-5 text-slate-950 transition hover:bg-blue-50 sm:w-auto sm:px-7"
              >
                <span className="min-w-0 break-words">{home.hero.cta.label}</span>
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Link>
              <Link 
                href={home.hero.secondaryCta.href} 
                onClick={() => trackClientEvent('view_all_solutions_click', { location: 'hero_secondary' })}
                className="inline-flex min-h-12 w-full min-w-0 items-center justify-center rounded-full border border-white/35 px-5 text-center text-sm font-semibold leading-5 text-white transition hover:border-white hover:bg-white/10 sm:w-auto sm:px-7"
              >
                <span className="min-w-0 break-words">{home.hero.secondaryCta.label}</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-full min-w-0 max-w-full overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/[0.08] p-3 shadow-[0_40px_120px_-50px_rgba(15,23,42,1)] backdrop-blur-md sm:rounded-[2rem] sm:p-5"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.125rem] bg-slate-100 sm:rounded-[1.5rem]">
              <Image
                src={home.hero.image}
                alt={home.hero.productTitle}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-contain p-3 sm:p-5"
              />
            </div>
            <div className="grid gap-3 pt-5 sm:grid-cols-3">
              {home.hero.metrics.map((metric) => (
                <div key={metric.label} className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="break-words text-2xl font-semibold leading-tight text-white">{metric.value}</div>
                  <div className="mt-2 break-words text-xs font-semibold uppercase leading-5 text-slate-300">{metric.label}</div>
                </div>
              ))}
            </div>
            <div className="px-1 pt-5">
              <p className="break-words text-sm font-semibold uppercase leading-5 text-blue-200">{home.hero.productTitle}</p>
              <p className="mt-2 break-words text-sm leading-6 text-slate-300">{home.hero.productSubtitle}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enterprise Trust Marquee */}
      <ClientMarquee />

      {/* Engineering DNA Showcase */}
      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <span className="text-eyebrow">{home.engineeringDNA.eyebrow}</span>
              <h2 className="heading-page text-slate-900 mb-10">
                {home.engineeringDNA.title.split('. ')[0]}. <br />
                <span className="text-blue-600">{home.engineeringDNA.title.split('. ')[1]}</span>
              </h2>
              <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-12">
                {home.engineeringDNA.description}
              </p>
              <Link 
                href="/showcase/isro-gaganyaan" 
                onClick={() => trackClientEvent('view_showcase_click', { project: 'gaganyaan' })}
                className="group flex items-center gap-6 p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-950 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{home.showcaseUI.eliteShowcase}</p>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{projects.highlights[0].title}</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">{projects.highlights[0].detail.split('. ')[1]}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 ml-auto group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl">
                <Image 
                  src="/images/media/project-1.jpg" 
                  alt="ISRO Showcase" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
              {/* Floating metrics */}
              <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 hidden md:block">
                <p className="text-5xl font-black text-blue-600 tracking-tighter">{home.showcaseUI.spaceGrade}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">{home.showcaseUI.precisionCertification}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Promise */}
      <section className="section-standard overflow-hidden">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container grid gap-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-eyebrow">{home.promise.eyebrow}</p>
            <h2 className="heading-section">
              {home.promise.title}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {home.promise.items.map((signal) => {
              const Icon = promiseIcons[signal.id] || Shield;
              return (
                <div key={signal.id} className="min-w-0 rounded-3xl border border-slate-100 bg-slate-50 p-8 transition-all hover:bg-white hover:shadow-xl group">
                  <Icon className="h-8 w-8 text-blue-600 transition-transform group-hover:scale-110" />
                  <h3 className="mt-6 break-words text-xl font-bold uppercase tracking-tight text-slate-950 leading-tight">{signal.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">{signal.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Primary Catalog Navigation */}
      <section className="section-tint">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-20">
            <SpecsSearch />
          </div>
          <div className="mb-14 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10">
            <div className="min-w-0">
              <p className="text-eyebrow mb-4">{home.catalogNav.eyebrow}</p>
              <h2 className="heading-section mb-0">
                {home.catalogNav.title}
              </h2>
            </div>
            <Link 
              href={home.catalogNav.cta.href} 
              className="group apple-button-secondary px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-black inline-flex items-center justify-center gap-3"
            >
              {home.catalogNav.cta.label} <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Wind;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className="group flex min-h-[390px] min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_-32px_rgba(15,23,42,0.55)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain p-5 transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase leading-none text-blue-700 shadow-sm">
                      <Icon className="h-3.5 w-3.5" />
                      <span className="max-w-[150px] truncate">{cat.accent}</span>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
                    <div className="min-w-0">
                      <h3 className="break-words text-xl font-semibold leading-7 text-slate-950">{cat.title}</h3>
                      <p className="mt-2 break-words text-xs font-semibold uppercase leading-5 text-slate-400">{cat.bestFor}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{cat.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cat.highlights.slice(0, 2).map((highlight) => (
                          <span key={highlight} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold leading-4 text-slate-600">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-3 text-sm font-semibold text-blue-700">
                      <span className="min-w-0 break-words">{getProductsByCategory(cat.id).length} {home.showcaseUI.productsCount}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Catalog Showcase */}
      <section className="section-standard">
        <div className="max-container">
          <div className="mb-20 max-w-3xl">
            <p className="text-eyebrow">{home.featured.eyebrow}</p>
            <h2 className="heading-section">
              {home.featured.title}
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {home.showcase.map((item, idx) => (
              <Link 
                key={idx}
                href={item.cta.href}
                className={cn(
                  "group relative flex min-h-[560px] min-w-0 overflow-hidden rounded-[3rem] p-10 transition-all hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.2)]",
                  item.theme === 'dark' ? "bg-slate-950 text-white" : "bg-[#f5f5f7] text-slate-950"
                )}
              >
                <div className="relative z-20 flex min-w-0 max-w-md flex-col justify-between">
                  <div className="min-w-0">
                    <p className={cn("text-[10px] font-black uppercase tracking-widest", item.theme === 'dark' ? "text-blue-300" : "text-blue-700")}>
                      {home.featured.badge}
                    </p>
                    <h3 className="mt-4 break-words text-4xl font-black uppercase tracking-tighter md:text-5xl">{item.title}</h3>
                    <p className={cn("mt-6 text-lg font-medium leading-relaxed", item.theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                      {item.description}
                    </p>
                  </div>
                  <span className={cn("mt-10 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest", item.theme === 'dark' ? "text-blue-400" : "text-blue-600")}>
                    {home.featured.ctaLabel} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="absolute bottom-0 right-0 h-[50%] w-[90%] max-w-xl sm:bottom-0 sm:right-0 sm:h-[64%] sm:w-[62%] sm:translate-y-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 520px, 80vw"
                    className={cn(
                      "object-contain transition duration-700 group-hover:scale-105",
                      item.theme === 'dark' ? "brightness-95" : "mix-blend-multiply"
                    )}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Teaser */}
      <section className="section-standard bg-slate-50">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div className="max-w-2xl">
              <span className="text-eyebrow">Project Portfolio</span>
              <h2 className="heading-section mb-0">Engineering Proof <br /><span className="text-blue-600">Across Sectors.</span></h2>
            </div>
            <Link href="/clients" className="apple-button-secondary px-8 py-4 text-xs font-black uppercase tracking-widest inline-flex items-center gap-3">
              View All Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ISRO Highlight (Aerospace) */}
            <div className="flex flex-col rounded-[2.5rem] bg-white border border-slate-200 p-10 shadow-sm hover:shadow-2xl transition-all group">
              <div>
                <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-white">
                  <Rocket className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Aerospace & Defense</p>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-4 uppercase">{projects.highlights[0].title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">Indigenous manufacturing of the crew entry mechanism for India's manned space flight program.</p>
              </div>
              <Link href="/showcase/isro-gaganyaan" className="mt-auto text-xs font-black uppercase tracking-widest text-blue-600 inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Read Aerospace Case Study <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Indian Army Highlight (Defense) */}
            <div className="flex flex-col rounded-[2.5rem] bg-white border border-slate-200 p-10 shadow-sm hover:shadow-2xl transition-all group">
              <div>
                <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-white">
                  <Shield className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">National Defense</p>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-4 uppercase">{projects.highlights[1].title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">PLC-operated automatic barrier systems for high-security access control along national borders.</p>
              </div>
              <Link href="/clients" className="mt-auto text-xs font-black uppercase tracking-widest text-blue-600 inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                View Defense Projects <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Hospitality Highlight */}
            <div className="flex flex-col rounded-[2.5rem] bg-white border border-slate-200 p-10 shadow-sm hover:shadow-2xl transition-all group">
              <div>
                <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-white">
                  <Building2 className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Luxury Hospitality</p>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-4 uppercase">Oberoi & Sahara Star</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">Premium acoustic movable partitions for flexible, sound-isolated ballroom and event spaces.</p>
              </div>
              <Link href="/clients" className="mt-auto text-xs font-black uppercase tracking-widest text-blue-600 inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore Hospitality Proof <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Certifications */}
      <section className="section-standard">
        <div className="max-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <p className="text-eyebrow">{home.trust.eyebrow}</p>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-slate-950">{home.trust.title}</h2>
              <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed">{home.trust.description}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {catalog.company.certifications.map((cert) => (
                <span key={cert} className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-sm">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
