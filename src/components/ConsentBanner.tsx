'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const hasConsented = localStorage.getItem('ksc_cookie_consent');
    if (!hasConsented) {
      // Small delay to not overwhelm the user immediately on load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ksc_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pb-safe"
        >
          <div className="mx-auto max-w-4xl bg-slate-900 text-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 backdrop-blur-xl bg-opacity-95">
            <div className="flex-1">
              <h3 className="text-lg font-bold tracking-tight mb-2">We value your privacy</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">
                We use cookies and similar technologies to measure site traffic and improve your experience. By clicking "Accept", you consent to our use of cookies as described in our{' '}
                <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <div className="flex w-full sm:w-auto shrink-0">
              <button
                onClick={handleAccept}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-colors shadow-lg shadow-blue-600/20 active:scale-95"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
