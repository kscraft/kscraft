import { catalog, products } from '@/lib/catalog';
import { Award, Target, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative py-24 lg:py-40 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/modern-architecture.jpg" 
            alt="About Kiran Slido Craft" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950/40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tight leading-none mb-8">
            Our <span className="text-blue-500">Legacy.</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-300 leading-relaxed mx-auto lg:mx-0">
            Pioneering indigenous engineering and architectural automation in India since {catalog.company.founded}.
          </p>
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight mb-8">Engineering with Vision</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Founded in 1985, Kiran Slido Craft emerged with a singular purpose: to deliver high-performance acoustic and automation systems that bridge the gap between Indian manufacturing and global standards.
              </p>
              <p>
                From heavy-duty industrial enclosures to high-end residential soundproofing, our expertise spans decades of technical evolution. We don't just build systems; we engineer environments of silence and seamless movement.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <p className="text-4xl font-black text-blue-600 mb-2">35+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Years Experience</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-2xl shadow-slate-950/20">
              <p className="text-4xl font-black text-blue-400 mb-2">{products.length}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">System Lines</p>
            </div>
            <div className="col-span-2 p-8 rounded-3xl bg-blue-50 border border-blue-100">
              <Award className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-2">ISO 9001:2015</h3>
              <p className="text-slate-600 text-sm">Strict adherence to international quality management systems in every project.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
              <Target className="w-10 h-10 text-blue-600 mb-8" />
              <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight">Our Mission</h3>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                {catalog.company.mission}
              </p>
            </div>
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
              <Users className="w-10 h-10 text-blue-600 mb-8" />
              <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight">Our Vision</h3>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                {catalog.company.vision}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
