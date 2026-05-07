'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/catalog';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigationItems = [
    ['/', 'Home'],
    ['/about', 'About Us'],
    ['/services', 'Services'],
    ['/clients', 'Clients & Certifications'],
    ['/media', 'Media'],
    ['/contact', 'Contact'],
  ];

  return (
    <div className="lg:hidden">
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
          <img src="/logo-ksc.svg" alt="Kiran Slido Craft" className="h-8 w-8 rounded-lg bg-white" />
          <span>Kiran Slido Craft</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 focus:outline-none"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 z-40 pt-20 px-6 overflow-y-auto">
          <nav className="space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main</h3>
              <ul className="space-y-4">
                {navigationItems.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} onClick={() => setIsOpen(false)} className="text-xl">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Catalog</h3>
              <ul className="space-y-4">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.id}`}
                      onClick={() => setIsOpen(false)}
                      className="text-xl"
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
