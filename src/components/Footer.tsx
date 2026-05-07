import Link from 'next/link';
import { catalog, categories, products } from '@/lib/catalog';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-12 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/logo-ksc.svg" alt="Kiran Slido Craft logo" className="h-12 w-12 rounded-lg bg-white" />
            <span className="text-xl font-black tracking-tight text-slate-950">Kiran Slido Craft</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">
            {catalog.company.description} {catalog.company.tagline}.
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-700">
            {catalog.company.certifications.join(' / ')}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Product Lines</h2>
          <div className="mt-4 grid gap-2">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.id} href={`/category/${category.id}`} className="text-sm font-semibold text-slate-700 hover:text-blue-700">
                {category.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Company</h2>
          <div className="mt-4 grid gap-2">
            {[
              ['/about', 'About'],
              ['/services', 'Services'],
              ['/clients', 'Clients & Certifications'],
              ['/media', 'Media & Videos'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="text-sm font-semibold text-slate-700 hover:text-blue-700">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Contact</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p>{catalog.company.locations[0].address}</p>
            <a href={`mailto:${catalog.company.email}`} className="font-bold text-blue-700">
              {catalog.company.email}
            </a>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {products.length} catalog products
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
