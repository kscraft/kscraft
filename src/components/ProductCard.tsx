'use client';

import Link from 'next/link';
import { ArrowRight, Box } from 'lucide-react';
import type { Product } from '@/lib/catalog';
import { motion } from 'framer-motion';

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  return (
    <motion.article 
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 transition-all hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)]"
    >
      <Link href={`/product/${product.slug}`} className="flex flex-col h-full">
        {/* Image surface */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Floating category badge */}
          {!compact && (
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-md text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border border-blue-50/50">
                {product.category.replace(/-/g, ' ')}
              </span>
            </div>
          )}
        </div>

        {/* Content surface */}
        <div className={compact ? 'p-6 flex flex-col flex-1' : 'p-8 flex flex-col flex-1'}>
          <div className="mb-4 flex-1">
            <h3 className="text-xl font-black tracking-tight text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 font-medium">
              {product.description}
            </p>
          </div>

          <div className="pt-6 mt-auto border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 group-hover:text-blue-700 transition-colors">
              Technical Details <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-12">
              <Box className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
      
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-3xl rounded-full -mr-12 -mt-12 transition-all group-hover:bg-blue-600/10" />
    </motion.article>
  );
}
