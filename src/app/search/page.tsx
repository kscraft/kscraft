'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, catalog, categories } from '@/lib/catalog';
import { Search, X, SlidersHorizontal, ArrowRight, Filter, ShieldCheck, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const updateSearch = (newQuery: string, newCategory: string) => {
    const params = new URLSearchParams();
    if (newQuery) params.set('q', newQuery);
    if (newCategory !== 'all') params.set('category', newCategory);
    
    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  const filteredResults = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      if (!query.trim()) return matchCategory;
      
      const searchTerms = query.toLowerCase().split(' ');
      const searchableText = [
        product.title,
        product.description,
        product.category,
        ...product.features,
        ...product.applications,
        ...Object.values(product.specifications),
      ].join(' ').toLowerCase();

      return matchCategory && searchTerms.every(term => searchableText.includes(term));
    });
  }, [query, selectedCategory]);

  const { ui } = catalog.company;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Search Header */}
      <section className="pt-40 pb-20 px-6 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6">
            {ui.searchPageTitle}
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12">
            {ui.searchPageSubtitle}
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white border border-slate-200 rounded-full transition-all duration-500 focus-within:border-blue-500 focus-within:ring-8 focus-within:ring-blue-500/5 shadow-sm overflow-hidden">
              <div className="pl-8 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  updateSearch(e.target.value, selectedCategory);
                }}
                placeholder={ui.searchPlaceholder}
                className="w-full bg-transparent px-6 py-6 outline-none text-slate-900 text-lg font-semibold placeholder:text-slate-400"
              />
              {query && (
                <button 
                  onClick={() => {
                    setQuery('');
                    updateSearch('', selectedCategory);
                  }}
                  className="pr-8 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 shrink-0 space-y-10">
              <div>
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Categories
                </h2>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      updateSearch(query, 'all');
                    }}
                    className={cn(
                      "text-left px-5 py-3 rounded-2xl text-sm font-bold transition-all",
                      selectedCategory === 'all' 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        updateSearch(query, cat.id);
                      }}
                      className={cn(
                        "text-left px-5 py-3 rounded-2xl text-sm font-bold transition-all",
                        selectedCategory === cat.id 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">Custom Ask?</p>
                <p className="text-xs text-blue-800 font-bold leading-relaxed mb-6">
                  Can&apos;t find a specific technical system? Our engineering team builds bespoke solutions.
                </p>
                <Link href="/contact" className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">
                  Contact Engineering &rarr;
                </Link>
              </div>
            </aside>

            {/* Results Grid */}
            <main className="flex-1">
              <div className="mb-10 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {ui.resultsCount.replace('{count}', filteredResults.length.toString())}
                </p>
              </div>

              {filteredResults.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredResults.map((product) => (
                    <ProductCard key={product.slug} product={product} compact />
                  ))}
                </div>
              ) : (
                <div className="py-40 text-center bg-slate-50 rounded-[4rem] border border-dashed border-slate-200">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl mb-8">
                    <Search className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">{ui.noResultsTitle}</h3>
                  <p className="text-xl text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                    {ui.noResultsDescription}
                  </p>
                  <button 
                    onClick={() => {
                      setQuery('');
                      setSelectedCategory('all');
                      updateSearch('', 'all');
                    }}
                    className="mt-10 text-blue-600 font-black uppercase tracking-widest text-xs hover:text-blue-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
