'use client';

import { useState } from 'react';
import Image from 'next/image';
import { catalog, categories, home } from '@/lib/catalog';
import { Mail, MapPin, Video, Link as LinkIcon, Send, Phone } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';

export default function ContactPage() {
  const [formError, setFormError] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    if (!e.currentTarget.checkValidity()) {
      setFormError(home.contact.ui.formError);
      e.currentTarget.reportValidity();
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const scope = formData.get('scope') as string;
    const requirements = formData.get('requirements') as string;

    const subject = encodeURIComponent(home.contact.ui.emailSubject.replace('{scope}', scope).replace('{name}', name));
    const body = encodeURIComponent(
      home.contact.ui.emailBody
        .replace('{name}', name)
        .replace('{email}', email)
        .replace('{scope}', scope)
        .replace('{requirements}', requirements)
    );

    window.location.href = `mailto:${catalog.company.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/modern-architecture.jpg" 
            alt="Contact" 
            fill
            sizes="100vw"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 max-container px-6 text-center lg:text-left">
          <h1 className="heading-hero text-white">
            {home.contact.heroTitle.split(' ')[0]} {home.contact.heroTitle.split(' ')[1]} <span className="text-blue-500">{home.contact.heroTitle.split(' ')[2]}</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-400 leading-relaxed mx-auto lg:mx-0 font-medium mt-10">
            {home.contact.heroDescription}
          </p>
        </div>
      </header>

      <section className="section-standard">
        <div className="max-container">
          <div className="grid lg:grid-cols-12 gap-20">
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-20">
              <div>
                <span className="text-eyebrow">{home.contact.hubsLabel}</span>
                <div className="grid gap-10 mt-10">
                  {catalog.company.locations.map((loc, index) => (
                    <div key={index} className="flex gap-8 group">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition-all group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{catalog.company.ui.operationsLabel.replace('{city}', loc.city)}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed whitespace-pre-wrap">
                          {loc.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-eyebrow">{home.contact.digitalLabel}</span>
                <div className="grid gap-8 mt-10">
                  <a href={`mailto:${catalog.company.email}`} className="group flex min-w-0 items-center gap-8">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition-all group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                      <Mail className="w-6 h-6" />
                    </div>
                    <span className="min-w-0 break-all text-xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">{catalog.company.email}</span>
                  </a>

                  <div className="group flex min-w-0 items-center gap-8">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition-all group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      {catalog.company.phoneDisplay.split(', ').map((phone, idx) => (
                        <a key={idx} href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="min-w-0 break-all text-xl font-black tracking-tight text-slate-900 transition-colors hover:text-blue-600">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
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
                  <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter uppercase leading-none">{home.contact.formTitle}</h2>
                  <p className="text-slate-400 mb-16 text-lg leading-relaxed font-medium">
                    {home.contact.formDescription}
                  </p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-10" noValidate>
                    {formError && (
                      <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm font-bold leading-6 text-red-100" role="alert">
                        {formError}
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label htmlFor="contact-name" className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">{home.contact.nameLabel}</label>
                        <input 
                          id="contact-name"
                          name="name"
                          type="text" 
                          required 
                          aria-invalid={Boolean(formError)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-600 font-bold" 
                          placeholder={home.contact.placeholderName} 
                        />
                      </div>
                      <div className="space-y-4">
                        <label htmlFor="contact-email" className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">{home.contact.emailLabel}</label>
                        <input 
                          id="contact-email"
                          name="email"
                          type="email" 
                          required 
                          aria-invalid={Boolean(formError)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-600 font-bold" 
                          placeholder={home.contact.placeholderEmail} 
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label htmlFor="contact-scope" className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">{home.contact.scopeLabel}</label>
                      <select 
                        id="contact-scope"
                        name="scope"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none font-bold"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.title} className="bg-slate-950 font-bold">{category.title}</option>
                        ))}
                        <option value={home.contact.ui.customEngineering} className="bg-slate-950 font-bold">{home.contact.ui.customEngineering}</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label htmlFor="contact-requirements" className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">{home.contact.requirementsLabel}</label>
                      <textarea 
                        id="contact-requirements"
                        name="requirements"
                        required 
                        aria-invalid={Boolean(formError)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-8 text-white focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all min-h-[220px] placeholder:text-slate-600 font-bold" 
                        placeholder={home.contact.placeholderRequirements} 
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full group flex items-center justify-center gap-4 py-6 bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:bg-blue-500 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-95"
                    >
                      {home.contact.submitButton} <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </form>
                </div>
                
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
