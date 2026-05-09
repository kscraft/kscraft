import { Metadata } from 'next';
import Link from 'next/link';
import { catalog, categories, products, navigation } from '@/lib/catalog';
import ThemeMarker from '@/components/ThemeMarker';

export const metadata: Metadata = {
  title: 'Site Map | Kiran Slido Craft',
  description: 'Navigate through all pages, products, and categories of Kiran Slido Craft.',
};

export default function SitemapPage() {
  const { company } = catalog;

  return (
    <article className="bg-white min-h-screen">
      <header className="hero-light border-b border-slate-100">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container pt-32 pb-20">
          <p className="text-eyebrow mb-6">Navigation</p>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Site Map.
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mt-8">
            Complete index of all {company.name} engineering solutions and corporate resources.
          </p>
        </div>
      </header>

      <div className="section-standard">
        <div className="max-container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Corporate Navigation */}
            <div>
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-8">Corporate</h2>
              <ul className="space-y-4">
                <li><Link href="/" className="text-lg font-bold text-slate-700 hover:text-black transition-colors">Home</Link></li>
                {navigation.header.map((nav) => (
                  <li key={nav.href}>
                    <Link href={nav.href} className="text-lg font-bold text-slate-700 hover:text-black transition-colors">
                      {nav.label}
                    </Link>
                  </li>
                ))}
                <li><Link href="/contact" className="text-lg font-bold text-slate-700 hover:text-black transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="text-lg font-bold text-slate-700 hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-lg font-bold text-slate-700 hover:text-black transition-colors">Terms of Use</Link></li>
              </ul>
            </div>

            {/* Product Categories */}
            <div>
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-8">Engineering Systems</h2>
              <div className="space-y-12">
                {categories.map((cat) => {
                  const catProducts = products.filter(p => p.category === cat.id);
                  return (
                    <div key={cat.id}>
                      <Link href={`/category/${cat.id}`} className="text-xl font-black text-slate-900 uppercase tracking-tight hover:text-blue-600 transition-colors block mb-4">
                        {cat.title}
                      </Link>
                      <ul className="space-y-3 border-l-2 border-slate-100 pl-6">
                        {catProducts.map(prod => (
                          <li key={prod.slug}>
                            <Link href={`/product/${prod.slug}`} className="text-slate-600 hover:text-black font-medium transition-colors">
                              {prod.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </article>
  );
}
