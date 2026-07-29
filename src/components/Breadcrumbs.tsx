import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  theme?: 'light' | 'dark';
};

export default function Breadcrumbs({ items, theme = 'light' }: Props) {
  const isDark = theme === 'dark';

  return (
    <nav aria-label="Breadcrumb" className="mb-4 block min-w-0 max-w-full overflow-x-auto overscroll-x-contain whitespace-nowrap py-4 drop-shadow-sm">
      <ol className={`flex w-max min-w-full items-center text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
        <li className="flex items-center">
          <Link href="/" className="flex min-h-12 min-w-12 items-center justify-center rounded-md border border-slate-200/20 bg-white/10 px-2 py-1 backdrop-blur-sm transition-colors hover:text-blue-500">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex min-w-0 items-center">
              <ChevronRight className={`mx-2 h-4 w-4 shrink-0 ${isDark ? 'text-slate-300' : 'text-slate-500'}`} />
              {isLast || !item.href ? (
                <span className={`max-w-[min(16rem,60vw)] truncate rounded-md border px-3 py-1 backdrop-blur-sm ${isDark ? 'border-white/30 bg-white/10 text-white' : 'border-slate-200/30 bg-white/20 text-slate-900'}`} aria-current="page" title={item.label}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="flex min-h-12 items-center rounded-md border border-slate-200/20 bg-white/10 px-3 py-1 backdrop-blur-sm transition-colors hover:text-blue-500">
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
