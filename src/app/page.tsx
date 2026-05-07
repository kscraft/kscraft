import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { catalog, categories, getFeaturedProducts, getProductsByCategory, products } from '@/lib/catalog';

function getInitials(name: string) {
  return name
    .replace(/&/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

export default function Home() {
  const featuredProducts = getFeaturedProducts(8);

  return (
    <div className="pb-16">
      <section className="grid gap-12 border-b border-slate-200 bg-white px-6 pb-16 pt-24 lg:grid-cols-[1fr_0.85fr] lg:px-12 lg:pt-28">
        <div className="flex min-w-0 max-w-[calc(100vw-3rem)] flex-col justify-center sm:max-w-none">
          <h1 className="max-w-4xl break-words text-5xl font-black leading-[0.94] tracking-tight text-slate-950 [overflow-wrap:anywhere] lg:text-7xl">
            Kiran Slido Craft
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-600">
            ISO 9001:2015 certified sound proofing and automation systems made with indigenous engineering and international quality expectations.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link href="/category/sound-proof-windows" className="btn-primary w-full justify-center sm:w-auto">
              Explore Products
            </Link>
            <Link href="/contact" className="w-full rounded-lg border border-slate-200 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto">
              Contact Sales
            </Link>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-slate-200 pt-8">
            <div>
              <p className="text-3xl font-black text-slate-950">1985</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Established</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-950">{products.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Products</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-950">{categories.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Lines</p>
            </div>
          </div>
        </div>

        <div className="grid min-w-0 max-w-[calc(100vw-3rem)] grid-cols-2 gap-4 self-center sm:max-w-none">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              className={index === 0 ? 'group col-span-2' : 'group'}
            >
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
                <img
                  src={product.image}
                  alt={product.title}
                  className={index === 0 ? 'h-72 w-full object-cover transition duration-500 group-hover:scale-105' : 'h-36 w-full object-cover transition duration-500 group-hover:scale-105'}
                />
              </div>
              <p className="mt-3 text-sm font-black text-slate-900">{product.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12">
        <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 lg:text-4xl">Complete Product Catalog</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Product lines consolidated from kiranslidocraft.com and kiranslidocraft.co.in without dropping source categories.
            </p>
          </div>
          <Link href="/contact" className="text-sm font-black uppercase tracking-widest text-blue-700">
            Request specification /
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category.id);

            return (
              <Link key={category.id} href={`/category/${category.id}`} className="group rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black tracking-tight text-slate-950">{category.title}</h3>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                    {categoryProducts.length}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{category.summary}</p>
                <div className="mt-6 text-xs font-black uppercase tracking-widest text-blue-700">Open line /</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_1fr]">
          <div>
            <h2 className="text-3xl font-black tracking-tight lg:text-4xl">Featured Systems</h2>
            <p className="mt-4 leading-7 text-slate-400">
              Acoustic windows, partitions, doors and automation systems are presented as individual static product pages with source images.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProducts.slice(0, 6).map((product) => (
              <Link key={product.slug} href={`/product/${product.slug}`} className="group grid grid-cols-[112px_1fr] gap-4 rounded-lg border border-slate-800 bg-white/5 p-3 transition hover:border-blue-400 hover:bg-white/10">
                <img src={product.image} alt={product.title} className="h-28 w-28 rounded-lg object-cover" />
                <div className="min-w-0 self-center">
                  <h3 className="break-words font-black text-white [overflow-wrap:anywhere]">{product.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-400">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1fr]">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-950">{catalog.company.tagline}</h2>
              <p className="mt-4 leading-7 text-slate-600">{catalog.company.description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {catalog.company.certifications.map((certification) => (
                <div key={certification} className="flex min-h-28 items-center gap-4 rounded-lg bg-slate-50 p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-black text-blue-700 shadow-sm">
                    {getInitials(certification)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-widest text-blue-700">Certification</p>
                    <p className="mt-2 break-words text-lg font-black text-slate-950 [overflow-wrap:anywhere]">{certification}</p>
                  </div>
                </div>
              ))}
              <div className="flex min-h-28 items-center gap-4 rounded-lg bg-slate-50 p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-black text-blue-700 shadow-sm">
                  WWW
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-widest text-blue-700">Source Coverage</p>
                  <p className="mt-2 break-words text-lg font-black text-slate-950 [overflow-wrap:anywhere]">.com and .co.in catalog lines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-12">
        <div className="border-t border-slate-200 pt-12">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Partial Clientele</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Trusted Across Industry</h2>
            </div>
            <Link href="/contact" className="text-sm font-black uppercase tracking-widest text-blue-700">
              Start a project /
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
            {catalog.company.clients.map((client) => (
              <div key={client} className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {getInitials(client)}
                </div>
                <p className="mt-4 min-h-10 text-sm font-black leading-5 text-slate-800">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
