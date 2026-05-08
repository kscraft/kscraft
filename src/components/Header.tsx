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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'Overview', href: '/' },
    { label: 'Acoustics', href: '/category/sound-proof-windows' },
    { label: 'Automation', href: '/category/motorized-systems' },
    { label: 'Media', href: '/media' },
    { label: 'About', href: '/about' },
  ];

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
          <img src="/logo-ksc.png" alt="KSC" className="h-6 w-auto" />
          <span className="text-[14px] font-bold tracking-tight text-black uppercase">
            Kiran Slido Craft
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-[12px] font-medium tracking-wide transition-colors hover:text-blue-600',
                    pathname === item.href ? 'text-black' : 'text-slate-500'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="relative group">
              <button className="flex items-center gap-1 text-[12px] font-medium text-slate-500 hover:text-black transition-colors">
                Catalog <ChevronDown className="w-3 h-3" />
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
          <Link
            href="/contact"
            className="text-[12px] font-semibold bg-black text-white px-5 py-2 rounded-full hover:bg-zinc-800 transition-all active:scale-95"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-black"
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
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-3xl font-bold tracking-tight text-black block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className="text-3xl font-bold tracking-tight text-blue-600">
                    Contact Us
                  </Link>
                </li>
              </ul>
              
              <div className="pt-10 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Product Lines</h3>
                <ul className="grid gap-4">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link href={`/category/${cat.id}`} className="text-xl font-semibold text-slate-900">
                        {cat.title}
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
