'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useHeaderTheme } from '@/lib/HeaderThemeContext';

type ThemeMarkerProps = {
  theme: 'light' | 'dark';
  className?: string;
};

export default function ThemeMarker({ theme, className }: ThemeMarkerProps) {
  const { setTheme } = useHeaderTheme();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px -90% 0px', // Trigger while the marker is in the top band of the viewport.
  });

  useEffect(() => {
    if (inView) {
      setTheme(theme);
    }
  }, [inView, theme, setTheme]);

  return <div ref={ref} className={`pointer-events-none h-px w-px ${className ?? ''}`} />;
}
