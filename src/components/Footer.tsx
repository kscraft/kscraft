import Image from 'next/image';
import Link from 'next/link';
import { catalog, categories, navigation } from '@/lib/catalog';

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] px-6 py-24 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group transition-opacity hover:opacity-70">
              <Image src="/logo-ksc.png" alt="KSC" width={150} height={40} className="h-10 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-black uppercase leading-none">{catalog.company.name}</span>
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-1">Engineering & Manufacturing</span>
              </div>
            </Link>
            <p className="text-[13px] text-slate-500 leading-relaxed font-medium mb-8">
              {catalog.company.tagline} <br />
              Precision architectural solutions since {catalog.company.founded}.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-12">
            <div className="space-y-6">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{catalog.company.ui.solutions}</h3>
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
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{catalog.company.ui.company}</h3>
              <ul className="space-y-3">
                {navigation.footer.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[13px] font-medium text-slate-600 hover:text-black transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 col-span-2 md:col-span-1">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{catalog.company.ui.inquiries}</h3>
              <a href={`mailto:${catalog.company.email}`} className="text-[13px] font-bold text-blue-600 hover:underline block">
                {catalog.company.email}
              </a>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                {catalog.company.ui.certified} <br />
                {catalog.company.ui.exporter} <br />
                {catalog.company.ui.hq}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-slate-400 font-medium">
            {catalog.company.ui.copyright.replace('{year}', new Date().getFullYear().toString()).replace('{companyName}', catalog.company.name)}
          </p>
          <div className="flex gap-8 text-[11px] text-slate-400 font-medium">
            <Link href="/privacy" className="hover:text-black">{catalog.company.ui.privacyPolicy}</Link>
            <Link href="/terms" className="hover:text-black">{catalog.company.ui.termsOfUse}</Link>
            <Link href="/sitemap" className="hover:text-black">{catalog.company.ui.siteMap}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
