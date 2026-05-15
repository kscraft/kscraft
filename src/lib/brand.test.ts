import { describe, it, expect } from 'vitest';
import { catalog } from '@/lib/catalog';

describe('Brand Soul & Poetic Integrity', () => {
  it('should preserve the core philosophy of engineering and manufacturing', () => {
    expect(catalog.company.tagline).toContain('Engineering and Manufacturing');
  });

  it('should reflect the global reach of technical excellence', () => {
    expect(catalog.company.description).toContain('UK, Europe, GCC/MENA, APAC');
  });
});
