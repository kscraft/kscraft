import { describe, it, expect } from 'vitest';
import { catalog } from './catalog';

/**
 * Brand Integrity Test
 * 
 * Verifying that the soul of Kiran Slido Craft—its silence and movement—
 * is preserved across the digital infrastructure.
 */
describe('Brand Soul & Poetic Integrity', () => {
  it('should preserve the core philosophy of silence', () => {
    expect(catalog.company.tagline).toContain('Engineering Silence');
  });

  it('should maintain the rhythm of automation', () => {
    expect(catalog.company.tagline).toContain('Automating Movement');
  });

  it('should reflect the global reach of Indian excellence', () => {
    expect(catalog.company.description).toContain('indigenous Indian engineering');
    expect(catalog.company.description).toContain('UK, Europe, GCC/MENA, APAC');
  });

  it('should uphold the visionary promise', () => {
    expect(catalog.company.vision).toMatch(/Leading the future/i);
    expect(catalog.company.mission).toMatch(/world-class acoustic/i);
  });
});
