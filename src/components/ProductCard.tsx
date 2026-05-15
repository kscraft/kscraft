'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightLeft } from 'lucide-react';
import { catalog, getProductCategoryLabel, type Product } from '@/lib/catalog';
import { motion } from 'framer-motion';
import { trackClientEvent } from '@/lib/analytics-client';

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  return (
    <motion.article 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative h-full"
    >
      {/* Compare Toggle */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          trackClientEvent('add_to_compare', { product: product.slug });
          window.dispatchEvent(new CustomEvent('add-to-compare', { detail: product.slug }));
        }}
        className="absolute top-5 left-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/40 backdrop-blur-md text-slate-400 hover:text-blue-600 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all active:scale-90"
        title="Add to compare"
      >
        <ArrowRightLeft className="w-3.5 h-3.5" />
      </button>

      <Link 
        href={`/product/${product.slug}`} 
        onClick={() => trackClientEvent('product_view_click', { product: product.slug })}
        className="flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] bg-[#f5f5f7] transition-shadow hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.12)]"
      >
        {/* Content surface */}
        <div className={compact ? "min-w-0 p-4 pb-0 text-center sm:p-8 sm:pb-0" : "min-w-0 p-4 pb-0 text-center sm:p-10 sm:pb-0"}>
          <p className="mb-3 break-words text-[10px] font-bold uppercase tracking-widest text-blue-600">
            {getProductCategoryLabel(product.primaryCategory)}
          </p>
          <h3 className={compact ? "mb-4 break-words text-2xl font-bold leading-tight tracking-tight text-black transition-colors group-hover:text-zinc-600" : "mb-4 break-words text-3xl font-bold leading-tight tracking-tight text-black transition-colors group-hover:text-zinc-600"}>
            {product.title}
          </h3>
          <p className="mx-auto max-w-full break-words text-sm font-medium text-slate-500 line-clamp-2 [overflow-wrap:anywhere]">
            {product.description}
          </p>
        </div>

        {/* Image surface */}
        <div className={compact ? "relative mt-6 flex flex-1 items-center justify-center p-5" : "relative mt-8 flex flex-1 items-center justify-center p-5 sm:p-6"}>
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-contain mix-blend-multiply transition duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
        
        <div className="p-6 pt-0 text-center sm:p-8 sm:pt-0">
          <span className="text-[13px] font-semibold text-blue-600">
            {catalog.company.ui.learnMore} &gt;
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
