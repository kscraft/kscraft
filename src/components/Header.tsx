'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { categories, navigation } from '@/lib/catalog';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderActions from '@/components/HeaderActions';
import { useHeaderTheme } from '@/lib/HeaderThemeContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme } = useHeaderTheme();

  const isHeaderLight = theme === 'dark' && !isScrolled && !isOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigate
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out',
        isScrolled
          ? 'bg-white/60 backdrop-blur-3xl border-b border-slate-200/50 py-3 shadow-sm'
          : 'bg-transparent py-5',
        isOpen && 'bg-white border-b border-slate-200'
      )}
    >
      <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-all active:scale-95">
          <Image src="/logo-ksc.png" alt="KSC" width={120} height={32} className="h-6 w-auto" priority />
          <span className={cn(
            "text-[14px] font-black tracking-tight uppercase transition-colors duration-500",
            isHeaderLight ? "text-white" : "text-black"
          )}>
            Kiran Slido Craft
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navigation.header.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-[12px] font-bold tracking-[0.1em] uppercase transition-colors duration-500 hover:text-blue-600',
                    pathname === item.href
                      ? isHeaderLight ? 'text-white' : 'text-blue-600'
                      : isHeaderLight ? 'text-slate-300' : 'text-slate-500'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="relative group">
              <button className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all",
                isHeaderLight 
                  ? "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md" 
                  : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
              )}>
                Catalog <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full right-0 mt-4 w-72 bg-white/95 backdrop-blur-3xl border border-slate-200 rounded-[2rem] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-4 grid gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    className="flex items-center justify-between px-5 py-3 text-[13px] font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all group/item"
                  >
                    {cat.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </li>
          </ul>
          <HeaderActions useLightHeaderText={isHeaderLight} />
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-3 rounded-full transition-all active:scale-90 md:hidden",
            isHeaderLight ? "text-white bg-white/10" : "text-black bg-slate-100"
          )}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 h-screen overflow-y-auto"
          >
            <nav className="p-10 space-y-12">
              <ul className="space-y-6">
                {navigation.header.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-3xl font-bold tracking-tight block',
                        pathname === item.href ? 'text-blue-600' : 'text-black'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="text-3xl font-bold tracking-tight text-blue-600">
                    Contact Us
                  </Link>
                </li>
              </ul>
              
              <div className="pt-10 border-t border-slate-100">
                <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-8">System Catalog</h3>
                <ul className="grid gap-6">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link href={`/category/${cat.id}`} onClick={() => setIsOpen(false)} className="text-4xl font-bold tracking-tight text-black flex items-center justify-between group">
                        {cat.title}
                        <ArrowRight className="w-6 h-6 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
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
