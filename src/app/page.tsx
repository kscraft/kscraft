'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { catalog, categories, getFeaturedProducts, products } from '@/lib/catalog';

export default function Home() {
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Primary Hero - Motorized Sliding Roof */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden bg-[#fafafa]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-black mb-6 leading-none">
            Retractable <br /> <span className="text-blue-600">Sliding Roof.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium mb-10 max-w-2xl mx-auto">
            Experience 100% open-to-sky freedom with our engineered architectural roofing systems.
          </p>
          <div className="flex items-center justify-center gap-8">
            <Link href="/product/motorized-sliding-roof" className="apple-link text-lg">
              Learn more <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="apple-link text-lg">
              Technical Specs <ChevronRight className="w-5 h-5" />
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
            src="/images/products/motorized-sliding-roof.jpg" 
            alt="Motorized Sliding Roof" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Secondary Showcase - Acoustic Windows */}
      <section className="grid md:grid-cols-2 gap-4 p-4 bg-white">
        <div className="relative h-[600px] rounded-[2.5rem] bg-[#f5f5f7] p-16 flex flex-col items-center text-center overflow-hidden group">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4">Acoustic Windows.</h2>
          <p className="text-lg text-slate-500 font-medium mb-8">Precision isolation. Pure silence.</p>
          <div className="flex gap-6 mb-12">
            <Link href="/category/sound-proof-windows" className="apple-link">Learn more &gt;</Link>
            <Link href="/category/sound-proof-windows" className="apple-link">Shop &gt;</Link>
          </div>
          <img 
            src="/images/products/sound-proof-sliding-windows.jpg" 
            alt="Acoustic Windows" 
            className="w-full max-w-md object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="relative h-[600px] rounded-[2.5rem] bg-black p-16 flex flex-col items-center text-center overflow-hidden group text-white">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Automation Systems.</h2>
          <p className="text-lg text-zinc-400 font-medium mb-8">Modern entry. Intelligent security.</p>
          <div className="flex gap-6 mb-12">
            <Link href="/category/motorized-systems" className="apple-link text-blue-400">Learn more &gt;</Link>
            <Link href="/category/motorized-systems" className="apple-link text-blue-400">Shop &gt;</Link>
          </div>
          <img 
            src="/images/products/motorized-sliding-gates.jpg" 
            alt="Automation Systems" 
            className="w-full max-w-md object-contain brightness-90 transition-transform duration-700 group-hover:scale-110"
          />
        </div>
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
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-12 uppercase leading-none">Engineering <br /> Excellence since 1985.</h2>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-16">
            Trusted by HDFC, Godrej, Pfizer, and ISRO. Kiran Slido Craft is an ISO 9001:2015 certified manufacturer of high-end acoustic and automated solutions.
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
