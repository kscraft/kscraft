import Link from 'next/link';
import { catalog, categories, products } from '@/lib/catalog';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col">
            <Link href="/" className="inline-flex items-center gap-3 mb-8">
              <div className="bg-white p-1.5 rounded-lg">
                <img src="/logo-ksc.png" alt="Kiran Slido Craft logo" className="h-12 w-auto" />
              </div>
              <span className="text-2xl font-black tracking-tighter">KIRAN SLIDO CRAFT</span>
            </Link>
            <p className="max-w-md text-slate-400 leading-relaxed mb-8">
              {catalog.company.description} {catalog.company.tagline}. Providing world-class acoustic solutions since 1985.
            </p>
            <div className="flex flex-wrap gap-2">
              {catalog.company.certifications.map((cert) => (
                <span key={cert} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-300">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-6">Product Lines</h3>
            <div className="grid gap-4">
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.id}`} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                  {category.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-6">Explore</h3>
            <div className="grid gap-4">
              {[
                ['/about', 'Our Legacy'],
                ['/services', 'Service & Support'],
                ['/clients', 'Clients & Projects'],
                ['/media', 'Media Gallery'],
                ['/contact', 'Contact Sales'],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-6">Get in Touch</h3>
            <div className="space-y-6 text-sm leading-relaxed text-slate-400">
              <p className="font-bold text-white uppercase tracking-widest text-[10px]">Headquarters</p>
              <p>{catalog.company.locations[0].address}</p>
              <div className="pt-2">
                <p className="font-bold text-white uppercase tracking-widest text-[10px] mb-2">Inquiries</p>
                <a href={`mailto:${catalog.company.email}`} className="text-lg font-black text-blue-400 hover:text-blue-300 transition-colors">
                  {catalog.company.email}
                </a>
              </div>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] pt-4">
                {products.length} Active System Lines
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">
          <p>© {new Date().getFullYear()} Kiran Slido Craft. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
