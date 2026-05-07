'use client';

import { catalog, categories } from '@/lib/catalog';

export default function ContactPage() {
  return (
    <div className="pb-20">
      <header className="pt-20 lg:pt-32 pb-20 px-6 lg:px-12 border-b border-slate-200 bg-white">
        <div className="max-w-4xl">
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-none mb-8">
            Let's <span className="text-blue-600">Connect.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            Partner with our engineering experts for your next high-performance project.
          </p>
        </div>
      </header>

      <section className="py-24 px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-8">Regional Offices</h2>
              <div className="space-y-8">
                {catalog.company.locations.map((loc, index) => (
                  <div key={index} className="p-8 rounded-lg bg-white border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{loc.city} Operations</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {loc.address}
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      Primary Engineering Hub
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Digital Presence</h2>
              <div className="grid grid-cols-2 gap-4">
                <a href="https://www.youtube.com/kiranslidocraft" target="_blank" rel="noopener noreferrer" className="p-6 rounded-lg bg-slate-50 border border-slate-200 hover:border-red-500 transition-all group">
                  <div className="font-bold text-slate-900 group-hover:text-red-600">YouTube</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-tighter">@kiranslidocraft</div>
                </a>
                <a href="https://www.linkedin.com/company/kiranslidocraft" target="_blank" rel="noopener noreferrer" className="p-6 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-700 transition-all group">
                  <div className="font-bold text-slate-900 group-hover:text-blue-700">LinkedIn</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-tighter">Corporate Profile</div>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">Technical Inquiry</h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Provide your project specifications and our engineering team will respond with technical feasibility and preliminary documentation.
              </p>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Inquiry submitted. Our team will contact you shortly.'); }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input type="text" required className="w-full bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Corporate Email</label>
                    <input type="email" required className="w-full bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Industry / Project Type</label>
                  <select className="w-full bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    {categories.map((category) => (
                      <option key={category.id}>{category.title}</option>
                    ))}
                    <option>Custom Engineering Request</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Project Requirements</label>
                  <textarea required className="w-full bg-slate-800 border-none rounded-lg px-4 py-6 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[150px]" placeholder="Briefly describe the technical requirements..."></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-lg hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/20">
                  Submit Technical Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
