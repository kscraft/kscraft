'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, ChevronRight, Gauge, Layers, Maximize, Shield, Sparkles, Wind, Zap, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { catalog, categories, getFeaturedProducts, getProductsByCategory, home, projects } from '@/lib/catalog';
import { cn } from '@/lib/utils';

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
      <section className="relative isolate overflow-hidden bg-slate-950 px-4 pb-16 pt-28 text-white sm:px-6 md:pb-20 lg:pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.26),transparent_32%),linear-gradient(135deg,#020617_0%,#0f172a_48%,#111827_100%)]" />
        <div className="mx-auto grid min-h-[74svh] w-full max-w-[1320px] gap-10 overflow-hidden lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.82fr)] lg:items-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="min-w-0 max-w-4xl overflow-hidden"
          >
            <p className="mb-5 max-w-full break-words text-sm font-semibold uppercase leading-6 text-blue-200">
              {home.hero.eyebrow}
            </p>
            <h1 className="max-w-full break-words text-4xl font-semibold leading-[1.02] text-white sm:text-5xl md:text-7xl lg:text-8xl">
              {home.hero.title}
            </h1>
            <p className="mt-7 max-w-full break-words text-base font-medium leading-7 text-slate-200 sm:text-lg sm:leading-8 md:max-w-2xl md:text-2xl md:leading-9">
              {home.hero.highlight} <span className="text-slate-400">{home.hero.subhighlight}</span>
            </p>
            <p className="mt-5 max-w-full break-words text-sm leading-7 text-slate-400 sm:text-base md:max-w-2xl">
              {home.hero.description}
            </p>
            <div className="mt-10 flex max-w-full flex-col gap-4 sm:flex-row">
              <Link href={home.hero.cta.href} className="inline-flex min-h-12 w-full min-w-0 items-center justify-center rounded-full bg-white px-5 text-center text-sm font-semibold leading-5 text-slate-950 transition hover:bg-blue-50 sm:w-auto sm:px-7">
                <span className="min-w-0 break-words">{home.hero.cta.label}</span>
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Link>
              <Link href={home.hero.secondaryCta.href} className="inline-flex min-h-12 w-full min-w-0 items-center justify-center rounded-full border border-white/35 px-5 text-center text-sm font-semibold leading-5 text-white transition hover:border-white hover:bg-white/10 sm:w-auto sm:px-7">
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

      {/* Engineering Promise */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase leading-6 text-blue-600">{home.promise.eyebrow}</p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
              {home.promise.title}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {home.promise.items.map((signal) => {
              const Icon = promiseIcons[signal.id] || Shield;
              return (
                <div key={signal.id} className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <Icon className="h-7 w-7 text-blue-600" />
                  <h3 className="mt-5 break-words text-lg font-semibold leading-7 text-slate-950">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{signal.description}</p>
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
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase leading-6 text-blue-600">{home.catalogNav.eyebrow}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
                {home.catalogNav.title}
              </h2>
            </div>
            <Link href={home.catalogNav.cta.href} className="inline-flex shrink-0 items-center text-sm font-semibold text-blue-700 hover:text-blue-900">
              {home.catalogNav.cta.label} <ChevronRight className="ml-1 h-4 w-4" />
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
                      <span className="min-w-0 break-words">{getProductsByCategory(cat.id).length} products</span>
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
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase leading-6 text-blue-600">{home.featured.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
              {home.featured.title}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {home.showcase.map((item, idx) => (
              <Link 
                key={idx}
                href={item.cta.href}
                className={cn(
                  "group relative flex min-h-[560px] min-w-0 overflow-hidden rounded-3xl p-8 transition hover:shadow-[0_34px_90px_-45px_rgba(15,23,42,0.8)] sm:p-10",
                  item.theme === 'dark' ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950"
                )}
              >
                <div className="relative z-20 flex min-w-0 max-w-md flex-col justify-between">
                  <div className="min-w-0">
                    <p className={cn("text-sm font-semibold uppercase leading-6", item.theme === 'dark' ? "text-blue-300" : "text-blue-700")}>
                      {home.featured.badge}
                    </p>
                    <h3 className="mt-4 break-words text-4xl font-semibold leading-tight md:text-5xl">{item.title}</h3>
                    <p className={cn("mt-5 text-lg font-medium leading-7", item.theme === 'dark' ? "text-slate-300" : "text-slate-600")}>
                      {item.description}
                    </p>
                  </div>
                  <span className={cn("mt-10 inline-flex items-center text-sm font-semibold", item.theme === 'dark' ? "text-blue-300" : "text-blue-700")}>
                    {home.featured.ctaLabel} <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="absolute bottom-5 right-4 h-[44%] w-[58%] max-w-xl sm:bottom-0 sm:right-0 sm:h-[64%] sm:w-[62%] sm:translate-y-4">
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

      {/* Secondary Product Wall */}
      <section className="bg-[#f6f7f9] px-6 py-24">
        <div className="mx-auto mb-14 flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase leading-6 text-blue-600">{home.lineup.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
              {home.lineup.title}
            </h2>
          </div>
          <p className="max-w-xl text-lg font-medium leading-8 text-slate-600">
            {home.lineup.description}
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <Link
            href={home.lineup.cta.href}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-8 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {home.lineup.cta.label} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Trust & Engineering */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase leading-6 text-blue-600">{home.trust.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
              {home.trust.title}
            </h2>
            <p className="mt-8 text-lg font-medium leading-8 text-slate-600">
              {home.trust.description}
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
              <div key={project.title} className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase leading-6 text-blue-700">{project.subtitle}</p>
                    <h3 className="mt-2 break-words text-xl font-semibold leading-7 text-slate-950">{project.title}</h3>
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
