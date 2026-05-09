'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';
import { catalog } from '@/lib/catalog';

type ProductActionsProps = {
  productTitle: string;
  sourceUrl?: string;
};

export default function ProductActions({ productTitle, sourceUrl }: ProductActionsProps) {
  const [isModalOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <button 
          onClick={() => setIsOpen(true)}
          className="apple-button px-12 py-4 text-sm uppercase tracking-widest font-black"
        >
          {catalog.company.ui.getQuote}
        </button>
        {sourceUrl && (
          <a 
            href={sourceUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="group apple-button-secondary px-10 py-4 text-sm uppercase tracking-widest font-black flex items-center gap-3"
          >
            {catalog.company.ui.viewSourceDetails} 
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </div>

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsOpen(false)} 
        productName={productTitle} 
      />
    </>
  );
}
