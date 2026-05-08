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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const usesDarkHero = pathname === '/' || pathname === '/about' || pathname === '/services' || pathname === '/contact' || pathname.startsWith('/category/');
  const useLightHeaderText = usesDarkHero && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-slate-200 py-3'
          : 'bg-white/0 border-transparent py-5'
      )}
    >
      <div className="mx-auto max-w-[1200px] px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-70">
          <Image src="/logo-ksc.png" alt="KSC" width={120} height={32} className="h-6 w-auto" priority />
          <span className={cn(
            "text-[14px] font-bold tracking-tight uppercase transition-colors",
            useLightHeaderText ? "text-white" : "text-black"
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
                    'text-[12px] font-medium tracking-wide transition-colors hover:text-blue-600',
                    pathname === item.href
                      ? useLightHeaderText ? 'text-white' : 'text-black'
                      : useLightHeaderText ? 'text-slate-300' : 'text-slate-500'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="relative group">
              <button className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[12px] font-bold hover:bg-blue-600 hover:text-white transition-all">
                Catalog <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full right-0 mt-4 w-64 bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-3 grid gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    className="block px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
          <HeaderActions useLightHeaderText={useLightHeaderText} />
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-2 transition-colors md:hidden",
            useLightHeaderText ? "text-white" : "text-black"
          )}
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
