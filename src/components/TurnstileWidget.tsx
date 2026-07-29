'use client';

import * as React from 'react';
import Script from 'next/script';

const TURNSTILE_SITE_KEY = '0x4AAAAAAEAl-DGJqphLw0Wv';
const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function isWidgetAttached(container: HTMLElement, widgetId: string) {
  const widgetElement = document.getElementById(widgetId);
  return Boolean(widgetElement && container.contains(widgetElement));
}

export default function TurnstileWidget() {
  const [loadError, setLoadError] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const widgetIdRef = React.useRef<string | null>(null);
  const mountedRef = React.useRef(true);

  const setLoadErrorIfMounted = React.useCallback((value: boolean) => {
    if (mountedRef.current) {
      setLoadError(value);
    }
  }, []);

  const renderWidget = React.useCallback(() => {
    const container = containerRef.current;
    const turnstile = window.turnstile;

    if (!container || !turnstile || widgetIdRef.current) {
      return;
    }

    try {
      widgetIdRef.current = turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        action: 'turnstile-spin-v2',
        appearance: 'always',
        theme: 'dark',
        size: 'flexible',
        retry: 'auto',
        'refresh-expired': 'auto',
        callback: () => setLoadErrorIfMounted(false),
        'error-callback': () => setLoadErrorIfMounted(true),
        'unsupported-callback': () => setLoadErrorIfMounted(true),
      });
      setLoadErrorIfMounted(false);
    } catch {
      widgetIdRef.current = null;
      setLoadErrorIfMounted(true);
    }
  }, [setLoadErrorIfMounted]);

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    mountedRef.current = true;
    renderWidget();

    return () => {
      mountedRef.current = false;
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;

      // Avoid calling the provider with an ID it has already discarded.
      if (widgetId && container && window.turnstile && isWidgetAttached(container, widgetId)) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // Provider cleanup is best-effort once the widget is leaving the DOM.
        }
      }
    };
  }, [renderWidget]);

  return (
    <div className="space-y-4">
      <Script
        src={TURNSTILE_SCRIPT_URL}
        strategy="afterInteractive"
        onReady={renderWidget}
        onError={() => setLoadErrorIfMounted(true)}
      />
      <p className="ml-1 text-xs font-semibold text-blue-300">Human verification</p>
      <div
        ref={containerRef}
        className="min-h-[65px]"
        data-turnstile-container="true"
        data-sitekey={TURNSTILE_SITE_KEY}
        data-action="turnstile-spin-v2"
      />
      {loadError && (
        <p className="rounded-xl border border-amber-300/30 bg-amber-400/10 px-4 py-3 text-xs font-semibold leading-5 text-amber-100" role="alert">
          Human verification could not load. Disable content blocking for this site and reload the page.
        </p>
      )}
    </div>
  );
}
