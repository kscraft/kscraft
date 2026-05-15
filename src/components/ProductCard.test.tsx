import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';
import { type Product } from '@/lib/catalog';

const mockProduct: Product = {
  slug: 'test-product',
  title: 'Test Product',
  description: 'Test Description',
  categories: ['test-category'],
  primaryCategory: 'test-category',
  images: ['/test-image.jpg'],
  specifications: { 'Weight': '100kg' },
  features: ['Feature 1'],
  applications: ['App 1'],
  sourceUrls: ['http://test.com']
};

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    // getProductCategoryLabel('test-category') would be 'test-category' in tests since mock doesn't have it
    expect(screen.getByText('test-category')).toBeInTheDocument();
  });

  it('renders with correct link', () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/test-product');
  });
});
