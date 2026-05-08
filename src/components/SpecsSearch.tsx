'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, catalog } from '@/lib/catalog';
import { Search, SlidersHorizontal, ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SpecsSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerms = query.toLowerCase().split(' ');
    
    return products.filter((product) => {
      const searchableText = [
        product.title,
        product.description,
        product.category,
        ...product.features,
        ...product.applications,
        ...Object.values(product.specifications),
      ].join(' ').toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    }).slice(0, 5);
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div 
        className={cn(
          "relative flex items-center bg-white border rounded-2xl transition-all duration-300 shadow-sm",
          isOpen ? "border-blue-500 ring-4 ring-blue-500/10 shadow-lg" : "border-slate-200 hover:border-slate-300"
        )}
      >
        <div className="pl-6 text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={catalog.company.ui.searchPlaceholder}
          className="w-full bg-transparent px-4 py-5 outline-none text-slate-900 font-medium placeholder:text-slate-400"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="pr-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="pr-6 text-slate-300 border-l border-slate-100 ml-2 pl-4">
          <SlidersHorizontal className="w-5 h-5" />
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim() && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-transparent" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-4 bg-white border border-slate-200 rounded-3xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                {catalog.company.ui.matchingSystems} ({filteredProducts.length})
              </span>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="divide-y divide-slate-50">
                {filteredProducts.map((product) => (
                  <Link 
                    key={product.slug}
                    href={`/product/${product.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-6 p-6 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="relative h-16 w-20 shrink-0 bg-[#f5f5f7] rounded-xl overflow-hidden p-2">
                      <Image 
                        src={product.image} 
                        alt={product.title} 
                        fill 
                        sizes="80px" 
                        className="object-contain mix-blend-multiply" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                        {product.category.replace(/-/g, ' ')}
                      </p>
                      <h4 className="text-lg font-bold text-slate-900 truncate leading-tight">
                        {product.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium truncate mt-1">
                        {Object.entries(product.specifications).map(([k, v]) => `${k}: ${v}`).join(' • ')}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-slate-400 font-medium">{catalog.company.ui.noSystemsFound}</p>
                <p className="text-xs text-slate-300 mt-2">{catalog.company.ui.tryBroaderTerms}</p>
              </div>
            )}
            
            {filteredProducts.length > 0 && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <Link 
                  href="/category/sound-proof-windows" 
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest"
                >
                  {catalog.company.ui.viewFullCatalog}
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
