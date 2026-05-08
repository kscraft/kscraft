'use client';

import { catalog, categories } from '@/lib/catalog';
import { Mail, MapPin, Video, Link as LinkIcon, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative py-24 lg:py-48 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/modern-architecture.jpg" 
            alt="Contact" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-[7rem] font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
            Let's <span className="text-blue-500">Connect.</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-400 leading-relaxed mx-auto lg:mx-0 font-medium">
            Partner with our engineering experts for your next high-performance acoustic or automation project.
          </p>
        </div>
      </header>

      <section className="py-32 mx-auto max-w-7xl px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-20">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-20">
            <div>
              <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-12">Engineering Hubs</h2>
              <div className="grid gap-10">
                {catalog.company.locations.map((loc, index) => (
                  <div key={index} className="flex gap-8 group">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition-all group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{loc.city} Operations</h3>
                      <p className="text-slate-500 font-medium leading-relaxed">
                        {loc.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-12">Digital Infrastructure</h2>
              <div className="grid gap-8">
                <a href={`mailto:${catalog.company.email}`} className="flex items-center gap-8 group">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition-all group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{catalog.company.email}</span>
                </a>
                <div className="flex gap-4 pt-4">
                  <a href={catalog.company.social.youtube} target="_blank" rel="noopener noreferrer" className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all">
                    <Video className="w-7 h-7" />
                  </a>
                  <a href={catalog.company.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-100 transition-all">
                    <LinkIcon className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 rounded-[3.5rem] p-10 lg:p-20 text-white shadow-[0_50px_100px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter uppercase leading-none">Technical Inquiry</h2>
                <p className="text-slate-400 mb-16 text-lg leading-relaxed font-medium">
                  Provide your project specifications below. Our engineering team will respond with a preliminary technical assessment.
                </p>
                
                <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); alert('Technical inquiry received. We will contact you shortly.'); }}>
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Contact Name</label>
                      <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:bg-white/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 font-bold" placeholder="Enter name" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Corporate Email</label>
                      <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:bg-white/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 font-bold" placeholder="email@company.com" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Project Scope</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:bg-white/10 focus:border-blue-500 outline-none transition-all appearance-none font-bold">
                      {categories.map((category) => (
                        <option key={category.id} className="bg-slate-950 font-bold">{category.title}</option>
                      ))}
                      <option className="bg-slate-950 font-bold">Custom Engineering</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Technical Requirements</label>
                    <textarea required className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-8 text-white focus:bg-white/10 focus:border-blue-500 outline-none transition-all min-h-[220px] placeholder:text-slate-600 font-bold" placeholder="Briefly describe dimensions, acoustic targets, or automation needs..."></textarea>
                  </div>
                  <button type="submit" className="w-full group flex items-center justify-center gap-4 py-6 bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:bg-blue-500 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-95">
                    Send Technical Request <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </form>
              </div>
              
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
