'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Zap, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { catalog, categories, getFeaturedProducts, products } from '@/lib/catalog';

export default function Home() {
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern Architecture" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-600/30 mb-8"
          >
            <Award className="w-3 h-3" /> ISO 9001:2015 Certified Excellence
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8"
          >
            Precision <span className="text-blue-500">Acoustic</span> <br />& Automation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg lg:text-xl text-slate-300 leading-relaxed mb-10"
          >
            European-standard soundproofing and automation systems engineered in India. Delivering silent environments and seamless movement since 1985.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/category/sound-proof-windows" 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              Browse Catalog <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all"
            >
              Get Technical Specs
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/5 backdrop-blur-md border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-2xl font-black text-white">1985</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Established</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white">{products.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Systems</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white">ISO 9001</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Certified</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white">Pan-India</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 uppercase">Product Ecosystem</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Integrated solutions for architectural acoustics and automated entry control, consolidated from our premium catalogs.
              </p>
            </div>
            <Link href="/contact" className="group flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest transition-colors hover:text-blue-700">
              Request Full Catalog <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.id}`} 
                className="group relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-10 transition-all hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-600/5 hover:-translate-y-1"
              >
                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">{category.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8">{category.summary}</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Explore Line <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6 uppercase">Signature Systems</h2>
            <p className="text-lg text-slate-600">
              Hand-picked featured products representing our benchmark in engineering and acoustic performance.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              href="/category/sound-proof-windows" 
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-full font-bold transition hover:bg-blue-600 hover:shadow-xl shadow-slate-900/20 hover:scale-105"
            >
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Certifications */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight mb-8 uppercase leading-tight">Engineering <br />with Integrity</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                {catalog.company.description} Our systems are trusted by global leaders across critical industrial sectors.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center gap-4 group hover:bg-white hover:shadow-xl transition-all">
                  <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-900 uppercase tracking-tight text-sm">Automation</span>
                </div>
                <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center gap-4 group hover:bg-white hover:shadow-xl transition-all">
                  <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-900 uppercase tracking-tight text-sm">Pan-India</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {catalog.company.certifications.map((cert) => (
                <div key={cert} className="aspect-square flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center hover:bg-white hover:shadow-2xl transition-all">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="w-7 h-7 text-blue-600" />
                  </div>
                  <p className="font-black text-slate-900 text-xs uppercase tracking-widest">{cert}</p>
                </div>
              ))}
              <div className="aspect-square flex flex-col items-center justify-center p-8 bg-blue-600 rounded-[2.5rem] text-center text-white shadow-2xl shadow-blue-600/20">
                <p className="text-4xl lg:text-5xl font-black mb-2 tracking-tighter">35+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-100">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
