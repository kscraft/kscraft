'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { catalog } from '@/lib/catalog';

export default function ClientMarquee() {
  const logos = catalog.company.clientLogos;
  
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden bg-white py-12 border-y border-slate-100 relative group">
      {/* Gradients for soft edges - responsive widths */}
      <div className="absolute inset-y-0 left-0 w-12 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-12 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <motion.div 
        className="flex items-center gap-12 md:gap-20 whitespace-nowrap"
        animate={{
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
          <div key={`${logo.name}-${idx}`} className="flex flex-col items-center justify-center min-w-[180px] h-24 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer scale-90 hover:scale-100">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={logo.image}
                alt={logo.name}
                width={160}
                height={60}
                className="object-contain max-h-16"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.visibility = 'hidden';
                }}
              />
            </div>
            <p className="absolute -bottom-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600 transition-colors">
              {logo.name}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
