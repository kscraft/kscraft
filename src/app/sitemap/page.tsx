import { Metadata } from 'next';
import Link from 'next/link';
import { catalog, categories, navigation, home, getProductsByCategory, projects } from '@/lib/catalog';
import ThemeMarker from '@/components/ThemeMarker';
import { locationSeoPages } from '@/data/location-seo';
import { serviceLocationSeoPages } from '@/data/service-location-seo';

export const metadata: Metadata = {
  title: 'Site Map | Kiran Slido Craft – Complete Navigation Index',
  description: 'Navigate through all pages, products, categories, and engineering solutions of Kiran Slido Craft. Complete site index for acoustic systems and automation products.',
  alternates: {
    canonical: 'https://soundproofindia.com/sitemap',
  },
  openGraph: {
    title: 'Site Map | Kiran Slido Craft',
    description: 'Complete index of all Kiran Slido Craft pages, products, and engineering categories.',
    url: 'https://soundproofindia.com/sitemap',
    type: 'website',
  },
};

export default function SitemapPage() {
  const { company } = catalog;

  return (
    <article className="bg-white min-h-screen">
      <header className="hero-light border-b border-slate-100">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container pt-32 pb-20 text-center">
          <p className="text-eyebrow mb-6">Navigation</p>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none mx-auto">
            {home.sitemap.title}
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mt-8">
            {home.sitemap.description.replace('{companyName}', company.name)}
          </p>
        </div>
      </header>

      <div className="section-standard">
        <div className="max-container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Corporate Navigation */}
            <div>
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-8">{home.sitemap.corporateLabel}</h2>
              <ul className="space-y-4">
                <li><Link href="/" className="text-lg font-bold text-slate-700 hover:text-black transition-colors">{home.sitemap.homeLabel}</Link></li>
                {navigation.header.map((nav) => (
                  <li key={nav.href}>
                    <Link href={nav.href} className="text-lg font-bold text-slate-700 hover:text-black transition-colors">
                      {nav.label}
                    </Link>
                  </li>
                ))}
                <li><Link href="/contact" className="text-lg font-bold text-slate-700 hover:text-black transition-colors">{home.sitemap.contactLabel}</Link></li>
                <li><Link href="/locations" className="text-lg font-bold text-slate-700 hover:text-black transition-colors">Locations</Link></li>
                <li><Link href="/solutions" className="text-lg font-bold text-slate-700 hover:text-black transition-colors">Solutions</Link></li>
                <li><Link href="/privacy" className="text-lg font-bold text-slate-700 hover:text-black transition-colors">{home.sitemap.privacyLabel}</Link></li>
                <li><Link href="/terms" className="text-lg font-bold text-slate-700 hover:text-black transition-colors">{home.sitemap.termsLabel}</Link></li>
              </ul>
              <h2 className="mt-14 text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-8">Engineering Case Studies</h2>
              <ul className="space-y-3">
                {projects.highlights.filter(p => p.showcase).map((project) => (
                  <li key={project.slug}>
                    <Link href={`/showcase/${project.slug}`} className="text-base font-bold text-slate-700 hover:text-black transition-colors">
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <h2 className="mt-14 text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-8">Automation Solutions</h2>
              <ul className="space-y-3">
                {serviceLocationSeoPages.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/solutions/${service.slug}`} className="text-base font-bold text-slate-700 hover:text-black transition-colors">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <h2 className="mt-14 text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-8">Location Markets</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {locationSeoPages.slice(0, 18).map((location) => (
                  <li key={location.slug}>
                    <Link href={`/locations/${location.slug}`} className="text-base font-bold text-slate-700 hover:text-black transition-colors">
                      {location.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Categories */}
            <div>
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-8">{home.sitemap.systemsLabel}</h2>
              <div className="space-y-12">
                {categories.map((cat) => {
                  const catProducts = getProductsByCategory(cat.id);
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
