'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, catalog } from '@/lib/catalog';
import { ArrowRight, Filter, RotateCcw, SlidersHorizontal, ShieldCheck, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get('category') || 'all';
  const minStc = parseInt(searchParams.get('stc') || '0');
  const operation = searchParams.get('operation') || 'all';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all' || value === '0') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/configurator?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.push('/configurator');
  };

  const filteredResults = useMemo(() => {
    return products.filter(product => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      // Extract numeric STC from specifications (e.g. "STC 45" -> 45)
      const stcValue = parseInt(Object.values(product.specifications).find(v => v.includes('STC'))?.match(/\d+/)?.[0] || '0');
      const matchStc = minStc === 0 || stcValue >= minStc;
      
      const matchOperation = operation === 'all' || 
        Object.values(product.specifications).some(v => v.toLowerCase().includes(operation.toLowerCase()));

      return matchCategory && matchStc && matchOperation;
    });
  }, [selectedCategory, minStc, operation]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-20 text-center">
        <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Professional Tool</span>
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase mb-6">System Configurator</h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
          Input your engineering requirements to identify the optimal acoustic or automation system for your project.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-10">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Parameters
            </h2>
            <button 
              onClick={resetFilters}
              className="text-[10px] font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="space-y-8">
            {/* Category Filter */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Function</label>
              <div className="flex flex-col gap-2">
                {['all', 'sound-proof-windows', 'motorized-systems', 'roof-sliding-systems'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateFilter('category', cat)}
                    className={cn(
                      "text-left px-4 py-3 rounded-xl text-sm font-bold transition-all",
                      selectedCategory === cat 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {cat === 'all' ? 'All Systems' : cat.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* STC Rating Filter */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Min. Acoustic Rating (STC)</label>
              <input 
                type="range" 
                min="0" 
                max="55" 
                step="5"
                value={minStc}
                onChange={(e) => updateFilter('stc', e.target.value)}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>Any</span>
                <span className="text-blue-600">STC {minStc}+</span>
                <span>STC 55</span>
              </div>
            </div>

            {/* Operation Type */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Movement Type</label>
              <div className="flex flex-wrap gap-2">
                {['all', 'Sliding', 'Casement', 'Motorized', 'Vertical'].map(op => (
                  <button
                    key={op}
                    onClick={() => updateFilter('operation', op)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-bold transition-all border",
                      operation === op 
                        ? "bg-slate-900 border-slate-900 text-white" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    )}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <main className="lg:col-span-3">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-400">
              Found <span className="text-slate-900">{filteredResults.length}</span> matching systems
            </p>
          </div>

          {filteredResults.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredResults.map(product => (
                <Link 
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group block p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden"
                >
                  <div className="relative aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden mb-8 p-6">
                    <Image 
                      src={product.image} 
                      alt={product.title} 
                      fill 
                      sizes="400px" 
                      className="object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">{product.title}</h3>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-slate-500 font-medium line-clamp-2">{product.description}</p>
                    
                    <div className="flex flex-wrap gap-3 pt-4">
                      {Object.entries(product.specifications).slice(0, 2).map(([k, v]) => (
                        <div key={k} className="px-3 py-1 rounded-full bg-blue-50 text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                          {k === 'STC' ? <ShieldCheck className="w-3 h-3" /> : <Gauge className="w-3 h-3" />}
                          {v}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
              <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-900 uppercase">No direct match found</h3>
              <p className="text-slate-500 font-medium mt-2 max-w-sm mx-auto">
                Try loosening your parameters or contact our engineering team for a custom solution.
              </p>
              <button 
                onClick={resetFilters}
                className="mt-8 text-blue-600 font-black uppercase tracking-widest text-xs"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ConfiguratorPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Configurator...</div>}>
      <ConfiguratorContent />
    </Suspense>
  );
}
