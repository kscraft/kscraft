import { describe, expect, it } from 'vitest';
import { createOnePagePdf, defaultDownloadItems, getDownloadDocument } from './downloads';

describe('downloads', () => {
  it('exposes real PDF download links', () => {
    expect(defaultDownloadItems).toHaveLength(5);
    expect(defaultDownloadItems.every((item) => item.href.startsWith('/downloads/'))).toBe(true);
    expect(defaultDownloadItems.some((item) => item.href === '/downloads/gaganyaan-manufacturing-proof')).toBe(true);
  });

  it('creates a valid PDF payload for a known document', () => {
    const document = getDownloadDocument('soundproof-windows-one-pager');

    expect(document).toBeDefined();
    const pdf = createOnePagePdf(document!);
    const header = new TextDecoder().decode(pdf.slice(0, 8));

    expect(header).toBe('%PDF-1.4');
    expect(pdf.length).toBeGreaterThan(1000);
  });
});
