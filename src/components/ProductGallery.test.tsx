import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProductGallery from './ProductGallery';
import { type Product } from '@/lib/catalog';

const mockProduct: Product = {
  slug: 'test-product',
  title: 'Test Product',
  description: 'Test Description',
  categories: ['test-category'],
  primaryCategory: 'test-category',
  images: ['/test-image-one.jpg', '/test-image-two.jpg'],
  specifications: { Weight: '100kg' },
  features: ['Feature 1'],
  applications: ['App 1'],
  sourceUrls: ['https://example.com'],
};

describe('ProductGallery', () => {
  it('exposes named image controls and selected state', () => {
    render(<ProductGallery product={mockProduct} />);

    expect(screen.getAllByRole('button', { name: /Show image 1 of 2 for Test Product/i })[0]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /Open image 1 of 2 for Test Product/i })).toBeInTheDocument();
  });

  it('opens a labeled dialog and closes it with Escape', () => {
    render(<ProductGallery product={mockProduct} />);

    fireEvent.click(screen.getByRole('button', { name: /Open image 1 of 2 for Test Product/i }));
    expect(screen.getByRole('dialog', { name: 'Test Product image gallery' })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Test Product image gallery' })).not.toBeInTheDocument();
  });
});
