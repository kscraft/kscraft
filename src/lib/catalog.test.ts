import { describe, it, expect } from 'vitest';
import { 
  getProduct, 
  getCategory, 
  getProductsByCategory, 
  getFeaturedProducts,
  products,
  categories
} from './catalog';

describe('Catalog Library', () => {
  it('should return a product by slug', () => {
    const product = getProduct('sound-proof-sliding-windows');
    expect(product).toBeDefined();
    expect(product?.title).toContain('Sliding Windows');
  });

  it('should return a category by id', () => {
    const category = getCategory('sound-proof-windows');
    expect(category).toBeDefined();
    expect(category?.title).toBe('Acoustic Windows');
  });

  it('should return products by category', () => {
    const categoryProducts = getProductsByCategory('sound-proof-windows');
    expect(categoryProducts.length).toBeGreaterThan(0);
    categoryProducts.forEach(p => {
      expect(p.categories).toContain('sound-proof-windows');
    });
  });

  it('should return featured products', () => {
    const featured = getFeaturedProducts(3);
    expect(featured.length).toBe(3);
  });

  it('should have products with correct structure', () => {
    expect(products.length).toBeGreaterThan(0);
    const first = products[0];
    expect(first.slug).toBeDefined();
    expect(first.title).toBeDefined();
    expect(Array.isArray(first.images)).toBe(true);
    expect(first.specifications).toBeDefined();
  });

  it('should have categories with correct structure', () => {
    expect(categories.length).toBeGreaterThan(0);
    const first = categories[0];
    expect(first.id).toBeDefined();
    expect(first.title).toBeDefined();
    expect(Array.isArray(first.highlights)).toBe(true);
  });
});
