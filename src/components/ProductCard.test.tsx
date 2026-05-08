import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/catalog';

const mockProduct: Product = {
  slug: 'test-product',
  title: 'Test Product',
  category: 'test-category',
  description: 'Test Description',
  image: '/test-image.jpg',
  sourceUrls: [],
  legacyRoutes: [],
  specifications: {},
  features: [],
  applications: [],
};

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('test category')).toBeInTheDocument();
  });

  it('renders with correct link', () => {
    render(<ProductCard product={mockProduct} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/test-product');
  });

  it('renders image with correct alt text', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
  });
});
