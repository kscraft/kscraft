'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { products, catalog, categories, projects, getProductCategoryIds } from '@/lib/catalog';
import { getProductTrie } from '@/lib/trie';
import { Search, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import ThemeMarker from '@/components/ThemeMarker';

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

  const trie = useMemo(() => getProductTrie(products), []);

  const filteredResults = useMemo(() => {
    const matchCategory = selectedCategory === 'all' 
      ? products 
      : products.filter(p => getProductCategoryIds(p).includes(selectedCategory));
    
    if (!query.trim()) return matchCategory;
    
    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
    
    // Use Trie to find sets of matching slugs for each term
    const resultSets = searchTerms.map(term => trie.search(term));
    
    // Find intersection of all result sets
    const intersectionSlugs = resultSets.reduce((acc, currentSet) => {
      return new Set([...acc].filter(slug => currentSet.has(slug)));
    }, resultSets[0] || new Set<string>());

    return matchCategory.filter(product => intersectionSlugs.has(product.slug));
  }, [query, selectedCategory, trie]);

  const matchingProjects = useMemo(() => {
    const terms = query.toLowerCase().split(' ').filter(Boolean);
    if (!terms.length || selectedCategory !== 'all') return [];

    return projects.highlights.filter((project) => {
      const searchableText = [
        project.title,
        project.subtitle,
        project.detail,
        project.showcase?.heroTitle,
        project.showcase?.heroDescription,
      ].filter(Boolean).join(' ').toLowerCase();

      return terms.every((term) => searchableText.includes(term));
    });
  }, [query, selectedCategory]);

  const totalResults = filteredResults.length + matchingProjects.length;

  const { ui } = catalog.company;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Search Header */}
      <section className="hero-light">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <h1 className="heading-hero text-slate-900 mb-6">
            {ui.searchPageTitle}
          </h1>
          <p className="text-body-lg max-w-2xl mx-auto mb-12">
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
      <section className="section-standard">
        <div className="max-container">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 shrink-0 space-y-10">
              <div>
                <span className="text-eyebrow">Categories</span>
                <div className="flex flex-col gap-2 mt-6">
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
                  {ui.resultsCount.replace('{count}', totalResults.toString())}
                </p>
              </div>

              {totalResults > 0 ? (
                <div className="space-y-12">
                  {filteredResults.length > 0 && (
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                      {filteredResults.map((product) => (
                        <ProductCard key={product.slug} product={product} compact />
                      ))}
                    </div>
                  )}

                  {matchingProjects.length > 0 && (
                    <div className="grid gap-4">
                      {matchingProjects.map((project) => (
                        <Link
                          key={project.slug ?? project.title}
                          href={project.slug ? `/showcase/${project.slug}` : '/clients'}
                          className="group flex min-w-0 items-center justify-between gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-[0_24px_60px_-36px_rgba(15,23,42,0.55)]"
                        >
                          <div className="min-w-0">
                            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-blue-600">Engineering Case Study</p>
                            <h2 className="break-words text-2xl font-black uppercase leading-tight tracking-tight text-slate-950">{project.title}</h2>
                            <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-500">{project.detail}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 shrink-0 text-blue-600 transition group-hover:translate-x-1" />
                        </Link>
                      ))}
                    </div>
                  )}
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

export default function SearchClient() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
