'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageSquare, Mail, ChevronRight } from 'lucide-react';
import { catalog } from '@/lib/catalog';

type QuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
};

export default function QuoteModal({ isOpen, onClose, productName }: QuoteModalProps) {
  const { phone, phoneDisplay, email, ui } = catalog.company;

  const whatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(`Hi, I am interested in getting a quote for ${productName || 'your acoustic systems'}.`)}`;
  const callUrl = `tel:${phone}`;
  const emailUrl = `mailto:${email}?subject=${encodeURIComponent(`Quote Request: ${productName || 'Technical Inquiry'}`)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-[0_50px_100px_-12px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-auto"
            >
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-10 lg:p-14">
                <div className="mb-10">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">{ui.quoteTitle}</h2>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {productName ? (
                      <>Technical inquiry for <span className="text-blue-600 font-bold">{productName}</span>. {ui.quoteSubtitle}</>
                    ) : ui.quoteSubtitle}
                  </p>
                </div>

                <div className="grid gap-4">
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-6 rounded-3xl bg-green-50 border border-green-100 group hover:bg-green-100 transition-all"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-green-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1">{ui.reachViaWhatsApp}</p>
                      <p className="text-xl font-bold text-slate-900">Direct Message</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-green-300 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a 
                    href={callUrl}
                    className="flex items-center gap-6 p-6 rounded-3xl bg-blue-50 border border-blue-100 group hover:bg-blue-100 transition-all"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-1">{ui.reachViaCall}</p>
                      <p className="text-xl font-bold text-slate-900">{phoneDisplay}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-blue-300 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a 
                    href={emailUrl}
                    className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-slate-200 transition-all"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{ui.reachViaEmail}</p>
                      <p className="text-xl font-bold text-slate-900">{email}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Engineering Precision. Delivered Worldwide.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
