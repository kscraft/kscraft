'use client';

import { useEffect, useSyncExternalStore } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const GA_MEASUREMENT_ID = 'G-HS8VPLD95B';

function hasAcceptedConsent() {
  if (typeof window === 'undefined') {
    return false;
  }

  const status = window.localStorage.getItem('ksc_cookie_consent');
  return status === 'accepted' || status === 'true';
}

export default function ConsentManagedAnalytics({
  enableVercelAnalytics,
}: {
  enableVercelAnalytics: boolean;
}) {
  const pathname = usePathname();
  const isAccepted = useSyncExternalStore(
    (callback) => {
      window.addEventListener('ksc_cookie_consent_changed', callback);
      return () => window.removeEventListener('ksc_cookie_consent_changed', callback);
    },
    hasAcceptedConsent,
    () => false,
  );

  useEffect(() => {
    if (!isAccepted || typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: `${window.location.origin}${pathname}`,
      page_title: document.title,
    });
  }, [isAccepted, pathname]);

  if (!isAccepted) {
    return null;
  }

  return (
    <>
      {enableVercelAnalytics && (
        <>
          <SpeedInsights />
          <Analytics />
        </>
      )}
      <Script
        id="google-analytics-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
