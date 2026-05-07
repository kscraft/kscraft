'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/catalog';
import { motion } from 'framer-motion';

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  return (
    <motion.article 
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-2xl bg-white border border-slate-100 transition-all hover:shadow-2xl hover:shadow-blue-600/10 hover:border-blue-200"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-slate-50 relative">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className={compact ? 'p-6' : 'p-8'}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-xl font-black tracking-tight text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 mb-6">
            {product.description}
          </p>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            View Technical Details <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
