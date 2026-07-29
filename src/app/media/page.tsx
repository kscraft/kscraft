'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronRight, Filter, Box } from 'lucide-react';
import { media } from '@/lib/catalog';
import ThemeMarker from '@/components/ThemeMarker';
import { cn } from '@/lib/utils';

export default function MediaPage() {
  const { hero, categories, items } = media;
  const [activeCategory, setActiveCategory] = React.useState('all');

  const filteredItems = React.useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter(item => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Immersive Dark Hero */}
      <header className="hero-dark relative overflow-hidden">
        <ThemeMarker theme="dark" className="absolute top-0" />
        
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/modern-architecture.jpg" 
            alt="Engineering Hub" 
            fill
            sizes="100vw"
            className="w-full h-full object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950 to-slate-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-container px-6 pt-20">
          <div className="flex flex-col items-center text-center">
            <span className="text-eyebrow text-blue-500 mb-6">{hero.eyebrow}</span>
            <h1 className="heading-hero text-white mb-10 max-w-4xl mx-auto">
              {hero.title.split(' in ')[0]} <br />
              <span className="text-blue-500">in {hero.title.split(' in ')[1]}</span>
            </h1>
            <p className="max-w-2xl text-xl text-slate-400 leading-relaxed font-medium">
              {hero.description}
            </p>
          </div>
        </div>

        {/* Floating elements for visual depth */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      </header>

      {/* Filter System */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-6">
        <div className="max-container px-6">
          <div className="flex min-w-0 flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex min-w-0 items-center gap-4 md:flex-1">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                  <Filter className="w-4 h-4" />
               </div>
               <div className="no-scrollbar flex min-w-0 max-w-full flex-1 gap-2 overflow-x-auto pb-2 md:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "min-h-12 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                        activeCategory === cat.id 
                          ? "bg-slate-900 text-white shadow-lg" 
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
               </div>
            </div>
            <div className="hidden shrink-0 items-center gap-3 text-slate-500 md:flex">
               <span className="h-1 w-1 rounded-full bg-blue-500 animate-pulse"></span>
               <p className="text-xs font-black uppercase tracking-widest">Live Documentation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering in Motion Grid */}
      <section className="section-standard min-h-screen">
        <div className="max-container px-6">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid"
                >
                  <Link 
                    href={item.href || '/contact'}
                    className="block group relative rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm transition-all hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] hover:scale-[1.01]"
                  >
                    {item.type === 'video' ? (
                      <div className="relative aspect-video">
                        <Image
                          src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 transition-colors group-hover:bg-transparent"></div>
                        <div className="absolute top-8 left-8">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-black fill-current" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-square md:aspect-[4/5]">
                        <Image
                          src={item.image || ''}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                      </div>
                    )}

                    <div className="p-10">
                      <div className="flex items-center gap-3 mb-6">
                         <span className="rounded-full border border-blue-700/10 bg-blue-600/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-blue-700">
                            {item.technicalNote}
                         </span>
                         {item.type === 'video' && (
                           <span className="text-xs font-black uppercase tracking-widest text-slate-500">Operational Demo</span>
                         )}
                      </div>
                      <h2 className="mb-6 text-2xl font-black uppercase leading-none tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                        {item.title}
                      </h2>
                      <div className="flex min-h-12 items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 transition-all">
                         View Details <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Final Engineering CTA */}
      <section className="section-standard bg-slate-950 text-white">
        <div className="max-container px-6 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-blue-600 mb-12 shadow-2xl shadow-blue-600/20">
            <Box className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl lg:text-7xl font-black mb-10 tracking-tighter uppercase leading-none">
            Ready to <br /><span className="text-blue-500">Specify Success?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-20 font-medium">
            Join the mission-critical projects defining India&apos;s architectural future. Partner with the engineering firm trusted for 35+ years.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/contact" className="apple-button px-12 py-6 text-xs font-black uppercase tracking-widest">
              Request Technical Quote
            </Link>
            <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-transparent px-12 py-6 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white/10 active:scale-95">
              View Services Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
