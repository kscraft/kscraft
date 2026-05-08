'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, ArrowRightLeft, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
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
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-6 pb-6 pointer-events-none">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto backdrop-blur-xl"
      >
        {/* Header Bar */}
        <div 
          className="px-8 py-4 flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <p className="text-sm font-bold text-white uppercase tracking-widest">
              Compare Systems ({selectedSlugs.length}/3)
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedSlugs([]); }}
              className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
            >
              Clear All
            </button>
            {isExpanded ? <ChevronDown className="text-slate-500" /> : <ChevronUp className="text-slate-500" />}
          </div>
        </div>

        {/* Content Section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="px-8 pb-10"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {items.map(product => (
                  <div key={product.slug} className="space-y-6">
                    <div className="relative aspect-video bg-white/5 rounded-2xl overflow-hidden p-4 group">
                      <Image 
                        src={product.image} 
                        alt={product.title} 
                        fill 
                        sizes="300px" 
                        className="object-contain mix-blend-lighten opacity-80" 
                      />
                      <button 
                        onClick={() => setSelectedSlugs(prev => prev.filter(s => s !== product.slug))}
                        className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white uppercase tracking-tighter leading-none">{product.title}</h4>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">{product.category.replace(/-/g, ' ')}</p>
                    </div>
                    
                    {/* Specs List */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      {allSpecKeys.map(key => (
                        <div key={key}>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{key}</p>
                          <p className="text-sm font-medium text-slate-300">
                            {product.specifications[key] || '—'}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Link 
                      href={`/product/${product.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest hover:text-blue-400"
                    >
                      View Details
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
