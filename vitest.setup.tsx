/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  notFound: vi.fn(),
}));

// Mock Header Theme Context
vi.mock('@/lib/HeaderThemeContext', () => ({
  useHeaderTheme: () => ({
    theme: 'dark',
    setTheme: vi.fn(),
  }),
  HeaderThemeProvider: ({ children }: any) => <>{children}</>,
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} fill={props.fill ? "true" : undefined} alt={props.alt || 'mocked image'} />;
  },
}));

// Mock next/link
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>;
  },
}));

// Mock Lucide Icons - Explicit list to ensure named imports work
vi.mock('lucide-react', () => {
  const icons = [
    'X', 'Phone', 'MessageSquare', 'Mail', 'ChevronRight', 'Copy', 'Check', 'Globe2', 
    'ShieldCheck', 'Send', 'ArrowRight', 'Home', 'Menu', 'ChevronDown', 'Search',
    'Settings', 'Wrench', 'ClipboardCheck', 'Building2', 'BadgeCheck', 'Trophy',
    'MapPin', 'Rocket', 'Zap', 'Target', 'Gauge', 'Sparkles', 'Maximize', 'Layers', 
    'Wind', 'CheckCircle2', 'Award', 'Play', 'SlidersHorizontal', 'ArrowRightLeft',
    'ClipboardList', 'Shield', 'Settings2', 'Hotel', 'Clock', 'Eye', 'Plane', 'Sun', 
    'ArrowUp', 'FileText', 'Users', 'Factory', 'Truck', 'HelpCircle', 'Clipboard',
    'Layout', 'Box', 'Cpu', 'Activity', 'Globe', 'CheckCircle', 'AlertCircle', 'ExternalLink', 'FileDown', 'Trash2', 'ChevronUp'
  ];
  const mockIcons: Record<string, any> = {
    __esModule: true,
  };
  icons.forEach((icon) => {
    mockIcons[icon] = (props: any) => <div data-testid={`icon-${icon.toLowerCase()}`} {...props} />;
  });
  return mockIcons;
});

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    footer: ({ children, ...props }: any) => <footer {...props}>{children}</footer>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
    circle: ({ children, ...props }: any) => <circle {...props}>{children}</circle>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));
