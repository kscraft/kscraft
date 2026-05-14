'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { X, Phone, MessageSquare, Mail, ChevronRight, Copy, Check, Globe2, ShieldCheck, Send } from 'lucide-react';
import { catalog } from '@/lib/catalog';

type QuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
};

export default function QuoteModal({ isOpen, onClose, productName }: QuoteModalProps) {
  const { phone, phoneDisplay, email, ui } = catalog.company;
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const whatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(`Hi, I am interested in getting a quote for ${productName || 'your acoustic systems'}.`)}`;
  const callUrl = `tel:${phone}`;
  const emailUrl = `mailto:${email}?subject=${encodeURIComponent(`Quote Request: ${productName || 'Technical Inquiry'}`)}`;

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xl"
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            className="relative max-h-[92svh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-white/20 bg-white/95 shadow-[0_40px_100px_-12px_rgba(0,0,0,0.3)] backdrop-blur-3xl sm:rounded-[3rem]"
          >
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-100/50 px-6 py-5 sm:px-10 sm:py-8">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="break-words text-[10px] font-black uppercase leading-5 tracking-[0.22em] text-slate-400">Engineering Inquiry</span>
              </div>
              <button 
                onClick={onClose}
                className="group p-3 rounded-full bg-slate-100/50 text-slate-500 hover:bg-slate-950 hover:text-white transition-all active:scale-90"
                aria-label="Close quote options"
              >
                <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
              </button>
            </div>

            <div className="p-6 sm:p-10 lg:p-14">
              <div className="mb-12">
                <h2 id="quote-modal-title" className="mb-6 break-words text-4xl font-black uppercase leading-none tracking-tight text-slate-900 lg:text-5xl">
                  Get a <br /><span className="text-blue-600">Specification</span> Quote.
                </h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm">
                  {productName ? (
                    <>Direct technical channel for <span className="text-slate-900 font-bold">{productName}</span>.</>
                  ) : ui.quoteSubtitle}
                </p>
              </div>

              <div className="grid gap-3">
                {/* WhatsApp */}
                <motion.a 
                  variants={itemVariants}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-600/5 transition-all"
                >
                  <div className="h-12 w-12 rounded-2xl bg-green-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[9px] font-black text-green-600 uppercase tracking-widest">{ui.reachViaWhatsApp}</p>
                      <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></span>
                    </div>
                    <p className="break-words text-lg font-bold tracking-tight text-slate-900">Direct Technical Chat</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </motion.a>

                {/* Call */}
                <motion.div variants={itemVariants} className="relative group">
                  <a 
                    href={callUrl}
                    className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-600/5 transition-all"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/20">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-0.5">{ui.reachViaCall}</p>
                      <p className="break-words text-lg font-bold tracking-tight text-slate-900">{phoneDisplay}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </a>
                  <button 
                    onClick={(e) => { e.preventDefault(); copyToClipboard(phone, 'phone'); }}
                    className="absolute right-14 top-1/2 -translate-y-1/2 rounded-xl border border-slate-100 bg-white p-3 text-slate-400 opacity-100 transition-all hover:text-blue-600 hover:shadow-md sm:opacity-0 sm:group-hover:opacity-100"
                    title="Copy phone"
                  >
                    {copiedType === 'phone' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants} className="relative group">
                  <a 
                    href={emailUrl}
                    className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-600/5 transition-all"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-slate-900/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{ui.reachViaEmail}</p>
                      <p className="text-lg font-bold text-slate-900 tracking-tight truncate pr-10">{email}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </a>
                  <button 
                    onClick={(e) => { e.preventDefault(); copyToClipboard(email, 'email'); }}
                    className="absolute right-14 top-1/2 -translate-y-1/2 rounded-xl border border-slate-100 bg-white p-3 text-slate-400 opacity-100 transition-all hover:text-blue-600 hover:shadow-md sm:opacity-0 sm:group-hover:opacity-100"
                    title="Copy email"
                  >
                    {copiedType === 'email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </motion.div>

                {/* Technical Form Redirect */}
                <motion.div variants={itemVariants}>
                  <Link 
                    href={`/contact?scope=${encodeURIComponent(productName || '')}`}
                    onClick={onClose}
                    className="group flex items-center gap-6 p-6 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 transition-all"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Send className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-black text-blue-200 uppercase tracking-widest mb-0.5">Formal Inquiry</p>
                      <p className="break-words text-lg font-bold tracking-tight">Detailed Technical Request</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-300 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              </div>
            </div>
            
            {/* Footer Tagline */}
            <div className="bg-slate-50/80 px-10 py-6 text-center border-t border-slate-100 flex items-center justify-center gap-3">
              <Globe2 className="w-3.5 h-3.5 text-blue-600" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Engineering Precision. Delivered Worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
