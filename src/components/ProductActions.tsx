'use client';

import { useState } from 'react';
import QuoteModal from '@/components/QuoteModal';
import { catalog } from '@/lib/catalog';
import { trackQuoteClick } from '@/lib/analytics-client';

type ProductActionsProps = {
  productTitle: string;
};

export default function ProductActions({ productTitle }: ProductActionsProps) {
  const [isModalOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => {
            trackQuoteClick(productTitle, 'product_page');
            setIsOpen(true);
          }}
          className="apple-button px-12 py-4 text-sm uppercase tracking-widest font-black"
        >
          {catalog.company.ui.getQuote}
        </button>
      </div>

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsOpen(false)} 
        productName={productTitle} 
      />
    </>
  );
}
