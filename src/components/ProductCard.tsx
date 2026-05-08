'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/catalog';
import { motion } from 'framer-motion';

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
      <Link href={`/product/${product.slug}`} className="flex flex-col h-full bg-[#f5f5f7] rounded-[2rem] overflow-hidden transition-shadow hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.12)]">
        {/* Content surface */}
        <div className={compact ? "p-8 pb-0 text-center" : "p-10 pb-0 text-center"}>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">
            {product.category.replace(/-/g, ' ')}
          </p>
          <h3 className={compact ? "text-2xl font-bold tracking-tight text-black mb-4 leading-tight group-hover:text-zinc-600 transition-colors" : "text-3xl font-bold tracking-tight text-black mb-4 leading-tight group-hover:text-zinc-600 transition-colors"}>
            {product.title}
          </h3>
          <p className="text-sm font-medium text-slate-500 line-clamp-2 max-w-[240px] mx-auto">
            {product.description}
          </p>
        </div>

        {/* Image surface */}
        <div className={compact ? "relative mt-6 flex-1 flex items-center justify-center p-5" : "relative mt-8 flex-1 flex items-center justify-center p-6"}>
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-contain mix-blend-multiply transition duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
        
        <div className="p-8 pt-0 text-center">
          <span className="text-[13px] font-semibold text-blue-600">
            Learn more &gt;
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
