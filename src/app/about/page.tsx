import { catalog, products } from '@/lib/catalog';

export default function AboutPage() {
  return (
    <div className="pb-20">
      <header className="pt-20 lg:pt-32 pb-20 px-6 lg:px-12 border-b border-slate-200 bg-white">
        <div className="max-w-4xl">
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-none mb-8">
            Our <span className="text-blue-600">Legacy.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            Pioneering indigenous engineering and architectural automation since {catalog.company.founded}.
          </p>
        </div>
      </header>

      <section className="py-24 px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">The Kiran Slido Craft Story</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Founded in 1985, Kiran Slido Craft emerged as a visionary engineering firm dedicated to closing the gap between Indian manufacturing and European quality standards.
              </p>
              <p>
                What started as a specialist in heavy machinery fabrication has evolved into a leading provider of high-tech acoustic systems and architectural automation. Our journey is defined by a relentless pursuit of technical excellence.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            <div className="p-8 rounded-lg bg-slate-900 text-white">
              <div className="text-4xl font-black text-blue-400 mb-2">1985</div>
              <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Established</div>
            </div>
            <div className="p-8 rounded-lg bg-blue-600 text-white">
              <div className="text-4xl font-black mb-2">{products.length}</div>
              <div className="text-sm font-bold uppercase tracking-widest text-blue-100">Catalog Products</div>
            </div>
            <div className="col-span-2 p-8 rounded-lg bg-white border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">International Quality at Indian Price</h3>
              <p className="text-slate-600 leading-relaxed">
                Our core philosophy remains unchanged: delivering world-class engineering solutions that are accessible and optimized for the Indian market.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-6">Our Mission</h3>
            <p className="text-xl font-medium text-slate-900 leading-relaxed">{catalog.company.mission}</p>
          </div>
          <div>
            <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-6">Our Vision</h3>
            <p className="text-xl font-medium text-slate-900 leading-relaxed">{catalog.company.vision}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
