'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Zap, Globe, Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { catalog, categories, getFeaturedProducts, products } from '@/lib/catalog';

export default function Home() {
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/modern-architecture.jpg" 
            alt="Modern Architecture" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950/40 to-slate-950/90"></div>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full animate-pulse delay-700"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 border border-blue-500/20 mb-10 backdrop-blur-sm"
          >
            <Award className="w-3.5 h-3.5" /> ISO 9001:2015 Certified Engineering
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[6.5rem] font-black text-white leading-[0.95] tracking-tighter mb-8"
          >
            Precision <span className="text-blue-500">Acoustic</span> <br />& Automation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto max-w-2xl text-lg lg:text-xl text-slate-400 leading-relaxed mb-12 font-medium"
          >
            Delivering silent environments and seamless movement since 1985. European-standard soundproofing systems engineered in India.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link 
              href="/category/sound-proof-windows" 
              className="group w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3"
            >
              Browse Catalog <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white backdrop-blur-md border border-white/10 px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all"
            >
              Technical Specs
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/[0.02] backdrop-blur-md border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <p className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">1985</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Established</p>
            </div>
            <div className="text-center group">
              <p className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{products.length}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Active Systems</p>
            </div>
            <div className="text-center group">
              <p className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">ISO 9001</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Global Standard</p>
            </div>
            <div className="text-center group">
              <p className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">Pan-India</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Ecosystem - Category Cards */}
      <section className="py-32 bg-white relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/30 -skew-x-12 transform translate-x-20"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="max-w-2xl text-left">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-block text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4"
              >
                Core Capabilities
              </motion.span>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">Product Ecosystem</h2>
            </div>
            <Link href="/category/sound-proof-windows" className="group flex items-center gap-3 text-xs font-black text-blue-600 uppercase tracking-[0.2em] transition-all hover:text-blue-700">
              Request Full Documentation <div className="h-10 w-10 rounded-full border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><ChevronRight className="w-5 h-5" /></div>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.id}`} 
                className="group relative h-[400px] rounded-[2.5rem] bg-slate-50 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] border border-slate-100"
              >
                <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Shield className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter leading-none group-hover:text-blue-600 transition-colors">{category.title}</h3>
                  <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed mb-6 group-hover:text-slate-600">{category.summary}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    Explore Systems <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent z-10" />
                {/* Subtle pattern or image could go here */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-blue-600/10 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Systems - Featured Grid */}
      <section className="py-32 bg-blue-50/50 border-y border-blue-100/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block"
            >
              Curated Selection
            </motion.span>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6 leading-none">Signature Systems</h2>
            <p className="text-lg text-slate-500 font-medium">
              Hand-picked featured products representing our benchmark in high-performance engineering and acoustic excellence.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link 
              href="/category/sound-proof-windows" 
              className="group inline-flex items-center gap-4 bg-slate-950 text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all hover:bg-blue-600 hover:shadow-[0_20px_50px_rgba(37,99,235,0.2)] hover:scale-105"
            >
              View Entire Collection <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Engineering Excellence */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-24 lg:grid-cols-2 items-center">
            <div className="relative">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block"
              >
                Legacy of Silence
              </motion.span>
              <h2 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-10">Engineering <br />with Integrity</h2>
              <p className="text-xl text-slate-500 leading-relaxed mb-12 font-medium">
                {catalog.company.description} Our specialized soundproofing and automation solutions are trusted by industry leaders for critical environments.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-blue-50/50 border border-blue-100 flex items-center gap-6 group hover:bg-white hover:shadow-2xl transition-all">
                  <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="font-black text-slate-900 uppercase tracking-tighter text-sm">Industrial <br />Automation</span>
                </div>
                <div className="p-8 rounded-[2rem] bg-blue-50/50 border border-blue-100 flex items-center gap-6 group hover:bg-white hover:shadow-2xl transition-all">
                  <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="font-black text-slate-900 uppercase tracking-tighter text-sm">Pan-India <br />Coverage</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/5 blur-[120px] rounded-full"></div>
              
              {catalog.company.certifications.map((cert) => (
                <div key={cert} className="aspect-square flex flex-col items-center justify-center p-10 bg-white rounded-[3rem] border border-slate-100 text-center hover:border-blue-200 hover:shadow-2xl transition-all group">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors">
                    <Shield className="w-8 h-8 text-blue-600 group-hover:text-white" />
                  </div>
                  <p className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] leading-tight">{cert}</p>
                </div>
              ))}
              <div className="aspect-square flex flex-col items-center justify-center p-10 bg-blue-600 rounded-[3rem] text-center text-white shadow-[0_30px_60px_-12px_rgba(37,99,235,0.4)]">
                <p className="text-5xl lg:text-6xl font-black mb-2 tracking-tighter leading-none">35+</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">Years of <br />Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
