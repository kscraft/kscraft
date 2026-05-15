import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CompareEngine from './CompareEngine';
import { products } from '@/lib/catalog';

describe('CompareEngine', () => {
  it('renders nothing when no products are selected', () => {
    const { container } = render(<CompareEngine products={products} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders comparison bar when a product is added via event', () => {
    render(<CompareEngine products={products} />);
    
    const testProduct = products[0];
    
    act(() => {
      const event = new CustomEvent('add-to-compare', { detail: testProduct.slug });
      window.dispatchEvent(event);
    });
    
    expect(screen.getByText(/Compare/i)).toBeInTheDocument();
    expect(screen.getByText(testProduct.title)).toBeInTheDocument();
  });
});
