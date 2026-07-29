import Image from 'next/image';
import Link from 'next/link';
import { catalog, categories, navigation } from '@/lib/catalog';

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] px-6 py-24 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="group mb-8 flex min-h-12 items-center gap-3 transition-opacity hover:opacity-70">
              <Image src="/logo-ksc.png" alt="Kiran Slido Craft" width={250} height={122} className="h-16 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-black uppercase leading-none">{catalog.company.name}</span>
                <span className="mt-1 text-xs font-bold uppercase tracking-widest text-blue-600">Engineering & Manufacturing</span>
              </div>
            </Link>
            <p className="mb-8 text-[13px] font-medium leading-relaxed text-slate-600">
              {catalog.company.tagline} <br />
              Precision architectural solutions since {catalog.company.founded}.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-12">
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600">{catalog.company.ui.solutions}</h3>
              <ul>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.id}`} className="inline-flex min-h-12 min-w-12 items-center break-words text-sm font-medium text-slate-600 transition-colors hover:text-black">
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600">{catalog.company.ui.company}</h3>
              <ul>
                {navigation.footer.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-flex min-h-12 min-w-12 items-center text-sm font-medium text-slate-600 transition-colors hover:text-black">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 col-span-2 md:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600">{catalog.company.ui.inquiries}</h3>
              <a href={`mailto:${catalog.company.email}`} className="flex min-h-12 items-center break-all text-sm font-bold text-blue-600 hover:underline">
                {catalog.company.email}
              </a>
              <p className="text-xs font-medium leading-relaxed text-slate-600">
                {catalog.company.ui.certified} <br />
                {catalog.company.ui.exporter} <br />
                {catalog.company.ui.hq}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-slate-600">
            {catalog.company.ui.copyright.replace('{year}', new Date().getFullYear().toString()).replace('{companyName}', catalog.company.name)}
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 text-xs font-medium text-slate-600 md:justify-end">
            <Link href="/privacy" className="inline-flex min-h-12 items-center hover:text-black">{catalog.company.ui.privacyPolicy}</Link>
            <Link href="/terms" className="inline-flex min-h-12 items-center hover:text-black">{catalog.company.ui.termsOfUse}</Link>
            <Link href="/sitemap" className="inline-flex min-h-12 items-center hover:text-black">{catalog.company.ui.siteMap}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
