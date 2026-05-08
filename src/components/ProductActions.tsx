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
          className="apple-button px-12 py-4"
        >
          {catalog.company.ui.getQuote}
        </button>
        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noreferrer" className="apple-link text-lg">
            {catalog.company.ui.viewSourceDetails} <ExternalLink className="w-5 h-5" />
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
