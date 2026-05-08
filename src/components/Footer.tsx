import Link from 'next/link';
import { catalog, categories } from '@/lib/catalog';

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] px-6 py-24 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group transition-opacity hover:opacity-70">
              <img src="/logo-ksc.png" alt="KSC" className="h-10 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-black uppercase leading-none">Kiran Slido Craft</span>
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-1">Engineering Silence</span>
              </div>
            </Link>
            <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
              {catalog.company.tagline} <br />
              Precision architectural solutions since 1985.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-12">
            <div className="space-y-6">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Solutions</h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.id}`} className="text-[13px] font-medium text-slate-600 hover:text-black transition-colors">
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Company</h3>
              <ul className="space-y-3">
                {[
                  ['/about', 'Legacy'],
                  ['/services', 'Support'],
                  ['/clients', 'Case Studies'],
                  ['/media', 'Visuals'],
                  ['/contact', 'Contact'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-[13px] font-medium text-slate-600 hover:text-black transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 col-span-2 md:col-span-1">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Inquiries</h3>
              <a href={`mailto:${catalog.company.email}`} className="text-[13px] font-bold text-blue-600 hover:underline block">
                {catalog.company.email}
              </a>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                ISO 9001:2015 Certified <br />
                Engineering Headquarters, Mumbai.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-slate-400 font-medium">
            Copyright © {new Date().getFullYear()} Kiran Slido Craft. All rights reserved.
          </p>
          <div className="flex gap-8 text-[11px] text-slate-400 font-medium">
            <Link href="/" className="hover:text-black">Privacy Policy</Link>
            <Link href="/" className="hover:text-black">Terms of Use</Link>
            <Link href="/" className="hover:text-black">Site Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
