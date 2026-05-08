'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, ArrowRightLeft, ChevronUp, ChevronDown, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/catalog';
import { cn } from '@/lib/utils';

export default function CompareEngine({ products }: { products: Product[] }) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync with global custom event for adding to compare
  useEffect(() => {
    const handleCompare = (e: any) => {
      const slug = e.detail;
      setSelectedSlugs(prev => {
        if (prev.includes(slug)) return prev.filter(s => s !== slug);
        if (prev.length >= 3) return prev;
        return [...prev, slug];
      });
      setIsExpanded(true);
    };

    window.addEventListener('add-to-compare', handleCompare);
    return () => window.removeEventListener('add-to-compare', handleCompare);
  }, []);

  const items = selectedSlugs.map(slug => products.find(p => p.slug === slug)).filter(Boolean) as Product[];

  const allSpecKeys = Array.from(new Set(items.flatMap(p => Object.keys(p.specifications))));

  if (selectedSlugs.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center pointer-events-none pb-8">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="w-full max-w-4xl bg-white/70 backdrop-blur-3xl border border-slate-200/50 rounded-full shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] overflow-hidden pointer-events-auto"
      >
        {/* Header Bar */}
        <div 
          className="px-10 py-5 flex items-center justify-between cursor-pointer group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">
              Compare Systems ({selectedSlugs.length}/3)
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedSlugs([]); }}
              className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors"
            >
              Reset
            </button>
            <div className="h-6 w-px bg-slate-200" />
            {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
          </div>
        </div>

        {/* Content Section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-10 pb-12"
            >
              <div className="grid md:grid-cols-3 gap-10 pt-6 border-t border-slate-100">
                {items.map(product => (
                  <div key={product.slug} className="space-y-6">
                    <div className="relative aspect-video bg-slate-50 rounded-2xl overflow-hidden p-4 group/item">
                      <Image 
                        src={product.image} 
                        alt={product.title} 
                        fill 
                        sizes="300px" 
                        className="object-contain mix-blend-multiply transition-transform group-hover/item:scale-105" 
                      />
                      <button 
                        onClick={() => setSelectedSlugs(prev => prev.filter(s => s !== product.slug))}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white border border-slate-100 text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover/item:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 uppercase tracking-tighter leading-none">{product.title}</h4>
                      <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1">{product.category.replace(/-/g, ' ')}</p>
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      {allSpecKeys.map(key => (
                        <div key={key}>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{key}</p>
                          <p className="text-xs font-semibold text-slate-600">
                            {product.specifications[key] || '—'}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Link 
                      href={`/product/${product.slug}`}
                      className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 pt-4"
                    >
                      Full Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
