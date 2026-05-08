'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Zap, Globe, Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { catalog, categories, getFeaturedProducts, products, home } from '@/lib/catalog';
import { cn } from '@/lib/utils';

export default function Home() {
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Primary Hero */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden bg-[#fafafa]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-black mb-6 leading-none">
            {home.hero.highlight} <br /> <span className="text-blue-600">{home.hero.subhighlight}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium mb-10 max-w-2xl mx-auto">
            {home.hero.description}
          </p>
          <div className="flex items-center justify-center gap-8">
            <Link href={home.hero.cta.href} className="apple-link text-lg">
              {home.hero.cta.label} <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href={home.hero.secondaryCta.href} className="apple-link text-lg">
              {home.hero.secondaryCta.label} <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute bottom-0 w-full max-w-6xl aspect-video mx-auto overflow-hidden rounded-t-[3rem] shadow-[0_-20px_100px_-12px_rgba(0,0,0,0.1)]"
        >
          <img 
            src={home.hero.image} 
            alt={home.hero.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Secondary Showcase */}
      <section className="grid md:grid-cols-2 gap-4 p-4 bg-white">
        {home.showcase.map((item, idx) => (
          <div 
            key={idx}
            className={cn(
              "relative h-[600px] rounded-[2.5rem] p-16 flex flex-col items-center text-center overflow-hidden group",
              item.theme === 'dark' ? "bg-black text-white" : "bg-[#f5f5f7] text-black"
            )}
          >
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{item.title}</h2>
            <p className={cn("text-lg font-medium mb-8", item.theme === 'dark' ? "text-zinc-400" : "text-slate-500")}>
              {item.description}
            </p>
            <div className="flex gap-6 mb-12">
              <Link href={item.cta.href} className={cn("apple-link", item.theme === 'dark' && "text-blue-400")}>
                {item.cta.label} &gt;
              </Link>
              <Link href={item.shopCta.href} className={cn("apple-link", item.theme === 'dark' && "text-blue-400")}>
                {item.shopCta.label} &gt;
              </Link>
            </div>
            <img 
              src={item.image} 
              alt={item.title} 
              className={cn(
                "w-full max-w-md object-contain transition-transform duration-700 group-hover:scale-110",
                item.theme === 'dark' ? "brightness-90" : "mix-blend-multiply"
              )}
            />
          </div>
        ))}
      </section>

      {/* Signature Systems Grid */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black uppercase">Signature <br />Systems.</h2>
            <Link href="/category/sound-proof-windows" className="apple-link text-lg">View the full collection &gt;</Link>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Engineering */}
      <section className="py-32 px-6 bg-[#fafafa]">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-12 uppercase leading-none">Engineering <br /> Excellence since {catalog.company.founded}.</h2>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-16">
            Trusted by industrial and commercial leaders. {catalog.company.name} is an {catalog.company.certifications[0]} certified manufacturer of high-end acoustic and automated solutions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-40 grayscale contrast-200">
            {catalog.company.certifications.map((cert) => (
              <div key={cert} className="text-xs font-black uppercase tracking-widest text-black border-2 border-black p-4 rounded-xl">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
