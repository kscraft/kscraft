'use client';

import Link from 'next/link';
import { ArrowRight, Building2, ChevronRight, Gauge, Layers, Maximize, Shield, Sparkles, Wind, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { catalog, categories, getFeaturedProducts, getProductsByCategory, home, products, projects } from '@/lib/catalog';
import { cn } from '@/lib/utils';

const categoryIcons: Record<string, any> = {
  'sound-proof-windows': Wind,
  'sound-proof-partitions': Layers,
  'sound-proof-doors': Shield,
  'motorized-systems': Zap,
  'roof-sliding-systems': Maximize,
};

export default function Home() {
  const featuredProducts = getFeaturedProducts(6);
  const heroMetrics = [
    { label: 'Since', value: String(catalog.company.founded) },
    { label: 'Certified', value: 'ISO 9001' },
    { label: 'Systems', value: `${products.length} catalogued` },
  ];
  const trustSignals = [
    { icon: Shield, title: 'Acoustic Control', detail: 'Soundproof windows, doors, and partitions for demanding environments.' },
    { icon: Gauge, title: 'Motorized Movement', detail: 'Sliding roofs, gates, barriers, and vertical systems engineered for daily use.' },
    { icon: Building2, title: 'Project Ready', detail: 'Specification-led support for villas, hotels, institutions, and industrial sites.' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Product-led Hero */}
      <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden bg-slate-950 px-6 pb-10 pt-28 text-white">
        <img
          src={home.hero.image}
          alt={home.hero.title}
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.72)_42%,rgba(15,23,42,0.22)_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-white/90 via-white/45 to-transparent" />

        <div className="mx-auto grid w-full max-w-[1320px] gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.62fr)] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="mb-5 text-sm font-semibold uppercase text-blue-200">
              {catalog.company.tagline}
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-none text-white md:text-7xl lg:text-8xl">
              Kiran Slido Craft
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-slate-200 md:text-2xl md:leading-9">
              Precision acoustic and architectural automation systems for spaces where silence, movement, and reliability must work together.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={home.hero.cta.href} className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-slate-950 transition hover:bg-blue-50">
                Explore retractable roofs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/category/sound-proof-windows" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-7 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
                Browse acoustic systems
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md"
          >
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="border-r border-white/15 p-4 last:border-r-0 sm:p-6">
                <div className="text-2xl font-semibold text-white sm:text-3xl">{metric.value}</div>
                <div className="mt-2 text-xs font-semibold uppercase text-slate-300">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Engineering Promise */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-600">Built For Specification</p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
              Quiet engineering with visible architectural intent.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {trustSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div key={signal.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <Icon className="h-7 w-7 text-blue-600" />
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{signal.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Primary Catalog Navigation */}
      <section className="bg-[#f6f7f9] px-6 py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-blue-600">System Catalog</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
                Choose the performance path.
              </h2>
            </div>
            <Link href="/category/sound-proof-windows" className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900">
              View all systems <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Wind;
            return (
              <Link 
                key={cat.id} 
                href={`/category/${cat.id}`}
                className="group flex min-h-[240px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_-32px_rgba(15,23,42,0.55)]"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-7 text-xl font-semibold leading-7 text-slate-950">{cat.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{cat.summary}</p>
                </div>
                <div className="mt-8 flex items-center justify-between text-sm font-semibold text-blue-700">
                  <span>{getProductsByCategory(cat.id).length} systems</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
          </div>
        </div>
      </section>

      {/* Main Catalog Showcase */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-blue-600">Featured Workhorses</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
              Acoustic isolation and automation, presented as systems.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {home.showcase.map((item, idx) => (
              <Link 
                key={idx}
                href={item.cta.href}
                className={cn(
                  "group relative flex min-h-[620px] overflow-hidden rounded-3xl p-8 transition hover:shadow-[0_34px_90px_-45px_rgba(15,23,42,0.8)] sm:p-10",
                  item.theme === 'dark' ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950"
                )}
              >
                <div className="relative z-20 flex max-w-md flex-col justify-between">
                  <div>
                    <p className={cn("text-sm font-semibold uppercase", item.theme === 'dark' ? "text-blue-300" : "text-blue-700")}>
                      Core Solution
                    </p>
                    <h3 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">{item.title}</h3>
                    <p className={cn("mt-5 text-lg font-medium leading-7", item.theme === 'dark' ? "text-slate-300" : "text-slate-600")}>
                    {item.description}
                    </p>
                  </div>
                  <span className={cn("mt-10 inline-flex items-center text-sm font-semibold", item.theme === 'dark' ? "text-blue-300" : "text-blue-700")}>
                    Explore category <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className={cn(
                    "absolute bottom-0 right-0 w-[78%] max-w-xl object-contain transition duration-700 group-hover:scale-105 sm:w-[66%]",
                    item.theme === 'dark' ? "brightness-95" : "mix-blend-multiply"
                  )}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Product Wall */}
      <section className="bg-[#f6f7f9] px-6 py-24">
        <div className="mx-auto mb-14 flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-600">Selected Systems</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
              The lineup built for real sites.
            </h2>
          </div>
          <p className="max-w-xl text-lg font-medium leading-8 text-slate-600">
            Discover our entire range of high-performance architectural systems.
          </p>
        </div>

        <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <Link 
            href="/category/sound-proof-windows" 
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-8 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Explore all systems <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Trust & Engineering */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-600">Trust & Engineering</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
              Designed in India. Built for demanding sites.
            </h2>
            <p className="mt-8 text-lg font-medium leading-8 text-slate-600">
            Trusted by HDFC, Godrej, Pfizer, and ISRO. {catalog.company.name} is an {catalog.company.certifications[0]} certified manufacturer of premium technical solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {catalog.company.certifications.map((cert) => (
                <span key={cert} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {projects.highlights.map((project) => (
              <div key={project.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase text-blue-700">{project.subtitle}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">{project.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{project.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
