import { describe, expect, it } from 'vitest';
import { createTechnicalPdf, defaultDownloadItems, getDownloadDocument } from './downloads';

describe('downloads', () => {
  it('exposes real PDF download links', () => {
    expect(defaultDownloadItems).toHaveLength(5);
    expect(defaultDownloadItems.every((item) => item.href.startsWith('/downloads/'))).toBe(true);
    expect(defaultDownloadItems.some((item) => item.href === '/downloads/gaganyaan-manufacturing-proof')).toBe(true);
  });

  it('creates a valid multi-page technical PDF payload for a known document', () => {
    const document = getDownloadDocument('soundproof-windows-one-pager');

    expect(document).toBeDefined();
    const pdf = createTechnicalPdf(document!);
    const content = new TextDecoder().decode(pdf);

    expect(content.slice(0, 8)).toBe('%PDF-1.4');
    expect(content).toContain('Source Basis');
    const pageCount = Number(content.match(/\/Count (\d+)/)?.[1]);
    expect(pageCount).toBeGreaterThanOrEqual(2);
    expect(pdf.length).toBeGreaterThan(5000);
  });
});
