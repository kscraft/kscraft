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
    threshold: 0.1,
    rootMargin: '-10% 0px -90% 0px', // Trigger when section starts hitting the top
  });

  useEffect(() => {
    if (inView) {
      setTheme(theme);
    }
  }, [inView, theme, setTheme]);

  return <div ref={ref} className={className} />;
}
