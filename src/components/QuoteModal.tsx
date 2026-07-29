'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { X, Phone, MessageSquare, Mail, ChevronRight, Copy, Check, Globe2, ShieldCheck, Send } from 'lucide-react';
import { catalog } from '@/lib/catalog';
import { trackContactClick, trackClientEvent } from '@/lib/analytics-client';

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden p-3 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xl"
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            className="relative z-10 max-h-[calc(100dvh-1.5rem)] w-full max-w-[min(56rem,calc(100vw-1.5rem))] overscroll-contain overflow-y-auto rounded-3xl border border-white/20 bg-white/95 shadow-[0_40px_100px_-12px_rgba(0,0,0,0.3)] backdrop-blur-3xl sm:max-h-[calc(100dvh-3rem)] sm:max-w-[min(56rem,calc(100vw-3rem))]"
          >
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-100/70 bg-white/95 px-5 py-4 backdrop-blur-xl sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="break-words text-xs font-black uppercase leading-5 tracking-[0.22em] text-slate-400">Engineering Inquiry</span>
              </div>
              <button 
                onClick={onClose}
                className="group p-3 rounded-full bg-slate-100/50 text-slate-500 hover:bg-slate-950 hover:text-white transition-all active:scale-90"
                aria-label="Close quote options"
              >
                <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
              </button>
            </div>

            <div className="p-5 sm:p-7 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:p-8">
              <div className="mb-6 lg:mb-0 lg:pt-2">
                <h2 id="quote-modal-title" className="mb-3 break-words text-3xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-4xl lg:text-[3.35rem]">
                  Get a <br /><span className="text-blue-600">Specification</span> Quote.
                </h2>
                <p className="max-w-sm text-sm font-medium leading-relaxed text-slate-500 sm:text-base lg:text-[15px]">
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
                  onClick={() => trackContactClick('whatsapp')}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-600/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg shadow-green-500/20 transition-transform group-hover:scale-110">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs font-black text-green-600 uppercase tracking-widest">{ui.reachViaWhatsApp}</p>
                      <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></span>
                    </div>
                    <p className="break-words text-base font-bold tracking-tight text-slate-900 sm:text-lg">Direct Technical Chat</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </motion.a>

                {/* Call */}
                <motion.div variants={itemVariants} className="relative group">
                  <a 
                    href={callUrl}
                    onClick={() => trackContactClick('phone')}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-600/5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-110">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-0.5">{ui.reachViaCall}</p>
                      <p className="break-words text-base font-bold tracking-tight text-slate-900 sm:pr-10 sm:text-lg">{phoneDisplay}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </a>
                  <button 
                    onClick={(e) => { e.preventDefault(); copyToClipboard(phone, 'phone'); }}
                    className="absolute right-14 top-1/2 hidden -translate-y-1/2 rounded-xl border border-slate-100 bg-white p-3 text-slate-400 transition-all hover:text-blue-600 hover:shadow-md sm:block sm:opacity-0 sm:group-hover:opacity-100"
                    title="Copy phone"
                  >
                    {copiedType === 'phone' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants} className="relative group">
                  <a 
                    href={emailUrl}
                    onClick={() => trackContactClick('email')}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-600/5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20 transition-transform group-hover:scale-110">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-0.5">{ui.reachViaEmail}</p>
                      <p className="truncate text-[13px] font-bold leading-5 tracking-tight text-slate-900 sm:pr-10 sm:text-lg">{email}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </a>
                  <button 
                    onClick={(e) => { e.preventDefault(); copyToClipboard(email, 'email'); }}
                    className="absolute right-14 top-1/2 hidden -translate-y-1/2 rounded-xl border border-slate-100 bg-white p-3 text-slate-400 transition-all hover:text-blue-600 hover:shadow-md sm:block sm:opacity-0 sm:group-hover:opacity-100"
                    title="Copy email"
                  >
                    {copiedType === 'email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </motion.div>

                {/* Technical Form Redirect */}
                <motion.div variants={itemVariants}>
                  <Link 
                    href={`/contact?scope=${encodeURIComponent(productName || '')}`}
                    onClick={() => {
                      trackClientEvent('formal_quote_form_redirect', { product: productName });
                      onClose();
                    }}
                    className="group flex items-center gap-4 rounded-2xl bg-blue-600 p-4 text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white transition-transform group-hover:scale-110">
                      <Send className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-blue-200 uppercase tracking-widest mb-0.5">Formal Inquiry</p>
                      <p className="break-words text-base font-bold tracking-tight sm:text-lg">Detailed Technical Request</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-300 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              </div>
            </div>
            
            {/* Footer Tagline */}
            <div className="flex items-center justify-center gap-3 border-t border-slate-100 bg-slate-50/80 px-5 py-4 text-center">
              <Globe2 className="w-3.5 h-3.5 text-blue-600" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                Engineering Precision. Delivered Worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return typeof document === 'undefined' ? null : createPortal(modal, document.body);
}
