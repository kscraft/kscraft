'use client';

import { useState } from 'react';
import { catalog } from '@/lib/catalog';
import QuoteModal from '@/components/QuoteModal';
import { cn } from '@/lib/utils';

type HeaderActionsProps = {
  useLightHeaderText: boolean;
};

export default function HeaderActions({ useLightHeaderText }: HeaderActionsProps) {
  const [isModalOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "text-[12px] font-semibold px-5 py-2 rounded-full transition-all active:scale-95",
          useLightHeaderText
            ? "bg-white text-slate-950 hover:bg-blue-50"
            : "bg-black text-white hover:bg-zinc-800"
        )}
      >
        {catalog.company.ui.getQuote}
      </button>

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}
