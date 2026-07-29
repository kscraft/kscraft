'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { catalog } from '@/lib/catalog';

export default function ClientMarquee() {
  const logos = catalog.company.clientLogos;
  const shouldReduceMotion = useReducedMotion();
  
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="group relative w-full max-w-full overflow-x-clip border-y border-slate-100 bg-white py-12 [contain:inline-size]">
      {/* Gradients for soft edges - responsive widths */}
      <div className="absolute inset-y-0 left-0 w-12 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-12 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <motion.div 
        className="flex items-center gap-12 md:gap-20 whitespace-nowrap"
        animate={shouldReduceMotion ? undefined : {
          x: [0, -2500],
        }}

        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          },
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {duplicatedLogos.map((logo, idx) => (
          <div key={`${logo.name}-${idx}`} className="group/client relative flex h-24 min-w-[180px] scale-90 flex-col items-center justify-center transition-transform duration-500 hover:scale-100">
            <div className="relative flex h-full w-full items-center justify-center opacity-60 grayscale transition-all duration-500 group-hover/client:opacity-100 group-hover/client:grayscale-0">
              <Image
                src={logo.image}
                alt={logo.name}
                width={160}
                height={60}
                className="h-auto max-h-16 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.visibility = 'hidden';
                }}
              />
            </div>
            <p className="absolute -bottom-6 text-xs font-black uppercase tracking-[0.2em] text-slate-600 transition-colors group-hover/client:text-blue-700">
              {logo.name}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
