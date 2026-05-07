'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { categories } from '@/lib/catalog';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navigationItems = [
    { href: '/', label: 'Overview' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/clients', label: 'Clients' },
    { href: '/media', label: 'Media' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md py-3 border-slate-200 shadow-sm'
          : 'bg-transparent py-5 border-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-100 transition-transform group-hover:scale-105">
            <img src="/logo-ksc.svg" alt="Kiran Slido Craft" className="h-8 w-8" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-lg font-black tracking-tighter leading-none transition-colors",
              isScrolled ? "text-slate-900" : "text-slate-900" 
            )}>
              KIRAN SLIDO CRAFT
            </span>
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">
              Engineering Excellence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm font-bold transition-colors hover:text-blue-600',
                    pathname === item.href ? 'text-blue-600' : 'text-slate-600'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="relative group">
              <button className="flex items-center gap-1 text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
                Catalog <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 grid gap-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="block px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
          <Link
            href="/contact"
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold transition hover:bg-blue-600 hover:shadow-lg"
          >
            Contact Sales
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-900 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl overflow-y-auto max-h-[80vh]"
          >
            <nav className="p-6 space-y-8">
              <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Navigation</h3>
                <ul className="grid gap-4">
                  {navigationItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'text-lg font-black block',
                          pathname === item.href ? 'text-blue-600' : 'text-slate-900'
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/contact"
                      className="text-lg font-black text-blue-600"
                    >
                      Contact Sales
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Catalog</h3>
                <ul className="grid gap-3">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/category/${category.id}`}
                        className="text-sm font-bold text-slate-600 block"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
