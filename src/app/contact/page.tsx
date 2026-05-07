'use client';

import { catalog, categories } from '@/lib/catalog';
import { Mail, MapPin, Video, Link as LinkIcon, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative py-24 lg:py-40 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/modern-architecture.jpg" 
            alt="Contact" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950/40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tight leading-none mb-8 uppercase">
            Let's <span className="text-blue-500">Connect.</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-300 leading-relaxed mx-auto lg:mx-0">
            Partner with our engineering experts for your next high-performance acoustic or automation project.
          </p>
        </div>
      </header>

      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-16">
            <div>
              <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-10">Engineering Hubs</h2>
              <div className="grid gap-8">
                {catalog.company.locations.map((loc, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 border border-slate-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">{loc.city} Operations</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {loc.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-10">Digital Infrastructure</h2>
              <div className="grid gap-6">
                <a href={`mailto:${catalog.company.email}`} className="flex items-center gap-6 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 border border-slate-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{catalog.company.email}</span>
                </a>
                <div className="flex gap-4 pt-4">
                  <a href={catalog.company.social.youtube} target="_blank" rel="noopener noreferrer" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all">
                    <Video className="w-6 h-6" />
                  </a>
                  <a href={catalog.company.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-100 transition-all">
                    <LinkIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-[3rem] p-8 lg:p-16 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-5xl font-black mb-6 tracking-tight uppercase">Technical Inquiry</h2>
                <p className="text-slate-400 mb-12 text-lg leading-relaxed">
                  Provide your project specifications below. Our engineering team will respond with a preliminary technical assessment.
                </p>
                
                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Technical inquiry received. We will contact you shortly.'); }}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Name</label>
                      <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:bg-white/10 focus:border-blue-500 outline-none transition-all" placeholder="Enter name" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Corporate Email</label>
                      <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:bg-white/10 focus:border-blue-500 outline-none transition-all" placeholder="email@company.com" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Project Scope</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:bg-white/10 focus:border-blue-500 outline-none transition-all appearance-none">
                      {categories.map((category) => (
                        <option key={category.id} className="bg-slate-900">{category.title}</option>
                      ))}
                      <option className="bg-slate-900">Custom Engineering</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Technical Requirements</label>
                    <textarea required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-white focus:bg-white/10 focus:border-blue-500 outline-none transition-all min-h-[180px]" placeholder="Briefly describe dimensions, acoustic targets, or automation needs..."></textarea>
                  </div>
                  <button type="submit" className="w-full group flex items-center justify-center gap-3 py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-sm rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
                    Send Technical Request <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </form>
              </div>
              
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
