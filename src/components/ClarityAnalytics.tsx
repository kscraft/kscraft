'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export default function ClarityAnalytics() {
  useEffect(() => {
    const isVercelRuntime = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
    let timer: ReturnType<typeof setTimeout> | undefined;
    let initialized = false;
    
    const initialize = () => {
      if (!isVercelRuntime || initialized) return;
      initialized = true;
      // Delay initialization by 5 seconds to avoid blocking main thread and affecting TBT/LCP
      timer = setTimeout(() => {
        Clarity.init('wqurhlymlt');
      }, 5000);
    };

    if (localStorage.getItem('ksc_cookie_consent') === 'accepted' || localStorage.getItem('ksc_cookie_consent') === 'true') {
      initialize();
    }

    const handleConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<{ status?: string }>).detail;
      if (detail?.status === 'accepted') {
        initialize();
      }
    };

    window.addEventListener('ksc_cookie_consent_changed', handleConsentChange);

    return () => {
      window.removeEventListener('ksc_cookie_consent_changed', handleConsentChange);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}
