'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, catalog, getProductCategoryLabel } from '@/lib/catalog';
import { getProductTrie } from '@/lib/trie';
import { Search, SlidersHorizontal, ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackSearch, trackClientEvent } from '@/lib/analytics-client';

export default function SpecsSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const trie = useMemo(() => getProductTrie(products), []);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);

    // Use Trie to find sets of matching slugs for each term
    const resultSets = searchTerms.map(term => trie.search(term));

    // Find intersection
    const intersectionSlugs = resultSets.reduce((acc, currentSet) => {
      return new Set([...acc].filter(slug => currentSet.has(slug)));
    }, resultSets[0] || new Set<string>());

    const results = products.filter(p => intersectionSlugs.has(p.slug));
    return results.slice(0, 5);
  }, [query, trie]);

  const handleSearch = () => {
    if (query.trim()) {
      trackSearch(query, filteredProducts.length);
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 md:px-0">
      <div 
        className={cn(
          "relative flex min-w-0 items-center bg-[#f9fafb] border rounded-full transition-all duration-500",
          isOpen ? "border-blue-500 ring-8 ring-blue-500/5 bg-white shadow-2xl" : "border-slate-200 hover:border-slate-300 hover:bg-white shadow-sm"
        )}
      >
        <div className="pl-6 text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          id="specifications-search"
          type="search"
          role="combobox"
          aria-label="Search technical specifications"
          aria-expanded={isOpen && Boolean(query.trim())}
          aria-controls="specifications-search-results"
          aria-autocomplete="list"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder={catalog.company.ui.searchPlaceholder}
          className="h-14 min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
        />
        {query && (
          <button 
            type="button"
            onClick={() => setQuery('')}
            className="flex h-12 w-12 shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-slate-600"
            aria-label="Clear specification search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <Link 
          href="/search"
          onClick={() => {
            trackClientEvent('search_icon_click');
            setIsOpen(false);
          }}
          className="ml-2 flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center border-l border-slate-100 text-slate-400 transition-colors hover:text-blue-600"
          aria-label="Advanced Search Filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Link>
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim() && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-slate-900/5 backdrop-blur-[2px]" 
            onClick={() => setIsOpen(false)}
          />
          <div id="specifications-search-results" className="absolute left-0 right-0 top-full z-50 mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <span className="px-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                {catalog.company.ui.matchingSystems} ({filteredProducts.length})
              </span>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto overscroll-contain custom-scrollbar">
              {filteredProducts.length > 0 ? (
                <div className="divide-y divide-slate-50">
                  {filteredProducts.map((product) => (
                    <Link 
                      key={product.slug}
                      href={`/product/${product.slug}`}
                      onClick={() => {
                        trackClientEvent('search_result_click', { product_slug: product.slug });
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-6 p-6 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="relative h-16 w-20 shrink-0 bg-white rounded-xl overflow-hidden border border-slate-100">
                        <Image 
                          src={product.images[0]} 
                          alt={product.title} 
                          fill 
                          sizes="80px" 
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-600">
                          {getProductCategoryLabel(product.primaryCategory)}
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
            </div>
            
            {filteredProducts.length > 0 && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <Link 
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => {
                    handleSearch();
                  }}
                  className="inline-flex min-h-12 items-center text-xs font-bold uppercase tracking-widest text-blue-600 transition-colors hover:text-blue-700"
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
