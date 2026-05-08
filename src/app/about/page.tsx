import { catalog, products } from '@/lib/catalog';
import { Award, Target, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative py-24 lg:py-48 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/modern-architecture.jpg" 
            alt={`About ${catalog.company.name}`} 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-[7rem] font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
            Our <span className="text-blue-500">Legacy.</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-400 leading-relaxed mx-auto lg:mx-0 font-medium">
            Pioneering indigenous engineering and architectural automation in India since {catalog.company.founded}.
          </p>
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="py-32 mx-auto max-w-7xl px-6 lg:px-12 w-full relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/30 -skew-x-12 transform translate-x-20"></div>
        <div className="grid lg:grid-cols-12 gap-20 items-center relative z-10">
          <div className="lg:col-span-7">
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Engineered for Silence</span>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-10">Visionary <br />Infrastructure</h2>
            <div className="space-y-8 text-xl text-slate-500 leading-relaxed font-medium">
              <p>
                {catalog.company.description}
              </p>
              <p>
                From heavy-duty industrial enclosures to high-end residential soundproofing, our expertise spans decades of technical evolution. We don't just build systems; we engineer environments of silence and seamless movement.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-6">
            <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-blue-900/5">
              <p className="text-5xl font-black text-blue-600 mb-2 tracking-tighter">35+</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Years Experience</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-slate-950 text-white shadow-2xl shadow-blue-600/10 border border-white/5">
              <p className="text-5xl font-black text-blue-400 mb-2 tracking-tighter">{products.length}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Lines</p>
            </div>
            <div className="col-span-2 p-10 rounded-[3rem] bg-blue-50 border border-blue-100 shadow-inner">
              <Award className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">{catalog.company.certifications[0]}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase tracking-wide">Strict adherence to international quality management systems in every project.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-950/20 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white/5 backdrop-blur-xl p-16 rounded-[4rem] border border-white/10 shadow-2xl transition-all hover:bg-white/10">
              <div className="h-16 w-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white mb-10 shadow-lg shadow-blue-600/20">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">Our Mission</h3>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                {catalog.company.mission}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-16 rounded-[4rem] border border-white/10 shadow-2xl transition-all hover:bg-white/10">
              <div className="h-16 w-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white mb-10 shadow-lg shadow-blue-600/20">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">Our Vision</h3>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                {catalog.company.vision}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
