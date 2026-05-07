import Link from 'next/link';
import type { Product } from '@/lib/catalog';

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className={compact ? 'p-5' : 'p-6'}>
          <h3 className="break-words text-lg font-black tracking-tight text-slate-950 [overflow-wrap:anywhere]">{product.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>
          <div className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-700">
            View details
            <span aria-hidden="true">/</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
