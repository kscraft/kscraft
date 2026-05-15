'use client';

import * as React from 'react';
import { useActionState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { catalog, categories, home, faqs } from '@/lib/catalog';
import { Mail, MapPin, Send, Phone, CheckCircle2, HelpCircle } from 'lucide-react';
import { YoutubeIcon, LinkedinIcon, InstagramIcon } from '@/components/SocialIcons';
import ThemeMarker from '@/components/ThemeMarker';
import SpecProcess from '@/components/SpecProcess';
import { submitInquiry } from '@/app/actions';
import { trackFormStart, trackClientEvent } from '@/lib/analytics-client';

const initialState = {
  success: false,
  message: '',
  errors: undefined,
};

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const searchParams = useSearchParams();
  const initialScope = searchParams.get('scope') || '';
  const [hasStarted, setHasStarted] = React.useState(false);

  // Track successful submission
  React.useEffect(() => {
    if (state.success) {
      trackClientEvent('generate_lead', {
        form_id: 'contact_form',
        scope: searchParams.get('scope') || 'general'
      });
    }
  }, [state.success, searchParams]);

  const handleFocus = () => {
    if (!hasStarted) {
      trackFormStart('contact_form');
      setHasStarted(true);
    }
  };

  const [referrer] = React.useState(() => (
    typeof document !== 'undefined' ? (document.referrer || 'none') : 'none'
  ));
  const [pagePath] = React.useState(() => (
    typeof window !== 'undefined' ? window.location.pathname : ''
  ));

  return (
    <div className="bg-slate-950 rounded-[3.5rem] p-10 lg:p-20 text-white shadow-[0_50px_100px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter uppercase leading-none">{home.contact.formTitle}</h2>
        <p className="text-slate-400 mb-16 text-lg leading-relaxed font-medium">
          {home.contact.formDescription}
        </p>
        
        {state?.success ? (
          <div className="rounded-3xl border border-blue-400/30 bg-blue-500/10 p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-white">{home.contact.successTitle}</h3>
            <p className="text-slate-300 leading-relaxed font-medium">
              {state.message}
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-10" noValidate onFocus={handleFocus}>
            {state?.message && !state?.success && (
              <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm font-bold leading-6 text-red-100" role="alert">
                {state.message}
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
                  aria-invalid={Boolean(state?.errors?.name)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-600 font-bold" 
                  placeholder={home.contact.placeholderName} 
                />
                {state?.errors?.name && <p className="text-xs font-bold text-red-400 px-2">{state.errors.name[0]}</p>}
              </div>
              <div className="space-y-4">
                <label htmlFor="contact-email" className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">{home.contact.emailLabel}</label>
                <input 
                  id="contact-email"
                  name="email"
                  type="email" 
                  required 
                  aria-invalid={Boolean(state?.errors?.email)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-600 font-bold" 
                  placeholder={home.contact.placeholderEmail} 
                />
                {state?.errors?.email && <p className="text-xs font-bold text-red-400 px-2">{state.errors.email[0]}</p>}
              </div>
              <div className="space-y-4">
                <label htmlFor="contact-phone" className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">{home.contact.phoneLabel}</label>
                <input 
                  id="contact-phone"
                  name="phone"
                  type="tel" 
                  required 
                  aria-invalid={Boolean(state?.errors?.phone)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-600 font-bold" 
                  placeholder={home.contact.placeholderPhone} 
                />
                {state?.errors?.phone && <p className="text-xs font-bold text-red-400 px-2">{state.errors.phone[0]}</p>}
              </div>
              <div className="space-y-4">
                <label htmlFor="contact-city" className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">{home.contact.cityLabel}</label>
                <input 
                  id="contact-city"
                  name="city"
                  type="text" 
                  required 
                  aria-invalid={Boolean(state?.errors?.city)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-600 font-bold" 
                  placeholder={home.contact.placeholderCity} 
                />
                {state?.errors?.city && <p className="text-xs font-bold text-red-400 px-2">{state.errors.city[0]}</p>}
              </div>
            </div>
            
            {/* Hidden fields for tracking */}
            <input type="hidden" name="utmSource" value={searchParams.get('utm_source') || 'direct'} />
            <input type="hidden" name="referrer" value={referrer} />
            <input type="hidden" name="pagePath" value={pagePath} />
            <div className="space-y-4">
              <label htmlFor="contact-scope" className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">{home.contact.scopeLabel}</label>
              <select 
                id="contact-scope"
                name="scope"
                defaultValue={initialScope}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none font-bold"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.title} className="bg-slate-950 font-bold">{category.title}</option>
                ))}
                <option value={home.contact.ui.customEngineering} className="bg-slate-950 font-bold">{home.contact.ui.customEngineering}</option>
              </select>
              {state?.errors?.scope && <p className="text-xs font-bold text-red-400 px-2">{state.errors.scope[0]}</p>}
            </div>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-requirements" className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">{home.contact.requirementsLabel}</label>
                <div className="grid lg:grid-cols-[1fr_260px] gap-8">
                  <div className="space-y-4">
                    <textarea 
                      id="contact-requirements"
                      name="requirements"
                      required 
                      aria-invalid={Boolean(state?.errors?.requirements)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-8 text-white focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all min-h-[280px] placeholder:text-slate-600 font-bold" 
                      placeholder={home.contact.placeholderRequirements} 
                    ></textarea>
                    {state?.errors?.requirements && <p className="text-xs font-bold text-red-400 px-2">{state.errors.requirements[0]}</p>}
                  </div>
                  <div className="rounded-3xl bg-white/5 border border-white/10 p-8 h-fit">
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Spec Checklist</h4>
                    <ul className="space-y-4">
                      {[
                        'Approx. Dimensions',
                        'Acoustic Target (dB)',
                        'Opening Style',
                        'Automation Needs',
                        'Project Timeline'
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                          <div className="h-1 w-1 rounded-full bg-blue-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <p className="text-[9px] font-medium text-slate-500 leading-relaxed uppercase tracking-wider">
                        Providing these details helps us deliver an accurate technical assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full group flex items-center justify-center gap-4 py-6 bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:bg-blue-500 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isPending ? 'SUBMITTING...' : home.contact.submitButton} {!isPending && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
            </button>
          </form>
        )}
      </div>
      
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
    </div>
  );
}

export default function ContactClient() {
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

      {/* How It Works */}
      <section className="section-tint">
        <div className="max-container">
          <div className="mb-14 max-w-3xl">
            <p className="text-eyebrow">How Specification Works</p>
            <h2 className="heading-section mb-0">From drawings to installed system in 5 steps</h2>
          </div>
          <SpecProcess />
        </div>
      </section>

      {/* Key FAQs Preview */}
      <section className="section-standard border-b border-slate-100">
        <div className="max-container">
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-eyebrow">Common Questions</p>
              <h2 className="heading-section mb-0">Before you reach out</h2>
            </div>
            <Link href="/faq" className="apple-button-secondary inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-[0.2em]">
              View All FAQs
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {faqs.categories.slice(0, 3).map((cat) => (
              <div key={cat.id} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">{cat.title}</h3>
                </div>
                <div className="space-y-4">
                  {cat.faqs.slice(0, 2).map((faq, idx) => (
                    <div key={idx}>
                      <p className="text-sm font-bold text-slate-800">{faq.question}</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500 line-clamp-2">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  <div className="flex flex-wrap gap-4 pt-4">
                    <a href={catalog.company.social.youtube} target="_blank" rel="noopener noreferrer" className="flex shrink-0 h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all">
                      <YoutubeIcon className="w-7 h-7" />
                    </a>
                    <a href={catalog.company.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex shrink-0 h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-100 transition-all">
                      <LinkedinIcon className="w-7 h-7" />
                    </a>
                    <a href={catalog.company.social.instagram} target="_blank" rel="noopener noreferrer" className="flex shrink-0 h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-100 transition-all">
                      <InstagramIcon className="w-7 h-7" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="bg-slate-950 rounded-[3.5rem] p-10 lg:p-20 h-[600px] animate-pulse" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
