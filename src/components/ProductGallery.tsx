'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { catalog, type Product } from '@/lib/catalog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ product }: { product: Product }) {
  const images = product.images && product.images.length > 0 ? product.images : [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsModalOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

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
      <section className="section-standard max-w-full min-w-0 !py-10 md:!py-20">
        <div className="mx-auto grid min-w-0 max-w-6xl gap-6 lg:grid-cols-12">
          {/* Thumbnails (Desktop side, Mobile below or hidden, we can put them below the main image for mobile, side for desktop) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            {images.map((img, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                aria-label={`Show image ${idx + 1} of ${images.length} for ${product.title}`}
                aria-pressed={selectedImageIndex === idx}
                className={`relative aspect-square w-full rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedImageIndex === idx ? 'border-blue-600 shadow-md scale-[1.02]' : 'border-transparent hover:border-slate-300'
                } bg-white`}
              >
                <Image src={img} alt={`${product.title} ${idx + 1}`} fill sizes="160px" className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main Visual */}
          <div className="min-w-0 lg:col-span-10">
            <button
              type="button"
              aria-label={`Open image ${selectedImageIndex + 1} of ${images.length} for ${product.title}`}
              className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-[2rem] border border-slate-100 bg-white text-left shadow-xl md:aspect-[4/3] md:rounded-[3rem]"
              onClick={() => openModal(selectedImageIndex)}
            >
              <Image
                src={images[selectedImageIndex]} 
                alt={product.title} 
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="w-full h-full object-contain p-4 md:p-8 transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Authenticity Callout */}
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-slate-100 px-5 py-2.5 rounded-full shadow-lg pointer-events-none">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                <p className="text-xs font-black uppercase tracking-widest text-slate-900">
                  {catalog.company.authenticity.badge}
                </p>
              </div>
            </button>

            {/* Mobile Thumbnails */}
            <div className="flex lg:hidden gap-4 mt-6 overflow-x-auto custom-scrollbar pb-4 snap-x">
              {images.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  aria-label={`Show image ${idx + 1} of ${images.length} for ${product.title}`}
                  aria-pressed={selectedImageIndex === idx}
                  className={`relative aspect-square w-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all snap-start ${
                    selectedImageIndex === idx ? 'border-blue-600 shadow-md' : 'border-transparent'
                  } bg-white`}
                >
                  <Image src={img} alt={`${product.title} ${idx + 1}`} fill sizes="96px" className="object-cover" />
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
            role="dialog"
            aria-modal="true"
            aria-label={`${product.title} image gallery`}
          >
            <button 
              type="button"
              className="absolute top-6 right-6 md:top-10 md:right-10 z-50 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={closeModal}
              aria-label="Close image gallery"
              autoFocus
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div 
              className="relative w-full max-w-[90vw] h-full flex flex-col md:flex-row items-center justify-center gap-6 p-4 md:p-8"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              {/* Modal Thumbnails - Desktop (Left) */}
              {images.length > 1 && (
                <div className="hidden md:flex flex-col gap-4 overflow-y-auto max-h-[85vh] custom-scrollbar pr-4 shrink-0">
                  {images.map((img, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`Show image ${idx + 1} of ${images.length} for ${product.title}`}
                      aria-pressed={selectedImageIndex === idx}
                      className={`relative aspect-square w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx ? 'border-blue-500 scale-[1.05]' : 'border-transparent hover:border-slate-500 opacity-50 hover:opacity-100'
                      } bg-white/5`}
                    >
                      <Image src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="96px" className="object-contain p-2" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Modal Image */}
              <div className="relative w-full h-[60vh] md:h-[85vh] flex-1 flex items-center justify-center">
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
                      type="button"
                      onClick={prevImage}
                      className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
                      aria-label="Show previous image"
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button 
                      type="button"
                      onClick={nextImage}
                      className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
                      aria-label="Show next image"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Thumbnails - Mobile (Bottom) */}
              {images.length > 1 && (
                <div className="md:hidden flex gap-4 overflow-x-auto max-w-full pb-4 custom-scrollbar px-4 shrink-0">
                  {images.map((img, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`Show image ${idx + 1} of ${images.length} for ${product.title}`}
                      aria-pressed={selectedImageIndex === idx}
                      className={`relative aspect-square w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx ? 'border-blue-500 scale-110' : 'border-transparent hover:border-slate-500 opacity-60 hover:opacity-100'
                      } bg-white/5`}
                    >
                      <Image src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="80px" className="object-contain p-1" />
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
