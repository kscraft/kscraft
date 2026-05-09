'use client';

import { useState } from 'react';
import Image from 'next/image';
import { catalog, type Product } from '@/lib/catalog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ product }: { product: Product }) {
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    // Prevent scrolling when modal is open
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable scrolling
    if (typeof window !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <section className="section-standard !py-10 md:!py-20">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-12 gap-6">
          {/* Thumbnails (Desktop side, Mobile below or hidden, we can put them below the main image for mobile, side for desktop) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-square w-full rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedImageIndex === idx ? 'border-blue-600 shadow-md scale-[1.02]' : 'border-transparent hover:border-slate-300'
                } bg-[#f5f5f7]`}
              >
                <Image src={img} alt={`${product.title} ${idx + 1}`} fill className="object-contain p-2 mix-blend-multiply" />
              </button>
            ))}
          </div>

          {/* Main Visual */}
          <div className="lg:col-span-10">
            <div 
              className="relative w-full aspect-square md:aspect-[16/9] overflow-hidden rounded-[2rem] md:rounded-[4rem] bg-[#f5f5f7] border border-slate-100 shadow-2xl cursor-zoom-in group"
              onClick={() => openModal(selectedImageIndex)}
            >
              <Image
                src={images[selectedImageIndex]} 
                alt={product.title} 
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="w-full h-full object-contain p-6 md:p-12 mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Authenticity Callout */}
              <div className="absolute bottom-10 right-10 flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/50 px-6 py-3 rounded-full shadow-2xl pointer-events-none">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                  {catalog.company.authenticity.badge}
                </p>
              </div>
            </div>

            {/* Mobile Thumbnails */}
            <div className="flex lg:hidden gap-4 mt-6 overflow-x-auto custom-scrollbar pb-4 snap-x">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-square w-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all snap-start ${
                    selectedImageIndex === idx ? 'border-blue-600 shadow-md' : 'border-transparent'
                  } bg-[#f5f5f7]`}
                >
                  <Image src={img} alt={`${product.title} ${idx + 1}`} fill className="object-contain p-2 mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4 md:p-10"
            onClick={closeModal}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 z-50 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={closeModal}
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div 
              className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              {/* Main Modal Image */}
              <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[selectedImageIndex]}
                      alt={product.title}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      quality={100}
                    />
                  </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto max-w-full pb-4 custom-scrollbar px-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-square w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx ? 'border-blue-500 scale-110' : 'border-transparent hover:border-slate-500 opacity-60 hover:opacity-100'
                      } bg-white/5`}
                    >
                      <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
