'use client';

import { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  const updateConsent = useCallback((isGranted: boolean) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': isGranted ? 'granted' : 'denied',
        'ad_user_data': isGranted ? 'granted' : 'denied',
        'ad_personalization': isGranted ? 'granted' : 'denied',
        'analytics_storage': isGranted ? 'granted' : 'denied'
      });
    }

    window.dispatchEvent(new CustomEvent('ksc_cookie_consent_changed', {
      detail: { status: isGranted ? 'accepted' : 'rejected' },
    }));
  }, []);

  useEffect(() => {
    // Check if the user has already consented
    const consentStatus = localStorage.getItem('ksc_cookie_consent');
    if (!consentStatus) {
      // Delay to avoid overwhelming user immediately and preventing it from hijacking the Largest Contentful Paint (LCP)
      const timer = setTimeout(() => setIsVisible(true), 4500);
      return () => clearTimeout(timer);
    } else {
      updateConsent(consentStatus === 'accepted' || consentStatus === 'true');
    }
  }, [updateConsent]);

  const handleAccept = () => {
    localStorage.setItem('ksc_cookie_consent', 'accepted');
    setIsVisible(false);
    updateConsent(true);
  };

  const handleReject = () => {
    localStorage.setItem('ksc_cookie_consent', 'rejected');
    setIsVisible(false);
    updateConsent(false);
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
          role="region"
          aria-label="Cookie consent"
        >
          <div className="mx-auto max-w-4xl bg-slate-900 text-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 backdrop-blur-xl bg-opacity-95">
            <div className="flex-1">
              <h3 className="text-lg font-bold tracking-tight mb-2">We value your privacy</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">
                We use cookies and similar technologies to measure site traffic and improve your experience. By clicking &quot;Accept&quot;, you consent to our use of cookies as described in our{' '}
                <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row shrink-0">
              <button
                onClick={handleReject}
                className="min-h-12 w-full rounded-xl bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/15 active:scale-95 sm:w-auto"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="min-h-12 w-full rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-500 active:scale-95 sm:w-auto"
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
