import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex overflow-x-auto whitespace-nowrap py-4 mb-4 drop-shadow-sm">
      <ol className="flex items-center text-sm text-slate-600 font-bold">
        <li className="flex items-center">
          <Link href="/" className="hover:text-blue-500 transition-colors flex items-center bg-white/10 px-2 py-1 rounded-md backdrop-blur-sm border border-slate-200/20">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-slate-400" />
              {isLast || !item.href ? (
                <span className="text-slate-900 bg-white/20 px-3 py-1 rounded-md backdrop-blur-sm border border-slate-200/30" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-blue-500 transition-colors bg-white/10 px-3 py-1 rounded-md backdrop-blur-sm border border-slate-200/20">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
