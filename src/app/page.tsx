'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight, Wind, Shield, Zap, Maximize, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { catalog, categories, getFeaturedProducts, home } from '@/lib/catalog';
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Primary Hero Spotlight - Product First */}
      <section className="relative pt-32 lg:pt-48 pb-0 px-6 bg-white overflow-hidden flex flex-col items-center">
        <div className="max-w-5xl mx-auto text-center z-10 mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[12px] font-bold text-blue-600 uppercase tracking-[0.4em] mb-6">
              Industrial Spotlight
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-bold tracking-tighter text-black mb-10 leading-[0.9]">
              {home.hero.highlight} <br /> 
              <span className="text-zinc-400">{home.hero.subhighlight}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              {home.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <Link href={home.hero.cta.href} className="apple-button text-lg px-12 py-5 shadow-2xl shadow-blue-600/20">
                Explore the System
              </Link>
              <Link href="/category/sound-proof-windows" className="apple-link text-lg group">
                View Full Catalog <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* The Product Image - The undisputed hero */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full max-w-[1400px] mx-auto px-4"
        >
          <div className="relative aspect-[21/9] md:aspect-[16/7] overflow-hidden rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 bg-[#fbfbfb]">
            <img 
              src={home.hero.image} 
              alt={home.hero.title} 
              className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105"
            />
          </div>
        </motion.div>
      </section>

      {/* Primary Catalog Navigation */}
      <section className="sticky top-[60px] z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-6 overflow-x-auto no-scrollbar">
        <div className="mx-auto max-w-[1200px] px-6 flex items-center justify-between gap-12 min-w-max md:min-w-0">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Wind;
            return (
              <Link 
                key={cat.id} 
                href={`/category/${cat.id}`}
                className="flex flex-col items-center gap-3 group transition-all"
              >
                <div className="h-14 w-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-xl group-hover:shadow-blue-600/20 group-hover:-translate-y-1">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-black transition-colors">{cat.title}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main Catalog Showcase */}
      <section className="py-32 px-6 bg-white">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid md:grid-cols-2 gap-8">
            {home.showcase.map((item, idx) => (
              <Link 
                key={idx}
                href={item.cta.href}
                className={cn(
                  "relative h-[700px] rounded-[3.5rem] p-20 flex flex-col items-center text-center overflow-hidden group transition-all hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]",
                  item.theme === 'dark' ? "bg-black text-white" : "bg-[#f5f5f7] text-black"
                )}
              >
                <div className="relative z-20">
                  <p className={cn("text-[12px] font-bold uppercase tracking-[0.3em] mb-6", item.theme === 'dark' ? "text-blue-400" : "text-blue-600")}>
                    Core Solution
                  </p>
                  <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6 leading-tight uppercase">{item.title}</h2>
                  <p className={cn("text-xl font-medium mb-10 max-w-sm mx-auto", item.theme === 'dark' ? "text-zinc-400" : "text-slate-500")}>
                    {item.description}
                  </p>
                  <div className="flex gap-10 justify-center">
                    <span className={cn("apple-link text-lg", item.theme === 'dark' && "text-blue-400")}>
                      Learn more &gt;
                    </span>
                    <span className={cn("apple-link text-lg", item.theme === 'dark' && "text-blue-400")}>
                      Shop &gt;
                    </span>
                  </div>
                </div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className={cn(
                    "absolute bottom-0 w-full max-w-lg object-contain transition-transform duration-[1.5s] group-hover:scale-110 translate-y-10 group-hover:translate-y-0",
                    item.theme === 'dark' ? "brightness-90" : "mix-blend-multiply"
                  )}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Product Wall */}
      <section className="py-32 px-6 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-black uppercase mb-6 leading-none">The Complete <br /> Lineup.</h2>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto">
            Discover our entire range of high-performance architectural systems.
          </p>
        </div>

        <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        
        <div className="mt-32 text-center">
          <Link 
            href="/category/sound-proof-windows" 
            className="apple-button text-lg px-12 py-5"
          >
            Explore All Systems &gt;
          </Link>
        </div>
      </section>

      {/* Trust & Engineering */}
      <section className="py-40 px-6 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-12 uppercase leading-none italic">Designed in India. <br /> Built for the World.</h2>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-20">
            Trusted by HDFC, Godrej, Pfizer, and ISRO. {catalog.company.name} is an {catalog.company.certifications[0]} certified manufacturer of premium technical solutions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-30 grayscale contrast-200">
            {catalog.company.certifications.map((cert) => (
              <div key={cert} className="text-[10px] font-black uppercase tracking-widest text-black border-[1.5px] border-black p-4 rounded-xl">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
