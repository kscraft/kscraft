'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, ChevronUp, ChevronDown, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductCategoryLabel, type Product } from '@/lib/catalog';

export default function CompareEngine({ products }: { products: Product[] }) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync with global custom event for adding to compare
  useEffect(() => {
    const handleCompare = (event: Event) => {
      const slug = (event as CustomEvent<string>).detail;
      if (!slug) return;

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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center px-3 pb-4 sm:px-6 sm:pb-8">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="pointer-events-auto max-h-[min(78svh,720px)] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white/85 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.16)] backdrop-blur-3xl sm:rounded-[2.5rem]"
      >
        {/* Header Bar */}
        <div 
          className="group flex cursor-pointer items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <p className="min-w-0 break-words text-[11px] font-black uppercase leading-5 tracking-[0.16em] text-slate-900">
              Compare Systems ({selectedSlugs.length}/3)
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-6">
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
              className="max-h-[calc(min(78svh,720px)-78px)] overflow-y-auto px-5 pb-6 sm:px-8 sm:pb-10"
            >
              <div className="grid gap-8 border-t border-slate-100 pt-6 md:grid-cols-3">
                {items.map(product => (
                  <div key={product.slug} className="min-w-0 space-y-6">
                    <div className="relative aspect-video bg-slate-50 rounded-2xl overflow-hidden p-4 group/item">
                      <Image 
                        src={product.images[0]} 
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
                    <div className="min-w-0">
                      <h4 className="break-words text-base font-bold uppercase leading-tight tracking-tight text-slate-900">{product.title}</h4>
                      <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1">{getProductCategoryLabel(product.primaryCategory)}</p>
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
